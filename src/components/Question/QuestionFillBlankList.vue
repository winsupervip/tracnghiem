<template>
  <div class="question-fillblank">
    <p v-html="questionlist.description"></p>

    <div class="answer-fillblank">
      <ul>
        <li
          v-for="(answer, index) in questionlist.answers"
          :key="index"
          type="none"
        >
          <span :style="{ display: 'flex' }">
            {{ String.fromCharCode(65 + index) + '. ' }}
            <p v-html="answer.answerContent"></p
          ></span>
          <treeselect
            class="choose-answer"
            :value="answer.rightAnswer"
            disabled
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import '../../node_modules/bootstrap/scss/bootstrap.scss'
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
  text-align: center;
  .answer-fillblank {
    width: 100%;

    ul {
      li {
        display: flex;
        justify-content: space-around;
        align-items: center;
        span {
        }
        .choose-answer {
          width: 10vw;
        }
      }
    }
  }
}
</style>
