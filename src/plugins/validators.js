import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, email, min, max, min_value } from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/vi.json'

extend('required', {
  ...required,
  message: messages.required,
})

extend('email', {
  ...email,
  message: messages.email,
})

extend('min', {
  ...min,
  message: messages.min,
})

extend('max', {
  ...max,
  message: messages.max,
})

extend('min_value', {
  // eslint-disable-next-line camelcase
  ...min_value,
  message: messages.min_value,
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
