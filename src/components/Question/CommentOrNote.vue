<template>
  <div class="card">
    <p class="border_title"><strong>Lời phê/ Chú thích</strong></p>
    <b-form-textarea
      id="textarea-default"
      v-model="explainationIfCorrect"
      placeholder="Khi trả lời đúng"
      :class="$style.inputF"
    ></b-form-textarea>
    <b-form-textarea
      id="textarea-default"
      v-model="explainationIfIncorrect"
      placeholder="Khi trả lời sai"
      :class="$style.inputF"
    ></b-form-textarea>
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

<style module>
.inputF {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 0.5rem;
}
</style>
