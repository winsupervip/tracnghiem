export default {
  products: (params) => global.$http.get('/Catalog/list-products', { params }),
  detailProduct: (id) => global.$http.get('/Catalog/get-product-by-id/' + id),
}
