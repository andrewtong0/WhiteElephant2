import React, { useEffect, useState } from 'react';
import './App.css';
import { QuestionDisplay } from './components/QuestionDisplay/QuestionDisplay';
import { MultipleChoiceQuestionType, QuestionState, QuestionType, User } from './components/interfaces';
import { Grid } from '@mui/material';
import ScoreDisplay from './components/ScoreDisplay/ScoreDisplay';
import GameTimer from './components/GameTimer/GameTimer';
import IntermissionScores from './components/IntermissionScores/IntermissionScores';
import { io } from 'socket.io-client';
import { buildAnswersFromGamedata, buildQuestionFromGamedata, buildUsersFromGamedata } from './utils';

const SAMPLE_ANSWERS_1 = [
  { answerValue: 10, type: QuestionType.NUMERIC, user: { name: "Xiaoxiang", id: "15", score: 0 }, pointsGained: 950, placement: 1 },
  { answerValue: 10, type: QuestionType.NUMERIC, user: { name: "Tianhao", id: "20", score: 0 }, pointsGained: 900, placement: 2 },
  { answerValue: 9, type: QuestionType.NUMERIC, user: { name: "Yunyi", id: "9", score: 0 }, pointsGained: 850, placement: 3 },
  { answerValue: 9, type: QuestionType.NUMERIC, user: { name: "Junyu", id: "19", score: 0 }, pointsGained: 800, placement: 4 },
  { answerValue: 8, type: QuestionType.NUMERIC, user: { name: "DZ", id: "7", score: 0 }, pointsGained: 800, placement: 4 },
  { answerValue: 8, type: QuestionType.NUMERIC, user: { name: "Jingyuan Y", id: "18", score: 0 }, pointsGained: 700, placement: 6 },
  { answerValue: 7, type: QuestionType.NUMERIC, user: { name: "Annalice", id: "11", score: 0 }, pointsGained: 650, placement: 7 },
  { answerValue: 7, type: QuestionType.NUMERIC, user: { name: "Jingyuan Z", id: "17", score: 0 }, pointsGained: 600, placement: 8 },
  { answerValue: 6, type: QuestionType.NUMERIC, user: { name: "Qifan", id: "13", score: 0 }, pointsGained: 550, placement: 9 },
  { answerValue: 6, type: QuestionType.NUMERIC, user: { name: "Maggie", id: "16", score: 0 }, pointsGained: 500, placement: 10 },
  { answerValue: 5, type: QuestionType.NUMERIC, user: { name: "Thomas", id: "5", score: 0 }, pointsGained: 450, placement: 11 },
  { answerValue: 5, type: QuestionType.NUMERIC, user: { name: "Honghui", id: "6", score: 0 }, pointsGained: 400, placement: 12 },
  { answerValue: 4, type: QuestionType.NUMERIC, user: { name: "Mai", id: "4", score: 0 }, pointsGained: 350, placement: 13 },
  { answerValue: 4, type: QuestionType.NUMERIC, user: { name: "Byron", id: "12", score: 0 }, pointsGained: 300, placement: 14 },
  { answerValue: 3, type: QuestionType.NUMERIC, user: { name: "Anvar", id: "3", score: 0 }, pointsGained: 250, placement: 15 },
  { answerValue: 3, type: QuestionType.NUMERIC, user: { name: "Siyu", id: "8", score: 0 }, pointsGained: 200, placement: 16 },
  { answerValue: 2, type: QuestionType.NUMERIC, user: { name: "Wendy", id: "2", score: 0 }, pointsGained: 150, placement: 17 },
  { answerValue: 2, type: QuestionType.NUMERIC, user: { name: "Alex", id: "14", score: 0 }, pointsGained: 100, placement: 18 },
  { answerValue: 1, type: QuestionType.NUMERIC, user: { name: "Andrew", id: "1", score: 0 }, pointsGained: 50, placement: 19 },
  { answerValue: 1, type: QuestionType.NUMERIC, user: { name: "Thomas", id: "10", score: 0 }, pointsGained: 0, placement: 20 },
  { answerValue: 0, type: QuestionType.NUMERIC, user: { name: "Diane", id: "10", score: 0 }, pointsGained: 0, placement: 21 },
]

const SAMPLE_QUESTION_1 = {
  questionText: "What is the answer to the ultimate question of life, the universe, and everything?",
  answer: 8,
  type: QuestionType.NUMERIC,
  backgroundColor: {
    colour1: "linear-gradient(to top, red, blue)",
    colour2: "linear-gradient(to right, #5500ff, #00ff55)",
    blendingMode: "overlay",
  },
  upperLimit: 10,
  lowerLimit: 0,
}

