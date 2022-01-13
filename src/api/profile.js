export default {
  getAccountInfo: (userId) => global.$http.get(`/api/Account/${userId}`),
  getExamPublicProfileOfUser: (data) =>
    global.$http.get(
      `/api/v1/Exam/get-exam-public-profile-of-user?Page=${data.Page}&PageSize=${data.PageSize}&Keyword=${data.Keyword}&userId=${data.userId}`
    ),
  getListExamCreateByUser: (data) =>
    global.$http.get(
      `/api/v1/Exam/get-list-exam-create-by-user?Page=${data.Page}&PageSize=${data.PageSize}&Keyword=${data.Keyword}&userId=${data.userId}`
    ),
}
