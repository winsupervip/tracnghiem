<template>
  <div class="question-pairing">
    <p v-html="questionlist.description"></p>
    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">{{ $t('answer') }}</span>
      </div>
      <div class="answer-pairing">
        <table>
          <div class="row_A">
            <tr>
              <th>{{ $t('rowA') }}</th>
              <th>{{ $t('rowB') }}</th>
            </tr>
            <tr v-for="answer in rowA" :key="answer.id">
              <td>
                <span>
                  <p>{{ answer.answerContent }}</p></span
                >
              </td>
              <td>
                <span>
                  <p>
                    {{ findAnswer(answer.rightAnswer).answerContent }}
                  </p></span
                >
              </td>
            </tr>
            <tr
              v-for="answer in rowB.filter(
                (x) => !rowA.find((a) => a.rightAnswer === x.rightAnswer)
              )"
              :key="answer.id"
            >
              <td></td>
              <td>
                <span>
                  <p>
                    {{ answer.answerContent }}
                  </p></span
                >
              </td>
            </tr>
          </div>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
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
  setup(props) {
    const data = reactive({
      rowA: props.questionlist.answers.filter((x) => x.position === 1),
      rowB: props.questionlist.answers.filter((x) => x.position === 2),
    })
    const findAnswer = (rightAnswerA) => {
      const answer = data.rowB.find((x) => x.rightAnswer === rightAnswerA)
      return answer || ''
    }

    return {
      ...toRefs(data),
      findAnswer,
    }
  },
  computed: {
    convertPosition() {
      this.questionlist.answers.map()
      return 1
    },
  },
})
</script>
<style lang="scss" scoped>
.answer-pairing {
  display: flex;

  text-align: center;
  justify-content: center;
  .row_A {
    th,
    td {
      border: 1px solid black;
    }
  }
}
</style>
