<template>
  <b-form-select v-model="isSelected" class="mb-3" @change="changeSelected">
    <b-form-select-option :value="-1">{{
      $t('-- choose --')
    }}</b-form-select-option>
    <b-form-select-option
      v-for="i in compareListAnswer.length"
      :key="i"
      :value="i"
      >({{ i }})</b-form-select-option
    >
  </b-form-select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
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
    listAnswer: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isSelected: null,
    }
  },
  computed: {
    ...mapGetters({
      getListAnswer: 'questions/getListAnswer',
      getUpdateValueAnswer: 'questions/getUpdateValueAnswer',
    }),
    compareListAnswer() {
      this.handlerSelected()
      return this.listAnswer
    },
  },
  watch: {
    // getListAnswer() {
    //   this.isSelected = null
    // },
  },
  methods: {
    handlerSelected() {
      const index = this.listAnswer.findIndex(
        (item) => item.id === this.answer.id
      )
      this.isSelected = this.listAnswer[index].rightAnswer
    },
    ...mapActions({
      addValueUpdateAnswer: 'questions/addValueUpdateAnswer',
      deleteAnswer: 'questions/deleteAnswer',
      handleUpdateSelectForFillBlank:
        'questions/handleUpdateSelectForFillBlank',
      handleUpdateSelectFillBlankGroupQuestion:
        'questions/handleUpdateSelectFillBlankGroupQuestion',
    }),
    changeSelected(index) {
      if (this.groupQuestion) {
        const data = {
          questionId: this.childQuestionId,
          answerId: this.answer.id,
          index,
        }
        this.handleUpdateSelectFillBlankGroupQuestion(data)
      } else {
        const data = {
          id: this.answer.id,
          index,
        }
        this.handleUpdateSelectForFillBlank(data)
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
