import React from 'react';
import { Answer, QuestionType } from '../../interfaces';
import { motion } from 'motion/react';
import { Grid } from '@mui/material';
import { PLACEMENT_PREFIXES } from '../../constants';

interface DisplayFinalPointTotalsProps {
  playerCount: number
}

export const DisplayFinalPointTotals: React.FC<DisplayFinalPointTotalsProps> = ({ playerCount }) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: "-15%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            {`Placements ${PLACEMENT_PREFIXES[0]} to ${PLACEMENT_PREFIXES[Math.max(Math.floor(playerCount / 2) - 1, 0)]}`}
          </Grid>
          <Grid item
            style={{
              background: 'linear-gradient(0deg, #00ff00, #44ff44, #77ff77, #aaffaa, #ccffcc)',
              borderRadius: '20px',
              padding: '5px 10px',
              color: 'black',
              width: '200px',
              fontWeight: 700,
              marginTop: '10px',
              fontSize: '20px',
            }}
          >
            2x Wagered Points
          </Grid>
        </Grid>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: "-15%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        style={{ marginTop: "20px" }}
      >
        <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
            {`Placements ${PLACEMENT_PREFIXES[Math.floor(playerCount / 2)]} to ${PLACEMENT_PREFIXES[playerCount - 1]}`}
          </Grid>
          <Grid item
            style={{
              background: 'linear-gradient(0deg, #ff0000, #ff3333, #ff6666, #ff9999, #ffcccc)',
              borderRadius: '20px',
              padding: '5px 10px',
              color: 'black',
              width: '200px',
              fontWeight: 700,
              marginTop: '10px',
              fontSize: '20px',
            }}
          >
            Lose All Wagered Points
          </Grid>
        </Grid>
      </motion.div>
    </div>
  )
}
