import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'motion/react';

interface PickOrderProps {
  gamestate: any;
  playerCount: number;
}

const PickOrder: React.FC<PickOrderProps> = ({ gamestate, playerCount }) => {
  const { pickOrder, selectOrder } = gamestate.positions;

  const pickOrderTestData = Array(20).fill(0).map((_, i) => ({ nickname: `Player ${i+1}`, id: `player_${i+1}` }));
  const selectOrderTestData = pickOrderTestData.slice().sort((a, b) => 0.5 - Math.random());
  if (!pickOrder || !selectOrder) {
    gamestate.positions = {
      pickOrder: pickOrderTestData,
      selectOrder: selectOrderTestData,
    }
  }

  const createSelectOrderDict = (selectOrder: { position: number, nickname: string }[]) => {
    const output: { [key: number]: string } = {};
    // TODO: @Andrew replace this playercount
    selectOrder.forEach((entry: { position: number, nickname: string }) => {
      output[entry.position] = entry.nickname;
    });
    return output;
  }

  const createPickOrderIcons = (): React.ReactElement[] => {
    const output = [];
    const selectOrderDict = createSelectOrderDict(selectOrder);
    for (let i = 0; i < pickOrderTestData.length; i++) {
      output.push(
        <Grid item xs={3}>
          <div
            style={{
              height: "50px",
              backgroundColor: selectOrderDict[i + 1] ? "#228cc9" : "#b02a2a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectOrderDict[i + 1] ? <Typography>{`${i + 1}`} - {selectOrderDict[i + 1]}</Typography> : <Typography>{`${i + 1}`}</Typography>}
          </div>
        </Grid>
      )
    }
    return output;
  }

  return (
    <Box>
      <Box
        sx={{
          position: 'fixed',
          top: 50,
          left: 50,
          right: 0,
          zIndex: 999,
        }}
      >
        <Grid container>
          {pickOrder.slice(gamestate?.positions?.pickIndex || 0, gamestate?.positions?.pickIndex + 5).map((player: any, index: number) => (

            <Grid item style={{ marginRight: "10px" }}>
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                key={gamestate?.positions?.pickIndex}
              >
                <div
                  style={{
                    backgroundColor: index === 0 ? '#228cc9' : '#2e4d5e',
                    borderRadius: 1,
                    padding: 10,
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    width: "300px",
                    marginRight: "10px",
                  }}
                >
                  {player.nickname}
                </div>
                <ArrowBackIcon />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      Current Pick Order
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {createPickOrderIcons()}
      </Grid>
    </Box>
  );
};

export default PickOrder;
