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
        questionText: 'As of today, how many projects are labelled as "Complete" on our Meego board?',
        questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
        potentialAnswers: ['27', '35', '44', '52'],
        answer: 2,
    },
    {
        questionText: 'Maggie was the first RD to join our team. What day did she join?',
        questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
        potentialAnswers: ['September 6, 2022', 'September 12, 2022', 'October 11, 2022', 'October 24, 2022'],
        answer: 0,
    },
    {
        questionText: 'How many RDs are there on our SOCFI US team (not including our leaders)?',
        questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
        potentialAnswers: ['19', '21', '23', '25'],
        answer: 1,
    },
    {
        questionText: 'This year, we went on a business trip to L.A., where we visited California Adventure park and took a team photo. Where did we take this photo?',
        questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
        potentialAnswers: ['The Park Entrance', 'San Fransokyo Square', 'Radiator Springs', 'The Parking Lot'],
        answer: 2,
    },
    {
        questionText: 'From the perspective of an RD on our team, how many levels down are we from Shou?',
        questionType: QUESTION_TYPES.MULTIPLE_CHOICE,
        potentialAnswers: ['3', '4', '5', '6'],
        answer: 3,
    },
    {
        questionText: 'What would you rate the food at TikTok?',
        questionType: QUESTION_TYPES.SURVEY,
        potentialAnswers: {
            start: 0,
            end: 10,
        },
        answer: null,
        followupQuestion: {
            questionText: 'What is the AVERAGE rating of the TikTok food based on your responses?',
            questionType: QUESTION_TYPES.NUMERIC,
            potentialAnswers: {
                start: 0,
                end: 10,
            },
            answer: null,
        },
    },
    {
        questionText: 'If you follow the route recommended by the office team for walking from 1199 to 1143, how many meters will you walk?',
        questionType: QUESTION_TYPES.NUMERIC,
        potentialAnswers: {
            start: 1,
            end: 1000,
        },
        answer: 698,
    },
    {
        questionText: 'As of 12:05AM (PST) on December 12th 2024, how many commits have there been onto the Android develop branch?',
        questionType: QUESTION_TYPES.NUMERIC,
        potentialAnswers: {
            start: 1,
            end: 1500000,
        },
        answer: 992138,
    },
    {
        questionText: "In the SOCFI random group, we have a bot that reminds us to go for lunch. Including today, how many times has it sent this message?",
        questionType: QUESTION_TYPES.NUMERIC,
        potentialAnswers: {
            start: 0,
            end: 365,
        },
        answer: 180,
    },
    {
        questionText: "Flip Story",
        questionType: QUESTION_TYPES.FINAL,
        questionSubtype: QUESTION_SUBTYPES.FINAL,
        followupQuestion: {
            questionText: 'How many test cases were in the QA test plan for Flip Story?',
            questionType: QUESTION_TYPES.NUMERIC,
            questionSubtype: QUESTION_SUBTYPES.FINAL,
            potentialAnswers: {
                start: 1,
                end: 4000,
            },
            answer: 2780,
        }
    }
];
module.exports = {questions, QUESTION_TYPES, QUESTION_SUBTYPES};