<template>
  <div class="questionItem">
    <div
      class="question-content text-smd"
      v-html="question.questionContent"
    ></div>
    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">Câu trả lời</span>
      </div>
      <div class="questionItem__listAnswer">
        <draggable v-model="answers" draggable=".questionItem__draggable">
          <div
            v-for="item in answers"
            :key="item.hashId"
            class="questionItem__draggable"
          >
            <span v-html="item.answerContent"></span>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import draggable from 'vuedraggable'
import get from 'lodash/get'
import map from 'lodash/map'

export default defineComponent({
  name: 'ViewSort',
  components: {
    draggable,
  },
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
      userChoices: null,
    }
  },
  computed: {
    answers: {
      get() {
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
    answers() {
      const userChoices = map(this.answers, (x, i) => {
        return {
          hashId: x.hashId,
          choice: i + 1 + '',
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
  created() {
    const userChoices = map(this.answers, (x, i) => {
      return {
        hashId: x.hashId,
        choice: i + 1 + '',
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
})
</script>

<style lang="scss" scoped>
.questionItem {
  &__draggable {
    position: relative;
    margin-bottom: 10px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;

    &:hover {
      cursor: move;
    }

    &::before {
      content: '+';
      position: absolute;
      width: 20px;
      height: 20px;
      right: 10px;
    }
  }
}
</style>
