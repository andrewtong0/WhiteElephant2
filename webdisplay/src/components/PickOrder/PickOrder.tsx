import React from 'react';
import { Box, Typography } from '@mui/material';

interface PickOrderProps {
  gamestate: any;
}

const PickOrder: React.FC<PickOrderProps> = ({ gamestate }) => {
  const { pickOrder, selectOrder } = gamestate.positions;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Pick Order
      </Typography>
      <ul>
        {pickOrder.map((player: any, index: number) => (
          <li key={index}>
            {player.nickname} (Score: {player.score})
          </li>
        ))}
      </ul>

      <Typography variant="h6" gutterBottom>
        Selected Order
      </Typography>
      <ul>
        {selectOrder.map((selection: any, index: number) => (
          <li key={index}>
            {selection.nickname} picked position {selection.position}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default PickOrder;
