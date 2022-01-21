export default {
  addLabel: (data) => global.$http.post('/api/v1/Label/add-label', data),
  getLabelProfile: (type, itemId) =>
    global.$http.get(`/api/v1/Label/${type}/${itemId}`),
  addDeleteItemLabel: (data) =>
    global.$http.post('/api/v1/Label/add-delete-item-label', data),
}
