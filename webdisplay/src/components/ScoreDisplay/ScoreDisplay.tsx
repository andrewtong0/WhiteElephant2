import React from 'react';
import { Answer, Question, QuestionType } from '../interfaces';
import NumericAnswerDisplay from './DisplayNumericAnswers';

interface ScoreDisplayProps {
  question: Question;
  answers: Answer[];
  correctAnswer: any;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({question, answers, correctAnswer}) => {
  const renderAnswers = () => {
    switch (question.type) {
      case QuestionType.NUMERIC:
        return <NumericAnswerDisplay answers={answers} />;
      default:
        return <>No question selected</>;
    }
  };

  return <>{renderAnswers()}</>;
};

export default ScoreDisplay;

