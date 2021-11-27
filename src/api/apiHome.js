export default {
  getCategories: () => global.$http.get('/api/v1/Catalog/home/categories'),
  getExam: (data) =>
    global.$http.get(
      `api/v1/Catalog/config/exams?type=${data.type}&limit=${data.pageSize}`
    ),
  getConfigCategories: (data) =>
    global.$http.get(
      `/api/v1/Catalog/config/categories?type=${data.type}&limit=${data.pageSize}&limitChild=${data.pageSizeChild}`
    ),
  categoriesAtHomePage: (data) =>
    global.$http.get(
      `/api/v1/Catalog/get-categories?parent=${data.parent}&recursive=${data.recursive}`
    ),
}
