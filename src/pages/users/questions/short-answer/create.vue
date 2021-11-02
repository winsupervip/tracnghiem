<template>
  <CreateSingleQuestion
    question-type="short-answer"
    question-type-id="6"
    question-title="Thêm câu hỏi trả lời ngắn"
    :have-random-answer="false"
    :have-right-answer="false"
  />
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import CreateSingleQuestion from '@/components/Question/CreateSingleQuestion.vue'
export default defineComponent({
  auth: true,
  components: {
    CreateSingleQuestion,
  },
  layout: 'dashboard',
})
</script>
