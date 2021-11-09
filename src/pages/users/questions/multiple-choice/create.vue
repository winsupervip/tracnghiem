<template>
  <CreateSingleQuestion
    question-type="multiple-choice"
    question-type-id="2"
    question-title="Thêm câu hỏi nhiều lựa chọn"
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
      return handler.multipleChoice(data)
    },
  },
})
</script>
