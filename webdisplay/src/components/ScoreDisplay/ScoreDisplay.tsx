import React from 'react';
import { Answer, Question, QuestionType } from '../interfaces';
import DisplayPointTotals from './AnswerDisplay/DisplayPointTotals';
import PotentialPointsMultipleChoice from './PotentialPoints/PotentialPointsMultipleChoice';
import PotentialPointsNumeric from './PotentialPoints/PotentialPointsNumeric';
import { DisplayFinalPointTotals } from './AnswerDisplay/DisplayFinalPointTotals';

interface ScoreDisplayProps {
  playerCount: number;
  question: Question;
  answers: Answer[];
  correctAnswer: any;
  displayAnswer: boolean;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({playerCount, question, answers, correctAnswer, displayAnswer}) => {
  const renderScores = () => {
    switch (question.type) {
      case QuestionType.NUMERIC:
        return <DisplayPointTotals answers={answers} questionType={QuestionType.NUMERIC}/>;
      case QuestionType.MULTIPLE_CHOICE:
        return <DisplayPointTotals answers={answers} questionType={QuestionType.MULTIPLE_CHOICE}/>;
      default:
        return <>No question selected</>;
    }
  };

  const generateNumericPointScale = (): number[] => {
    const output: number[] = [];
    for (let i = 0; i < playerCount; i++) {
      i === 0 ? output.push(1000) :output.push(Math.max(1000 - (i * 100) - 100, 0));
    }
    return output;
  }

  const renderPotentialPoints = () => {
    switch (question.type) {
      case QuestionType.NUMERIC:
        // @ts-ignore
        if (question?.questionSubtype === "final") {
          return <DisplayFinalPointTotals playerCount={playerCount}/>;
        } else {
          return <PotentialPointsNumeric pointScale={generateNumericPointScale()}/>;
        }
      case QuestionType.MULTIPLE_CHOICE:
        return <PotentialPointsMultipleChoice pointsForRightAnswer={300} pointsForWrongAnswer={0} />;
      case QuestionType.FINAL:
        return <DisplayFinalPointTotals playerCount={playerCount}/>;
      default:
        return <></>;
    }
  };

  return <>
    {
      displayAnswer ?
        renderScores() :
        renderPotentialPoints()
    }
  </>;
};

export default ScoreDisplay;

