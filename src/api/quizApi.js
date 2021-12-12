export default {
  submitQuestion(data) {
    return global.$http.post('/api/v1/Quiz/question/submit', data)
  },

  addQuiz(data) {
    return global.$http.post('/api/v1/Quiz/add-quiz', data)
  },
  getQuestionsBeforeSubmit(quizId) {
    const url = `/api/v1/Quiz/get-questions-before-submit?quizId=${quizId}`
    return global.$http.get(url)
  },
  getQuestionById(questionId) {
    const url = `/api/v1/Quiz/question/${questionId}`
    return global.$http.get(url)
  },
}
