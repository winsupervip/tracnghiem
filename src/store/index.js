import { uuid } from 'vue-uuid'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'
export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const key = 'app-store'
    let cookieValue = ''
    if (process.server) {
      try {
        const parsedCookies = cookie.parse(req.headers.cookie)
        cookieValue = parsedCookies[key]
      } catch (err) {
        console.log(err)
        cookieValue = ''
      }
    } else {
      cookieValue = Cookies.get(key)
    }
    let uid = ''
    if (cookieValue) {
      const jsonData = JSON.parse(cookieValue)
      uid = jsonData?.user?.userSessionId
    }
    if (!uid) {
      uid = uuid.v4()
    }
    console.log('uid in nuxtServerInit')
    await dispatch('user/initSession', uid)
  },
}
