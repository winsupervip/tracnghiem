export default (context, inject) => {
  const app = context.app
  const handleError = (error, callback = null) => {
    console.log(error)
    if (error && error.response) {
      if (error.response.status !== 405) {
        console.log(error.response.data.message)
        console.log(error.response.status)
        // custom callback function để flexible hơn với handle error.
        if (typeof callback === 'function') {
          callback(error)
        }
        app.$toast
          .error(app.i18n.t('errors.' + error.response.data.message))
          .goAway(1500)
      } else {
        app.$toast.error(app.i18n.t('errors.405')).goAway(1500)
      }
    } else {
      // success
      // console.log(app)
      app.$toast?.success(app.i18n.t('errors.' + error.message)).goAway(1500)
      if (typeof callback === 'function') {
        callback()
      }
    }
  }
  // Inject $handleError(error) in Vue, context and store.
  inject('handleError', handleError)
  context.$handleError = handleError
}
