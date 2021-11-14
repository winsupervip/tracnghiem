<template>
  <div>
    <b-col v-html="answer.left.answerContent"></b-col>
    <b-col v-html="answer.right.answerContent"></b-col>
  </div>
</template>

<script>
export default {
  props: {
    answer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  created() {
    this.$logger.debug('pairing', this.answer)
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  border: 1px solid black;
  margin-bottom: 2rem;
  display: flex;
  .right {
    width: 50%;
    word-break: break-word;
    padding: 5px;
  }
  .left {
    width: 50%;
    border-right: 1px solid black;
    word-break: break-word;
    padding: 5px;
  }
}
</style>
