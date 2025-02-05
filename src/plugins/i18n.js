import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
export default function ({ app, store }) {
  app.i18n = new VueI18n({
    locale: store.getters['lang/getLang'],
    fallbackLocale: 'vi',
    messages: {
      en: require('~/locales/en.json'),
      vi: require('~/locales/vi.json'),
    },
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
