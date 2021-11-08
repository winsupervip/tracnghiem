<template>
  <b-form-select v-model="isSelected" class="mb-3" @change="changeSelected">
    <b-form-select-option :value="null" disabled>{{
      $t('-- choose --')
    }}</b-form-select-option>
    <b-form-select-option v-for="i in getListAnswer.length" :key="i" :value="i"
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
  },
  watch: {
    // getListAnswer() {
    //   this.isSelected = null
    // },
  },
  methods: {
    ...mapActions({
      addValueUpdateAnswer: 'questions/addValueUpdateAnswer',
      deleteAnswer: 'questions/deleteAnswer',
      handleUpdateAnswer: 'questions/handleUpdateAnswer',
    }),
    changeSelected(index) {
      const temp = this.answer
      temp.rightAnswer = index
      const data = {
        answer: temp,
      }
      this.handleUpdateAnswer(data)
    },
  },
}
</script>
<style lang="scss" scoped></style>
