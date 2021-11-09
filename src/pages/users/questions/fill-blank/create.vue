<template>
  <CreateSingleQuestion
    question-type="fill-blank"
    question-type-id="5"
    question-title="Thêm câu hỏi điền vào chổ trống"
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
      return handler.fillBlank(data)
    },
  },
})
</script>
