export default {
  getAgency: (urlQuery) =>
    global.$http.get(
      `/api/Service/me?Page=${urlQuery.page}&PageSize=${urlQuery.pageSize}&Keyword=${urlQuery.keyword}&createDateFrom=${urlQuery.createDateFrom}&createDateTo=${urlQuery.createDateTo}&status=${urlQuery.status}&sort=${urlQuery.sort}`
    ),
}
