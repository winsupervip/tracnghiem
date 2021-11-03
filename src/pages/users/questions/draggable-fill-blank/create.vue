<template>
  <CreateSingleQuestion
    question-type="draggable"
    question-type-id="7"
    question-title="Thêm câu hỏi sắp xếp thứ tự"
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
