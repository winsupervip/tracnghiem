export default {
  getCategory: () => global.$http.get('/api/v1/Catalog/get-category'),
  getListStatus: () => global.$http.get('/api/v1/Catalog/get-list-status'),
  getLevel: () => global.$http.get('/api/v1/Catalog/get-level'),
  getTagByKey: (key) =>
    global.$http.get(`/api/v1/Catalog/auto-complete-tag?keyword=${key}`),
  createQuestion: (data) =>
    global.$http.post('/api/v1/Question/add-question', data),
  createGroupQuestion: (data) =>
    global.$http.post('/api/v1/Question/add-question-group', data),
  updateQuestionGroup: (data) => {
    global.$http.post('/api/v1/Question/update-question-group', data)
  },
}
