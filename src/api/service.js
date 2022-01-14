export default {
  getServices: (urlQuery) => {
    let url = `/api/Service?Page=${urlQuery.page}&PageSize=${urlQuery.pageSize}
    &Keyword=${encodeURIComponent(urlQuery.keyword)}&fromDate=${
      urlQuery.fromDate
    }&toDate=${urlQuery.toDate}`
    if (typeof urlQuery.isActive === 'boolean') {
      url += `&isActive=${urlQuery.isActive}`
    }
    if (urlQuery.sort) {
      url += `&sort=${urlQuery.sort}`
    }
    return global.$http.get(url)
  },
  getSortType: () => global.$http.get('/api/v1/Catalog/services/sort'),
  createService: (data) => global.$http.post('/api/v1/Admin/services', data),
  updateService: (data) => global.$http.put('/api/v1/Admin/services', data),
  deleteService: (hashId) =>
    global.$http.delete(`/api/v1/Admin/services/${hashId}`),
  // Service.Agencies
  getServiceDetailAgencies: (hashId, urlQuery) => {
    let url = `/api/v1/Admin/services/${hashId}/agencies?Page=${urlQuery.page}
    &PageSize=${urlQuery.pageSize}&Keyword=${encodeURIComponent(
      urlQuery.keyword
    )}
    &createDateFrom=${urlQuery.createDateFrom}&createDateTo=${
      urlQuery.createDateTo
    }
    &expireDateFrom=${urlQuery.expireDateFrom}&expireDateTo=${
      urlQuery.expireDateTo
    }`
    // &status=${urlQuery.status}&sort=${urlQuery.sort}`
    if (typeof urlQuery.status === 'number') {
      url += `&status=${urlQuery.status}`
    }
    if (urlQuery.sort) {
      url += `&sort=${urlQuery.sort}`
    }
    return global.$http.get(url)
  },

  getSortTypeAgencies: () =>
    global.$http.get('/api/v1/Catalog/service-agencies/sort'),
  getServiceStatusAgencies: () =>
    global.$http.get('/api/v1/Catalog/service-agencies/status'),
  getSericeCategoryAgencies: () => global.$http.get('/api/Account/agency'),
  getSericeDetail: (hashId) =>
    global.$http.get(`/api/v1/Admin/services/${hashId}`),
  // delete
  deleteServiceAgencies: (hashId) =>
    global.$http.delete(`/api/v1/Admin/service-agencies/${hashId}`),
  // put
  updateServiceAgencies: (data) =>
    global.$http.put('/api/v1/Admin/service-agencies', data),
  updateServiceAgenciesDeactivePending: (hashId) =>
    global.$http.put(`/api/Service/agencies/${hashId}/status/deactive-pending`),
  updateServiceAgenciesActive: (hashId) =>
    global.$http.put(`/api/Service/agencies/${hashId}/status/active`),
  // post
  createServiceAgencies: (data) =>
    global.$http.post('/api/v1/Admin/service-agencies', data),

  // user
  getServiceListAccount: (hashId, urlQuery) => {
    let url = `/api/v1/Admin/service-agencies/${hashId}/users?Page=${urlQuery.page}
    &PageSize=${urlQuery.pageSize}&Keyword=${urlQuery.keyword}
    &activeDateFrom=${urlQuery.activeDateFrom}&activeDateTo=${urlQuery.activeDateTo}`
    if (typeof urlQuery.isActive === 'boolean') {
      url += `&isActive=${urlQuery.isActive}`
    }
    if (urlQuery.sort) {
      url += `&sort=${urlQuery.sort}`
    }
    return global.$http.get(url)
  },
  getUserService: (hashId) =>
    global.$http.get(`/api/v1/Admin/service-users/${hashId}`),
  getServiceAccountSort: () =>
    global.$http.get('/api/v1/Catalog/service-users/sort'),
  // put
  updateAccountService: (data) =>
    global.$http.put(`/api/v1/Admin/service-users`, data),
  updateServiceUserActive: (hashId) =>
    global.$http.put(`/api/v1/Admin/service-users/${hashId}/active`),

  // delete
  deleteServiceUser: (hashId) =>
    global.$http.delete(`/api/v1/Admin/service-users/${hashId}`),
}
