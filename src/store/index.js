import { Store } from 'vuex'
import { uuid } from 'vue-uuid'
import user from './modules/user'
import lang from './modules/lang'
import question from './modules/questions/singleQuestions'

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
      lang,
    },
  })
}

export default createStore
