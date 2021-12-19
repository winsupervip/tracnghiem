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
      <div class="list-answered">
        <ul class="list-unstyled p-0">
          <li
            v-for="(item, index) in question.answers"
            :key="index"
            :class="checkTrue(item)"
          >
            <div class="check"></div>
            <b>{{ String.fromCharCode(65 + index) + '. ' }}</b>
            <div class="ms-1" v-html="item.answerContent"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ViewMultipleChoice',
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
      selected: [],
    }
  },
  computed: {},
  methods: {
    checkTrue(item) {
      if (item.userChoice) {
        if (Number(item.userChoice) === item.rightAnswer) {
          return 'true'
        }
        return 'false'
      }
      if (item.rightAnswer && this.showRightAnswer) return 'true'
      return ''
    },
  },
  // created() {
  //   this.selected = null
  // },
})
</script>

<style lang="scss" scoped>
::v-deep .list-answer label {
  display: flex !important;
}
</style>
