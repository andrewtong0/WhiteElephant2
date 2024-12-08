import React from 'react';
import { Grid, Typography } from '@mui/material';
import { ANSWER_STATE, PLACEMENT_PREFIXES } from '../../constants';

interface PotentialPointScoreDisplayProps {
  points: number;
  status: string;
  index?: number;
}

const PotentialPointScoreDisplay: React.FC<PotentialPointScoreDisplayProps> = ({ points, status, index }) => {
  return (
    <Grid container item xs={12} justifyContent="center" alignItems="center">
      <div
        style={{
          background:
            status === ANSWER_STATE.CORRECT
              ? 'linear-gradient(0deg, #00ff00, #44ff44, #77ff77, #aaffaa, #ccffcc)'
              : status === ANSWER_STATE.INCORRECT
              ? 'linear-gradient(0deg, #ff0000, #ff3333, #ff6666, #ff9999, #ffcccc)'
              : 'linear-gradient(0deg, #ffff00, #ffff33, #ffff66, #ffff99, #ffffcc)',
          borderRadius: '20px',
          padding: '5px 10px',
          color: 'black',
          width: '200px',
          fontWeight: 700,
          marginTop: '2px',
          fontSize: ANSWER_STATE.NEUTRAL ? '20px' : '40px',
        }}
      >
        { status === ANSWER_STATE.NEUTRAL && index !== undefined && <>{PLACEMENT_PREFIXES[index]}</> } +{points}
      </div>
    </Grid>
  );
};

export default PotentialPointScoreDisplay;
