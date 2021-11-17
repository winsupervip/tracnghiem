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
  resetExam({ commit }) {
    commit('SET_EXAM', {
      hashId: '',
      payementTypeId: 1,
      title: '',
      image: 'https://storage.tracnghiem.vn/tracnghiem-dev/exam-avatar.png',
      description: '',
      nonExamTime: true,
      examTime: 0,
      maximumTest: 0,
      numberQuestionsTest: 60,
      suffleQuestions: true,
      suffleAnswers: true,
      checkAnswersWhileTest: false,
      checkAnswersAfterTest: true,
      allowChangeSettings: true,
      statusId: 1,
      levelId: 1,
      seoTitle: '',
      seoDescription: '',
      slug: '',
      categories: null,
      tags: [],
    })
  },
}
