export default {
  switchLang({ commit }, locale) {
    commit('SET_LANG', locale)
    this.app.i18n.locale = locale
  },
}
