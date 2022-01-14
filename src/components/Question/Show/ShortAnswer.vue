<template>
  <div class="">
    <div
      class="question-content text-smd"
      v-html="questionlist.questionContent"
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
import mathType from '@/extensions/mathType'
export default defineComponent({
  name: 'ShortAnswer',
  mixins: [mathType],
  props: {
    questionlist: {
      type: Object,
      required: true,
    },
  },
})
</script>
