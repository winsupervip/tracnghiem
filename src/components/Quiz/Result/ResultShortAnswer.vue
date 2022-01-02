<template>
  <div class="question-item">
    <div
      class="question-content text-smd"
      v-html="question.questionContent"
    ></div>
    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">câu trả lời</span>
      </div>
      <div class="list-answer col-6">
        <b-form-input
          v-model="contentAnswer"
          :disabled="true"
          placeholder="Nhập đáp án"
          :state="question.isCorrect"
        ></b-form-input>
      </div>
      <div v-if="showRightAnswer" class="answer-head">
        <span class="font-sm text-gray">các đáp án khác</span>
      </div>
      <div v-if="showRightAnswer" class="list-answer col-6">
        <template v-for="answer in question.answers">
          <b-form-input
            v-if="answer.answerContent !== contentAnswer"
            :key="answer.hashId"
            v-model="answer.answerContent"
            :disabled="true"
            placeholder="Nhập đáp án"
            class="mb-2"
          ></b-form-input>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ViewShortAnswer',
  props: {
    question: {
      type: Object,
      required: true,
    },
    showRightAnswer: {
      type: Boolean,
      required: true,
    },
  },
  setup() {},
  data() {
    return {
      contentAnswer: '',
    }
  },
  created() {
    if (this.question.answers.length > 0) {
      const answered = this.question.answers[0]
      this.contentAnswer = answered.userChoice
    }
  },
})
</script>
