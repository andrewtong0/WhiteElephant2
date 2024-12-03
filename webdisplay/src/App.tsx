import React from 'react';
import './App.css';
import { QuestionDisplay } from './components/QuestionDisplay/QuestionDisplay';
import { QuestionState, QuestionType } from './components/interfaces';
import AnswerDisplay from './components/AnswerDisplay/DisplayAnswers';

const SAMPLE_ANSWERS = [
  { answerValue: 10, type: QuestionType.NUMERIC, user: { name: "Steve", id: "15", score: 0 }, pointsGained: 950, placement: 1 },
  { answerValue: 10, type: QuestionType.NUMERIC, user: { name: "Jack", id: "20", score: 0 }, pointsGained: 900, placement: 2 },
  { answerValue: 9, type: QuestionType.NUMERIC, user: { name: "Mike", id: "9", score: 0 }, pointsGained: 850, placement: 3 },
  { answerValue: 9, type: QuestionType.NUMERIC, user: { name: "Ian", id: "19", score: 0 }, pointsGained: 800, placement: 4 },
  { answerValue: 8, type: QuestionType.NUMERIC, user: { name: "Kevin", id: "7", score: 0 }, pointsGained: 800, placement: 4 },
  { answerValue: 8, type: QuestionType.NUMERIC, user: { name: "Harry", id: "18", score: 0 }, pointsGained: 700, placement: 6 },
  { answerValue: 7, type: QuestionType.NUMERIC, user: { name: "Oliver", id: "11", score: 0 }, pointsGained: 650, placement: 7 },
  { answerValue: 7, type: QuestionType.NUMERIC, user: { name: "George", id: "17", score: 0 }, pointsGained: 600, placement: 8 },
  { answerValue: 6, type: QuestionType.NUMERIC, user: { name: "Quinn", id: "13", score: 0 }, pointsGained: 550, placement: 9 },
  { answerValue: 6, type: QuestionType.NUMERIC, user: { name: "Frank", id: "16", score: 0 }, pointsGained: 500, placement: 10 },
  { answerValue: 5, type: QuestionType.NUMERIC, user: { name: "Ethan", id: "5", score: 0 }, pointsGained: 450, placement: 11 },
  { answerValue: 5, type: QuestionType.NUMERIC, user: { name: "John", id: "6", score: 0 }, pointsGained: 400, placement: 12 },
  { answerValue: 4, type: QuestionType.NUMERIC, user: { name: "David", id: "4", score: 0 }, pointsGained: 350, placement: 13 },
  { answerValue: 4, type: QuestionType.NUMERIC, user: { name: "Paul", id: "12", score: 0 }, pointsGained: 300, placement: 14 },
  { answerValue: 3, type: QuestionType.NUMERIC, user: { name: "Chris", id: "3", score: 0 }, pointsGained: 250, placement: 15 },
  { answerValue: 3, type: QuestionType.NUMERIC, user: { name: "Larry", id: "8", score: 0 }, pointsGained: 200, placement: 16 },
  { answerValue: 2, type: QuestionType.NUMERIC, user: { name: "Brock", id: "2", score: 0 }, pointsGained: 150, placement: 17 },
  { answerValue: 2, type: QuestionType.NUMERIC, user: { name: "Ryan", id: "14", score: 0 }, pointsGained: 100, placement: 18 },
  { answerValue: 1, type: QuestionType.NUMERIC, user: { name: "Andrew", id: "1", score: 0 }, pointsGained: 50, placement: 19 },
  { answerValue: 1, type: QuestionType.NUMERIC, user: { name: "Nick", id: "10", score: 0 }, pointsGained: 0, placement: 20 },
]

const SAMPLE_QUESTION = {
  questionText: "Question 1",
  answer: 5,
  type: QuestionType.NUMERIC,
  backgroundColor: {
    colour1: "linear-gradient(to top, red, blue)",
    colour2: "linear-gradient(to right, #5500ff, #00ff55)",
    blendingMode: "overlay",
  },
  upperLimit: 10,
  lowerLimit: 0,
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <QuestionDisplay
          question={SAMPLE_QUESTION}
          questionState={QuestionState.ANSWER}
          answers={SAMPLE_ANSWERS}
        /> */}
        <AnswerDisplay
          question={{
            questionText: "Question 1",
            answer: 5,
            type: QuestionType.NUMERIC,
            backgroundColor: {
              colour1: "linear-gradient(to top, red, blue)",
              colour2: "linear-gradient(to right, #5500ff, #00ff55)",
              blendingMode: "overlay",
            },
            upperLimit: 10,
            lowerLimit: 0,
          }}
          answers={SAMPLE_ANSWERS}
          correctAnswer={10}
        />
      </header>
    </div>
  );
}

export default App;
