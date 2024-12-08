import React, { useEffect, useState } from 'react';
import { Button, Grid, Input, Slider, TextField } from '@mui/material';

interface AnswerInputProps {
  gamedata: any;
  handleSubmit: (newAnswer: any) => void;
}

const AnswerInput = ({ gamedata, handleSubmit }: AnswerInputProps) => {
  const { currQuestion } = gamedata;
  const [answer, setAnswer] = useState<number | string>(0);

  useEffect(() => {
    setAnswer("");
  }, [])

  const handleAnswerSubmit = () => {
    handleSubmit(answer);
  };

  return (
    <div>
      <h3>Submit Your Answer</h3>
      <div>Your Answer: {answer}</div>

      {currQuestion.questionType === 'multiple_choice' && (
        <MultipleChoiceQuestion
          answer={answer}
          setAnswer={setAnswer}
          handleSubmit={handleSubmit}
          options={currQuestion.potentialAnswers}
        />
      )}

      {currQuestion.questionType === 'numeric' && (
        <NumericQuestion gamedata={gamedata} answer={answer} setAnswer={setAnswer} />
      )}

      {currQuestion.questionType === 'survey' && (
        <NumericQuestion gamedata={gamedata} answer={answer} setAnswer={setAnswer} />
      )}

      {currQuestion.questionType === 'survey_question' && (
        <NumericQuestion gamedata={gamedata} answer={answer} setAnswer={setAnswer} />
      )}

      <button onClick={handleAnswerSubmit}>Submit Answer</button>
    </div>
  );
};

interface MultipleChoiceProps {
  options: string[];
  setAnswer: (value: string) => void;
  handleSubmit: (value: string) => void;
  answer: string | number;
}

const MultipleChoiceQuestion = ({
  options,
  setAnswer,
  handleSubmit,
}: MultipleChoiceProps) => (
  <>
    {options.map((option, index) => (
      <div key={index}>
        <Button
          onClick={() => {
            setAnswer(option);
            handleSubmit(option);
          }}
          variant="contained"
          fullWidth
        >
          {option}
        </Button>
      </div>
    ))}
  </>
);

interface NumericProps {
  gamedata: any;
  answer: number | string;
  setAnswer: (value: number) => void;
}

const NumericQuestion = ({ gamedata, answer, setAnswer }: NumericProps) => {
  const lowerBound = gamedata.currQuestion?.potentialAnswers?.start || 0;
  const upperBound = gamedata.currQuestion?.potentialAnswers?.end || 0;

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setAnswer(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (typeof answer === 'number') {
      if (answer < lowerBound) setAnswer(lowerBound);
      else if (answer > upperBound) setAnswer(upperBound);
    }
  };

  return (
    <div>
      <Slider
        value={typeof answer === 'number' ? answer : 0}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        min={lowerBound}
        max={upperBound}
      />
      <TextField
        value={answer}
        size="small"
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{
          step: 1,
          min: lowerBound,
          max: upperBound,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
    </div>
  );
};

export default AnswerInput;
