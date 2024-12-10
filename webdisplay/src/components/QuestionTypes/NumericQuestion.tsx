import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Answer, NumericQuestionType, QuestionState } from '../interfaces';
import { motion } from 'motion/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface NumericQuestionProps {
  question: NumericQuestionType;
  answers: Answer[];
  displayAnswer: boolean;
}

const ANSWER_DISPLAY_DELAY = 1;
const CORRECT_ANSWER_DISPLAY_DELAY = 3;

const CIRCLE_SIZE = 25;

const lineCapStyling = {
  width: 40,
  height: 40,
  borderRadius: '100px',
  backgroundColor: 'white',
  marginLeft: 10,
  marginRight: 10,
};

export default function NumericQuestion(props: NumericQuestionProps) {
  const { question, answers, displayAnswer } = props;
  const { questionText, answer } = question;

  const calculateValAsPercentage = (answerVal: number) => {
    const upperBound = question.upperLimit;
    const lowerBound = question.lowerLimit;
    return ((answerVal - lowerBound) / (upperBound - lowerBound)) * 100;
  };

  const subtractLeftElements = () => {
    return lineCapStyling.width + lineCapStyling.marginLeft;
  }

  const subtractLeftElementsForAnswer = () => {
    return lineCapStyling.width + lineCapStyling.marginLeft + lineCapStyling.marginRight;
  }

  useEffect(() => {
    const sortAnswers = () => {
      const numericAnswers = answers.filter(answer => typeof answer.answerValue === 'number');
      return numericAnswers.sort((a, b) => (a.answerValue as number) - (b.answerValue as number));
    };
    sortAnswers();
  }, [answers]);

  const renderUpperAndLowerLimits = (): React.ReactElement[] => {
    return [
      <motion.div
        key={question.lowerLimit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        style={{
          position: 'absolute',
          left: `calc(2%)`, // Adjust this value to center based on text width
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 100,
        }}
      >
        <Typography variant="h5" style={{ transform: 'translateX(-50%)', fontFamily: "Rubik" }}>{question.lowerLimit}</Typography>
      </motion.div>,
      <motion.div
        key={question.upperLimit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        style={{
          position: 'absolute',
          left: `calc(97.9%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 100,
        }}
      >
        <Typography variant="h5" style={{ transform: 'translateX(-50%)', fontFamily: "Rubik" }}>{question.upperLimit}</Typography>
      </motion.div>,
    ]
  }

  const renderAnswers = (): React.ReactElement[] => {
    return answers.map((userAnswer, index) => {
      const val = userAnswer.answerValue as number;
      return (
        <motion.div
          key={userAnswer.answerValue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [0, 1.4, 1] }}
          transition={{ duration: 0.3, delay: ANSWER_DISPLAY_DELAY + index * 0.1 }}
          style={{
            position: 'absolute',
            left: `calc(${calculateValAsPercentage(val) * 0.91}% + ${subtractLeftElements()}px)`,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE, backgroundColor: 'rgba(255, 0, 0, 0.4)', borderRadius: '50%' }} />
        </motion.div>
      );
    });
  };

  const renderCorrectAnswer = () => {
    const correctAnswer = answer as number;
    const LINE_WIDTH = 8;

    const renderPulseWithDelay = (val: number, delay: number) => {
      return (
        <motion.div
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 2, 2.2] }}
          transition={{ duration: 0.5, delay: CORRECT_ANSWER_DISPLAY_DELAY + delay }}
          style={{
            position: 'absolute',
            left: `calc(${calculateValAsPercentage(val) * 0.91}% + ${subtractLeftElements()}px)`,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE, backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '50%' }} />
        </motion.div>
      )
    }

    return (
      <>
        {renderPulseWithDelay(correctAnswer, answers.length * 0.1)}
        <motion.div
          key={correctAnswer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: CORRECT_ANSWER_DISPLAY_DELAY }}
          style={{
            position: 'absolute',
            left: `calc(${calculateValAsPercentage(correctAnswer) * 0.91}% + ${subtractLeftElements()}px + ${CIRCLE_SIZE / 2}px - ${LINE_WIDTH / 8}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 100,
            transform: `translateX(-50%)`,
          }}
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 30 }}
            transition={{ duration: 0.3, delay: CORRECT_ANSWER_DISPLAY_DELAY }}
            style={{
              width: LINE_WIDTH,
              backgroundColor: 'white',
            }}
          />
          <Typography variant="h5" style={{ fontFamily: "Rubik" }}>{correctAnswer}</Typography>
        </motion.div>
      </>
    );
  };

  return (
    <>
      {
        displayAnswer ?
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Box display="flex" alignItems="center" style={{ position: 'relative' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                style={lineCapStyling}
              />
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'calc(100% - 100px)' }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{
                  height: 10,
                  backgroundColor: 'white',
                  borderRadius: 30,
                }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 }}
                style={lineCapStyling}
              />
              {renderAnswers()}
              {renderCorrectAnswer()}
              {renderUpperAndLowerLimits()}
            </Box>
          </motion.div> :
          <Grid container justifyContent="center" alignItems="center" spacing={4}>
            <motion.h2
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 2 }}
            >
              {question.lowerLimit}
              <ArrowBackIcon />
              <ArrowForwardIcon />
              {question.upperLimit}
            </motion.h2>
          </Grid>
      }
    </>
  );
}
