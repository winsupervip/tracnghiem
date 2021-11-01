<template>
  <CreateSingleQuestion
    question-type="single-choice"
    question-type-id="1"
    question-title="Thêm câu hỏi 1 lựa chọn"
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
