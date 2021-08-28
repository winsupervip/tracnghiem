export default function ({ $axios, $auth, $logger, redirect }, inject) {
  const $http = $axios.create({
    timeout: 30000, // 30s
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
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
