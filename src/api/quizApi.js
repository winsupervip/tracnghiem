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
  getQuizInfo(id) {
    const url = `/api/v1/Quiz/user-quiz-info?id=${id}`
    return global.$http.get(url)
  },
  submitQuiz(quizId) {
    return global.$http.post(`/api/v1/Quiz/submit-quiz?quizId=${quizId}`)
  },
  flagQuestion(id) {
    return global.$http.put(`/api/v1/Quiz/flag-quiz-question`, {
      questionId: id,
    })
  },
  showRightAnswer(questionId) {
    const url = `/api/v1/Quiz/question/${questionId}/right-answer`
    return global.$http.get(url)
  },
  summarizeResult(quizId) {
    const url = `/api/v1/Quiz/summarize-quiz-result?quizId=${quizId}`
    return global.$http.get(url)
  },
  analysisResult(quizId) {
    const url = `/api/v1/Quiz/analysis-quiz?QuizId=${quizId}`
    return global.$http.get(url)
  },
  getQuestionsAfterSubmit(quizId) {
    const url = `/api/v1/Quiz/get-questions-after-submit?quizId=${quizId}`
    return global.$http.get(url)
  },
  checkQuizProcess(examId) {
    const url = `/api/v1/Quiz/check-quiz-progress?examHashId=${examId}`
    return global.$http.get(url)
  },
}
