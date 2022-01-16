export default {
  getCategories: () => global.$http.get('/api/v1/Catalog/home/categories'),
  getExam: (data) =>
    global.$http.get(
      `api/v1/Catalog/config/exams?type=${data.type}&limit=${data.pageSize}`
    ),
  getConfigCategories: (data) =>
    global.$http.get(
      `/api/v1/Catalog/config/categories?type=${data.type}&limit=${data.pageSize}&limitChild=${data.pageSizeChild}`
    ),
  categoriesAtHomePage: (data) =>
    global.$http.get(
      `/api/v1/Catalog/get-categories?parent=${data.parent}&recursive=${data.recursive}`
    ),
  getCategoriesExamPage: (data) =>
    global.$http.get(
      `/api/v1/Catalog/get-categories?parent=${data.parent}&recursive=0`
    ),
  searchExam: (urlQuery) => {
    let url = '/api/v1/Exam/get-user-exam-list-public?'
    if (urlQuery.page) {
      url += `page=${urlQuery.page}`
    }
    if (urlQuery.pageSize) {
      url += `&pageSize=${urlQuery.pageSize}`
    }
    if (urlQuery.keyword) {
      url += `&keyword=${encodeURIComponent(urlQuery.keyword)}`
    }
    if (urlQuery.categories && urlQuery.categories.length > 0) {
      urlQuery.categories.forEach((item) => {
        url += `&categories=${item}`
      })
    }
    if (urlQuery.levels && urlQuery.levels.length > 0) {
      urlQuery.levels.forEach((item) => {
        url += `&levels=${item}`
      })
    }
    if (urlQuery.ratings && urlQuery.ratings.length > 0) {
      urlQuery.ratings.forEach((item) => {
        url += `&ratings=${item}`
      })
    }
    if (urlQuery.amountQuestionLeft) {
      url += `&amountquestionleft=${urlQuery.amountQuestionLeft}`
    }
    if (urlQuery.amountQuestionRight) {
      url += `&amountquestionright=${urlQuery.amountQuestionRight}`
    }
    if (urlQuery.amountExamTimeLeft) {
      url += `&amountexamtimeleft=${urlQuery.amountExamTimeLeft}`
    }
    if (urlQuery.amountExamTimeRight) {
      url += `&amountexamtimeright=${urlQuery.amountExamTimeRight}`
    }
    if (urlQuery.orderBy) {
      url += `&orderBy=${urlQuery.orderBy}`
    }
    return global.$http.get(url)
  },
  getExamDetail: (id) =>
    global.$http.get(`api/v1/Exam/get-exam-details-home/${id}`),
  getAuthorOfExam: (id) =>
    global.$http.get(`api/v1/Exam/get-information-author-of-exam/${id}`),
  getListExamSection: (id) =>
    global.$http.get(`/api/v1/Exam/get-list-exam-section-home/${id}`),
  getListExamDocument: (id) =>
    global.$http.get(`api/v1/Exam/get-document-exam-home/${id}?orderBy=1`),
  getQuestionExamDetailHome: (data) =>
    global.$http.get(
      `api/v1/Exam/get-question-exam-detail-home/${data.id}?Page=${data.page}&PageSize=${data.pageSize}`
    ),
  getReviews: (data) =>
    global.$http.get(
      `/api/v1/Review/${data.typeId}/${data.hashId}?Page=${data.Page}&&PageSize=${data.PageSize}`
    ),
  getTotalRate: (data) =>
    global.$http.get(`/api/v1/Review/count-rate/${data.typeId}/${data.hashId}`),
  sendComment: (data) => global.$http.post('/api/v1/Review/', data),
  sendReact: (data) => global.$http.post('/api/v1/Review/react', data),

  getCategoryBreadcrumd(slug) {
    return global.$http.get(
      `api/Home/category-breadcrumb?slug=${encodeURIComponent(slug)}`
    )
  },
  getChildCategoryBySlug(slug) {
    return global.$http.get(
      `api/Home/children-categories-by-slug?slug=${encodeURIComponent(slug)}`
    )
  },
  getCategoryBySlug(slug) {
    let url = `api/Home/category-by-slug`
    if (slug) {
      url += `?slug=${encodeURIComponent(slug)}`
    }
    return global.$http.get(url)
  },
  getQuestionsOfExam(hashId, urlQuery) {
    const url = `api/Home/get-question-of-exam/${hashId}?page=${urlQuery.page}&pageSize=${urlQuery.pageSize}&keyword=${urlQuery.keyword}`
    return global.$http.get(url)
  },
  // funtion send report for exam, question and comment
  sendReport: (data) => global.$http.post('api/v1/Report/add-report', data),
}
