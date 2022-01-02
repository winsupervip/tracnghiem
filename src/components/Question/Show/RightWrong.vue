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
      <div class="list-answer">
        <ul class="list-unstyled p-0">
          <li v-for="(item, index) in question.answers" :key="index">
            <b-form-radio name="anwser-radios" :value="item.hashId">
              <b>{{ String.fromCharCode(65 + index) + '. ' }}</b>
              <div class="ms-1" v-html="item.answerContent"></div>
            </b-form-radio>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'RightWrong',
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
