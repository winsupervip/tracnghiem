<template>
  <div class="question-singleChoice">
    <p v-html="questionlist.description"></p>
    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">{{ $t('answer') }}</span>
      </div>
      <div class="answer-singleChoice">
        <ul class="list-unstyled p-0 m-0">
          <li
            v-for="(answer, index) in questionlist.answers"
            :key="index"
            type="none"
          >
            <span
              :style="{ display: 'flex' }"
              :class="answer.rightAnswer ? 'rightAnswer' : 'wrongAnswer'"
            >
              {{ String.fromCharCode(65 + index) + '. ' }}
              <p v-html="answer.answerContent"></p>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'QuestionSingleChoiceList',
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
.rightAnswer {
  color: #ff645a;
}
.wrongAnswer {
  color: #000;
}
</style>
