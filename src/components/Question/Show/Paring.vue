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
              <b-form-select :options="listTextChoose"></b-form-select>
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
import { defineComponent } from '@nuxtjs/composition-api'
import filter from 'lodash/filter'

export default defineComponent({
  name: 'Paring',
  props: {
    question: {
      type: Object,
      required: true,
    },
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
