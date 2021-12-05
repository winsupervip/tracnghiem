export default {
  getAllDocumentType: () =>
    global.$http.get('/api/Document/get-all-documents-type'),
  addDocument: (data) => global.$http.post('/api/Document/add-document', data),
  getDocumentByUser: () =>
    global.$http.get('/api/Document/get-documents-by-user'),
}
