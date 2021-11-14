<template>
  <CreateSingleQuestion
    question-type="short-answer"
    question-type-id="6"
    question-title="Thêm câu hỏi trả lời ngắn"
    :have-random-answer="false"
    :have-right-answer="false"
    :handle-answer="handleAnswer"
  />
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import CreateSingleQuestion from '@/components/Question/CreateSingleQuestion.vue'
import handler from '@/utils/question/handleAnswer.js'
export default defineComponent({
  auth: true,
  components: {
    CreateSingleQuestion,
  },
  layout: 'dashboard',
  methods: {
    handleAnswer(data) {
      return handler.shortAnswer(data)
    },
  },
})
</script>
