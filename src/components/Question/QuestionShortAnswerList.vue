<template>
  <div class="question-shortAnswer">
    <p v-html="questionlist.description"></p>
    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">{{ $t('answer') }}</span>
      </div>
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
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
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
<style lang="scss" scoped>
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
