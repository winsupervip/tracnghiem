export default {
  getPaymentType: () => global.$http.get('/api/v1/Catalog/get-payment-type'),
  getExamSortBy: () => global.$http.get('/api/v1/Catalog/exam-sort-by'),
}
