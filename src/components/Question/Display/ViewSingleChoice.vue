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
          <li v-for="(item, index) in answers" :key="index">
            <b-form-radio
              v-model="selected"
              name="anwser-radios"
              :value="item.hashId"
            >
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
import find from 'lodash/find'
import get from 'lodash/get'

export default defineComponent({
  name: 'ViewSingleChoice',
  props: {
    question: {
      type: Object,
      required: true,
    },
    // eslint-disable-next-line vue/require-prop-types
    userAnswer: {
      required: true,
    },
  },
  setup() {},
  data() {
    return {
      selected: null,
    }
  },
  computed: {
    answers: {
      get() {
        const selected = find(
          this.question.answers,
          (x) => x.userChoice === '1'
        )
        console.log('selected computed answered', selected)
        if (selected) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.selected = selected ? selected.hashId : null
        }

        return get(this.question, 'answers', null)
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit(
          'update:data',
          // eslint-disable-next-line vue/no-mutating-props
          (this.question.answers = val)
        )
      },
    },
  },
  watch: {
    selected() {
      const userChoices = [
        {
          hashId: this.selected,
          choice: '1',
        },
      ]
      console.log('ViewSingleChoice selected', this.selected)
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
