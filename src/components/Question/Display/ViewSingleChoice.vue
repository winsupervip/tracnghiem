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
      <div class="list-answer">
        <ul class="list-unstyled p-0">
          <li v-for="(item, index) in question.answers" :key="index">
            <b-form-radio name="anwser-radios" :value="item.hashId">
              <b>{{ String.fromCharCode(65 + index) + '. ' }}</b>
              <div v-html="item.answerContent"></div>
            </b-form-radio>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ViewSingleChoice',
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
::v-deep .list-answer label {
  display: flex !important;
}
</style>
