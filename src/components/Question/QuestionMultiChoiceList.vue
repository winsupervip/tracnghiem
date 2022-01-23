<template>
  <div class="question-item">
    <p
      class="question-content text-smd"
      v-html="questionlist.questionContent"
    ></p>
    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">{{ $t('answer') }}</span>
      </div>
      <div class="list-answer">
        <ul class="list-unstyled p-0 m-0">
          <li
            v-for="(answer, index) in questionlist.answers"
            :key="index"
            type="none"
            class="d-flex justify-content-between"
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
