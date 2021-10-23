<template>
  <div class="card">
    <p :class="$style.border_title"><strong>Lời Phê/ Chú thích</strong></p>
    <b-form-textarea
      id="textarea-default"
      v-model="explainationIfCorrect"
      placeholder="khi trả lời đúng"
      :class="$style.inputF"
    ></b-form-textarea>
    <b-form-textarea
      id="textarea-default"
      v-model="explainationIfIncorrect"
      placeholder="khi trả lời sai"
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
.border_title {
  border-bottom: 1px solid #aaa;
  padding: 0.5em;
  color: #1c3988;
}
</style>
