const questions = [
    {
        questionText: 'What is the capital of France?',
        questionType: 'multiple_choice',
        potentialAnswers: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 0,
    },
    {
        questionText: 'What is the largest planet in the solar system?',
        questionType: 'multiple_choice',
        potentialAnswers: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        answer: 0,
    },
    {
        questionText: 'What is the atomic number of carbon?',
        questionType: 'numeric',
        potentialAnswers: {
            start: 0,
            end: 10,
        },
        answer: 6,
    },
    {
        questionText: 'What would you rate the food at TikTok?',
        questionType: 'survey',
        potentialAnswers: {
            start: 0,
            end: 10,
        },
        answer: null,
        followupQuestion: {
            questionText: 'What is the AVERAGE rating of the TikTok food based on your responses?',
            questionType: 'numeric',
            potentialAnswers: {
                start: 0,
                end: 10,
            },
            answer: null,
        },
    },
];
module.exports = {questions};