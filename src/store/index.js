import { Store } from 'vuex'
import { uuid } from 'vue-uuid'
import user from './modules/user'
import question from './modules/questions/singleQuestions/index'

export const actions = {
  nuxtServerInit({ dispatch }) {
    console.log('store index dispath')
    let uid = user.state.getSessionId
    console.log(uid)
    if (!uid) {
      uid = uuid.v4()
      console.log(uid)
      return Promise.all([dispatch('user/initSession', uid)])
    }
  },
}

const createStore = () => {
  return new Store({
    namespaced: true,
    modules: {
      user,
      question,
    },
  })
}

export default createStore
