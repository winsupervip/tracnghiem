<template>
  <CreateSingleQuestion
    question-type="draggable"
    question-type-id="7"
    question-title="Thêm câu hỏi sắp xếp thứ tự"
    :have-right-answer="false"
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
      return handler.draggable(data)
    },
  },
})
</script>
