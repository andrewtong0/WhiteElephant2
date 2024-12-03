import React from 'react';
import { Answer, Question, QuestionType } from '../interfaces';
import NumericAnswerDisplay from './DisplayNumericAnswers';

interface AnswerDisplayProps {
  question: Question;
  answers: Answer[];
  correctAnswer: any;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({question, answers, correctAnswer}) => {
  const renderAnswers = () => {
    switch (question.type) {
      case QuestionType.NUMERIC:
        return <NumericAnswerDisplay
          answers={answers}
        />;
      default:
        return <>No question selected</>;
    }
  };

  return <>{renderAnswers()}</>;
};

export default AnswerDisplay;

