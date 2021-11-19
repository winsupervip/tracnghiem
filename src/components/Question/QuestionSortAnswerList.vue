<template>
  <div class="question-sortAnswer">
    <p v-html="questionlist.description"></p>
    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">{{ $t('answer') }}</span>
      </div>
      <div class="answer-sortAnswer">
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
.question-sortAnswer {
  p {
    text-align: center;
  }
  .answer-sortAnswer {
    input {
      display: block;
      width: 80%;
      margin: 10px 0;
    }
  }
}
</style>
