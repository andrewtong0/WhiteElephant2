// Define the states and their transitions
const GAME_STATES = {
  LOBBY: "LOBBY",
  QUESTION: "QUESTION",
  PRE_ANSWER: "PRE_ANSWER",
  ANSWER: "ANSWER",
  HALFTIME: "HALFTIME",
  GAME_END: "GAME_END"
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
    default:
      return GAME_STATES.LOBBY;
  }
}

module.exports = {GAME_STATES, getNextState};