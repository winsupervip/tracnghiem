import { uuid } from 'vue-uuid'

export default function ({ $axios, $auth, $logger, redirect, store }, inject) {
  const uid = store.getters['user/getSessionId']
  // if (!uid) {
  //   uid = uuid.v4()
  //   console.log('uid in http')
  //   store.dispatch('user/initSession', uid)
  // }
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
  $http.interceptors.request.use((request) => {
    let config = {}
    if (request.config) {
      config = request.config
    }
    config.start = Date.now()
    request.config = config
    return request
  })
  $http.interceptors.response.use(
    (response) => {
      const now = Date.now()
      console.info(
        `Api Call ${response.config.url} took ${
          now - response.config.config.start
        }ms`
      )
      return response
    },
    (err) => {
      if (!$axios.isCancel(err)) {
        const { status } = err?.response || {}
        if (status === 401 || status === 403) {
          redirect('/login')
        } else {
          $logger.error(err.message || `a fatal error as occurred`)
        }

        return Promise.reject(err)
      }
    }
  )

  global.$http = $http

  inject('http', $http)
}
