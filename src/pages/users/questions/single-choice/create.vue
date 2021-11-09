<template>
  <CreateSingleQuestion
    question-type="single-choice"
    question-type-id="1"
    question-title="Thêm câu hỏi 1 lựa chọn"
    :handle-answer="handleAnswer"
  />
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
// eslint-disable-next-line no-unused-vars
import handler from '@/utils/question/handleAnswer.js'
import CreateSingleQuestion from '@/components/Question/CreateSingleQuestion.vue'
export default defineComponent({
  auth: true,
  components: {
    CreateSingleQuestion,
  },
  layout: 'dashboard',
  methods: {
    handleAnswer(data) {
      return handler.singleChoiceAndRightWrong(data)
    },
  },
})
</script>
