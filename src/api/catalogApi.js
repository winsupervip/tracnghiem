export default {
  getPaymentType: () => global.$http.get('/api/v1/Catalog/get-payment-type'),
  getExamSortBy: () => global.$http.get('/api/v1/Catalog/exam-sort-by'),
  getTagByKey: (key) =>
    global.$http.get(`/api/v1/Catalog/auto-complete-tag?keyword=${key}`),
  getQuestionFilterBy: () =>
    global.$http.get('/api/v1/Catalog/question-filter-by'),
  getItemSortTypeInExam: () =>
    global.$http.get('/api/v1/Catalog/item-order-type-in-exam'),
  getHistoryExamStatus: () =>
    global.$http.get('/api/v1/Catalog/get-history-exam-status'),
  getAvatarImages: () => global.$http.get('/api/v1/Catalog/get-avatar-images'),
  getCategoriesByParent: (parentId, recursive) =>
    global.$http.get(
      `/api/v1/Catalog/get-categories?parent=${
        parentId ?? 0
      }&recursive=${recursive}`
    ),
}
