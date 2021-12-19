<template>
  <div class="question-item">
    <div
      class="question-content text-smd"
      v-html="question.questionContent"
    ></div>
    <div class="question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">câu trả lời</span>
      </div>
      <div class="questionItem__listAnswer row">
        <div class="answerItem__left col-md-6 col-xs-12 col-sm-12">
          <p class="text-center">Cột A</p>
          <div
            v-for="(item, index) in listAnswerLeft"
            :key="index"
            class="answerItem d-flex"
          >
            <b>{{ index + 1 }}. </b>
            <div class="answerItem__group">
              <div
                :value="item.hashId"
                class="answerItem__content"
                v-html="item.answerContent"
              ></div>
              <div class="d-flex">
                <b-form-select
                  v-model="item.userChoice"
                  :options="listTextChoose"
                  :disabled="true"
                  :state="checkTrue(item)"
                ></b-form-select>
                <span
                  v-if="!checkTrue(item) && showRightAnswer"
                  class="ms-2 align-self-center"
                >
                  ({{ findTrueAnswer(item) }})
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="answerItem__right col-md-6 col-xs-12 col-sm-12">
          <p class="text-center">Cột B</p>
          <div
            v-for="(item, index) in listAnswerRight"
            :key="index"
            class="answerItem d-flex"
          >
            <b>{{ String.fromCharCode(65 + index) + '. ' }}</b>
            <div :value="item.hashId" v-html="item.answerContent"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import filter from 'lodash/filter'

export default defineComponent({
  name: 'ViewPairing',
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
    return {}
  },
  computed: {
    listAnswerLeft() {
      return filter(this.question.answers, (x) => x.position === 1)
    },
    listAnswerRight() {
      return filter(this.question.answers, (x) => x.position === 2)
    },
    listTextChoose() {
      const arr = [{ value: null, text: 'Choose' }]
      // eslint-disable-next-line array-callback-return
      this.listAnswerRight.map((x, i) => {
        arr.push({
          value: x.hashId,
          text: String.fromCharCode(65 + i),
        })
      })
      return arr
    },
  },
  methods: {
    loadOptions({ callback }) {
      callback()
    },
    checkTrue(item) {
      if (item.userChoice) {
        const rightItem = this.listAnswerRight.filter(
          (x) => x.hashId === item.userChoice
        )
        if (
          rightItem &&
          rightItem.length === 1 &&
          rightItem[0].rightAnswer === item.rightAnswer
        ) {
          return true
        }

        return false
      }
      return null
    },
    findTrueAnswer(item) {
      const rightItem = this.listAnswerRight.filter(
        (x) => x.rightAnswer === item.rightAnswer
      )
      if (rightItem && rightItem.length === 1) {
        return String.fromCharCode(65 + rightItem[0].sortOrder - 1)
      }
      return '-'
    },
  },
})
</script>

<style scoped lang="scss">
.is-invalid {
  border-color: #ff442b;
}
.is-valid {
  border-color: #27ae60;
}
::v-deep .answerItem div {
  display: inline;
}
::v-deep .answerItem div p {
  display: inline;
}

.answerItem {
  margin-bottom: 10px;
  &__group {
    width: 100%;
  }
  &__content {
    width: calc(100% - 100px);
    float: left;

    @media screen and (max-width: 767px) {
      width: 100%;
    }
  }
  select {
    width: 100px;
  }
}
b {
  min-width: 20px;
}
</style>
