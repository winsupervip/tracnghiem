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
    groupQuestion: {
      type: Boolean,
      default: false,
    },
    childQuestionId: {
      type: String,
      default: '',
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
      addAnswerInChildQuestion: 'questions/addAnswerInChildQuestion',
    }),
    onSubmit() {
      const data = {
        answer: {
          id: uuid.v4(),
          position: 0,
          hashId: '',
          plainText: this.answerContent,
          rightAnswer: 1,
          random: false,
          answerContent: this.answerContent,
        },
        typeQuestion: this.typeQuestion,
      }

      if (this.groupQuestion) {
        this.addAnswerInChildQuestion({
          id: this.childQuestionId,
          answer: data?.answer,
        })
      } else {
        this.handleAddAnswer(data)
      }
      this.answerContent = ''
      this.$toast.success('Thêm câu trả lời thành công').goAway(1000)
    },
  },
}
</script>

<style module>
.short_from {
  margin: 30px;
}
</style>
