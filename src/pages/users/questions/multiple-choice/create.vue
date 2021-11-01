<template>
  <CreateSingleQuestion
    question-type="multiple-choice"
    question-type-id="2"
    question-title="Thêm câu hỏi nhiều lựa chọn"
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
