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
}
