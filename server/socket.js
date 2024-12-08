const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { GAME_STATES, getNextState } = require('./utils/fsa');
const { questions } = require('./questionData/questions');

// Initialize Express properties
const port = 5000;

// Define allowed origins
const app = express();
const server = http.createServer(app);

// const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
// Custom CORS Middleware
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);  // Allow the request
//     } else {
//       callback(new Error('Not allowed by CORS'));  // Block the request
//     }
//   },
//   methods: ['GET', 'POST', 'PUT'],
// }));

// const io = new Server(server, {
//   cors: {
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);  // Allow the request
//       } else {
//         callback(new Error('Not allowed by CORS'));  // Block the request
//       }
//     },
//     methods: ['GET', 'POST', 'PUT'],
//   },
// });

const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT'],
    },
  });

// Initialize game data
const rooms = {};

// Fetches player count and emits to room
const updatePlayerCount = (roomName) => {
    const clients = rooms[roomName].clients;
    const playerCount = Object.keys(clients).filter((clientId) => !clients[clientId].isAdmin).length;
    io.to(roomName).emit('playerCountUpdated', playerCount);
};

const SCORE_VALUES = {
    'multiple_choice': 300,
    'numeric': 1000,
}

// Updates scores and emits to room
const updateScores = (roomName, questionNum) => {
    const currQuestion = rooms[roomName].gamedata.currQuestion;
    const correctAnswer = currQuestion.questionType == 'multiple_choice' ? currQuestion.potentialAnswers[currQuestion.answer]:  currQuestion.answer;
    const questionKey = `question_${questionNum}`;
    const questionAnswers = rooms[roomName].gamedata?.questionData?.[questionKey]?.answers || {};
    const players = rooms[roomName].gamedata.players || {};
    const questionPointGain = rooms[roomName].gamedata.questionPointGain || {};

    if (currQuestion.questionType == 'multiple_choice') {
        Object.keys(questionAnswers).forEach((clientId) => {
            const answer = questionAnswers[clientId];
            const prevScore = players[clientId].score || 0;
            if (answer === correctAnswer) {
                const pointsGained = SCORE_VALUES[currQuestion.questionType]
                players[clientId].score = prevScore + pointsGained;
                questionPointGain[clientId] = {
                    questionPointGain: pointsGained,
                    placement: 1
                }
            } else {
                players[clientId].score = prevScore;
                questionPointGain[clientId] = {
                    questionPointGain: 0,
                    placement: 2
                }
            }
        });
    } else if (currQuestion.questionType === 'numeric') {
        // TODO: @Andrew need to resolve ties properly
        const answerResults = Object.keys(questionAnswers).map((clientId) => {
            const answer = questionAnswers[clientId];
            const absoluteDifference = Math.abs(answer - correctAnswer);
            const prevScore = players[clientId].score || 0;
            return {
                clientId,
                absoluteDifference,
                prevScore,
            };
        }).sort((a, b) => a.absoluteDifference - b.absoluteDifference);

        let currentRank = 0;
        let previousDifference = -1;

        answerResults.forEach((answerResult, index) => {
            const clientId = answerResult.clientId;
            if (answerResult.absoluteDifference !== previousDifference) {
                currentRank = index;
                previousDifference = answerResult.absoluteDifference;
            }
            const pointsGained = currentRank === 0 ? SCORE_VALUES.numeric : Math.max(1000 - (currentRank * 100) - 100, 0);
            players[clientId].score = answerResult.prevScore + pointsGained;
            questionPointGain[clientId] = {
                questionPointGain: pointsGained,
                placement: currentRank + 1
            }
        });

        console.log("AnswerResults", answerResults);
        console.log("AnsewrResults", answerResults);
    }
    rooms[roomName].gamedata.players = players;
    rooms[roomName].gamedata.questionPointGain = questionPointGain;
    io.to(roomName).emit('gamedataUpdated', rooms[roomName].gamedata);
};

