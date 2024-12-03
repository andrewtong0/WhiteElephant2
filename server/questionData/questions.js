const questions = [
    {
        questionText: 'What is the capital of France?',
        questionType: 'multipleChoice',
        potentialAnswers: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 0,
    },
    {
        questionText: 'What is the largest planet in the solar system?',
        questionType: 'multipleChoice',
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
        questionText: 'What is your favorite color?',
        questionType: 'survey',
        potentialAnswers: null,
        answer: '',
    },
];
module.exports = {questions};