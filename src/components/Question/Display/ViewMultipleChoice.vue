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
            <b-form-checkbox
              v-model="selected"
              name="anwser-radios"
              :value="item.hashId"
              :checked="item.userChoice == 1"
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
import filter from 'lodash/filter'
import map from 'lodash/map'
import get from 'lodash/get'

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
      selected: null,
    }
  },
  computed: {
    answers: {
      get() {
        let selected = filter(
          this.question.answers,
          (x) => x.userChoice === '1'
        )
        if (selected.length > 0) {
          selected = map(selected, (x) => {
            return x.hashId
          })
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.selected = selected
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
      const userChoices = map(this.selected, (x) => {
        return {
          hashId: x,
          choice: '1',
        }
      })

      console.log('ViewMultiChoice selected', this.selected)
      // this.$emit('collect-user-answer', userChoices)
      this.$emit(
        'update:data',
        // eslint-disable-next-line vue/no-mutating-props
        (this.userAnswer.userChoices = userChoices)
      )
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
