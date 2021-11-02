<template>
  <CreateSingleQuestion
    question-type="pairing"
    question-type-id="4"
    question-title="Thêm câu hỏi ghép đôi"
    :have-right-answer="false"
    :is-pairing="true"
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
