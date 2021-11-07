import state from './state'
const LANG_KEY = 'LANG'
export default {
  SET_LANG(locale) {
    window.localStorage.setItem(LANG_KEY, locale)
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
}
