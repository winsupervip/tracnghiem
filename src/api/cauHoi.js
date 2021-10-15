export default {
  getCategory: () => global.$http.get('/api/v1/Catalog/get-category'),
  getListStatus: () => global.$http.get('/api/v1/Catalog/get-list-status'),
}
