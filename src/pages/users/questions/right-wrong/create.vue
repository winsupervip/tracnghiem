<template>
  <CreateSingleQuestion
    question-type="right-wrong"
    question-type-id="3"
    question-title="Thêm câu hỏi đúng sai"
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
