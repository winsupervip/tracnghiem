import { Store } from 'vuex'
import question from './modules/questions/singleQuestions/index'
export const actions = {
  nuxtServerInit({ dispatch }) {},
}

const createStore = () => {
  return new Store({
    namespaced: true,
    modules: {
      question,
    },
  })
}

export default createStore
