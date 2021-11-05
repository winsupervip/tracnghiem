import { uuid } from 'vue-uuid'
export default function ({ $axios, $auth, $logger, redirect, store }, inject) {
  let uid = store.getters['user/getSessionId']
  if (!uid) {
    uid = uuid.v4()
    store.dispatch('user/initSession', uid)
  }
  const $http = $axios.create({
    timeout: 3000000, // 30s
    headers: {
      'Content-Type': 'application/json',
      'X-SESSION-ID': uid,
      'X-Xss-Protection': uuid.v4(),
    },
  })

  if ($auth.loggedIn) {
    $http.defaults.headers.common.Authorization = $auth.strategy.token.get()
  }
  $http.interceptors.response.use(
    (response) => {
      return response
    },
    (err) => {
      if (!$axios.isCancel(err)) {
        const { status } = err?.response || {}
        if (status === 401 || status === 403) {
          store.dispatch('user/restSession', uid)
          redirect('/login')
        } else if (status >= 500) {
          $logger.error(err.message || `a fatal error as occurred`)
        }

        return Promise.reject(err)
      }
    }
  )

  global.$http = $http

  inject('http', $http)
}
