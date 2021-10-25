export default {
  getListStatus: () => global.$http.get('/api/v1/Catalog/get-list-status'),
  getCategory: () => global.$http.get('/api/v1/Catalog/get-category'),
  getTreeQuestionTypes: () =>
    global.$http.get('/api/v1/Catalog/get-tree-question-types'),
  getLevel: () => global.$http.get('/api/v1/Catalog/get-level'),
}
