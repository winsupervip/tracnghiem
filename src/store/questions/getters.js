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
  getSeoTitle: (state) => state.question.seoTitle,
  getseoDescription: (state) => state.question.seoDescription,
  getSelected: (state) => state.selected,
  getChildQuestion: (state) => state.childQuestions,
  getTitle: (state) => state.question.title,
  getQuestionPlanText: (state) => state.question.plainText,
  getSeoAvatar: (state) => state.question.seoAvatar,
  getCategories: (state) => state.question.categories,
  getExplainationIfCorrect: (state) => state.question.explainationIfCorrect,
  getExplainationIfInCorrect: (state) => state.question.explainationIfIncorrect,
  getGroupExplainationIfCorrect: (state) =>
    state.childQuestions[0].explainationIfCorrect,
  getGroupExplainationIfInCorrect: (state) =>
    state.childQuestions[0].explainationIfIncorrect,
  getLevel: (state) => state.question.levelId,
  getStatus: (state) => state.question.statusId,
}
