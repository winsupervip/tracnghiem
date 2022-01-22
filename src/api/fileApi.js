export default {
  upload: (formData, isPrivate = false) => {
    const url = `/api/Files/upload?isPrivate=${isPrivate}`
    return global.$http.post(url, formData)
  },
}
