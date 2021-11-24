<template>
  <div>
    <CreateSingleQuestion
      :question-type="questionType"
      :question-type-id="questionTypeId"
      :question-title="questionTitle"
      :have-right-answer="ishaveRightAnswer"
      :is-pairing="isPairing"
      :have-random-answer="isHaveRandomAnswer"
      :handle-answer="handleAnswer"
      :is-edit="true"
    />
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  useRoute,
  useAsync,
  reactive,
  toRefs,
  useStore,
} from '@nuxtjs/composition-api'
import { uuid } from 'vue-uuid'
import QuestionApi from '@/api/question-list-page'
import handler from '@/utils/question/handleAnswer.js'
import CreateSingleQuestion from '@/components/Question/CreateSingleQuestion.vue'
export default defineComponent({
  auth: true,
  components: {
    CreateSingleQuestion,
  },
  layout: 'dashboard',
  setup() {
    const store = useStore()
    const route = useRoute()
    const id = computed(() => route.value.params.id)
    const data = reactive({
      questionData: {},
      questionTypeId: '',
      questionType: '',
      questionTitle: '',
      ishaveRightAnswer: false,
      isPairing: false,
      isHaveRandomAnswer: false,
    })
    const questionId = id.value
    console.log(questionId)

    const checkQuestionType = (value) => {
      switch (value.questionTypeId) {
        case 1:
          data.questionType = 'single-choice'
          data.questionTypeId = '1'
          data.questionTitle = 'Thêm câu hỏi 1 lựa chọn'
          break
        case 2:
          data.questionType = 'multiple-choice'
          data.questionTypeId = '2'
          data.questionTitle = 'Thêm câu hỏi nhiều lựa chọn'
          break
        case 3:
          data.questionType = 'right-wrong'
          data.questionTypeId = '3'
          data.questionTitle = 'Thêm câu hỏi đúng sai'
          break
        case 4:
          data.questionType = 'pairing'
          data.questionTypeId = '4'
          data.isPairing = true
          data.questionTitle = 'Thêm câu hỏi ghép đôi'
          break
        case 5:
          data.questionType = 'fill-blank'
          data.questionTypeId = '5'
          data.questionTitle = 'Thêm câu hỏi điền vào chổ trống'
          break
        case 6:
          data.questionType = 'short-answer'
          data.questionTypeId = '6'
          data.questionTitle = 'Thêm câu hỏi trả lời ngắn'
          break
        case 7:
          data.questionType = 'draggable'
          data.questionTypeId = '7'
          data.questionTitle = 'Thêm câu hỏi sắp xếp thứ tự'
          break
      }
    }

    useAsync(async () => {
      const { data } = await QuestionApi.getUserQuestionDetails(questionId)
      data.questionData = data
      const answers = data.questionData.object.answers
      let listAnswer = []
      console.log('answers', answers)
      if (data.questionData.object.question.questionTypeId === 4) {
        const lefts = answers.filter((answer) => answer.position === 1)
        const rights = answers.filter((answer) => answer.position === 2)
        const convertLeft = lefts.map((left) => {
          const right = rights.find((x) => x.rightAnswer === left.rightAnswer)
          return {
            id: uuid.v4(),
            left: {
              id: uuid.v4(),
              position: 1,
              hashId: '',
              plainText: left.plainText,
              rightAnswer: left.rightAnswer,
              random: left.random,
              answerContent: left.answerContent,
            },
            right: {
              id: uuid.v4(),
              position: 2,
              hashId: '',
              plainText: right?.plainText || '',
              rightAnswer: right?.rightAnswer || '',
              random: right?.random || false,
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
      } else {
        listAnswer = answers
      }

      data.questionData.object.answers = listAnswer

      store.dispatch('questions/copyQuestion', data.questionData)
      checkQuestionType(data.object.question)
    })
    return { ...toRefs(data) }
  },
  methods: {
    handleAnswer(data) {
      console.log('chay nxcxce')
      if (this.questionTypeId === '1') {
        console.log('chay ne')
        return handler.singleChoiceAndRightWrong(data)
      }
      if (this.questionTypeId === '2') {
        return handler.multipleChoice(data)
      }
      if (this.questionTypeId === '3') {
        return handler.singleChoiceAndRightWrong(data)
      }
      if (this.questionTypeId === '4') {
        return handler.matching(data)
      }
      if (this.questionTypeId === '5') {
        return handler.fillBlank(data)
      }
      if (this.questionTypeId === '6') {
        return handler.shortAnswer(data)
      }
      if (this.questionTypeId === '7') {
        return handler.draggable(data)
      }
    },
  },
})
</script>

<style></style>
