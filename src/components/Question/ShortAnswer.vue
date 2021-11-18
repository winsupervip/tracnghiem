<template>
  <b-row>
    <b-col cols="1"
      ><b>{{ numIndex }}</b></b-col
    >
    <b-col cols="9">
      <form v-if="!isDisable" @submit.prevent="onSubmit">
        <b-form-input
          v-model="answerContent"
          placeholder="Nhập vào nội dung câu trả lời rồi enter"
          @blur="onSubmit"
        ></b-form-input>
      </form>
      <p v-else>{{ answerContent }}</p>
    </b-col>
    <b-col cols="1">
      <b-icon icon="pencil-square" @click="onUpdate"></b-icon>
    </b-col>
    <b-col cols="1">
      <b-icon icon="trash" @click="handleDelete(answer.id)"></b-icon>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    typeQuestion: {
      type: String,
      required: true,
    },
    numIndex: {
      type: Number,
      required: true,
    },
    answer: {
      type: Object,
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
  setup(props) {
    const data = reactive({
      answerContent: props.answer.answerContent,
      isDisable: true,
    })
    return {
      ...toRefs(data),
    }
  },
  methods: {
    ...mapActions({
      handleAddAnswer: 'questions/handleAddAnswer',
      deleteAnswer: 'questions/deleteAnswer',
      handleUpdateAnswer: 'questions/handleUpdateAnswer',
      deleteAnswerOfChildQuestion: 'questions/deleteAnswerOfChildQuestion',
      updateAnswerQuestionChild: 'questions/updateAnswerQuestionChild',
    }),
    handleDelete(id) {
      if (this.groupQuestion) {
        this.deleteAnswerOfChildQuestion({
          questionChildId: this.childQuestionId,
          answerId: id,
        })
      } else {
        this.deleteAnswer(id)
      }
    },
    onSubmit() {
      const data = {
        answer: {
          id: this.answer.id,
          position: 0,
          hashId: '',
          plainText: this.answerContent,
          rightAnswer: true,
          random: false,
          answerContent: this.answerContent,
        },
        typeQuestion: this.typeQuestion,
      }
      if (this.groupQuestion) {
        this.updateAnswerQuestionChild({
          id: this.childQuestionId,
          answer: data.answer,
        })
      } else {
        this.handleUpdateAnswer(data)
      }

      this.isDisable = true
      this.$toast.success('Cập nhập câu trả lời thành công').goAway(1000)
    },
    onUpdate() {
      this.isDisable = !this.isDisable
    },
  },
})
</script>

<style></style>
