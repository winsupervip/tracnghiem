export default {
  ADD_CATEGORY(state, data) {
    state.question.categories = data
  },
  ADD_TITLE(state, data) {
    console.log('mutation chạy')
    state.question.title = data
  },
  HANDLE_ANSWER(state, data) {
    state.answers.push(data)
  },
  HANDLE_UPDATE_ANSWER(state, data) {
    const index = state.answers.findIndex((item) => {
      return item.id === data.id
    })
    state.answers[index] = data
  },
  ADD_VALUE_UPDATE_ANSWER(state, data) {
    state.updateValueAnswer = data
  },
  REMOVE_VALUE_UPDATE_ANSWER(state) {
    state.updateValueAnswer = {}
  },
  ADD_TAGS(state, data) {
    state.question.tags = data
  },
  ADD_QUESTION_CONTENT(state, data) {
    state.question.questionContent = data
    state.question.plainText = data
  },
  ADD_STATUS(state, data) {
    state.question.statusId = data
  },
  ADD_LEVEL(state, data) {
    state.question.levelId = data
  },
  ADD_SEO_AVATART(state, data) {
    state.question.seoAvatar = data
  },
  ADD_SEO_TITLE(state, data) {
    state.question.seoTitle = data
  },
  ADD_SEO_DESCRIPTION(state, data) {
    state.question.seoDescription = data
  },
  ADD_EXPLAINATION_IF_IN_CORRECT(state, data) {
    state.question.explainationIfInCorrect = data
  },
  ADD_EXPLAINATION_IF_CORRECT(state, data) {
    state.question.explainationIfCorrect = data
  },
  DELETE_ANSWER(state, data) {
    const index = state.answers.findIndex((item) => item.id === data)
    state.answers.splice(index, 1)
  },
}
