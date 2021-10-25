export default {
  getListStatus: () => global.$http.get('/api/v1/Catalog/get-list-status'),
  getCategory: () => global.$http.get('/api/v1/Catalog/get-category'),
  getTreeQuestionTypes: () =>
    global.$http.get('/api/v1/Catalog/get-tree-question-types'),
  getLevel: () => global.$http.get('/api/v1/Catalog/get-level'),
  getTagByKey: async (key, successCallApi) => {
    const result = await global.$http.get(
      `/api/v1/Catalog/auto-complete-tag?keyword=${key}`
    )
    console.log(result)
    if (successCallApi) {
      successCallApi(result?.data?.object?.items)
    }
  },
  getUserItemList: async (urlQuery) => {
    const statusId = urlQuery.statusId == null ? -1 : urlQuery.statusId
    const levelId = urlQuery.levelId == null ? -1 : urlQuery.levelId
    const questionTypeId =
      urlQuery.questionTypeId == null ? -1 : urlQuery.questionTypeId
    const orderBy = urlQuery.orderBy == null ? 1 : urlQuery.orderBy
    const questionGroupId =
      urlQuery.questionGroupId == null ? -1 : urlQuery.questionGroupId
    let urlCate = ''
    if (urlQuery.categories && urlQuery.categories.length > 0) {
      urlQuery.categories.forEach((item) => {
        urlCate += '&categories=' + item
      })
    }
    const url = `/api/v1/Question/get-user-item-list?Page=${urlQuery.page}&PageSize=${urlQuery.pageSize}&Keyword=${urlQuery.keyword}${urlCate}&statusId=${statusId}&levelId=${levelId}&questionTypeId=${questionTypeId}&orderBy=${orderBy}&questionGroupId=${questionGroupId}`

    const result = await global.$http.get(url)
    return result
  },
  getUserQuestionGroupList: () =>
    global.$http.get('/api/v1/Question/get-user-question-group-list'),
}
