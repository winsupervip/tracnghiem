import { Store } from 'vuex'
import demoModule from './modules/demo-user'
import question from './modules/questions/singleQuestions/index'
export const actions = {
  nuxtServerInit({ dispatch }) {},
}

const createStore = () => {
  return new Store({
    namespaced: true,
    modules: {
      demoModule,
      question,
    },
  })
}

export default createStore
