const QUESTION_TYPES = {
    MULTIPLE_CHOICE: "multiple_choice",
    NUMERIC: "numeric",
    SURVEY: "survey",
    FINAL: "final",
};

const QUESTION_SUBTYPES = {
    FINAL: "final",
};

const questions = [
    {
        questionText: 'What is the capital of France?',
        questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
        potentialAnswers: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 0,
    },
    // {
    //     questionText: 'What is the largest planet in the solar system?',
    //     questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
    //     potentialAnswers: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    //     answer: 0,
    // },
    // {
    //     questionText: 'What is the atomic number of carbon?',
    //     questionType: QUESTION_TYPES.NUMERIC,
    //     potentialAnswers: {
    //         start: 0,
    //         end: 10,
    //     },
    //     answer: 6,
    // },
    // {
    //     questionText: 'What would you rate the food at TikTok?',
    //     questionType: QUESTION_TYPES.SURVEY,
    //     potentialAnswers: {
    //         start: 0,
    //         end: 10,
    //     },
    //     answer: null,
    //     followupQuestion: {
    //         questionText: 'What is the AVERAGE rating of the TikTok food based on your responses?',
    //         questionType: QUESTION_TYPES.NUMERIC,
    //         potentialAnswers: {
    //             start: 0,
    //             end: 10,
    //         },
    //         answer: null,
    //     },
    // },
    // {
    //     questionText: "SOCFI Random Lark Group",
    //     questionType: QUESTION_TYPES.FINAL,
    //     questionSubtype: QUESTION_SUBTYPES.FINAL,
    //     followupQuestion: {
    //         questionText: "In the SOCFI random group, we have a bot that reminds us to go for lunch. Including today, how many times has it sent this message?",
    //         questionType: QUESTION_TYPES.NUMERIC,
    //         questionSubtype: QUESTION_SUBTYPES.FINAL,
    //         potentialAnswers: {
    //             start: 0,
    //             end: 700,
    //         },
    //         answer: 200,
    //     }
    // }
];
module.exports = {questions, QUESTION_TYPES, QUESTION_SUBTYPES};