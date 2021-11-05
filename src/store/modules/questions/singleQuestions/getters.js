export default {
  getListAnswer: (state) => state.answers,
  getUpdateValueAnswer: (state) => state.updateValueAnswer,
  isValid: (state, typeQuestion) => {
    const errors = {}
    const data = state
    let valid = true
    if (data.question.title === '') {
      errors.title = 'Tiêu đề là bắt buộc'
      valid = false
    } else {
      errors.title = false
    }
    // 1

    if (data.question.questionContent === '') {
      errors.questionContent = 'Bạn phải nhập vào nội dung câu hỏi'
      valid = false
    } else {
      errors.questionContent = false
    }
    // 2

    if (data.question.tags.length === 0) {
      errors.tags = 'Bạn phải gán ít nhất 1 tag cho câu hỏi'
      valid = false
    } else {
      errors.tags = false
    }
    // 3

    if (!data.question.levelId) {
      errors.level = 'Bạn phải chọn level cho câu hỏi'
      valid = false
    } else {
      errors.level = false
    }
    // 4

    if (data.question.categories.length === 0) {
      errors.categories = 'Bạn phải chọn 1 danh mục cho câu hỏi'
      valid = false
    } else {
      errors.categories = false
    }
    // 5

    if (data.answers.length < 2) {
      errors.answers = []
      errors.answers.push('Loại câu hỏi này phải có từ 2 câu trả lời trở lên')
      valid = false
    }

    if (!data.question.statusId) {
      errors.statusId = 'Bạn có muốn xuất bản câu hỏi'
      valid = false
    } else {
      errors.statusId = false
    }
    if (data.question.seoTitle === '') {
      errors.seoTitle = 'Bạn có muốn xuất bản câu hỏi'
      // eslint-disable-next-line no-unused-vars
      valid = false
    } else {
      errors.seoTitle = false
    }
    return { isValid: valid, errors }
  },
  getQuestion: (state) => {
    return {
      question: state.question,
      answers: state.answers,
    }
  },
  getSelected: (state) => state.selected,
}
