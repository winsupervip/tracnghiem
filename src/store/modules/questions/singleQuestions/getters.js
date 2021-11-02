export default {
  getListAnswer: (state) => state.answers,
  getUpdateValueAnswer: (state) => state.updateValueAnswer,
  isValid: (state) => {
    const errors = []
    const data = state
    let valid = true
    if (data.question.title === '') {
      errors.push('Tiêu đề là bắt buộc')
      valid = false
    } else {
      errors.push(false)
    }
    // 1

    if (data.question.questionContent === '') {
      errors.push('Bạn phải nhập vào nội dung câu hỏi')
      valid = false
    } else {
      errors.push(false)
    }
    // 2

    if (data.question.tags.length === 0) {
      errors.push('Bạn phải gán ít nhất 1 tag cho câu hỏi')
      valid = false
    } else {
      errors.push(false)
    }
    // 3

    if (!data.question.levelId) {
      errors.push('Bạn phải chọn level cho câu hỏi')
      valid = false
    } else {
      errors.push(false)
    }
    // 4

    if (data.question.categories.length === 0) {
      errors.push('Bạn phải chọn 1 danh mục cho câu hỏi')
      valid = false
    } else {
      errors.push(false)
    }
    // 5

    if (data.answers.length < 2) {
      errors.push('Loại câu hỏi này phải có từ 2 câu trả lời trở lên')
      valid = false
    } else {
      let count = 0
      data.answers.forEach((e) => {
        if (e.rightAnswer === 1) {
          count += 1
        }
      })
      if (count === 0) {
        errors.push('Hãy chọn 1 câu trả lời đúng')
        valid = false
      } else if (count > 1) {
        errors.push('Loại câu hỏi này chỉ có 1 đáp án đúng')
        valid = false
      } else {
        errors.push(false)
      }
    }
    if (!data.question.statusId) {
      errors.push('Bạn có muốn xuất bản câu hỏi')
      valid = false
    } else {
      errors.push(false)
    }
    if (data.question.seoTitle === '') {
      errors.push('Bạn có muốn xuất bản câu hỏi')
      // eslint-disable-next-line no-unused-vars
      valid = false
    } else {
      errors.push(false)
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