const SAMPLE_ANSWERS_2 = [
  { answerValue: 995000, type: QuestionType.NUMERIC, user: { name: "Xiaoxiang", id: "15", score: 0 }, pointsGained: 950, placement: 1 },
  { answerValue: 900000, type: QuestionType.NUMERIC, user: { name: "Tianhao", id: "20", score: 0 }, pointsGained: 900, placement: 2 },
  { answerValue: 750000, type: QuestionType.NUMERIC, user: { name: "Yunyi", id: "9", score: 0 }, pointsGained: 850, placement: 3 },
  { answerValue: 650000, type: QuestionType.NUMERIC, user: { name: "Junyu", id: "19", score: 0 }, pointsGained: 800, placement: 4 },
  { answerValue: 600000, type: QuestionType.NUMERIC, user: { name: "DZ", id: "7", score: 0 }, pointsGained: 800, placement: 4 },
  { answerValue: 550000, type: QuestionType.NUMERIC, user: { name: "Jingyuan Y", id: "18", score: 0 }, pointsGained: 700, placement: 6 },
  { answerValue: 500000, type: QuestionType.NUMERIC, user: { name: "Annalice", id: "11", score: 0 }, pointsGained: 650, placement: 7 },
  { answerValue: 450000, type: QuestionType.NUMERIC, user: { name: "Jingyuan Z", id: "17", score: 0 }, pointsGained: 600, placement: 8 },
  { answerValue: 400000, type: QuestionType.NUMERIC, user: { name: "Qifan", id: "13", score: 0 }, pointsGained: 550, placement: 9 },
  { answerValue: 350000, type: QuestionType.NUMERIC, user: { name: "Maggie", id: "16", score: 0 }, pointsGained: 500, placement: 10 },
  { answerValue: 300000, type: QuestionType.NUMERIC, user: { name: "Thomas", id: "5", score: 0 }, pointsGained: 450, placement: 11 },
  { answerValue: 250000, type: QuestionType.NUMERIC, user: { name: "Honghui", id: "6", score: 0 }, pointsGained: 400, placement: 12 },
  { answerValue: 200000, type: QuestionType.NUMERIC, user: { name: "Mai", id: "4", score: 0 }, pointsGained: 350, placement: 13 },
  { answerValue: 150000, type: QuestionType.NUMERIC, user: { name: "Byron", id: "12", score: 0 }, pointsGained: 300, placement: 14 },
  { answerValue: 100000, type: QuestionType.NUMERIC, user: { name: "Anvar", id: "3", score: 0 }, pointsGained: 250, placement: 15 },
  { answerValue: 50000, type: QuestionType.NUMERIC, user: { name: "Siyu", id: "8", score: 0 }, pointsGained: 200, placement: 16 },
  { answerValue: 500000, type: QuestionType.NUMERIC, user: { name: "Wendy", id: "2", score: 0 }, pointsGained: 150, placement: 17 },
  { answerValue: 10000, type: QuestionType.NUMERIC, user: { name: "Alex", id: "14", score: 0 }, pointsGained: 100, placement: 18 },
  { answerValue: 1000, type: QuestionType.NUMERIC, user: { name: "Andrew", id: "1", score: 0 }, pointsGained: 50, placement: 19 },
  { answerValue: 0, type: QuestionType.NUMERIC, user: { name: "Thomas", id: "10", score: 0 }, pointsGained: 0, placement: 20 },
  { answerValue: 0, type: QuestionType.NUMERIC, user: { name: "Diane", id: "10", score: 0 }, pointsGained: 0, placement: 21 },
]

const SAMPLE_QUESTION_2 = {
  questionText: "Question 2",
  answer: 500000,
  type: QuestionType.NUMERIC,
  backgroundColor: {
    colour1: "linear-gradient(to top, red, blue)",
    colour2: "linear-gradient(to right, #5500ff, #00ff55)",
    blendingMode: "overlay",
  },
  upperLimit: 1000000,
  lowerLimit: 0,
}

const SAMPLE_QUESTION_3: MultipleChoiceQuestionType = {
  questionText: "What is the capital of Japan?",
  answer: 0,
  type: QuestionType.MULTIPLE_CHOICE,
  backgroundColor: {
    colour1: "linear-gradient(to top, yellow, green)",
    colour2: "linear-gradient(to right, #ff5500, #55ff00)",
    blendingMode: "multiply",
  },
 options: ['Tokyo', 'Kyoto', 'Osaka', 'Nagoya'],
}

const SAMPLE_ANSWERS_3 = [
  { answerValue: 'Tokyo', type: QuestionType.MULTIPLE_CHOICE, user: { name: "Alice", id: "21", score: 0 }, pointsGained: 250, placement: 1 },
  { answerValue: 'Tokyo', type: QuestionType.MULTIPLE_CHOICE, user: { name: "Eve", id: "25", score: 0 }, pointsGained: 250, placement: 2 },
  { answerValue: 'Nagoya', type: QuestionType.MULTIPLE_CHOICE, user: { name: "Fred", id: "26", score: 0 }, pointsGained: 0, placement: 3 },
  { answerValue: 'Tokyo', type: QuestionType.MULTIPLE_CHOICE, user: { name: "Gina", id: "27", score: 0 }, pointsGained: 250, placement: 4 },
  { answerValue: 'Kyoto', type: QuestionType.MULTIPLE_CHOICE, user: { name: "Harry", id: "28", score: 0 }, pointsGained: 0, placement: 5 },
  { answerValue: 'Osaka', type: QuestionType.MULTIPLE_CHOICE, user: { name: "Bob", id: "22", score: 0 }, pointsGained: 0, placement: 6 },
  { answerValue: 'Nagoya', type: QuestionType.MULTIPLE_CHOICE, user: { name: "Charlie", id: "23", score: 0 }, pointsGained: 0, placement: 7 },
  { answerValue: 'Kyoto', type: QuestionType.MULTIPLE_CHOICE, user: { name: "David", id: "24", score: 0 }, pointsGained: 0, placement: 8 },
]

