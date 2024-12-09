import { Answer, Question, QuestionType, User } from "./components/interfaces";

const backgroundColor = {
  colour1: "",
  colour2: "",
  blendingMode: "multiply"
};

export const buildQuestionFromGamedata = (gamedata: any): Question | null => {
  if (gamedata === null || gamedata.currQuestion === null || gamedata.currQuestion === undefined) return null;

  const questionText = gamedata.currQuestion.questionText;
  const type = gamedata.currQuestion.questionType;
  const answer = gamedata.currQuestion.answer;
  if (type === QuestionType.NUMERIC) {
    return {
      questionText,
      answer,
      type,
      backgroundColor: backgroundColor,
      lowerLimit: gamedata.currQuestion.potentialAnswers.start,
      upperLimit: gamedata.currQuestion.potentialAnswers.end,
      // @ts-ignore
      questionSubtype: gamedata.currQuestion?.questionSubtype,
    };
  } else if (type === QuestionType.MULTIPLE_CHOICE) {
    return {
      questionText,
      answer,
      type,
      backgroundColor,
      options: gamedata.currQuestion.potentialAnswers,
    };
  } else {
    return {
      questionText,
      type,
      answer,
      backgroundColor,
    };
  }
};

export const buildAnswersFromGamedata = (
  gamedata: any,
  currQuestion: Question,
): Answer[] => {
  if (gamedata === null || gamedata.questionData === null || gamedata.questionData === undefined) return [];
  const players: User[] = buildUsersFromGamedata(gamedata);
  const questionNumber = gamedata.questionNum;

  const questionKey = `question_${questionNumber}`;
  const answersObj: any = gamedata.questionData[questionKey]?.answers;
  if (!answersObj || !gamedata.questionPointGain || Object.keys(gamedata.questionPointGain).length === 0) return [];

  const defaultUser: User = {
    id: "",
    name: "",
    score: 0,
  };

  return Object.keys(answersObj).map((clientId) => {
    const answerValue: string | number = answersObj[clientId];
    const user: User = players.find((player) => player.id === clientId) || defaultUser;
    const pointsGained: number = gamedata.questionPointGain[clientId].questionPointGain || 0
    const placement: number = gamedata.questionPointGain[clientId].placement || 0
    const type = currQuestion.type;
    return {
      answerValue,
      pointsGained,
      placement,
      type,
      user,
    };
  });
}

export const buildUsersFromGamedata = (gamedata: any): User[] => {
  if (gamedata.players === null || gamedata.players === undefined) return []
  const players: any[] = Object.keys(gamedata?.players)?.filter((clientId: string) => {
    return !gamedata.players[clientId].isAdmin
  }) || [];
  return players.map((clientId) => {
    const player = gamedata.players[clientId];
    return {
      id: clientId,
      name: player.nickname,
      score: player.score,
    };
  });
}