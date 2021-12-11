export default {
  submitQuestion(data) {
    return global.$http.post('/api/v1/Quiz/question/submit', data)
  },
}
