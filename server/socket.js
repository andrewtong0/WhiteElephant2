const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { GAME_STATES, getNextState } = require('./utils/fsa');
const { questions} = require('./questionData/questions');

// Initialize Express properties
const app = express();
const port = 5000;
app.use(cors());

// Initialize game data
const rooms = {};

// Initialize Express server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT'],
    },
});

// Fetches player count and emits to room
const updatePlayerCount = (roomName) => {
    const clients = rooms[roomName].clients;
    const playerCount = Object.keys(clients).filter((clientId) => !clients[clientId].isAdmin).length;
    io.to(roomName).emit('playerCountUpdated', playerCount);
};

const SCORE_VALUES = {
    'multipleChoice': 250,
    'numeric': 1000, // 1000 for top score, 100 less per placement down from top, min of 0
}

// Updates scores and emits to room
const updateScores = (roomName, questionNum) => {
    const currQuestion = rooms[roomName].gamedata.currQuestion;
    const correctAnswer = currQuestion.questionType == 'multipleChoice' ? currQuestion.potentialAnswers[currQuestion.answer]:  currQuestion.answer;
    const questionKey = `question_${questionNum}`;
    const questionAnswers = rooms[roomName].gamedata?.questionData?.[questionKey]?.answers || {};
    const scores = rooms[roomName].gamedata.scores || {};
    const questionPointGain = rooms[roomName].gamedata.questionPointGain || {};

    if (currQuestion.questionType == 'multipleChoice') {
        Object.keys(questionAnswers).forEach((clientId) => {
            const answer = questionAnswers[clientId];
            const prevScore = scores[clientId] || 0;
            if (answer === correctAnswer) {
                const pointsGained = SCORE_VALUES[currQuestion.questionType]
                scores[clientId] = prevScore + pointsGained;
                questionPointGain[clientId] = pointsGained;
            } else {
                scores[clientId] = prevScore;
                questionPointGain[clientId] = 0;
            }
        });
    } else if (currQuestion.questionType === 'numeric') {
        // TODO: @Andrew need to resolve ties properly
        const answerResults = Object.keys(questionAnswers).map((clientId) => {
            const answer = questionAnswers[clientId];
            const absoluteDifference = Math.abs(answer - correctAnswer);
            const prevScore = scores[clientId] || 0;
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
            const pointsGained = Math.max(SCORE_VALUES[currQuestion.questionType] - (currentRank * 100), 0);
            scores[clientId] = answerResult.prevScore + pointsGained;
            questionPointGain[clientId] = pointsGained;
        });

        console.log("AnswerResults", answerResults);
        console.log("AnsewrResults", answerResults);
    }
    rooms[roomName].gamedata.scores = scores;
    rooms[roomName].gamedata.questionPointGain = questionPointGain;
    io.to(roomName).emit('gamedataUpdated', rooms[roomName].gamedata);
};

// Generates ID for client
const generateUniqueId = () => {
    return 'user-' + Math.random().toString(36).substr(2, 9);
};

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinRoom', ({ roomName, nickname, isAdmin, clientId }) => {
        if (!rooms[roomName]) {
            rooms[roomName] = {
                gamedata: {
                    gamestate: GAME_STATES.LOBBY,
                    questionNum: 0,
                    scores: {},
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
        }

        // Send the current game state to the connecting client
        socket.emit('gamedataUpdated', rooms[roomName].gamedata);

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
            const nextState = getNextState(rooms[roomName].gamedata.gamestate, rooms[roomName].gamedata.questionNum);
            if (nextState === GAME_STATES.QUESTION) {
                const mountNewQuestionData = () => {
                    const questionIndex = rooms[roomName].gamedata.questionNum;
                    const maxIndex = questions.length - 1;
                    rooms[roomName].gamedata.currQuestion = questions[Math.min(questionIndex, maxIndex)];
                };

                mountNewQuestionData();
                rooms[roomName].gamedata.questionNum += 1;
                rooms[roomName].gamedata.questionPointGain = {};
            } else if (nextState === GAME_STATES.ANSWER) {
                updateScores(roomName, rooms[roomName].gamedata.questionNum);
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
