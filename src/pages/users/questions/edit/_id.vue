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
    store.dispatch('questions/restData')
    const id = computed(() => route.value.params.id)
    const data = reactive({
      questionTypeId: 0,
      questionType: '',
      questionTitle: '',
      ishaveRightAnswer: true,
      isPairing: false,
      isHaveRandomAnswer: true,
    })
    const questionId = id.value
    console.log(questionId)

    const checkQuestionType = (value) => {
      switch (value.questionTypeId) {
        case 1:
          data.questionType = 'single-choice'
          data.questionTypeId = 1
          data.questionTitle = 'Thêm câu hỏi 1 lựa chọn'
          break
        case 2:
          data.questionType = 'multiple-choice'
          data.questionTypeId = 2
          data.questionTitle = 'Thêm câu hỏi nhiều lựa chọn'
          break
        case 3:
          data.questionType = 'right-wrong'
          data.questionTypeId = 3
          data.questionTitle = 'Thêm câu hỏi đúng sai'
          break
        case 4:
          data.questionType = 'pairing'
          data.questionTypeId = 4
          data.isPairing = true
          data.isHaveRandomAnswer = false
          data.questionTitle = 'Thêm câu hỏi ghép đôi'
          break
        case 5:
          data.questionType = 'fill-blank'
          data.questionTypeId = 5
          data.questionTitle = 'Thêm câu hỏi điền vào chổ trống'
          data.isHaveRandomAnswer = false
          break
        case 6:
          data.questionType = 'short-answer'
          data.questionTypeId = 6
          data.questionTitle = 'Thêm câu hỏi trả lời ngắn'
          data.isHaveRandomAnswer = false
          data.isHaveRandomAnswer = false
          break
        case 7:
          data.questionType = 'draggable'
          data.questionTypeId = 7
          data.questionTitle = 'Thêm câu hỏi sắp xếp thứ tự'
          data.isHaveRandomAnswer = false
          break
      }
    }

    useAsync(async () => {
      const result = await QuestionApi.getUserQuestionDetails(questionId)
      console.log('day la result', result)
      const answers = result.data.object.answers
      let listAnswer = []
      if (result.data.object.question.questionTypeId === 4) {
        const lefts = answers.filter((answer) => answer.position === 1)
        const rights = answers.filter((answer) => answer.position === 2)
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
      } else {
        listAnswer = answers.map((item) => {
          item.id = uuid.v4()
          return item
        })
      }

      result.data.object.answers = listAnswer
      console.log('update', result.data)
      await store.dispatch('questions/copyQuestion', result.data)
      checkQuestionType(result.data.object.question)
    })

    return { ...toRefs(data) }
  },
  methods: {
    handleAnswer(data) {
      if (this.questionType === 'single-choice') {
        return handler.singleChoiceAndRightWrong(data)
      }
      if (this.questionType === 'multiple-choice') {
        return handler.multipleChoice(data)
      }
      if (this.questionType === 'right-wrong') {
        return handler.singleChoiceAndRightWrong(data)
      }
      if (this.questionType === 'pairing') {
        return handler.matching(data)
      }
      if (this.questionType === 'fill-blank') {
        return handler.fillBlank(data)
      }
      if (this.questionType === 'short-answer') {
        return handler.shortAnswer(data)
      }
      if (this.questionType === 'draggable') {
        return handler.draggable(data)
      }
    },
  },
})
</script>

<style></style>
