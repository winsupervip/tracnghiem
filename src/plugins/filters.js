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
