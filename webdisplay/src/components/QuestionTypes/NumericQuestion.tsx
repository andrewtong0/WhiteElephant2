import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Answer, Question, QuestionState } from '../interfaces';
import { motion } from 'motion/react';
import ColouredBackground from '../ColouredBackground';

export interface NumericQuestionProps {
  question: Question;
  questionState: QuestionState;
  answers: Answer[];
}

const ANSWER_DISPLAY_DELAY = 1;
const CORRECT_ANSWER_DISPLAY_DELAY = 3;

const lineCapStyling = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: 'black',
  marginLeft: 10,
  marginRight: 10,
}

export default function NumericQuestion(props: NumericQuestionProps) {
  const { question, questionState, answers } = props;
  const { questionText, answer } = question;

  useEffect(() => {
    // Sorts answers based on numeric values
    const sortAnswers = () => {
      const numericAnswers = answers.filter(answer => typeof answer.answerValue === 'number');
      return numericAnswers.sort((a, b) => (typeof a.answerValue === 'number' && typeof b.answerValue === 'number' ? a.answerValue - b.answerValue : 0));
    }
    sortAnswers();
  }, [answers]);


  // TODO: @Andrew normalize the x values

  const renderAnswers = (): React.ReactElement[] => {
    return answers.map((answer, index) => {
      const val = answer.answerValue as number;
      const x = val * 100;
      return (
        <motion.div
          key={answer.answerValue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [0, 1.4, 1] }}
          transition={{ duration: 0.3, delay: ANSWER_DISPLAY_DELAY + index * 0.1, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: x,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ width: 25, height: 25, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '50%' }} />
        </motion.div>
      );
    });
  }

  // TODO: @Andrew make it so that if correctAnswer is null then set display to none, that way the animation only plays and displays if we provide an answer
  const renderCorrectAnswer = () => {
    const correctAnswer = answer as number;
    const correctAnswerX = correctAnswer * 100;
    return (
      <motion.div
        key={correctAnswer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: CORRECT_ANSWER_DISPLAY_DELAY }}
        style={{
          position: 'absolute',
          left: correctAnswerX,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 30 }}
          transition={{ duration: 0.3, delay: CORRECT_ANSWER_DISPLAY_DELAY }}
          style={{
            width: 8,
            backgroundColor: 'black',
          }}
        />
        <Typography variant="h5">{correctAnswer}</Typography>
      </motion.div>
    );
  }

  return (<>
    <ColouredBackground gradient={question.backgroundColor}>
      <Typography variant="h2" align="center">
        { questionText }
      </Typography>
    </ColouredBackground>

    <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
      { renderAnswers() }
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        style={lineCapStyling}
      />
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: window.innerWidth * 0.9 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          height: 10,
          backgroundColor: 'black',
          borderRadius: 30,
        }}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
        style={lineCapStyling}
      />
      { renderCorrectAnswer() }
    </Box>
  </>);
}