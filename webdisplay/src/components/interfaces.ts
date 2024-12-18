export enum QuestionType {
  NUMERIC = 'numeric',
  MULTIPLE_CHOICE = 'multiple_choice',
  SURVEY = 'survey',
  FINAL = 'final',
}

export enum QuestionState {
  LOBBY = 'lobby',
  QUESTION = 'question',
  PRE_ANSWER = 'pre_answer',
  ANSWER = 'answer',
  HALFTIME = 'halftime',
  GAME_END = 'game_end',
  SELECT_POSITIONS = 'select_positions',
  WAIT = 'wait',
}

export interface GradientColour {
  colour: string;
}

export interface ColourGradient {
  colour1: GradientColour | string;
  colour2: GradientColour | string;
  blendingMode: string;
}

export interface NumericQuestionType {
  questionText: string;
  answer: number;
  upperLimit: number;
  lowerLimit: number;
  type: string;
  backgroundColor: ColourGradient;
}

export interface NonNumericQuestionType {
  questionText: string;
  answer: string;
  type: string;
  backgroundColor: ColourGradient;
}

export interface MultipleChoiceQuestionType {
  questionText: string;
  answer: number;
  type: string;
  backgroundColor: ColourGradient;
  options: string[];
}

export type Question = NumericQuestionType | MultipleChoiceQuestionType | NonNumericQuestionType;

export interface Answer {
  answerValue: string | number;
  pointsGained: number;
  placement: number;
  type: QuestionType | string;
  user: User;
}

export interface User {
  name: string;
  id: string;
  score: number;
}