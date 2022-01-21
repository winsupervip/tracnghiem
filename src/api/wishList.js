export default {
  saveWishList: (data) => global.$http.post('/save-wishlist', data),
}
