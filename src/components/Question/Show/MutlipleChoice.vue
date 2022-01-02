<template>
  <div class="question-item">
    <div
      class="question-content text-smd"
      v-html="question.item.questionContent"
    ></div>
    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">câu trả lời</span>
      </div>
      <div class="list-answer">
        <ul class="list-unstyled p-0">
          <li v-for="(item, index) in question.item.answers" :key="index">
            <b-form-checkbox name="anwser-radios" :value="item.hashId">
              <b>{{ String.fromCharCode(65 + index) + '. ' }}</b>
              <div class="ms-1" v-html="item.answerContent"></div>
            </b-form-checkbox>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MultipleChoice',
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
::v-deep .list-answer label {
  display: flex !important;
}
</style>
