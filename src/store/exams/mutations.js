export default {
  SET_EXAM(state, examData) {
    state.exam = examData
  },
  SET_EXAM_INFO(state, examInfo) {
    state.exam.title = examInfo.title
    state.exam.description = examInfo.description
    state.exam.tags = examInfo.tags
  },
  SET_EXAM_SETTINGS(state, examSettings) {
    state.exam.nonExamTime = examSettings.nonExamTime
    state.exam.examTime = examSettings.examTime
    state.exam.maximumTest = examSettings.maximumTest
    state.exam.numberQuestionsTest = examSettings.numberQuestionsTest
    state.exam.suffleQuestions = examSettings.suffleQuestions
    state.exam.suffleAnswers = examSettings.suffleAnswers
    state.exam.checkAnswersWhileTest = examSettings.checkAnswersWhileTest
    state.exam.checkAnswersAfterTest = examSettings.checkAnswersAfterTest
    state.exam.allowChangeSettings = examSettings.allowChangeSettings
  },
  SET_EXAM_EXTRA(state, examExtra) {
    state.exam.image = examExtra.image
    state.exam.payementTypeId = examExtra.payementTypeId
    state.exam.statusId = examExtra.statusId
    state.exam.levelId = examExtra.levelId
    state.exam.seoTitle = examExtra.seoTitle
    state.exam.seoDescription = examExtra.seoDescription
    state.exam.categories = examExtra.categories
  },
  SET_SEO_DESCRIPTION(state, seoDescription) {
    console.log('SET_SEO_DESCRIPTION', seoDescription)
    state.exam.seoDescription = seoDescription
  },
}
