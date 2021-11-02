<template>
  <div class="question-pairing">
    <p v-html="questionlist.description"></p>

    <div class="answer-pairing">
      <table>
        <div class="row_A">
          <tr>
            <th>{{ $t('Cột A') }}</th>
            <th>{{ $t('Cột B') }}</th>
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
                  {{
                    rowB.find((x) => x.rightAnswer === answer.rightAnswer) &&
                    answer.answerContent
                  }}
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

    return {
      ...toRefs(data),
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
<style lang="scss">
th,
td {
  border: 1px solid black;
}
table {
  display: flex;
}
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
  }
}
</style>
