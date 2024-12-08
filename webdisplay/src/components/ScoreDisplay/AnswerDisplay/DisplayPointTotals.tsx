import React from 'react';
import { Answer, QuestionType } from '../../interfaces';
import { Grid } from '@mui/material';
import { motion } from 'motion/react';
import { gridStyling } from '../styles';
import SinglePlayerDisplay from '../SinglePlayerDisplay';

interface DisplayPointTotalsProps {
  answers: Answer[];
  questionType: QuestionType;
}

const DISPLAY_POINT_TOITALS_DELAY = 2;

const DisplayPointTotals: React.FC<DisplayPointTotalsProps> = ({ answers, questionType }) => {
  const renderAnswers = () => {
    const sortedAnswers = [...answers].sort((a, b) => b.pointsGained - a.pointsGained);
    return (
      <Grid container direction="row" spacing={0.25}>
        <Grid item>
          <Grid container direction="column">
            {sortedAnswers.map((answer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: "-15%" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + DISPLAY_POINT_TOITALS_DELAY }}
              >
                <SinglePlayerDisplay answer={answer} questionType={ questionType } />
              </motion.div>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={0.25}>
            {sortedAnswers.map((answer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: "-15%" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + DISPLAY_POINT_TOITALS_DELAY }}
              >
                <Grid
                  container
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  style={{
                    ...gridStyling,
                  }}
                >
                  <Grid item>+{answer.pointsGained}</Grid>
                </Grid>
              </motion.div>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      {renderAnswers()}
    </div>
  );
};

export default DisplayPointTotals;

