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
        <div v-for="item in question.answers" :key="item.hashId">
          <div :class="'questionItem__draggable ' + checkTrue(item)">
            <span v-html="item.answerContent"></span>
          </div>
          <span v-if="checkTrue(item) !== 'is-valid' && showRightAnswer">
            Thứ tự đúng: ({{ item.rightAnswer }})
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ViewSort',
  components: {},
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
      userChoices: null,
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    checkTrue(item) {
      if (item.userChoice) {
        if (Number(item.userChoice) === item.rightAnswer) {
          return 'is-valid'
        }
        return 'is-invalid'
      }
      if (item.rightAnswer) return 'is-valid'
      return ''
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
.is-invalid {
  border-color: #ff442b;
}
.is-valid {
  border-color: #27ae60;
}
</style>
