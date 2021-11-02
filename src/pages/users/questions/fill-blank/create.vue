<template>
  <CreateSingleQuestion
    question-type="fill-blank"
    question-type-id="5"
    question-title="Thêm câu hỏi điền vào chổ trống"
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
