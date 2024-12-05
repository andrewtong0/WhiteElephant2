import React from 'react';
import { Answer } from '../interfaces';
import { Grid } from '@mui/material';
import { motion } from 'motion/react';

interface NumericAnswerDisplayProps {
  answers: Answer[];
}

const gridStyling = {
  borderRadius: "20px",
  padding: "0 20px 0 20px",
  fontFamily: "Trebuchet MS, sans-serif",
  color: "white",
  textShadow: "2px 2px 2px rgba(0,0,0,0.5)",
  marginBottom: "2px",
}

const NumericAnswerDisplay: React.FC<NumericAnswerDisplayProps> = ({ answers }) => {
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
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  style={{
                    ...gridStyling,
                    background: "radial-gradient(ellipse at top, #F7DC6F 0%, #F7DC6F 56%, #F2C464 56%, #F2C464 100%)"
                  }}
                >
                  <Grid item style={{ fontSize: "20px" }}>{answer.placement}</Grid>
                  <Grid item style={{ padding: "0 15px" }}>{answer.user.name}</Grid>
                  <Grid item>{answer.answerValue}</Grid>
                </Grid>
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
                transition={{ duration: 0.3, delay: index * 0.1 }}
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

export default NumericAnswerDisplay;

