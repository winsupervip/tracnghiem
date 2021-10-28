<template>
  <div class="question-pairing">
    <p v-html="questionlist.description"></p>

    <div class="answer-pairing">
      <div class="row_A">
        <p for="">Cột A</p>
        <ul v-for="(answer, index) in questionlist.answers" :key="index">
          <li v-if="answer.position == 1">
            <span
              >{{ String.fromCharCode(65 + index) + '. ' }}
              <p>{{ answer.answerContent }}</p></span
            >

            <treeselect
              class="choose-answer"
              :value="answer.rightAnswer"
              disabled
            />
          </li>
        </ul>
      </div>
      <div class="row_B">
        <p>Cột B</p>
        <ul v-for="(answer, index) in questionlist.answers" :key="index">
          <li v-if="answer.position == 2">
            {{ index + '. ' }}
            <p>{{ answer.answerContent }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import '../../node_modules/bootstrap/scss/bootstrap.scss'
export default defineComponent({
  name: 'QuestionParingList',
  auth: false,
  props: {
    questionlist: {
      type: Object,
      required: true,
    },
  },
  methods: {},
})
</script>
<style lang="scss">
.answer-pairing {
  display: flex;
  .row_A {
    width: 50%;

    & > p {
      text-align: center;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
    }
    ul {
      li {
        span {
          display: flex;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        .choose-answer {
          width: 30%;
        }
      }
    }
  }
  .row_B {
    width: 50%;

    & > p {
      text-align: center;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
    }
    ul {
      li {
        display: flex;
      }
    }
  }
}
</style>
