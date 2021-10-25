export default {
  upload: (formData) => {
    const url = `/api/Files/upload`
    return global.$http.post(url, formData)
  },
}
