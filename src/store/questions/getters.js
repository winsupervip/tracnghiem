export default {
  getListAnswer: (state) => state.answers,
  getUpdateValueAnswer: (state) => state.updateValueAnswer,
  getQuestion: (state) => {
    return {
      question: state.question,
      answers: state.answers,
    }
  },
  getSelected: (state) => state.selected,
  getChildQuestion: (state) => state.childQuestions,
}
