export default {
  getListStatus: () => global.$http.get('/api/v1/Catalog/get-list-status'),
  getCategory: () => global.$http.get('/api/v1/Catalog/get-category'),
  getTreeQuestionTypes: () =>
    global.$http.get('/api/v1/Catalog/get-tree-question-types'),
  getLevel: () => global.$http.get('/api/v1/Catalog/get-level'),
  getTagByKey: async (key, successCallApi) => {
    const result = await global.$http.get(
      `/api/v1/Catalog/auto-complete-tag?keyword=${key}`
    )
    console.log(result)
    if (successCallApi) {
      successCallApi(result?.data?.object?.items)
    }
  },
  getUserQuestionList: () =>
    global.$http.get('/api/v1/Question/get-user-question-list'),
  getUserQuestionGroupList: () =>
    global.$http.get('/api/v1/Question/get-user-question-group-list'),
}
