export default {
  getAllDocumentType: () =>
    global.$http.get('/api/Document/get-all-documents-type'),
  addDocument: (data) => global.$http.post('/api/Document/add-document', data),
  getDocumentByUser: async (urlQuery) => {
    const documnentTypeId =
      urlQuery.documnentTypeId == null ? -1 : urlQuery.documnentTypeId
    const orderBy = urlQuery.orderBy == null ? 1 : urlQuery.orderBy

    const url = `/api/Document/get-documents-by-user?Page=${urlQuery.page}&PageSize=${urlQuery.pageSize}&Keyword=${urlQuery.keyword}&documnentTypeId=${documnentTypeId}&orderBy=${orderBy}`

    const result = await global.$http.get(url)
    return result
  },

  getQuestionDocument: (hashId) =>
    global.$http.get(`/api/Document/get-question-documents/${hashId}`),
  addQuestionDocument: (data) =>
    global.$http.post('/api/Document/add-question-document', data),
  deleteQuestionDocument: (data) =>
    global.$http.delete('/api/Document/delete-question-document', data),
  updateQuestionDocument: (data) =>
    global.$http.post('/api/Document/update-document', data),
}
