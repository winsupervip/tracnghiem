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
        <div class="answerItem__left col-md-6 col-xs-6 col-sm-6">
          <div
            v-for="(item, index) in listAnswer"
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
                  ({{ item.rightAnswer }})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ViewFillBlank',
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
    listAnswer() {
      return this.question.answers
    },
    listTextChoose() {
      const arr = [{ value: null, text: 'Choose' }]

      // eslint-disable-next-line array-callback-return
      this.question.answers.map((x, i) => {
        if (x.sortOrder > 0) {
          arr.push({
            value: x.sortOrder + '',
            text: x.sortOrder,
          })
        }
      })
      return arr
    },
  },
  created() {},
  methods: {
    loadOptions({ callback }) {
      callback()
    },
    checkTrue(item) {
      if (item.userChoice) {
        if (Number(item.userChoice) === item.rightAnswer) {
          return true
        }
        return false
      }
      return null
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
  }
  select {
    width: 100px;
  }
}
b {
  min-width: 20px;
}
</style>
