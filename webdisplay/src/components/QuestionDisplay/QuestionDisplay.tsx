import React from 'react';
import { Question, QuestionType, QuestionState, Answer } from '../interfaces';
import NumericQuestion from '../QuestionTypes/NumericQuestion';

interface QuestionDisplayProps {
  question: Question;
  questionState: QuestionState;
  answers: Answer[];
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = (props: QuestionDisplayProps) => {
  const { question, questionState, answers } = props;

  const renderQuestionComponent = () => {
    switch (question.type) {
      case QuestionType.NUMERIC:
        return <NumericQuestion question={question} questionState={questionState} answers={answers} />;
      default:
        return <>No question selected</>;
    }
  }

  return (
    <div>
      {renderQuestionComponent()}
    </div>
  );
};
