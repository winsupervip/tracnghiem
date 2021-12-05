export default {
  getAllDocumentType: () =>
    global.$http.get('/api/Document/get-all-documents-type'),
}
