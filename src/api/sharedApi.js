export default {
  createShareItem(data) {
    const url = '/api/v1/Share/create-share-item'
    return global.$http.post(url, data)
  },
  getShareDetail(itemHashId, itemType) {
    const url = `/api/v1/Share/get-share-token-details?itemHashId=${itemHashId}&itemType=${itemType}`
    return global.$http.get(url)
  },
  editShareItem(data) {
    const url = '/api/v1/Share/edit-share-token-details'
    return global.$http.put(url, data)
  },
  deleteShareItem(token) {
    const url = `/api/v1/Share/delete-share-token?shareToken=${token}`
    return global.$http.delete(url)
  },
}
