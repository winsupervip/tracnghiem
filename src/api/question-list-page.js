export default {
  getListStatus: (params) =>
    global.$http.get('/Catalog/get-list-status', { params }),
}
