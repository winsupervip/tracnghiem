<template>
  <div class="questionItem">
    <div
      class="questionItem__content question-content text-smd"
      v-html="questionlist.questionContent"
    ></div>
    <div class="questionItem__answer question-item-answer">
      <div class="answer-head">
        <span class="font-sm text-gray">câu trả lời</span>
      </div>
      <div class="questionItem__listAnswer list-answered row">
        <div class="answerItem__left col-12">
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
                :disabled="true"
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
import mathType from '@/extensions/mathType'
export default defineComponent({
  name: 'FillBlank',
  mixins: [mathType],
  props: {
    questionlist: {
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
      return this.questionlist.answers
    },
    listTextChoose() {
      const arr = [{ value: null, text: 'Choose' }]
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