const GAME_DATA = {
  questions: [SAMPLE_QUESTION_1, SAMPLE_QUESTION_2, SAMPLE_QUESTION_3],
  answers: [SAMPLE_ANSWERS_1, SAMPLE_ANSWERS_2, SAMPLE_ANSWERS_3],
  currQuestion: 2,
  gameState: QuestionState.ANSWER,
  shouldDisplayTimer: false,
}

const USERS = [
  { name: "Alice", id: "21", score: 1250 },
  { name: "Bob", id: "22", score: 10 },
  { name: "Charlie", id: "23", score: 20 },
  { name: "David", id: "24", score: 30 },
  { name: "Eve", id: "25", score: 250 },
  { name: "Fred", id: "26", score: 40 },
  { name: "Gina", id: "27", score: 50 },
  { name: "Harry", id: "28", score: 60 },
  { name: "Ian", id: "29", score: 70 },
  { name: "Julia", id: "30", score: 80 },
  { name: "Kevin", id: "31", score: 90 },
  { name: "Lily", id: "32", score: 100 },
  { name: "Matt", id: "33", score: 110 },
  { name: "Nancy", id: "34", score: 120 },
  { name: "Oliver", id: "35", score: 130 },
  { name: "Penny", id: "36", score: 140 },
  { name: "Quincy", id: "37", score: 150 },
  { name: "Rachel", id: "38", score: 160 },
  { name: "Sam", id: "39", score: 170 },
  { name: "Tina", id: "40", score: 180 },
  { name: "Uma", id: "41", score: 190 },
  { name: "Victor", id: "42", score: 200 },
  { name: "Wendy", id: "43", score: 210 },
  { name: "Xavier", id: "44", score: 220 },
  { name: "Yvonne", id: "45", score: 230 },
]

function App() {
  const { questions, answers, gameState } = GAME_DATA;
  const [socket, setSocket] = useState(null);
  const [hostId, setHostId] = useState(null);
  const [gamedata, setGamedata] = useState({});
  const [playerCount, setPlayerCount] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(null);
  const [currAnswer, setCurrAnswer] = useState(null);
  const isDisplayingAnswer = gamedata.gamestate === QuestionState.ANSWER;
  const roomName = 'gameRoom1';

  useEffect(() => {
      const newSocket = io('http://localhost:5000');
      // @ts-ignore
      setSocket(newSocket);

      newSocket.on('connect', () => {
        newSocket.emit('joinRoom', { roomName, nickname: "admin_webapp", isAdmin: true, clientId: null });
      });

      return () => {
        if (newSocket !== null) {
          newSocket.disconnect();
        }
      }
  }, []);

  useEffect(() => {
    if (socket) {
      // @ts-ignore
      socket.on('joinedRoom', (data) => {
        setHostId(data.id);
      });

      // @ts-ignore
      socket.on('gamedataUpdated', (newData) => {
        setGamedata(newData);
        console.log(newData);

        const builtQuestion = buildQuestionFromGamedata(newData);
        const builtAnswers = buildAnswersFromGamedata(newData, builtQuestion);
        setCurrQuestion(builtQuestion);
        setCurrAnswer(builtAnswers);
        console.log(builtAnswers);
      });
      // @ts-ignore
      socket.on('playerCountUpdated', (count) => setPlayerCount(count));
    }

    // Cleanup on component unmount
    return () => {
      if (socket !== null) {
        // @ts-ignore
        socket.disconnect();
      }
    }
  }, [socket]);

  return (
    <div className="App">
      <header className="App-header">
        {
          gamedata.gamestate === QuestionState.HALFTIME || gamedata.gamestate === QuestionState.GAME_END ?
            <IntermissionScores users={buildUsersFromGamedata(gamedata)} /> :
            <>
            {
              currQuestion !== null &&
                <Grid container justifyContent="center" alignItems="center" spacing={4}>
                  <Grid item xs={8}>
                    <QuestionDisplay
                      question={currQuestion}
                      answers={currAnswer}
                      displayAnswer={isDisplayingAnswer}
                    />
                  </Grid>
                  <Grid item>
                    <ScoreDisplay
                      playerCount={playerCount}
                      question={currQuestion}
                      answers={currAnswer}
                      displayAnswer={isDisplayingAnswer}
                      correctAnswer={10}
                    />
                  </Grid>
                </Grid>
            }
            {
              !isDisplayingAnswer && gamedata.shouldDisplayTimer &&
                <Grid justifyContent="center" alignItems="center" spacing={4} width={"100%"} style={{ paddingLeft: "100px" }}>
                  <GameTimer initialSeconds={60} isTimerVisible={true} />
                </Grid>
            }
          </>
        }
      </header>
    </div>
  );
}

export default App;

