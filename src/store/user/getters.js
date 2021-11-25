export default {
  getSessionId: (state) => state.userSessionId,
  isAdmin: (state, getters, rootState) =>
    rootState.auth.user.role.includes('admin'),
  isAgency: (state, getters, rootState) =>
    rootState.auth.user.role.includes('agency'),
}
