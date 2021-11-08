import state from './state'

export default {
  ADD_SESSION_ID(state, uid) {
    state.userSessionId = uid
  },
  REST_SESION(satate) {
    state.userSessionId = ''
  },
}
