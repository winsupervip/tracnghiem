export default {
  getUserExams: (urlQuery) => {
    let url = `/api/v1/Exam/get-user-exam-list?Page=${urlQuery.page}&PageSize=${
      urlQuery.pageSize
    }&Keyword=${encodeURIComponent(urlQuery.keyword)}`

    if (urlQuery.categories && urlQuery.categories.length > 0) {
      const categoryUrl = urlQuery.categories.join('&categories=')
      url += '&categories=' + categoryUrl
    }

    if (urlQuery.tags && urlQuery.tags.length > 0) {
      const categoryUrl = urlQuery.categories.join('&tags=')
      url = '&tags=' + categoryUrl
    }

    if (urlQuery.statusId && urlQuery.statusId > 0) {
      url += '&statusId=' + urlQuery.statusId
    }

    if (urlQuery.levelId && urlQuery.levelId > 0) {
      url += '&levelId=' + urlQuery.levelId
    }

    if (urlQuery.payement_type_id && urlQuery.payement_type_id > 0) {
      url += '&payement_type_id=' + urlQuery.payement_type_id
    }

    if (urlQuery.orderBy && urlQuery.orderBy > 0) {
      url += '&orderBy=' + urlQuery.orderBy
    }
    return global.$http.get(url)
  },
  addExam: (data) => global.$http.post('/api/v1/Exam/add-exam', data),
  getUserExamById: (hashId) =>
    global.$http.get(`/api/v1/Exam/get-exam-details/${hashId}`),
  editExam: (data) => global.$http.put('/api/v1/Exam/update-exam', data),
}
