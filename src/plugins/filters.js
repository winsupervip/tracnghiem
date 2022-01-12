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

// trả về level
Vue.filter('formatLevel', function (value) {
  if (value === 1 || value === '1') {
    return 'Cơ Bản'
  }
  if (value === 2 || value === '2') {
    return 'Trung Bình'
  }
  if (value === 3 || value === '3') {
    return 'Nâng Cao'
  }
  if (value === 4 || value === '4') {
    return 'Khó'
  }
  return 'Cơ Bản'
})

Vue.filter('date', function (value) {
  const inputTime = moment(value).locale('vi')
  return inputTime.format('DD/MM/YYYY')
})

Vue.filter('convertDate', function (value) {
  const now = new Date()
  const reviewTime = new Date(value)

  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDay()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  const yearReview = reviewTime.getFullYear()
  const monthReview = reviewTime.getMonth() + 1
  const dayReview = reviewTime.getDay()
  const hourReview = reviewTime.getHours()
  const minutesReview = reviewTime.getMinutes()

  if (year - yearReview >= 1 || month - monthReview) {
    return `${dayReview} tháng ${monthReview}, ${yearReview}`
  }
  if (day - dayReview > 1) {
    return `${day - dayReview} ngày trước`
  }
  if (day - dayReview === 1) {
    if (hours - hourReview < 0) {
      return `${24 + hours - hourReview} giờ trước`
    }
    return `${hours - hourReview} giờ trước`
  }
  if (hours - hourReview >= 1) {
    return `${hours - hourReview} giờ trước`
  }

  return `${minutes - minutesReview} phút trước`
})
