export default {
  initSession({ commit }, uid) {
    commit('ADD_SESSION_ID', uid)
  },
}
