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
      const tagsUrl = urlQuery.tags.join('&tags=')
      url = '&tags=' + tagsUrl
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
  getItemsAddExam: (urlQuery, examHashId) => {
    let url = `/api/v1/Exam/get-item-list-add-to-exam?Page=${
      urlQuery.page
    }&PageSize=${urlQuery.pageSize}&Keyword=${encodeURIComponent(
      urlQuery.keyword
    )}&examHashId=${examHashId}`

    if (urlQuery.categories && urlQuery.categories.length > 0) {
      const categoryUrl = urlQuery.categories.join('&categories=')
      url += '&categories=' + categoryUrl
    }

    if (urlQuery.levelId && urlQuery.levelId > 0) {
      url += '&levelId=' + urlQuery.levelId
    }
    if (urlQuery.questionTypeId && urlQuery.questionTypeId > 0) {
      url += '&questionTypeId=' + urlQuery.questionTypeId
    }

    if (urlQuery.filterBy != null) {
      url += '&filterBy=' + urlQuery.filterBy
    }

    if (urlQuery.orderBy && urlQuery.orderBy > 0) {
      url += '&orderBy=' + urlQuery.orderBy
    }
    return global.$http.get(url)
  },
  getSectionsByExam: (hashId) => {
    const url = `/api/v1/Exam/get-list-exam-section/${hashId}`
    return global.$http.get(url)
  },
  addExamSection(data) {
    return global.$http.post('/api/v1/Exam/add-exam-section', data)
  },
  addExamQuestions(data) {
    return global.$http.post('/api/v1/Exam/add-questions-to-exam', data)
  },
  getQuestionsOfExam: (urlQuery, hashId) => {
    let url = `/api/v1/Exam/get-question-of-exam/${hashId}?Page=${
      urlQuery.page
    }&PageSize=${urlQuery.pageSize}&Keyword=${encodeURIComponent(
      urlQuery.keyword
    )}`

    if (urlQuery.levelId && urlQuery.levelId > 0) {
      url += '&levelId=' + urlQuery.levelId
    }
    if (urlQuery.questionTypeId && urlQuery.questionTypeId > 0) {
      url += '&questionTypeId=' + urlQuery.questionTypeId
    }

    if (urlQuery.orderBy && urlQuery.orderBy > 0) {
      url += '&orderBy=' + urlQuery.orderBy
    }
    return global.$http.get(url)
  },
  getUserHistoryExams: (urlQuery) => {
    let url = `/api/v1/Exam/get-user-exam-history-list-public?Page=${
      urlQuery.page
    }&PageSize=${urlQuery.pageSize}&Keyword=${encodeURIComponent(
      urlQuery.keyword
    )}`

    if (urlQuery.categoriesId && urlQuery.categoriesId > 0) {
      url += '&categoriesId=' + urlQuery.categoriesId
    }

    if (urlQuery.tags && urlQuery.tags.length > 0) {
      const tagsUrl = urlQuery.categories.join('&tags=')
      url = '&tags=' + tagsUrl
    }

    if (urlQuery.statusId && urlQuery.statusId > 0) {
      url += '&statusId=' + urlQuery.statusId
    }

    if (urlQuery.levelId && urlQuery.levelId > 0) {
      url += '&levelId=' + urlQuery.levelId
    }

    if (urlQuery.orderBy && urlQuery.orderBy > 0) {
      url += '&orderBy=' + urlQuery.orderBy
    }
    return global.$http.get(url)
  },
  updateSectionName: (data) => {
    const url = '/api/v1/Exam/update-exam-section'
    return global.$http.put(url, data)
  },
  deleteSection: (data) => {
    const url = `/api/v1/Exam/delete-exam-section?hashExamId=${data.hashExamId}&hashExamSectionId=${data.hashExamSectionId}`
    return global.$http.delete(url, data)
  },
  getUserHistoryExamDetails: (urlQuery) => {
    const url = `/api/v1/Exam/get-detail-user-exam-history?examId=${
      urlQuery.examId
    }&Page=${urlQuery.page}&PageSize=${
      urlQuery.pageSize
    }&Keyword=${encodeURIComponent(urlQuery.keyword)}`
    return global.$http.get(url)
  },
}
