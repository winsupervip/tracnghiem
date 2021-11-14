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
      console.log(data.questionData)
      store.dispatch('questions/copyQuestion', data.questionData)
      checkQuestionType(data.object.question)
    })
    return { ...toRefs(data) }
  },
  methods: {
    handleAnswer(data) {
      if (this.questionTypeId === 1) {
        return handler.singleChoiceAndRightWrong(data)
      }
      if (this.questionTypeId === 2) {
        return handler.multipleChoice(data)
      }
      if (this.questionTypeId === 3) {
        return handler.singleChoiceAndRightWrong(data)
      }
      if (this.questionTypeId === 4) {
        return handler.matching(data)
      }
      if (this.questionTypeId === 5) {
        return handler.fillBlank(data)
      }
      if (this.questionTypeId === 6) {
        return handler.shortAnswer(data)
      }
      if (this.questionTypeId === 7) {
        return handler.draggable(data)
      }
    },
  },
})
</script>

<style></style>
