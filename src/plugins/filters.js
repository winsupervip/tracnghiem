import Vue from 'vue'
const moment = require('moment')

Vue.filter('formatDurationDay', function (value) {
  const inputTime = moment(value).locale('vi')
  const currentTime = moment()
  if (!inputTime.isValid()) return '-'

  if (inputTime.year() === currentTime.year()) {
    if (inputTime.month() === currentTime.month()) {
      return inputTime.fromNow()
    }
    return inputTime.format('MM/YYYY')
  }
  return inputTime.format('DD/MM/YYYY')
})

Vue.filter('formatMoney', function (value) {
  const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
  return numberFormat.format(value)
})

Vue.filter('slugify', function (value, separator = '-') {
  if (!value) return ''
  return value
    .toString()
    .replace('đ', 'd')
    .replace('Đ', 'D')
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036F]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, separator)
})

Vue.filter('displayName', function (value, separator = '-') {
  //
})

Vue.filter('date', function (value) {
  const inputTime = moment(value).locale('vi')
  return inputTime.format('DD/MM/YYYY')
})
