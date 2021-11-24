export default {
  addCategory({ commit }, data) {
    commit('ADD_CATEGORY', data)
  },
  addTags({ commit }, data) {
    commit('ADD_TAGS', [...data])
  },
  addQuestionContent({ commit }, data) {
    commit('ADD_QUESTION_CONTENT', data)
  },
  addExplainationIfCorrect({ commit }, data) {
    commit('ADD_EXPLAINATION_IF_CORRECT', data)
  },
  addExplainationIfInCorrect({ commit }, data) {
    commit('ADD_EXPLAINATION_IF_IN_CORRECT', data)
  },
  addlevel({ commit }, data) {
    commit('ADD_LEVEL', data)
  },
  // có muốn xuất bản câu hỏi hay không
  addStatus({ commit }, data) {
    commit('ADD_STATUS', data)
  },
  addSeoTitle({ commit }, data) {
    commit('ADD_SEO_TITLE', data)
  },
  addSeoDescription({ commit }, data) {
    commit('ADD_SEO_DESCRIPTION', data)
  },
  addSeoAvatar({ commit }, data) {
    commit('ADD_SEO_AVATART', data)
  },
  addTitle({ commit }, data) {
    console.log('actions chay')
    commit('ADD_TITLE', data)
  },
  handleAddAnswer({ commit }, data) {
    commit('HANDLE_ADD_ANSWER', data)
  },
  handleUpdateAnswer({ commit }, data) {
    commit('HANDLE_UPDATE_ANSWER', data)
  },
  handleUpdateSelectForFillBlank({ commit }, data) {
    commit('HANDLE_UPDATE_SELECT_FOR_FILL_BLANK', data)
  },
  handleUpdateDraggableAnswer({ commit }, data) {
    commit('HANDLE_UPDATE_ANSWER_FOR_DRAGGABLE', data)
  },
  addValueUpdateAnswer({ commit }, data) {
    commit('ADD_VALUE_UPDATE_ANSWER', data)
  },
  removeValueUpdateAnswer({ commit }) {
    commit('REMOVE_VALUE_UPDATE_ANSWER')
  },
  deleteAnswer({ commit }, data) {
    commit('DELETE_ANSWER', data)
  },
  handleUserChooseRightAnswer({ commit }, data) {
    commit('HANDLE_USER_CHOOSE_RIGHT_ANSWER', data)
  },
  restData({ commit }) {
    commit('REST_DATA')
  },
  copyQuestion({ commit }, data) {
    commit('COPY_QUESTIONS', data)
  },
  editQuestion({ commit }, data) {
    commit('EDIT_QUESTIONS', data)
  },

  setNullAnswerId({ commit }, answerIndex) {
    commit('SET_NULL_ID_ANSWER', answerIndex)
  },
  seedDataForRightWrongAnswer({ commit }) {
    commit('SEED_DATA_FOR_RIGHT_WRONG_ANSWER')
  },
  // question group ///
  addChildQuestion({ commit }, data) {
    commit('ADD_CHILD_QUESTION', data)
  },
  addAnswerInChildQuestion({ commit }, data) {
    commit('ADD_ANSWER_IN_CHILD_QUESTION', data)
  },
  isRandom({ commit }, data) {
    commit('IS_RANDOM', data)
  },
  addChildQuestionContent({ commit }, data) {
    commit('ADD_CHILD_QUESTION_CONTENT', data)
  },
  deleteChildQuestion({ commit }, data) {
    commit('DELETE_CHILD_QUESTION', data)
  },
  updateAnswerQuestionChild({ commit }, data) {
    commit('UPDATE_ANSWER_QUESTION_CHILD', data)
  },
  deleteAnswerOfChildQuestion({ commit }, data) {
    commit('DELETE_ANSWER_OF_CHILD_QUESTION', data)
  },
  handleUpdateDraggableAnswerForGroupQuestion({ commit }, data) {
    commit('HANDLE_UPDATE_DRAGGBLE_ANSWER_FOR_QUESTION', data)
  },
  handleUserChooseRightAnswerOfChildQuestion({ commit }, data) {
    commit('HANDLE_USER_CHOOSE_RIGHT_ANSWER_OF_CHILD_QUESTION', data)
  },
  handleUpdateSelectFillBlankGroupQuestion({ commit }, data) {
    commit('HANDLE_UPDATE_SELECT_FILL_BLANK_GROUP_QUESTION', data)
  },
}
