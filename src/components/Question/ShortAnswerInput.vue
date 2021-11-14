<template>
  <form :class="$style.short_from" @submit.prevent="onSubmit">
    <b-form-input
      v-model="answerContent"
      placeholder="Nhập vào nội dung câu trả lời rồi enter"
    ></b-form-input>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { uuid } from 'vue-uuid'
export default {
  props: {
    typeQuestion: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      answerContent: '',
    }
  },
  methods: {
    ...mapActions({
      handleAddAnswer: 'questions/handleAddAnswer',
      deleteAnswer: 'questions/deleteAnswer',
    }),
    onSubmit() {
      const data = {
        answer: {
          id: uuid.v4(),
          position: 0,
          hashId: '',
          plainText: this.answerContent,
          rightAnswer: true,
          random: false,
          answerContent: this.answerContent,
        },
        typeQuestion: this.typeQuestion,
      }
      this.answerContent = ''

      this.handleAddAnswer(data)
    },
  },
}
</script>

<style module>
.short_from {
  margin: 30px;
}
</style>
