export default {
  setExam({ commit }, examData) {
    commit('SET_EXAM', examData)
  },
  setExamInfo({ commit }, info) {
    commit('SET_EXAM_INFO', info)
  },
  setExamSettings({ commit }, settings) {
    commit('SET_EXAM_SETTINGS', settings)
  },
  setExamExtra({ commit }, extra) {
    commit('SET_EXAM_EXTRA', extra)
  },
  setSeoDescription({ commit }, description) {
    commit('SET_SEO_DESCRIPTION', description)
  },
}
