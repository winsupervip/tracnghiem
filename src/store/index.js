import { Store } from 'vuex'
import demoModule from './modules/demo-user'

export const actions = {
  nuxtServerInit({ dispatch }) {},
}

const createStore = () => {
  return new Store({
    namespaced: true,
    modules: {
      demoModule,
    },
  })
}

export default createStore
