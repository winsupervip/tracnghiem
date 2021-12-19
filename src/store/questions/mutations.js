import { uuid } from 'vue-uuid'
const checkTypeQuesstion = (value) => {
  if (value === 1) {
    return {
      name: 'Thêm câu hỏi 1 lựa chọn',
      typeQuestion: 'single-choice',
    }
  } else if (value === 2) {
    return {
      name: 'Thêm câu hỏi nhiều lựa chọn',
      typeQuestion: 'multiple-choice',
    }
  } else if (value === 3) {
    return {
      name: 'Thêm câu hỏi đúng sai',
      typeQuestion: 'right-wrong',
    }
  } else if (value === 4) {
    return {
      name: 'Thêm câu hỏi ghép đôi',
      typeQuestion: 'pairing',
    }
  } else if (value === 5) {
    return {
      name: 'Thêm câu hỏi điền vào chỗ trống',
      typeQuestion: 'fill-blank',
    }
  } else if (value === 6) {
    return {
      name: 'Thêm câu hỏi trả lời ngắn',
      typeQuestion: 'short-answer',
    }
  } else if (value === 7) {
    return {
      name: 'Thêm câu hỏi sắp xếp thứ tự',
      typeQuestion: 'draggable',
    }
  }
}
const converListAnswer = (value, questionTypeId) => {
  console.log(value, questionTypeId)
  if (questionTypeId !== 4) {
    const answers = value.map((item) => {
      item.id = uuid.v4()
      return item
    })
    return answers
  } else {
    let listAnswer = []
    const lefts = value.filter((answer) => answer.position === 1)
    const rights = value.filter((answer) => answer.position === 2)
    const convertLeft = lefts.map((left) => {
      const right = rights.find((x) => x.rightAnswer === left.rightAnswer)
      return {
        id: uuid.v4(),
        left: {
          id: uuid.v4(),
          position: 1,
          hashId: left.hashId || '',
          plainText: left.plainText || '',
          rightAnswer: left.rightAnswer || 0,
          random: left.random || true,
          answerContent: left.answerContent,
        },
        right: {
          id: uuid.v4(),
          position: 2,
          hashId: right.hashId,
          plainText: right?.plainText || '',
          rightAnswer: right?.rightAnswer || 0,
          random: right?.random || true,
          answerContent: right?.answerContent || '',
        },
      }
    })
    const convertRight = rights
      .filter((x) => !lefts.find((l) => l.rightAnswer === x.rightAnswer))
      .map((x) => ({
        id: uuid.v4(),
        left: {
          id: uuid.v4(),
          position: 1,
          hashId: '',
          plainText: '',
          rightAnswer: '',
          random: false,
          answerContent: '',
        },
        right: {
          id: uuid.v4(),
          position: 2,
          hashId: '',
          plainText: x.plainText,
          rightAnswer: x.rightAnswer,
          random: x.random,
          answerContent: x.answerContent,
        },
      }))
    listAnswer = [...convertLeft, ...convertRight]
    return listAnswer
  }
}
export default {
  ADD_CATEGORY(state, data) {
    state.question.categories = data
  },

  ADD_TITLE(state, data) {
    console.log('mutation chạy')
    state.question.title = data
  },

  ADD_TAGS(state, data) {
    state.question.tags = data
  },

  ADD_QUESTION_CONTENT(state, data) {
    state.question.questionContent = data.questionContent
    state.question.plainText = data.questionPlanText
  },

  ADD_STATUS(state, data) {
    state.question.statusId = data
  },

  ADD_LEVEL(state, data) {
    state.question.levelId = data
  },
  ADD_SEO_AVATART(state, data) {
    state.question.seoAvatar = data
  },
  ADD_SEO_TITLE(state, data) {
    state.question.seoTitle = data
  },
  ADD_SEO_DESCRIPTION(state, data) {
    state.question.seoDescription = data
  },

  ADD_EXPLAINATION_IF_IN_CORRECT(state, data) {
    state.question.explainationIfIncorrect = data
  },

  ADD_EXPLAINATION_IF_CORRECT(state, data) {
    state.question.explainationIfCorrect = data
  },

  HANDLE_ADD_ANSWER(state, data) {
    if (
      data.typeQuestion === 'single-choice' ||
      data.typeQuestion === 'right-wrong'
    ) {
      // when user add a answer and this  answer is the right of question
      // first . update rightAnswer  in current listAnswer = 0(false)

      if (data.answer.rightAnswer === 1) {
        const answers = state?.answers?.map((item) => {
          item.rightAnswer = 0
          return item
        })
        state.answers = answers
      }
    } else if (data.typeQuestion === 'draggable') {
      // type question sort when user add a new answer
      //  this is  a right answer of question
      // i will set rightAnswer atribute of this answer = state.answers.length + 1
      data.answer.rightAnswer = state.answers.length + 1
    }
    // with question short answer all answer is right
    // with question fill blank user must chose in ui select to set right answer
    state.answers.push(data.answer)
  },

  HANDLE_UPDATE_ANSWER(state, data) {
    const index = state.answers.findIndex((item) => {
      return item.id === data.answer.id
    })

    if (
      data.typeQuestion === 'single-choice' ||
      data.typeQuestion === 'right-wrong'
    ) {
      // when user update a answer update(right-wrong, single-choice, multiple-choice)
      // case 1. atribute rightAnswer is true and the value update is false
      //          set value of select = ''
      // case 2.  atribute rightAnswer is false and the value update is true
      //          set value of select = id of update value
      if (data.answer.rightAnswer === 1) {
        const answers = state.answers.map((item) => {
          item.rightAnswer = 0
          return item
        })
        state.answers = answers
      }
    } else if (data.typeQuestion === 'pairing') {
      try {
        state.answers[index].left.plainText = data.answer?.left.plainText
        state.answers[index].left.answerContent =
          data.answer?.left.answerContent
        state.answers[index].left.random = data.answer?.left.random

        state.answers[index].right.plainText = data.answer?.right.plainText
        state.answers[index].right.answerContent =
          data.answer?.right.answerContent
        state.answers[index].right.random = data.answer?.right.random
      } catch (error) {
        console.log(error)
      }

      return 0
    }
    state.answers[index].plainText = data.answer.plainText
    state.answers[index].rightAnswer = data.answer.rightAnswer
    state.answers[index].random = data.answer.random
    state.answers[index].answerContent = data.answer.answerContent
  },

  HANDLE_UPDATE_ANSWER_FOR_DRAGGABLE(state, data) {
    const answers = data.map((item, index) => {
      item.rightAnswer = index + 1
      return item
    })
    state.answers = answers
  },

  ADD_VALUE_UPDATE_ANSWER(state, data) {
    state.updateValueAnswer = data
  },
  HANDLE_USER_CHOOSE_RIGHT_ANSWER(state, data) {
    // action change => single-choice and right-wrong
    // action add and remvoe => multiple-choice

    const index = state.answers.findIndex((item) => item.id === data.id)
    if (data.action === 'add') {
      state.answers[index].rightAnswer = 1
    } else if (data.action === 'remove') {
      state.answers[index].rightAnswer = 0
    } else if (data.action === 'change') {
      const answers = state.answers?.map((item) => {
        if (item.id !== data.id) {
          item.rightAnswer = 0
        } else {
          item.rightAnswer = 1
        }
        return item
      })
      state.answers = answers
    }
  },
  HANDLE_UPDATE_SELECT_FOR_FILL_BLANK(state, data) {
    const index = state.answers.findIndex((item) => item.id === data.id)
    state.answers[index].rightAnswer = data.index
  },
  REMOVE_VALUE_UPDATE_ANSWER(state) {
    state.updateValueAnswer = {}
  },

  DELETE_ANSWER(state, data) {
    const index = state.answers.findIndex((item) => item.id === data)
    state.answers.splice(index, 1)
  },
  REST_DATA(state) {
    state.question = {
      questionContent: '',
      plainText: '',
      isRandom: false,
      categories: [],
      statusId: 3,
      levelId: 1,
      seoAvatar: 'https://storage.tracnghiem.vn/tracnghiem-dev/exam-avatar.png',
      seoTitle: '',
      seoDescription: '',
      explainationIfCorrect: '',
      explainationIfIncorrect: '',
      tags: [],
      title: '',
      position: 0,
      hasNoCorrectAnswer: false,
    }
    state.answers = []
    state.childQuestions = []
    state.updateValueAnswer = {}
    state.updateValue = {}
    state.errors = []
  },
  COPY_QUESTIONS(state, data) {
    const question = data.object.question
    const answers = data.object.answers
    state.question = question
    state.answers = answers
  },
  COPY_GROUP_QUESTION(state, data) {
    console.log('da', data)
    const questionGroup = data.object.questionGroup
    if (data.object.questions.length > 0) {
      const temp = data.object.questions[0]
      state.question = {
        ...state.question,
        hashId: questionGroup.hashId,
        questionContent: questionGroup.description,
        explainationIfCorrect: temp.explainationIfCorrect,
        explainationIfIncorrect: temp.explainationIfIncorrect,
        seoAvatar: questionGroup.seoAvatar,
        seoDescription: questionGroup.seoDescription,
        seoTitle: questionGroup.seoTitle,
        // statusId: questionGroup.statusId,
        categories: temp.categories,
        tags: temp.tags,
        title: questionGroup.title,
        levelId: temp.levelId,
        statusId: questionGroup.statusId,
        plainText: temp.plainText,
        hasNoCorrectAnswer: temp.hasNoCorrectAnswer,
      }
      const convertChildQuestion = data.object.questions.map((item) => {
        console.log('item ne', item)
        const child = {
          id: uuid.v4(),
          name: checkTypeQuesstion(item.questionTypeId).name,
          typeQuestion: checkTypeQuesstion(item.questionTypeId).typeQuestion,
          question: {
            hashId: item.hashId,
            title: item.title,
            questionTypeId: item.questionTypeId,
            questionContent: item.questionContent,
            explainationIfCorrect: item.explainationIfCorrect,
            explainationIfIncorrect: item.explainationIfIncorrect,
            statusId: item.statusId,
            levelId: item.levelId,
            plainText: item.plainText,
            seoAvatar: item.seoAvatar,
            seoTitle: item.seoTitle,
            seoDescription: item.seoDescription,
            tags: item.tags,
            categories: item.categories,
            questionGroupId: item.questionGroupId,
            groupOrder: item.groupOrder,
            hasNoCorrectAnswer: item.hasNoCorrectAnswer,
          },
          answers: converListAnswer(item.answers, item.questionTypeId),
        }
        return child
      })
      state.childQuestions = convertChildQuestion
    }
    // state.childQuestions = questions
  },
  SET_NULL_ID_ANSWER(state, aIndex) {
    state.answers[aIndex].id = undefined
  },
  SEED_DATA_FOR_RIGHT_WRONG_ANSWER(state) {
    state.answers = [
      {
        id: uuid.v4(),
        position: 0,
        hashId: '',
        plainText: 'Đúng',
        rightAnswer: 1,
        random: true,
        answerContent: '<p>Đúng</p>',
      },
      {
        id: uuid.v4(),
        position: 0,
        hashId: '',
        plainText: 'Sai',
        rightAnswer: 0,
        random: true,
        answerContent: '<p>Sai</p>',
      },
    ]
  },
  // question group //
  ADD_CHILD_QUESTION(state, data) {
    state.childQuestions.push(data)
  },
  ADD_ANSWER_IN_CHILD_QUESTION(state, data) {
    const index = state.childQuestions.findIndex((item) => item.id === data.id)
    let answers = []
    if (
      state.childQuestions[index].typeQuestion === 'single-choice' ||
      state.childQuestions[index].typeQuestion === 'right-wrong'
    ) {
      if (data.answer.rightAnswer === 1) {
        answers = state.childQuestions[index].answers.map((item) => {
          item.rightAnswer = 0
          return item
        })
        answers.push(data.answer)
        state.childQuestions[index].answers = answers
        return
      }
    }
    state.childQuestions[index].answers.push(data.answer)
  },
  IS_RANDOM(state, data) {
    const index = state.answers.findIndex((item) => item.id === data)
    const value = state.answers[index]
    if (value?.left) {
      state.answers[index].left.random = !state.answers[index].left.random
      state.answers[index].right.random = !state.answers[index].right.random
    } else {
      state.answers[index].random = !state.answers[index].random
    }
  },
  ADD_CHILD_QUESTION_CONTENT(state, data) {
    console.log(data)
    const index = state.childQuestions.findIndex((item) => item.id === data.id)
    state.childQuestions[index].question.questionContent = data.value
    state.childQuestions[index].question.plainText = data.questionPlantext
  },
  DELETE_CHILD_QUESTION(state, data) {
    const index = state.childQuestions.findIndex((item) => item.id === data)
    state.childQuestions.splice(index, 1)
  },
  UPDATE_ANSWER_QUESTION_CHILD(state, data) {
    const index = state.childQuestions.findIndex((item) => item.id === data.id)
    const typeQuestion = state.childQuestions[index].typeQuestion
    const indexAnswer = state.childQuestions[index].answers.findIndex(
      (item) => item.id === data.answer.id
    )
    if (typeQuestion === 'single-choice' || typeQuestion === 'right-wrong') {
      // when user update a answer update(right-wrong, single-choice, multiple-choice)
      // case 1. atribute rightAnswer is true and the value update is false
      //          set value of select = ''
      // case 2.  atribute rightAnswer is false and the value update is true
      //          set value of select = id of update value

      if (data.answer.rightAnswer === 1) {
        const answers = state.childQuestions[index].answers.map((item) => {
          item.rightAnswer = 0
          return item
        })
        state.answers = answers
      }
    } else if (typeQuestion === 'pairing') {
      try {
        state.childQuestions[index].answers[indexAnswer].left.plainText =
          data.answer?.left.plainText
        state.childQuestions[index].answers[indexAnswer].left.answerContent =
          data.answer?.left.answerContent
        state.childQuestions[index].answers[indexAnswer].left.random =
          data.answer?.left.random

        state.childQuestions[index].answers[indexAnswer].right.plainText =
          data.answer?.right.plainText
        state.childQuestions[index].answers[indexAnswer].right.answerContent =
          data.answer?.right.answerContent
        state.childQuestions[index].answers[indexAnswer].right.random =
          data.answer?.right.random
      } catch (error) {
        console.log(error)
      }

      return 0
    }
    state.childQuestions[index].answers[indexAnswer].plainText =
      data.answer.plainText
    state.childQuestions[index].answers[indexAnswer].rightAnswer =
      data.answer.rightAnswer
    state.childQuestions[index].answers[indexAnswer].random = data.answer.random
    state.childQuestions[index].answers[indexAnswer].answerContent =
      data.answer.answerContent
  },
  DELETE_ANSWER_OF_CHILD_QUESTION(state, data) {
    const index = state.childQuestions.findIndex(
      (item) => item.id === data.questionChildId
    )
    const answerIndex = state.childQuestions[index].answers.findIndex(
      (item) => item.id === data.answerId
    )
    state.childQuestions[index].answers.splice(answerIndex, 1)
  },
  HANDLE_UPDATE_DRAGGBLE_ANSWER_FOR_QUESTION(state, data) {
    const index = state.childQuestions.findIndex(
      (item) => item.id === data.questionId
    )
    state.childQuestions[index].answers = data.answers
  },
  HANDLE_USER_CHOOSE_RIGHT_ANSWER_OF_CHILD_QUESTION(state, data) {
    // action change => single-choice and right-wrong
    // action add and remvoe => multiple-choice

    const indexChildQuestion = state.childQuestions.findIndex(
      (item) => item.id === data.questionChildId
    )
    const indexAnswerOfChildQuestion = state.childQuestions[
      indexChildQuestion
    ].answers.findIndex((item) => item.id === data.answerId)
    if (data.action === 'add') {
      state.childQuestions[indexChildQuestion].answers[
        indexAnswerOfChildQuestion
      ].rightAnswer = 1
    } else if (data.action === 'remove') {
      state.childQuestions[indexChildQuestion].answers[
        indexAnswerOfChildQuestion
      ].rightAnswer = 0
    } else if (data.action === 'change') {
      const answers = state.childQuestions[indexChildQuestion].answers?.map(
        (item) => {
          if (item.id !== data.answerId) {
            item.rightAnswer = 0
          } else {
            item.rightAnswer = 1
          }
          return item
        }
      )
      state.childQuestions[indexChildQuestion].answers = answers
    }
  },
  HANDLE_UPDATE_SELECT_FILL_BLANK_GROUP_QUESTION(state, data) {
    const index = state.childQuestions.findIndex(
      (item) => item.id === data.questionId
    )
    const answerIndex = state.childQuestions[index].answers.findIndex(
      (item) => item.id === data.answerId
    )
    state.childQuestions[index].answers[answerIndex].rightAnswer = data.index
  },
  HAS_NO_CORRECT_ANSWER_G(state, data) {
    const index = state.childQuestions.findIndex((item) => item.id === data.id)
    state.childQuestions[index].question.hasNoCorrectAnswer = data.value
  },
  HAS_NO_CORRECT_ANSWER_S(state, data) {
    state.question.hasNoCorrectAnswer = data
  },
}
