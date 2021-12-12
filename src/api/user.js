export default {
  // get
  getAccount: () => global.$http.get('/api/Account'),
  getListSchools: () => global.$http.get('/api/v1/Catalog/schools'),
  getListgenders: () => global.$http.get('/api/v1/Catalog/genders'),
  getRefList: (urlQuery) =>
    global.$http.get(
      `/api/Account/ref-list?Page=${urlQuery.page}&PageSize=${urlQuery.pageSize}`
    ),
  getListPackage: () => global.$http.get('/api/Service?isPublic=true&sort=1'),

  getListService: (urlQuery) =>
    global.$http.get(
      `/api/Service/users/me?Page=${urlQuery.page}&PageSize=${urlQuery.pageSize}&Keyword=${urlQuery.keyword}`
    ),
  // put
  updateAccount: (data) => global.$http.put('/api/Account', data),
  updatePassword: (data) => global.$http.put('/api/Account/password', data),
  // post
  createCode: (data) => global.$http.post('/api/Account/ref-code', data),
  postCode: (data) => global.$http.post('/api/Account/ref-by', data),
  createCodeActive: (data) =>
    global.$http.post('/api/Service/users/active', data),
}
