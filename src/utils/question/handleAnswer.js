const singleChoiceAndRightWrong = (answers) => {
  const result = {
    errors: '',
    data: [],
  }
  const answersResult = []
  let count = 0
  if (answers.length < 2) {
    result.errors = 'Loại câu hỏi này phải có ít nhất 2 câu trả lời'
    return result
  }
  answers.forEach((item) => {
    if (item.rightAnswer === 1) {
      count += 1
    }
    const data = {
      position: item.position,
      hashId: '',
      plainText: item.plainText,
      rightAnswer: item.rightAnswer,
      random: item.random,
      answerContent: item.answerContent,
    }
    answersResult.push(data)
  })
  result.data = answersResult
  if (count > 1) {
    result.errors = 'Câu hỏi 1 lựa chọn chỉ có 1 đáp án đúng'
  } else if (count === 0) {
    result.errors = 'Bạn phải chọn 1 câu trả lời đúng'
  }
  return result
}

const multipleChoice = (answers) => {
  const result = {
    errors: '',
    data: [],
  }
  if (answers.length < 2) {
    result.errors = 'Loại câu hỏi này phải có ít nhất 2 câu trả lời'
    return result
  }
  const answersResult = []
  let count = 0

  answers.forEach((item) => {
    if (item.rightAnswer === 1) {
      count += 1
    }
    const data = {
      position: item.position,
      hashId: '',
      plainText: item.plainText,
      rightAnswer: item.rightAnswer,
      random: item.random,
      answerContent: item.answerContent,
    }
    answersResult.push(data)
  })
  result.data = answersResult
  if (count <= 0) {
    result.errors = 'Bạn phải chọn 1 câu trả lời đúng'
  } else if (count >= answers.length) {
    result.errors = 'Phải có ít nhất 1 đáp án sai cho câu hỏi này'
  }
  return result
}

const shortAnswer = (answers) => {
  const result = {
    errors: '',
    data: [],
  }
  if (answers.length < 1) {
    result.errors = 'Loại câu hỏi này phải có ít nhất 1 câu trả lời'
    return result
  }
  answers.forEach((item) => {
    const data = {
      position: item.position,
      hashId: '',
      plainText: item.plainText,
      rightAnswer: 1,
      random: item.random,
      answerContent: item.answerContent,
    }
    result.data.push(data)
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
  if (answers.length < 2) {
    result.errors = 'Loại câu hỏi này phải có ít nhất 2 câu trả lời'
    return result
  }
  answers.forEach((item) => {
    const data = {
      position: item.position,
      hashId: '',
      plainText: item.plainText,
      rightAnswer: item.rightAnswer,
      random: item.random,
      answerContent: item.answerContent,
    }
    sumRight += item.rightAnswer
    result.data.push(data)
  })
  if (sumRight !== checkSum) {
    result.errors = 'Ví trí điền đang bị trùng'
  }

  return result
}

const matching = (answers) => {
  const result = {
    errors: '',
    data: [],
  }
  if (answers.length < 2) {
    result.errors = 'Loại câu hỏi này phải có ít nhất 2 câu trả lời'
    return result
  }
  answers.forEach((item, index) => {
    console.log(item?.left.answerContent.length)
    if (item?.left.answerContent.length > 0) {
      result.data.push({
        position: item.left.position,
        hashId: '',
        plainText: item.left.plainText,
        rightAnswer: index + 1,
        random: item.left.random,
        answerContent: item.left.answerContent,
      })
    }
    if (item?.right.answerContent.length > 0) {
      result.data.push({
        position: item.right.position,
        hashId: '',
        plainText: item.right.plainText,
        rightAnswer: index + 1,
        random: item.right.random,
        answerContent: item.right.answerContent,
      })
    }
  })

  return result
}

const draggable = (answers) => {
  const result = {
    errors: '',
    data: [],
  }
  if (answers.length < 2) {
    result.errors = 'Loại câu hỏi này phải có ít nhất 2 câu trả lời'
    return result
  }
  answers.forEach((item, index) => {
    const data = {
      position: 0,
      hashId: '',
      plainText: item.plainText,
      rightAnswer: index + 1,
      random: item.random,
      answerContent: item.answerContent,
    }
    result.data.push(data)
  })
  return result
}
export default {
  matching,
  singleChoiceAndRightWrong,
  multipleChoice,
  shortAnswer,
  fillBlank,
  draggable,
}
