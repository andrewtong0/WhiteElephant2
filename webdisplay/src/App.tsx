import React from 'react';
import './App.css';
import { QuestionDisplay } from './components/QuestionDisplay/QuestionDisplay';
import { QuestionState, QuestionType } from './components/interfaces';
import { Grid } from '@mui/material';
import ScoreDisplay from './components/ScoreDisplay/ScoreDisplay';

const SAMPLE_ANSWERS = [
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

const SAMPLE_QUESTION = {
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
  { answerValue: 25000, type: QuestionType.NUMERIC, user: { name: "Wendy", id: "2", score: 0 }, pointsGained: 150, placement: 17 },
  { answerValue: 10000, type: QuestionType.NUMERIC, user: { name: "Alex", id: "14", score: 0 }, pointsGained: 100, placement: 18 },
  { answerValue: 1000, type: QuestionType.NUMERIC, user: { name: "Andrew", id: "1", score: 0 }, pointsGained: 50, placement: 19 },
  { answerValue: 0, type: QuestionType.NUMERIC, user: { name: "Thomas", id: "10", score: 0 }, pointsGained: 0, placement: 20 },
  { answerValue: 0, type: QuestionType.NUMERIC, user: { name: "Diane", id: "10", score: 0 }, pointsGained: 0, placement: 21 },
]

const SAMPLE_QUESTION_2 = {
  questionText: "Question 2",
  answer: 1000000,
  type: QuestionType.NUMERIC,
  backgroundColor: {
    colour1: "linear-gradient(to top, red, blue)",
    colour2: "linear-gradient(to right, #5500ff, #00ff55)",
    blendingMode: "overlay",
  },
  upperLimit: 1000000,
  lowerLimit: 0,
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          <Grid item xs={9}>
            <QuestionDisplay
              question={SAMPLE_QUESTION}
              questionState={QuestionState.ANSWER}
              answers={SAMPLE_ANSWERS}
              displayAnswer={true}
            />
          </Grid>
          <Grid item>
            <ScoreDisplay
              question={SAMPLE_QUESTION}
              answers={SAMPLE_ANSWERS}
              correctAnswer={10}
            />
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;

