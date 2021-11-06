const singleChoice = (answers) => {
  const result = {
    mess: '',
    errors: '',
    data: [],
  }
  let count = 0
  result.data = answers.map((item) => {
    if (item.id) {
      delete item.id
    }
    if (item.rightAnswer === 1) {
      count += 1
    }
    return item
  })
  if (count > 1) {
    result.errors = 'Loại câu hoi này chỉ có 1 đáp án đúng'
  } else if (count < 1) {
    result.errors = 'Bạn phỉa chọn 1 câu trả lời đúng'
  }
  return result
}
const multipleChoice = (answers) => {
  const result = {
    errors: '',
    data: [],
  }
  let count = 0
  result.data = answers.map((item) => {
    if (item.id) {
      delete item.id
    }
    if (item.rightAnswer === 1) {
      count += 1
    }
    return item
  })
  if (count < 1) {
    result.errors = 'Bạn phỉa chọn 1 câu trả lời đúng'
  }
  return result
}
const shortAnswer = (answers) => {
  const result = {
    errors: '',
    data: [],
  }
  result.data = answers.map((item) => {
    if (item.id) {
      delete item.id
    }
    return item
  })
  return result
}
const fillBlank = (answers) => {
  const result = {
    errors: '',
    data: [],
  }
  let sumRight = 0
  const checkSum = (answers.length + 1) * (answers.length / 2)

  result.data = answers.map((item) => {
    delete item.id
    sumRight += item.rightAnswer
    return item
  })
  if (sumRight !== checkSum) {
    this.errors.answers.push('Ví trí điền đang bị trùng')
  }

  return result
}
export default { singleChoice, multipleChoice, shortAnswer, fillBlank }
