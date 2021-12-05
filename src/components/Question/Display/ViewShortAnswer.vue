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
        <b-form-input placeholder="Nhập đáp án"></b-form-input>
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
  },
  setup() {},
})
</script>
