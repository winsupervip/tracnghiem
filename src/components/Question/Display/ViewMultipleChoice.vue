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
            <b-form-checkbox
              v-model="selected"
              name="anwser-radios"
              :value="item.hashId"
            >
              <b>{{ String.fromCharCode(65 + index) + '. ' }}</b>
              <div v-html="item.answerContent"></div>
            </b-form-checkbox>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import map from 'lodash/map'

export default defineComponent({
  name: 'ViewMultipleChoice',
  props: {
    question: {
      type: Object,
      required: true,
    },
    userAnswer: {
      type: Object,
      required: true,
    },
  },
  setup() {},
  data() {
    return {
      selected: [],
    }
  },
  watch: {
    selected() {
      const userChoices = map(this.selected, (x) => {
        return {
          hashId: x,
          choice: '1',
        }
      })

      console.log('ViewRightWrong selected', this.selected)
      // this.$emit('collect-user-answer', userChoices)
      this.$emit(
        'update:data',
        // eslint-disable-next-line vue/no-mutating-props
        (this.userAnswer.userChoices = userChoices)
      )
    },
  },
})
</script>

<style lang="scss" scoped>
::v-deep .list-answer label {
  display: flex !important;
}
</style>
