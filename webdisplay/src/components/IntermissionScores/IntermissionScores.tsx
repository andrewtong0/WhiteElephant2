import React from 'react';
import { User } from '../interfaces';
import { Grid, Typography, Box } from '@mui/material';
import { PLACEMENT_PREFIXES } from '../constants';

interface IntermissionScoresProps {
  users: User[];
}

const removePadding = {
  padding: 0
}

const IntermissionScores: React.FC<IntermissionScoresProps> = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  const getScoreString = (score: number): string => {
    return `${score} points`;
  }

  return (
    <Grid container spacing={2} justifyContent="center" direction="column" alignItems="center">
      <Grid item>
        <Box key={sortedUsers[0].id} textAlign="center" margin={1}>
          <Typography variant="h2">🥇 {sortedUsers[0].name}</Typography>
          <Typography variant="h4">{getScoreString(sortedUsers[0].score)}</Typography>
        </Box>
      </Grid>
      <Grid item container justifyContent="center" spacing={4}>
        {sortedUsers.slice(1, 3).map((user, index) => (
          <Grid item>
            <Box key={user.id} textAlign="center" margin={1}>
              <Typography variant="h3">
                {index === 0 ? '🥈' : '🥉'} {user.name}
              </Typography>
              <Typography variant="h5">{getScoreString(user.score)}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid item container justifyContent="center" alignItems="center" alignContent="center">
        {sortedUsers.slice(3).map((user, index) => (
          <Grid item xs={2} container justifyContent="center" alignItems="center">
            <Box key={user.id} margin={1}>
              <Typography variant="h5">{PLACEMENT_PREFIXES[index + 4]} - {user.name}</Typography>
              <Typography variant="body1">{getScoreString(user.score)}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default IntermissionScores;
