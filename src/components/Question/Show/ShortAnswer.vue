<template>
  <div class="question-item">
    <div class="question-title d-flex justify-content-between">
      <div class="question-name font-bold">
        Câu hỏi {{ question.sortOrder }}
      </div>
      <div class="question-category text-gray">
        <i class="icon-tag" />
        <span class="font-sm">{{ question.seoTitle }}</span>
      </div>
    </div>
    <div
      class="question-content text-smd"
      v-html="question.questionContent"
    ></div>
    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">câu trả lời</span>
      </div>
      <div class="list-answer col-6">
        <b-form-input :disabled="true" placeholder="Nhập đáp án"></b-form-input>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ShortAnswer',
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
})
</script>
