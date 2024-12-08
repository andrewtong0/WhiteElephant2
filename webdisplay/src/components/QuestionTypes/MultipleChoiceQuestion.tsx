import React from 'react';
import { Grid, Button, Box } from '@mui/material';
import { Answer, MultipleChoiceQuestionType } from '../interfaces';
import { motion } from 'motion/react';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  answers: Answer[];
  displayAnswer: boolean;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  answers,
  displayAnswer,
}) => {
  const correctAnswerIndex = question.answer;
  return (
    <Grid container spacing={2}>
      {question.options.map((option, index) => (
        <Grid item xs={6} key={index}>
          <motion.div
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}
            animate={
              displayAnswer ?
                {
                  backgroundColor: index === correctAnswerIndex ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)',
                  opacity: [0, 1]
                } :
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.0)',
                  opacity: [0, 1]
                }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            style={{
              border: '2px solid white',
              borderRadius: '10px',
              padding: "80px",
            }}
          >
            {option}
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default MultipleChoiceQuestion;
