export default {
  getCategory: () => global.$http.get('/api/v1/Catalog/get-category'),
  getListStatus: () => global.$http.get('/api/v1/Catalog/get-list-status'),
  getLevel: () => global.$http.get('/api/v1/Catalog/get-level'),
  getTagByKey: (key) =>
    global.$http.get(`/api/v1/Catalog/auto-complete-tag?keyword=${key}`),
  createQuestion: (data) =>
    global.$http.post('/api/v1/Question/add-question', data),
  createGroupQuestion: async (data, successCallApi, errorCallApi) => {
    const result = await global.$http.post(
      '/api/v1/Question/add-question-group',
      data
    )
    console.log(result)
    if ((successCallApi && result.status === 200) || result.status === 201) {
      successCallApi()
    } else if (errorCallApi) {
      errorCallApi()
    }
  },
}
