import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import PotentialPointScoreDisplay from './PotentialPointScoreDisplay';
import { ANSWER_STATE } from '../../constants';

interface PotentialPointsNumericProps {
  pointScale: number[];
}

const PotentialPointsNumeric: React.FC<PotentialPointsNumericProps> = ({
  pointScale,
}) => {
  const [sortedPoints, setSortedPoints] = useState<number[]>([]);

  useEffect(() => {
    setSortedPoints(pointScale.sort((a, b) => b - a));
  }, [pointScale]);


  const renderPointScale = () => {
    return (
      <div>
        {sortedPoints.map((point, index) =>
          <PotentialPointScoreDisplay
            key={index}
            points={point}
            status={ANSWER_STATE.NEUTRAL}
            index={index}
          />
        )}
      </div>
    );
  };

  return (
    <Grid container item xs={12} justifyContent="center" alignItems="center">
      <div>
        Points awarded by placement
        {renderPointScale()}
      </div>
    </Grid>
  );
};

export default PotentialPointsNumeric;

