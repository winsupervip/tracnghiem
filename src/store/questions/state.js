export default () => ({
  question: {
    questionContent: '',
    plainText: '',
    options: {
      convert_urls: false,
      entity_encoding: 'raw',
    },
    isRandom: false,
    indexDataUpdate: -1,
    categories: [],
    statusId: false,
    levelId: false,
    seoAvatar: '',
    seoTitle: '',
    seoDescription: '',
    explainationIfCorrect: '',
    explainationIfInCorrect: '',
    tags: [],
    title: '',
    position: 0,
  },
  answers: [],
  childrenQuestions: [
    {
      typeQuetionsId: 1,
      question: 'Việt nam có bao nhiêu tỉnh thành',
      answewrs: [
        {
          id: 123,
          answerContent: 64,
          rightAnswer: 1,
        },
        {
          id: 123,
          answerContent: 65,
          rightAnswer: 0,
        },
      ],
    },
  ],
  updateValueAnswer: {},
  modalShow: false,
  updateValue: {},
  errors: [],
  selected: [],
})
