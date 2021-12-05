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
        <draggable>
          <div
            v-for="element in myArray"
            :key="element.id"
            class="questionItem__draggable"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import draggable from 'vuedraggable'

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
  },
  setup() {},
  data() {
    return {
      myArray: [
        { name: 'John', id: 0 },
        { name: 'Joao', id: 1 },
        { name: 'Jean', id: 2 },
      ],
    }
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
