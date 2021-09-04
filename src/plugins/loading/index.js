import Vue from 'vue'
import loadingVue from './loading.vue'

const LoadingConstructor = Vue.extend(loadingVue)

LoadingConstructor.prototype.close = function () {
  if (Vue.prototype.$isServer) return
  removeOldLoading()
}

const Loading = function () {
  const instance = new LoadingConstructor({
    el: Vue.prototype.$isServer ? '' : document.createElement('div'),
  })

  if (Vue.prototype.$isServer) return instance

  removeOldLoading()

  document.body.appendChild(instance.$el)

  return instance
}

const removeOldLoading = () => {
  const currentLoading = document.getElementById('loading-screen')
  if (currentLoading) {
    currentLoading.parentNode.removeChild(currentLoading)
  }
}

export default Loading
