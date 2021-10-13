export default {
  getListStatus: (params) =>
    global.$http.get('/Catalog/get-list-status', { params }),
  detailProduct: (id) => global.$http.get('/Catalog/get-product-by-id/' + id),
}
