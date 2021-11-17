export default {
  getPaymentType: () => global.$http.get('/api/v1/Catalog/get-payment-type'),
  getExamSortBy: () => global.$http.get('/api/v1/Catalog/exam-sort-by'),
  getTagByKey: (key) =>
    global.$http.get(`/api/v1/Catalog/auto-complete-tag?keyword=${key}`),
  getQuestionFilterBy: () =>
    global.$http.get('/api/v1/Catalog/question-filter-by'),
  getItemSortTypeInExam: () =>
    global.$http.get('/api/v1/Catalog/item-order-type-in-exam'),
}
