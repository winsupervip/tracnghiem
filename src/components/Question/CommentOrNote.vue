<template>
  <div class="card p-question__box">
    <p class="p-question__box__heading">
      <strong>{{ $t('Lời phê / Chú thích') }}</strong>
    </p>
    <div class="p-question__box__body">
      <div class="p-question__box__body__item">
        <b-form-textarea
          id="textarea-default"
          v-model="explainationIfCorrect"
          class="mb-20"
          :placeholder="$t('Khi trả lời đúng')"
        ></b-form-textarea>
        <b-form-textarea
          id="textarea-default"
          v-model="explainationIfIncorrect"
          :placeholder="$t('Khi trả lời sai')"
        ></b-form-textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    getCommentOrNote: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      explainationIfCorrect: '',
      explainationIfIncorrect: '',
    }
  },
  watch: {
    explainationIfCorrect() {
      this.getCommentOrNote({
        explainationIfCorrect: this.explainationIfCorrect,
        explainationIfIncorrect: this.explainationIfIncorrect,
      })
    },
    explainationIfIncorrect() {
      this.getCommentOrNote({
        explainationIfCorrect: this.explainationIfCorrect,
        explainationIfIncorrect: this.explainationIfIncorrect,
      })
    },
  },
}
</script>

<style lang="scss" scope>
.mb-20 {
  margin-bottom: 15px;
}
</style>
