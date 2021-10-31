export default {
  addCategory({ commit }, data) {
    commit('INSERT_CATEGORY', data)
  },
  addTag({ commit }, data) {
    commit('INSERT_CATEGORY', data)
  },
  addExplainationIfCorrect({ commit }, data) {
    commit('INSERT_CATEGORY', data)
  },
  addExplainationIfInCorrect({ commit }, data) {
    commit('INSERT_CATEGORY', data)
  },
  addlevel({ commit }, data) {
    commit('INSERT_CATEGORY', data)
  },
  // có muốn xuất bản câu hỏi hay không
  addStatus({ commit }, data) {
    commit('INSERT_CATEGORY', data)
  },
  addSeoTitle({ commit }, data) {
    commit('INSERT_CATEGORY', data)
  },
  addSeoDescription({ commit }, data) {
    commit('INSERT_CATEGORY', data)
  },
  addSeoAvatar({ commit }, data) {
    commit('INSERT_CATEGORY', data)
  },
  addTitle({ commit }, data) {
    console.log('actions chay')
    commit('ADD_TITLE', data)
  },
  handleAddAnswer({ commit }, data) {
    commit('HANDLE_ANSWER', data)
  },
  handleUpdateAnswer({ commit }, data) {
    commit('HANDLE_UPDATE_ANSWER', data)
  },
  addValueUpdateAnswer({ commit }, data) {
    commit('ADD_VALUE_UPDATE_ANSWER', data)
  },
  removeValueUpdateAnswer({ commit }) {
    commit('REMOVE_VALUE_UPDATE_ANSWER')
  },
}
