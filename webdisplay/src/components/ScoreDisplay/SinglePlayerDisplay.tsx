import { Grid } from '@mui/material';
import React from 'react';
import { gridStyling } from './styles';
import { Answer, QuestionType } from '../interfaces';

interface SinglePlayerDisplayProps {
  answer: Answer;
  questionType: QuestionType;
}

const SinglePlayerDisplay: React.FC<SinglePlayerDisplayProps> = ({ answer, questionType }) => {
    return (
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        style={{
          ...gridStyling,
          background: questionType === QuestionType.MULTIPLE_CHOICE
            ? answer.pointsGained === 0
                ? "radial-gradient(ellipse at top, #E57373 0%, #E57373 56%, #F44336 56%, #F44336 100%)"
                : "radial-gradient(ellipse at top, #42f5c5 0%, #4ae07a 56%, #37c464 56%, #30ab57 100%)"
            : "radial-gradient(ellipse at top, #F7DC6F 0%, #F7DC6F 56%, #F2C464 56%, #F2C464 100%)",
          width: "100%",
        }}
      >
        {
          questionType === QuestionType.NUMERIC &&
            <Grid item style={{ fontSize: "20px" }}>#{answer.placement}</Grid>
        }
        <Grid item style={{ padding: "0 15px" }}>{answer.user.name}</Grid>
        <Grid item style={{ fontSize: "20px" }}>{answer.answerValue}</Grid>
      </Grid>
  );
};

export default SinglePlayerDisplay;