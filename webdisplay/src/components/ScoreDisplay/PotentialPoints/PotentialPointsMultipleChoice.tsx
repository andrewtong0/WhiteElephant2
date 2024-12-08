import React from 'react';
import { Grid, Typography } from '@mui/material';
import PotentialPointScoreDisplay from './PotentialPointScoreDisplay';
import { ANSWER_STATE } from '../../constants';

interface PotentialPointsMultipleChoiceProps {
  pointsForRightAnswer: number;
  pointsForWrongAnswer: number;
}

const PotentialPointsMultipleChoice: React.FC<PotentialPointsMultipleChoiceProps> = ({
  pointsForRightAnswer,
  pointsForWrongAnswer,
}) => {
    return (
      <div>
        <div>
          <Typography variant="h6" gutterBottom>
            Points awarded for correct answers
            <PotentialPointScoreDisplay points={pointsForRightAnswer} status={ANSWER_STATE.CORRECT} />
          </Typography>
        </div>
        <div style={{ marginTop: '50px' }}>
          <Typography variant="h6" gutterBottom>
            Points awarded for incorrect answers
            <PotentialPointScoreDisplay points={pointsForWrongAnswer} status={ANSWER_STATE.INCORRECT} />
          </Typography>
        </div>
      </div>
  );
};

export default PotentialPointsMultipleChoice;
