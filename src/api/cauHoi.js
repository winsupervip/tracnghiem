export default {
  getCategory: () => global.$http.get('/api/v1/Catalog/get-category'),
  getListStatus: () => global.$http.get('/api/v1/Catalog/get-list-status'),
  getTagByKey: async (key, successCallApi) => {
    const result = await global.$http.get(
      `/api/v1/Catalog/auto-complete-tag?keyword=${key}`
    )
    console.log(result)
    if (successCallApi) {
      successCallApi(result?.data?.object?.items)
    }
  },
  createQuestion: async (data, successCallApi, errorCallApi) => {
    const result = await global.$http.post(
      '/api/v1/Question/add-question',
      data
    )
    console.log(result)
    if ((successCallApi && result.status === 200) || result.status === 201) {
      successCallApi()
    } else if (errorCallApi) {
      errorCallApi()
    }
  },
}
