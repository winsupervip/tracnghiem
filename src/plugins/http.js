export default function ({ $axios }, inject) {
  const $http = $axios.create({
    timeout: 30000, // 30s
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })

  global.$http = $http

  inject('http', $http)
}
