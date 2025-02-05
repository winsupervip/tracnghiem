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

  getQuestionDocument: (hashId, typeId) =>
    global.$http.get(
      `/api/Document/get-question-documents/${hashId}?typeId=${typeId}`
    ),
  addQuestionDocument: (data) =>
    global.$http.post('/api/Document/add-question-document', data),
  deleteQuestionDocument: (hashId, typeId) =>
    global.$http.delete(
      `/api/Document/delete-question-document?hashId=${hashId}&typeId=${typeId}`
    ),
  deleteExamDocument: (hashId, typeId) =>
    global.$http.delete(`/api/Document/delete-exam-document?hashId=${hashId}`),
  updateDocument: (data) =>
    global.$http.post('/api/Document/update-document', data),
  deleteDocument: (hashId) =>
    global.$http.delete(`/api/Document/delete-document/${hashId}`),
  getExamDocument: (hashId) =>
    global.$http.get(`/api/Document/get-exam-documents/${hashId}`),
  addExamDocument: (data) =>
    global.$http.post('/api/Document/add-exam-document', data),
}
