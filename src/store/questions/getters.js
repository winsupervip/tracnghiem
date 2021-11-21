export default {
  getListAnswer: (state) => state.answers,
  getUpdateValueAnswer: (state) => state.updateValueAnswer,
  getGroupSelected: (state) => state.selectedGroup,
  getQuestion: (state) => {
    return {
      question: state.question,
      answers: state.answers,
    }
  },
  getGroupQuestion: (state) => {
    return {
      question: state.question,
      childQuestions: state.childQuestions,
    }
  },
  getSelected: (state) => state.selected,
  getChildQuestion: (state) => state.childQuestions,
  getTitle: (state) => state.question.title,
  getQuestionPlanText: (state) => state.question.plainText,
}
