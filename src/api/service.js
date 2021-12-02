export default {
  getServices: (urlQuery) =>
    global.$http.get(
      `/api/Service?Page=${urlQuery.page}&PageSize=${urlQuery.pageSize}&
      Keyword=${urlQuery.keyword}&fromDate=${urlQuery.fromDate}&
      toDate=${urlQuery.toDate}&isActive=${urlQuery.isActive}&sort=${urlQuery.sort}`
    ),
  getSortType: () => global.$http.get('/api/v1/Catalog/services/sort'),
  createService: (data) => global.$http.post('/api/v1/Admin/services', data),
  updateService: (data) => global.$http.put('/api/v1/Admin/services', data),
  deleteService: (data) =>
    global.$http.delete('/api/v1/Admin/services/' + data),
  getServiceDetailAgencies: (hashId, urlQuery) =>
    global.$http.get(
      `/api/v1/Admin/services/${hashId}/agencies?Page=${urlQuery.page}&PageSize=${urlQuery.pageSize}&
      Keyword=${urlQuery.keyword}&createDateFrom=${urlQuery.createDateFrom}&
      createDateTo=${urlQuery.createDateTo}&expireDateFrom=${urlQuery.expireDateFrom}&
      expireDateTo=${urlQuery.expireDateTo}&status=${urlQuery.status}&sort=${urlQuery.sort}`
    ),
}
