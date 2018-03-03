const essayTopics = [
  {
    number: 1,
    title: 'What is your opinion on Meditation Science?',
    description: 'KAIST has declared its plans to establish the Meditation Research Center by June 2018. The Meditation Research Center aims to contribute to society through intensive research on meditation.',
  }, {
    number: 2,
    title: 'Because Park Geun-hye says so.',
    description: 'If you really want something, the universe will step up to help you and you will achieve your dreams.',
  }, {
    number: 3,
    title: 'Little Paradise',
    description: 'A young woman leaves the city to return to her hometown in the countryside.',
  },
];

export default {
  getEssayTopics(cb) {
    setTimeout(() => cb(essayTopics), 100);
  },
};