// Generates ID for client
const generateUniqueId = () => {
    return 'user-' + Math.random().toString(36).substr(2, 9);
};

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id} | Num connections: ${io.of('/').sockets.size}`);

    socket.on('joinRoom', ({ roomName, nickname, isAdmin, clientId }) => {
        if (!rooms[roomName]) {
            rooms[roomName] = {
                gamedata: {
                    gamestate: GAME_STATES.LOBBY,
                    questionNum: 0,
                    players: {},
                },
                clients: {}
            };
        }

        let clientData;

        // Check if reconnecting
        if (clientId && rooms[roomName].clients[clientId]) {
            clientData = rooms[roomName].clients[clientId];
            clientData.socketId = socket.id; // Update the socket ID
            socket.emit('reconnected', clientData); // Send restored data
        } else {
            // New connection
            const newClientId = generateUniqueId();
            clientData = {
                id: newClientId,
                nickname,
                isAdmin,
                socketId: socket.id,
            };
            rooms[roomName].clients[newClientId] = clientData;
            socket.emit('joinedRoom', clientData);

            // Add player data to gamedata if this is a new player so it is updated
            let playerData = { ...rooms[roomName].gamedata.players };
            playerData[clientData.id] = {
                id: clientData.id,
                nickname: clientData.nickname,
                isAdmin: clientData.isAdmin,
                score: 0,
            };
            rooms[roomName].gamedata.players = playerData;
        }

        console.log(rooms[roomName].gamedata)

        // Send the current game state to the connecting client
        io.to(roomName).emit('gamedataUpdated', rooms[roomName].gamedata);

        socket.join(roomName);
        updatePlayerCount(roomName);
    });

    socket.on('disconnect', () => {
        for (const roomName in rooms) {
            for (const clientId in rooms[roomName].clients) {
                if (rooms[roomName].clients[clientId].socketId === socket.id) {
                    // Retain the client's data but remove socket association
                    rooms[roomName].clients[clientId].socketId = null;
                    updatePlayerCount(roomName);
                    return;
                }
            }
        }
        console.log(`Client disconnected | Num connections: ${io.of('/').sockets.size}`);
    });

    // Manual disconnect from user, removes them from game
    socket.on('disconnectAndRemove', ({ roomName, clientId }) => {
        if (rooms[roomName] && rooms[roomName].clients[clientId]) {
            delete rooms[roomName].clients[clientId];
            updatePlayerCount(roomName);
            console.log(`Client ${clientId} removed from room ${roomName}`);
        }
    });

    // Update gamedata object, admin only
    socket.on('updateGamedata', ({ roomName, clientId, newData }) => {
        const client = rooms[roomName]?.clients[clientId];
        console.log(rooms[roomName]?.clients);

        if (client && client.isAdmin) {
            rooms[roomName].gamedata = {
                ...rooms[roomName]?.gamedata,
                ...newData
            };

            io.to(roomName).emit('gamedataUpdated', rooms[roomName].gamedata);
            console.log(`Gamestate updated by admin ${client.nickname} in room ${roomName}`);
        } else {
            console.log('Unauthorized gamedata update attempt');
            socket.emit('error', 'Only admins can update the gamedata.');
        }
    });

    // Advance game state
    socket.on('advanceGameState', ({ roomName, clientId }) => {
        const client = rooms[roomName]?.clients[clientId];

        if (client && client.isAdmin) {
            let nextState = getNextState(rooms[roomName].gamedata.gamestate, rooms[roomName].gamedata.questionNum);
            if (nextState === GAME_STATES.QUESTION) {
                const mountNewQuestionData = () => {
                    const questionIndex = rooms[roomName].gamedata.questionNum;
                    const maxIndex = questions.length - 1;
                    rooms[roomName].gamedata.currQuestion = questions[Math.min(questionIndex, maxIndex)];
                };

                mountNewQuestionData();
                rooms[roomName].gamedata.questionNum += 1;
                rooms[roomName].gamedata.questionPointGain = {};

                if (rooms[roomName].gamedata.currQuestion.questionType === 'survey') {
                    nextState = GAME_STATES.SURVEY_QUERY;
                }
            } else if (nextState === GAME_STATES.ANSWER) {
                updateScores(roomName, rooms[roomName].gamedata.questionNum);
            } else if (nextState === GAME_STATES.SURVEY_QUESTION) {
                const consolidateAnswerFromNumericAnswers = (answers) => {
                    let total = 0;
                    let numAnswers = 0;
                    Object.keys(answers).forEach((clientId) => {
                        total += answers[clientId];
                        numAnswers += 1;
                    })
                    return total / numAnswers;
                }

                // Mount question with modified answer
                const questionIndex = rooms[roomName].gamedata.questionNum;
                const currQuestion = questions[Math.min(questionIndex, questions.length - 1)];
                const realQuestion = currQuestion.followupQuestion;
                const answers = rooms[roomName].gamedata?.questionData[`question_${questionIndex}`]?.answers || {}
                const surveyAnswer = consolidateAnswerFromNumericAnswers(answers);
                realQuestion.answer = surveyAnswer;

                rooms[roomName].gamedata.currQuestion = realQuestion;
            }

            rooms[roomName].gamedata.gamestate = nextState;
            io.to(roomName).emit('gamedataUpdated', rooms[roomName].gamedata);
            console.log(`Gamestate advanced by admin ${client.nickname} in room ${roomName}`);
        } else {
            console.log('Unauthorized gamestate advance attempt');
            socket.emit('error', 'Only admins can advance the gamestate.');
        }
    })

    socket.on('submitAnswer', ({ roomName, clientId, answer }) => {
        const client = rooms[roomName]?.clients[clientId];

        if (client) {
            const questionKey = `question_${rooms[roomName].gamedata.questionNum}`;
            const questionData = rooms[roomName].gamedata.questionData || {};

            // Ensure that questionData exists for the current question number
            if (!questionData[questionKey]) {
                questionData[questionKey] = {"answers": {}};
            }

            console.log(JSON.stringify(questionData));
            questionData[questionKey]["answers"][clientId] = answer;
            rooms[roomName].gamedata.questionData = questionData;

            io.to(roomName).emit('gamedataUpdated', rooms[roomName].gamedata);

            console.log(`Answer submitted by client ${client.nickname} in room ${roomName}`);
        } else {
            console.log('Unauthorized answer submission attempt');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
