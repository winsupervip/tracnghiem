<template>
  <CreateSingleQuestion
    question-type="pairing"
    question-type-id="4"
    question-title="Thêm câu hỏi ghép đôi"
    :have-right-answer="false"
    :is-pairing="true"
    :handle-answer="handleAnswer"
  />
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
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
      return handler.matching(data)
    },
  },
})
</script>
