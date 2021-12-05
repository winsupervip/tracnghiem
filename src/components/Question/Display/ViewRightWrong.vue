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
          <li>
            <b-form-radio name="anwser-radios" :value="1">
              <b>{{ String.fromCharCode(65 + 0) + '. ' }}</b>
              <div>Đúng</div>
            </b-form-radio>
          </li>
          <li>
            <b-form-radio name="anwser-radios" :value="0">
              <b>{{ String.fromCharCode(65 + 1) + '. ' }}</b>
              <div>Sai</div>
            </b-form-radio>
          </li>
          <li>
            <b-form-radio name="anwser-radios" :value="-1">
              <b>{{ String.fromCharCode(65 + 2) + '. ' }}</b>
              <div>Không có đáp án</div>
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
  name: 'ViewRightWrong',
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
