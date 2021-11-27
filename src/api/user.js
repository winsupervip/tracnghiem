export default {
  getAccount: () => global.$http.get('/api/Account'),
  getListSchools: () => global.$http.get('/api/v1/Catalog/schools'),
  getListgenders: () => global.$http.get('/api/v1/Catalog/genders'),
  getRefList: (urlQuery) =>
    global.$http.get(
      `/api/Account/ref-list?Page=${urlQuery.page}&PageSize=${urlQuery.pageSize}`
    ),
  updateAccount: (data) => global.$http.put('/api/Account', data),
  createCode: (data) => global.$http.post('/api/Account/ref-code', data),
  postCode: (data) => global.$http.post('/api/Account/ref-by', data),
  // admin
  getServices: (urlQuery) =>
    global.$http.get(
      `/api/Service?Page=${urlQuery.page}&PageSize=${urlQuery.pageSize}&sortType=${urlQuery.sortType}`
    ),
  getSortType: () => global.$http.get('/api/v1/Catalog/services/sort-type'),
  createService: (data) => global.$http.post('/api/v1/Admin/services', data),
  deleteService: (data) =>
    global.$http.delete('/api/v1/Admin/services/' + data),
}
