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
  getCategoriesExamPage: (data) =>
    global.$http.get(
      `/api/v1/Catalog/get-categories?parent=${data.parent}&recursive=0`
    ),
  searchExam: (urlQuery) => {
    let url = '/api/v1/Exam/get-user-exam-list-public?'
    if (urlQuery.page) {
      url += `Page=${urlQuery.page}&`
    }
    if (urlQuery.pageSize) {
      url += `PageSize=${urlQuery.pageSize}&`
    }
    if (urlQuery.Keyword) {
      url += `Keyword=${urlQuery.Keyword}&`
    }
    if (urlQuery.categories && urlQuery.categories.length > 0) {
      urlQuery.categories.forEach((item) => {
        url += `categories=${item}&`
      })
    }
    if (urlQuery.levels && urlQuery.levels.length > 0) {
      urlQuery.levels.forEach((item) => {
        url += `levels=${item}&`
      })
    }
    if (urlQuery.ratings && urlQuery.ratings.length > 0) {
      urlQuery.ratings.forEach((item) => {
        url += `ratings=${item}&`
      })
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
