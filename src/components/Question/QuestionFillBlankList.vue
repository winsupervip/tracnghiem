<template>
  <div class="question-item">
    <p
      class="question-content text-smd"
      v-html="questionlist.questionContent"
    ></p>
    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">{{ $t('answer') }}</span>
      </div>
      <div class="list-answer">
        <ul>
          <li
            v-for="(answer, index) in questionlist.answers"
            :key="index"
            type="none"
            class="d-flex justify-content-between"
          >
            <span :style="{ display: 'flex' }">
              {{ String.fromCharCode(65 + index) + '. ' }}
              <p
                class="question-content text-smd"
                v-html="answer.answerContent"
              ></p
            ></span>
            <input type="text" :value="answer.rightAnswer" disabled />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'QuestionRightWrongList',
  auth: false,
  props: {
    questionlist: {
      type: Object,
      required: true,
    },
  },
})
</script>
<style lang="scss">
.question-fillblank {
  .answer-fillblank {
    width: 100%;

    ul {
      li {
        display: flex;
        justify-content: space-around;
        align-items: center;

        input {
          width: 10%;
          text-align: center;
        }
      }
    }
  }
}
</style>
