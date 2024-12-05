import React from 'react';
import { Question, QuestionType, QuestionState, Answer, NumericQuestionType } from '../interfaces';
import NumericQuestion from '../QuestionTypes/NumericQuestion';

interface QuestionDisplayProps {
  question: Question;
  questionState: QuestionState;
  answers: Answer[];
  displayAnswer: boolean;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = (props: QuestionDisplayProps) => {
  const { question, questionState, answers, displayAnswer } = props;

  const renderQuestionComponent = () => {
    switch (question.type) {
      case QuestionType.NUMERIC:
        return <NumericQuestion
          question={question as NumericQuestionType}
          questionState={questionState}
          answers={answers}
          displayAnswer={displayAnswer}
        />;
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
