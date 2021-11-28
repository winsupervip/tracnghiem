export default {
  listCategory(urlQuery) {
    const url = `/api/v1/Admin/category?Page=${urlQuery.page}&PageSize=${
      urlQuery.pageSize
    }&Keyword=${encodeURIComponent(urlQuery.keyword)}`
    return global.$http.get(url)
  },
  getCategory(id) {
    const url = `/api/v1/Admin/category/${id}`
    return global.$http.get(url)
  },
  addCategory(data) {
    const url = `/api/v1/Admin/category`
    return global.$http.post(url, data)
  },
  editCategory(data) {
    const url = `/api/v1/Admin/category`
    return global.$http.put(url, data)
  },
  deleteCategory(id) {
    const url = `/api/v1/Admin/category/${id}`
    return global.$http.delete(url)
  },
  listConfigExam(urlQuery) {
    const url = `/api/v1/Admin/config/exams?Page=${urlQuery.page}&PageSize=${
      urlQuery.pageSize
    }&Keyword=${encodeURIComponent(urlQuery.keyword)}`
    return global.$http.get(url)
  },
  listConfigCategories(urlQuery) {
    const url = `/api/v1/Admin/config/categories?Page=${
      urlQuery.page
    }&PageSize=${urlQuery.pageSize}&Keyword=${encodeURIComponent(
      urlQuery.keyword
    )}`
    return global.$http.get(url)
  },
  addConfigCategory(data) {
    const url = `/api/v1/Admin/config/categories`
    return global.$http.post(url, data)
  },
  deleteConfigCategory(id) {
    const url = `/api/v1/Admin/config/category/delete-by-id/${id}`
    return global.$http.delete(url)
  },
  clearAllConfigCategory(type) {
    const url = `/api/v1/Admin/config/categories/${type}`
    return global.$http.delete(url)
  },
}
