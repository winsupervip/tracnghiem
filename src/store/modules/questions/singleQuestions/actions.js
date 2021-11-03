export default {
  addCategory({ commit }, data) {
    commit('ADD_CATEGORY', data)
  },
  addTags({ commit }, data) {
    commit('ADD_TAGS', data)
  },
  addQuestionContent({ commit }, data) {
    commit('ADD_QUESTION_CONTENT', data)
  },
  addExplainationIfCorrect({ commit }, data) {
    commit('ADD_EXPLAINATION_IF_CORRECT', data)
  },
  addExplainationIfInCorrect({ commit }, data) {
    commit('ADD_EXPLAINATION_IF_IN_CORRECT', data)
  },
  addlevel({ commit }, data) {
    commit('ADD_LEVEL', data)
  },
  // có muốn xuất bản câu hỏi hay không
  addStatus({ commit }, data) {
    commit('ADD_STATUS', data)
  },
  addSeoTitle({ commit }, data) {
    commit('ADD_SEO_TITLE', data)
  },
  addSeoDescription({ commit }, data) {
    commit('ADD_SEO_DESCRIPTION', data)
  },
  addSeoAvatar({ commit }, data) {
    commit('ADD_SEO_AVATART', data)
  },
  addTitle({ commit }, data) {
    console.log('actions chay')
    commit('ADD_TITLE', data)
  },
  handleAddAnswer({ commit }, data) {
    commit('HANDLE_ADD_ANSWER', data)
  },
  handleUpdateAnswer({ commit }, data) {
    commit('HANDLE_UPDATE_ANSWER', data)
  },
  handleUpdateDraggableAnswer({ commit }, data) {
    commit('HANDLE_UPDATE_ANSWER_FOR_DRAGGABLE', data)
  },
  addValueUpdateAnswer({ commit }, data) {
    commit('ADD_VALUE_UPDATE_ANSWER', data)
  },
  removeValueUpdateAnswer({ commit }) {
    commit('REMOVE_VALUE_UPDATE_ANSWER')
  },
  deleteAnswer({ commit }, data) {
    commit('DELETE_ANSWER', data)
  },
  handleUserChooseRightAnswer({ commit }, data) {
    commit('HANDLE_USER_CHOOSE_RIGHT_ANSWER', data)
  },
}
