import { Store } from 'vuex'
import { uuid } from 'vue-uuid'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
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
    plugins: [
      createPersistedState({
        storage: {
          getItem: (key) => Cookies.get(key),
          // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
          setItem: (key, value) =>
            Cookies.set(key, value, { expires: 3, secure: true }),
          removeItem: (key) => Cookies.remove(key),
        },
        paths: ['user'],
      }),
    ],
  })
}

export default createStore
