export default {
  setExam({ commit }, examData) {
    console.log('SET_EXAM', examData)
    commit('SET_EXAM', examData)
  },
}
