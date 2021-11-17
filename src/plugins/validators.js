import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
// eslint-disable-next-line camelcase
import {
  required,
  email,
  min,
  max,
  // eslint-disable-next-line camelcase
  min_value,
  // eslint-disable-next-line camelcase
  max_value,
  length,
} from 'vee-validate/dist/rules'
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

extend('max_value', {
  // eslint-disable-next-line camelcase
  ...max_value,
  message: messages.max_value,
})

extend('length', {
  ...length,
  message: messages.length,
})

const validArrayLength = (value, [min, max]) => {
  console.log(value.length, min, max)
  if (!Array.isArray(value)) {
    return false
  }
  if (value.length < min || value.length > max) return false
  return true
}

// The first param is called 'min', and the second is called 'max'.
const paramNames = ['min', 'max']

extend('arr_len', validArrayLength, {
  paramNames, //  pass it in the extend options.
  message: (field, [a, b]) => 'The {_field_} field must be {min} {max} long',
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
