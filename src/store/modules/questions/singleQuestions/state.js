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
  updateValueAnswer: {},
  modalShow: false,
  updateValue: {},
  errors: [],
  selected: [],
})
