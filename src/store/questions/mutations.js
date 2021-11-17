import { uuid } from 'vue-uuid'

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
    state.question.questionContent = data
    state.question.plainText = data
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
    state.question.explainationIfInCorrect = data
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
      // second. set selected = id of new answer
      if (data.answer.rightAnswer === 1) {
        state.selected = data.answer.id
        const answers = state?.answers?.map((item) => {
          item.rightAnswer = 0
          return item
        })
        state.answers = answers
      }
    } else if (data.typeQuestion === 'multiple-choice') {
      // type question multiple choice is have many right answer so when user add a new answer
      // and this answer is right answer of question, i will push answer's id to selected avariable
      if (data.answer.rightAnswer === 1) {
        state.selected.push(data.answer.id)
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
        state.selected = data.answer.id
        const answers = state.answers.map((item) => {
          item.rightAnswer = 0
          return item
        })
        state.answers = answers
      }
      if (
        state.answers[index].rightAnswer === 1 &&
        data.answer.rightAnswer === 0
      ) {
        state.selected = ''
      }
    } else if (data.typeQuestion === 'multiple-choice') {
      if (data.answer.rightAnswer === 1) {
        state.selected.push(data.answer.id)
      }
      if (
        state.answers[index].rightAnswer === 1 &&
        data.answer.rightAnswer === 0
      ) {
        const index = state.selected.findIndex(
          (item) => item === data.answer.id
        )
        state.selected.splice(index, 1)
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
      state.selected.push(data.id)
    } else if (data.action === 'remove') {
      const indexSelected = state.selected.findIndex((item) => item === data.id)
      state.selected.splice(indexSelected, 1)
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
      state.selected = data.id
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
  REST_ANSWERS(state) {
    state.answers = []
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
        answerContent: '<p>sai</p>',
      },
    ]
    state.selected = state.answers[0].id
  },
  // question group //
  ADD_CHILD_QUESTION(state, data) {
    state.childQuestions.push(data)
    const isSelected = {
      id: data.id,
      selected: [],
    }
    state.selectedGroup.push(isSelected)
  },
  ADD_ANSWER_IN_CHILD_QUESTION(state, data) {
    const index = state.childQuestions.findIndex((item) => item.id === data.id)
    state.childQuestions[index].answers.push(data.answer)
    if (data.answer.rightAnswer === 1) {
      state.selected = data.answer.id
    }
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
  // group question
  ADD_CHILD_QUESTION_CONTENT(state, data) {
    const index = state.childQuestions.findIndex((item) => item.id === data.id)
    state.childQuestions[index].question.questionContent = data.value
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
    const indexSelectedQuestion = state.selectedGroup.findIndex(
      (item) => item.id === data.id
    )
    if (typeQuestion === 'single-choice' || typeQuestion === 'right-wrong') {
      // when user update a answer update(right-wrong, single-choice, multiple-choice)
      // case 1. atribute rightAnswer is true and the value update is false
      //          set value of select = ''
      // case 2.  atribute rightAnswer is false and the value update is true
      //          set value of select = id of update value

      if (data.answer.rightAnswer === 1) {
        state.selectedGroup[index].selected = data.answer.id
        const answers = state.childQuestions[index].answers.map((item) => {
          item.rightAnswer = 0
          return item
        })
        state.answers = answers
      }
      if (
        state.childQuestions[index].answers[indexAnswer].rightAnswer === 1 &&
        data.answer.rightAnswer === 0
      ) {
        state.selectedGroup[indexSelectedQuestion].selected = ''
      }
    } else if (typeQuestion === 'multiple-choice') {
      if (data.answer.rightAnswer === 1) {
        state.selectedGroup[indexSelectedQuestion].selected.push(data.answer.id)
      }
      if (
        state.childQuestions[index].answers[indexAnswer].rightAnswer === 1 &&
        data.answer.rightAnswer === 0
      ) {
        const indexAnswerOfQuestion = state.selectedGroup[
          index
        ].answers.findIndex((item) => item === data.answer.id)
        state.selectedGroup[index].answers.splice(indexAnswerOfQuestion, 1)
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
      // state.selected.push(data.id)
    } else if (data.action === 'remove') {
      // const indexSelected = state.selected.findIndex((item) => item === data.id)
      // state.selected.splice(indexSelected, 1)
      state.childQuestions[indexChildQuestion].answers[
        indexAnswerOfChildQuestion
      ].rightAnswer = 1
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
      // state.selected = data.id
      state.childQuestions[indexChildQuestion].answers = answers
    }
  },
}
