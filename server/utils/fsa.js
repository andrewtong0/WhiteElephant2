// Define the states and their transitions
const GAME_STATES = {
  LOBBY: "lobby",
  QUESTION: "question",
  PRE_ANSWER: "pre_answer",
  ANSWER: "answer",
  HALFTIME: "halftime",
  GAME_END: "game_end",
  SURVEY: "survey",
};

// Function to get the next state
function getNextState(currentState, questionNum) {
  // Special cases to handle ANSWER
  if (currentState === GAME_STATES.ANSWER) {
    if (questionNum === 5) {
      return GAME_STATES.HALFTIME;
    }
    if (questionNum === 10) {
      return GAME_STATES.GAME_END;
    }
  }

  // Standard next progression
  switch (currentState) {
    case GAME_STATES.LOBBY:
      return GAME_STATES.QUESTION;
    case GAME_STATES.QUESTION:
      return GAME_STATES.PRE_ANSWER;
    case GAME_STATES.PRE_ANSWER:
      return GAME_STATES.ANSWER;
    case GAME_STATES.ANSWER:
      return GAME_STATES.QUESTION;
    case GAME_STATES.HALFTIME:
      return GAME_STATES.QUESTION;
    case GAME_STATES.GAME_END:
      return GAME_STATES.GAME_END;
    case GAME_STATES.SURVEY:
      return GAME_STATES.QUESTION;
    default:
      return GAME_STATES.LOBBY;
  }
}

module.exports = {GAME_STATES, getNextState};