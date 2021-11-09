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
      <b-icon icon="trash" @click="deleteAnswer(answer.id)"></b-icon>
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
  },
  setup() {
    const data = reactive({
      answerContent: 'aasds',
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
    }),
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
      this.handleUpdateAnswer(data)
      this.isDisable = true
    },
    onUpdate() {
      this.isDisable = !this.isDisable
    },
  },
})
</script>

<style></style>
