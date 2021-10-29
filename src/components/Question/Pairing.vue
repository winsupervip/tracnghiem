<template>
  <div class="wrapper-pairing">
    <div class="wrapper-pairing__left" v-html="answer.left.answerContent"></div>
    <div
      class="wrapper-pairing__right"
      v-html="answer.right.answerContent"
    ></div>
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
}
</script>

<style lang="scss" scoped>
.wrapper-pairing {
  width: 100%;
  border: 1px solid black;
  margin-bottom: 1rem;
  display: flex;
  &__right {
    width: 50%;
    word-break: break-word;
  }
  &__left {
    width: 50%;
    border-right: 1px solid black;
    word-break: break-word;
  }
}
</style>
