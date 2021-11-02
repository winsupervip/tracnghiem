<template>
  <CreateSingleQuestion
    question-type="draggable"
    question-type-id="7"
    question-title="Thêm câu hỏi trả lời ngắn"
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
