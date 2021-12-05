export default {
  getAgency: (urlQuery) =>
    global.$http.get(
      `/api/Service/agencies/me?Page=${urlQuery.page}&PageSize=${urlQuery.pageSize}&Keyword=${urlQuery.keyword}&createDateFrom=${urlQuery.createDateFrom}&createDateTo=${urlQuery.createDateTo}&status=${urlQuery.status}&sort=${urlQuery.sort}`
    ),
  getAgencyDetail: (hashId) =>
    global.$http.get(`/api/Service/agencies/${hashId}`),
  getAgencyListAccounts: (hashId) =>
    global.$http.get(`/api/Service/agencies/active-codes/${hashId}/users`),
  getSortType: () => global.$http.get('/api/v1/Catalog/services/sort'),
  getStatusAgencies: () =>
    global.$http.get('/api/v1/Catalog/service-agencies/status'),
  getAgenciesActived: (hashId, urlQuery) =>
    global.$http.get(
      `/api/Service/agencies/${hashId}/active-codes?Page=${urlQuery.page}&PageSize=${urlQuery.pageSize}&Keyword=${urlQuery.keyword}&createDateFrom=${urlQuery.createDateFrom}&createDateTo=${urlQuery.createDateTo}&isActive=${urlQuery.status}&sort=${urlQuery.sort}`
    ),
  getSortAgenciesActived: () =>
    global.$http.get('/api/v1/Catalog/active-code/sort'),

  updateAgenciesDeactivePending: (hashId) =>
    global.$http.put(`/api/Service/agencies/${hashId}/status/deactive-pending`),
  updateAgenciesActive: (hashId) =>
    global.$http.put(`/api/Service/agencies/${hashId}/status/active`),
  updateAgenciesListDeactive: (hashId) =>
    global.$http.put(`/api/Service/active-codes/${hashId}/de-active`),
  updateAgenciesListActive: (hashId) =>
    global.$http.put(`/api/Service/active-codes/${hashId}/active`),
}
