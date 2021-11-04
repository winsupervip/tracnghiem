<template>
  <div class="question-rightWrong">
    <p v-html="questionlist.description"></p>
    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">câu trả lời</span>
      </div>
      <div class="answer-rightWrong">
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
<style>
.rightAnswer {
  color: #ff645a;
}
.wrongAnswer {
  color: #000;
}
</style>
