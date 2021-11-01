<template>
  <div class="question-pairing">
    <p v-html="questionlist.description"></p>

    <div class="answer-pairing">
      <!-- <div class="row_A">
        <p for="">Cột A</p>
        <ul v-for="(answer, index) in convertPosition.row_A" :key="index">
          <li>
            <span
              >{{ String.fromCharCode(65 + index) + '. ' }}
              <p>{{ answer.answerContent }}</p></span
            >
          </li>
        </ul>
      </div>
      <div class="row_B">
        <p>Cột B</p>
        <ul v-for="(answer, index) in convertPosition.row_B" :key="index">
          <li>
            {{ index + 1 + '. ' }}
            <p>{{ answer.answerContent }}</p>
          </li>
        </ul>
      </div> -->
      <table>
        <div class="row_A">
          <th>{{ $t('Cột A') }}</th>
          <tr v-for="(answer, index) in convertPosition.row_A" :key="index">
            <td>
              <span
                >{{ String.fromCharCode(65 + index) + '. ' }}
                <p>{{ answer.answerContent }}</p></span
              >
            </td>
          </tr>
        </div>
        <div class="row_B">
          <th>{{ $t('Cột B') }}</th>
          <tr v-for="(answer, index) in convertPosition.row_B" :key="index">
            <td>
              <span
                >{{ index + 1 + '. ' }}
                <p>{{ answer.answerContent }}</p></span
              >
            </td>
          </tr>
        </div>
      </table>
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
  computed: {
    convertPosition() {
      const left = []
      const right = []
      this.questionlist.answers.forEach((e) => {
        if (e.position === 1) {
          left.push(e)
        } else {
          right.push(e)
        }
      })
      right.push(
        {
          hashId: 'wmjyirukyl',
          answerContent: 'Hệ',
          rightAnswer: 8,
          random: true,
          position: 2,
          plainText: 'Hệ bài tiết',
        },
        {
          hashId: 'wmjyirukyl',
          answerContent: 'Hệ',
          rightAnswer: 8,
          random: true,
          position: 2,
          plainText: 'Hệ bài tiết',
        },
        {
          hashId: 'wmjyirukyl',
          answerContent: '123',
          rightAnswer: 8,
          random: true,
          position: 2,
          plainText: 'Hệ bài tiết',
        }
      )
      return { row_A: left, row_B: right }
    },
  },
})
</script>
<style lang="scss">
table,
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
    ul {
      li {
        span {
          display: flex;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        input {
          width: 10%;
          text-align: center;
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
