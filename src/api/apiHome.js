export default {
  getCategories: () => global.$http.get('/api/v1/Catalog/home/categories'),
}
