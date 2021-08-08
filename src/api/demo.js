export default {
  products: (axios, params) => axios.get('/Catalog/list-products', { params }),
  detailProduct: (axios, id) => axios.get('/Catalog/get-product-by-id/' + id),
}
