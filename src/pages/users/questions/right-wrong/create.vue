<template>
  <CreateSingleQuestion
    question-type="right-wrong"
    question-type-id="3"
    question-title="Thêm câu hỏi đúng sai"
    :handle-answer="handleAnswer"
  />
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { mapActions } from 'vuex'
import handler from '@/utils/question/handleAnswer.js'
import CreateSingleQuestion from '@/components/Question/CreateSingleQuestion.vue'
export default defineComponent({
  auth: true,
  components: {
    CreateSingleQuestion,
  },
  layout: 'dashboard',
  setup() {},
  methods: {
    ...mapActions({
      seedData: 'questions/seedDataForRightWrongAnswer',
    }),
    handleAnswer(data) {
      return handler.singleChoiceAndRightWrong(data)
    },
  },
  // eslint-disable-next-line vue/order-in-components
  mounted() {
    this.seedData()
  },
})
</script>
