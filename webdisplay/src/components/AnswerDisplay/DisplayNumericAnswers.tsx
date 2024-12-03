import React from 'react';
import { Answer } from '../interfaces';
import { render } from '@testing-library/react';
import { Grid } from '@mui/material';

interface NumericAnswerDisplayProps {
  answers: Answer[];
}

const NumericAnswerDisplay: React.FC<NumericAnswerDisplayProps> = ({ answers }) => {
  const numColumns = Math.ceil(answers.length / 10);

  const renderAnswers = () => {
    const sortedAnswers = [...answers].sort((a, b) => b.pointsGained - a.pointsGained);
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push(
        <Grid item>
          <Grid container direction="column" spacing={2} key={i} style={{ marginTop: `${30*i}px` }}>
            {generateColumn(sortedAnswers, i)}
          </Grid>
        </Grid>
      );
    }
    return <Grid container spacing={4}>
      {columns}
    </Grid>
  }

  const generateColumn = (sortedAnswers: Answer[], columnIndex: number) => {
    const answersInColumn = sortedAnswers.filter((answer, index) => index % numColumns === columnIndex);
    return answersInColumn.map((answer, index) => (
      <Grid item key={index}>
        <Grid container justifyContent={"space-between"} alignItems={"center"} spacing={5}>
          <Grid item style={{ fontSize: "20px" }}>{answer.placement}</Grid>
          <Grid item>{answer.user.name}</Grid>
          <Grid item>{answer.pointsGained}</Grid>
        </Grid>
      </Grid>
    ));
  }

  return (
    <div>
      {renderAnswers()}
    </div>
  );
};

export default NumericAnswerDisplay;

