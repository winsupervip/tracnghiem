<template>
  <div class="question-shortAnswer">
    <p v-html="questionlist.description"></p>

    <div class="answer-shortAnswer">
      <input
        v-for="(answer, index) in questionlist.answers"
        :key="index"
        type="text"
        disabled
        :value="answer.answerContent"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import '../../node_modules/bootstrap/scss/bootstrap.scss'
export default defineComponent({
  name: 'QuestionRightWrongList',
  auth: false,
  props: {
    questionlist: {
      type: Object,
      required: true,
    },
  },
})
</script>
<style lang="scss">
.question-shortAnswer {
  p {
    text-align: center;
  }
  .answer-shortAnswer {
    input {
      display: block;
      width: 20%;
      margin: 10px 50px 0;
    }
  }
}
</style>
