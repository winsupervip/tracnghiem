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
  searchExam: (urlQuery) => {
    let url = '/api/v1/Exam/get-user-exam-list-public?'
    if (urlQuery.page) {
      url += `Page=${urlQuery.page}&`
    }
    if (urlQuery.page) {
      url += `PageSize=${urlQuery.pageSize}&`
    }
    if (urlQuery.Keyword) {
      url += `Keyword=${urlQuery.Keyword}&`
    }
    if (urlQuery.levels) {
      url += `levels=${urlQuery.levels}&`
    }
    if (urlQuery.ratings) {
      url += `ratings=${urlQuery.ratings}&`
    }
    if (urlQuery.amountquestionleft) {
      url += `amountquestionleft=${urlQuery.amountquestionleft}&`
    }
    if (urlQuery.amountquestionright) {
      url += `amountquestionright=${urlQuery.amountquestionright}&`
    }
    if (urlQuery.amountexamtimeleft) {
      url += `amountexamtimeleft=${urlQuery.amountexamtimeleft}&`
    }
    if (urlQuery.amountexamtimeright) {
      url += `amountexamtimeright=${urlQuery.amountexamtimeright}&`
    }
    if (urlQuery.orderBy) {
      url += `orderBy=${urlQuery.orderBy}`
    }
    return global.$http.get(url)
  },
}
