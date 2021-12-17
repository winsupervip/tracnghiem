const singleChoiceAndRightWrong = (values) => {
  const result = {
    errors: '',
    data: [],
  }
  const answersResult = []
  let count = 0

  if (values.answers.length < 2) {
    result.errors = 'Loại câu hỏi này phải có ít nhất 2 câu trả lời'
    return result
  }

  if (values.hasNoCorrectAnswer) {
    result.data = values.answers
    console.log('chay vo day')
    return result
  }

  values.answers.forEach((item) => {
    if (item.rightAnswer === 1) {
      count += 1
    }
    const data = {
      position: item.position,
      hashId: item.hashId,
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

const multipleChoice = (values) => {
  const result = {
    errors: '',
    data: [],
  }

  if (values.answers.length < 2) {
    result.errors = 'Loại câu hỏi này phải có ít nhất 2 câu trả lời'
    return result
  }

  if (values.hasNoCorrectAnswer) {
    result.data = values.answers
    console.log('chay vo day')
    return result
  }
  const answersResult = []
  let count = 0

  values.answers.forEach((item) => {
    if (item.rightAnswer === 1) {
      count += 1
    }
    const data = {
      position: item.position,
      hashId: item.hashId,
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
  } else if (count >= values.answers.length) {
    result.errors = 'Phải có ít nhất 1 đáp án sai cho câu hỏi này'
  }

  return result
}

const shortAnswer = (values) => {
  const result = {
    errors: '',
    data: [],
  }

  if (values.answers.length < 1) {
    result.errors = 'Loại câu hỏi này phải có ít nhất 1 câu trả lời'
    return result
  }

  if (values.hasNoCorrectAnswer) {
    result.data = values.answers
    console.log('chay vo day')
    return result
  }

  values.answers.forEach((item) => {
    const data = {
      position: item.position,
      hashId: item.hashId,
      plainText: item.plainText,
      rightAnswer: 1,
      random: item.random,
      answerContent: item.answerContent,
    }
    result.data.push(data)
  })
  return result
}

const fillBlank = (values) => {
  const result = {
    errors: '',
    data: [],
  }

  if (values.answers.length < 2) {
    result.errors = 'Loại câu hỏi này phải có ít nhất 2 câu trả lời'
    return result
  }

  if (values.hasNoCorrectAnswer) {
    result.data = values.answers
    console.log('chay vo day')
    return result
  }
  const position = []
  values.answers.forEach((item) => {
    const data = {
      position: item.position,
      hashId: item.hashId,
      plainText: item.plainText,
      rightAnswer: item.rightAnswer,
      random: item.random,
      answerContent: item.answerContent,
    }
    if (item.rightAnswer !== -1) {
      position.push(item.rightAnswer)
    }
    result.data.push(data)
  })
  console.log(position)
  const checkPosition = [...new Set(position)]
  console.log(checkPosition)
  if (checkPosition.length !== position.length) {
    result.errors = 'Ví trí điền đang bị trùng'
  }

  return result
}

const matching = (values) => {
  const result = {
    errors: '',
    data: [],
  }
  if (values.answers.length < 2) {
    result.errors = 'Loại câu hỏi này phải có ít nhất 2 câu trả lời'
    return result
  }

  if (values.hasNoCorrectAnswer) {
    result.data = values.answers
    console.log('chay vo day')
    return result
  }

  values.answers.forEach((item, index) => {
    console.log(item?.left.answerContent.length)
    if (item?.left.answerContent.length > 0) {
      result.data.push({
        position: item.left.position,
        hashId: item.left.hashId,
        plainText: item.left.plainText,
        rightAnswer: index + 1,
        random: item.left.random,
        answerContent: item.left.answerContent,
      })
    }

    if (item?.right.answerContent.length > 0) {
      result.data.push({
        position: item.right.position,
        hashId: item.right.hashId,
        plainText: item.right.plainText,
        rightAnswer: index + 1,
        random: item.right.random,
        answerContent: item.right.answerContent,
      })
    }
  })

  return result
}

const draggable = (values) => {
  const result = {
    errors: '',
    data: [],
  }

  if (values.answers.length < 2) {
    result.errors = 'Loại câu hỏi này phải có ít nhất 2 câu trả lời'
    return result
  }

  if (values.hasNoCorrectAnswer) {
    result.data = values.answers
    console.log('chay vo day')
    return result
  }

  values.answers.forEach((item, index) => {
    const data = {
      position: 0,
      hashId: item.hashId,
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
