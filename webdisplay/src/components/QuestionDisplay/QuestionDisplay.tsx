import React from 'react';
import { Question, QuestionType, QuestionState, Answer, NumericQuestionType, MultipleChoiceQuestionType } from '../interfaces';
import NumericQuestion from '../QuestionTypes/NumericQuestion';
import MultipleChoiceQuestion from '../QuestionTypes/MultipleChoiceQuestion';
import { Typography } from '@mui/material';
import { motion } from 'motion/react';
import GameTimer from '../GameTimer/GameTimer';

interface QuestionDisplayProps {
  question: Question;
  answers: Answer[];
  displayAnswer: boolean;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = (props: QuestionDisplayProps) => {
  const { question, answers, displayAnswer } = props;

  const renderQuestionComponent = () => {
    switch (question.type) {
      case QuestionType.NUMERIC:
        return <NumericQuestion
          question={question as NumericQuestionType}
          answers={answers}
          displayAnswer={displayAnswer}
        />;
      case QuestionType.MULTIPLE_CHOICE:
        return <MultipleChoiceQuestion
          question={question as MultipleChoiceQuestionType}
          answers={answers}
          displayAnswer={displayAnswer} />
      default:
        return <>No question selected</>;
    }
  }

  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <motion.div
          animate={{ scale: [0, 1.1, 1] }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Typography variant="h2" align="center">
            {question.questionText}
          </Typography>
        </motion.div>
      </div>
      {renderQuestionComponent()}
    </div>
  );
};
