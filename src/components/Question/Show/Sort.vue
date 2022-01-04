<template>
  <div class="questionItem">
    <div class="question-title d-flex justify-content-between">
      <div class="question-name font-bold">
        Câu hỏi {{ question.sortOrder }}
      </div>
    </div>
    <div
      class="question-content text-smd"
      v-html="question.questionContent"
    ></div>

    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">Câu trả lời</span>
      </div>
      <div class="questionItem__listAnswer">
        <draggable draggable=".questionItem__draggable">
          <div
            v-for="item in question.answers"
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

export default defineComponent({
  name: 'Sort',
  components: {
    draggable,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
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
