<template>
  <div class="questionItem">
    <div class="question-title d-flex justify-content-between">
      <div class="question-name font-bold">
        Câu hỏi {{ question.sortOrder }}
      </div>
      <div class="question-category text-gray">
        <i class="icon-tag" />
        <span class="font-sm">{{ question.seoTitle }}</span>
      </div>
    </div>
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
                :options="listTextChoose"
                :value="item.sortOrder"
              ></b-form-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FillBlank',
  props: {
    question: {
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
