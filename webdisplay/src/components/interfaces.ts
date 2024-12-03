export enum QuestionType {
  NUMERIC = 'numeric',
  MULTIPLE_CHOICE = 'multiple_choice',
  SURVEY = 'survey',
}

export enum QuestionState {
  QUESTION = 'question',
  PRE_ANSWER = 'pre_answer',
  ANSWER = 'answer',
}

export interface GradientColour {
  colour: string;
}

export interface ColourGradient {
  colour1: GradientColour | string;
  colour2: GradientColour | string;
  blendingMode: 'original' | 'screen' | 'overlay' | 'difference';
}

export interface NumericQuestion {
  questionText: string;
  answer: number;
  upperLimit: number;
  lowerLimit: number;
  type: QuestionType.NUMERIC;
  backgroundColor: ColourGradient;
}

export interface NonNumericQuestion {
  questionText: string;
  answer: string;
  type: QuestionType.MULTIPLE_CHOICE | QuestionType.SURVEY;
  backgroundColor: ColourGradient;
}

export type Question = NumericQuestion | NonNumericQuestion;

export interface Answer {
  answerValue: string | number;
  pointsGained: number;
  placement: number;
  type: QuestionType;
  user: User;
}

export interface User {
  name: string;
  id: string;
  score: number;
}