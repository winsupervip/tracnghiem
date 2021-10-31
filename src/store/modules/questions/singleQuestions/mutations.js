export default {
  INSERT_CATEGORY(state, data) {
    state.question.categories = data
  },
  ADD_TITLE(state, data) {
    console.log('mutation chạy')
    state.question.title = data
  },
  HANDLE_ANSWER(state, data) {
    state.question.listAnswers.push(data)
  },
  HANDLE_UPDATE_ANSWER(state, data) {
    const index = state.question.listAnswers.findIndex((item) => {
      return item.id === data.id
    })
    state.question.listAnswers[index] = data
  },
  ADD_VALUE_UPDATE_ANSWER(state, data) {
    state.updateValueAnswer = data
  },
  REMOVE_VALUE_UPDATE_ANSWER(state) {
    state.updateValueAnswer = {}
  },
}
