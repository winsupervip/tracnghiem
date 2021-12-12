<template>
  <div class="questionItem">
    <div
      class="questionItem__content text-smd"
      v-html="question.questionContent"
    ></div>
    <div class="questionItem__answer">
      <div class="answer-head">
        <span class="font-sm text-gray">câu trả lời</span>
      </div>
      <div class="questionItem__listAnswer row">
        <div class="answerItem__left col-md-6 col-xs-6 col-sm-6">
          <p class="text-center">Cột A</p>
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
              <b-form-select
                v-model="item.userChoice"
                :options="listTextChoose"
                :value="item.sortOrder"
                @change="checkAnswer"
              ></b-form-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import map from 'lodash/map'

export default defineComponent({
  name: 'ViewFillBlank',
  props: {
    question: {
      type: Object,
      required: true,
    },
    userAnswer: {
      type: Object,
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
    checkAnswer() {
      const userChoices = map(this.listAnswer, (x, i) => {
        return {
          hashId: x.hashId,
          choice: x.userChoice,
        }
      })
      console.log('userChoices', userChoices)
      // this.$emit('collect-user-answer', userChoices)
      this.$emit(
        'update:data',
        // eslint-disable-next-line vue/no-mutating-props
        (this.userAnswer.userChoices = userChoices)
      )
    },
  },
})
</script>

<style scoped lang="scss">
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
