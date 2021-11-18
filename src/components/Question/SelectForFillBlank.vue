<template>
  <b-form-select v-model="isSelected" class="mb-3" @change="changeSelected">
    <b-form-select-option :value="null" disabled>{{
      $t('-- choose --')
    }}</b-form-select-option>
    <b-form-select-option v-for="i in listAnswer.length" :key="i" :value="i"
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
      handleUpdateSelectForFillBlank:
        'questions/handleUpdateSelectForFillBlank',
    }),
    changeSelected(index) {
      const data = {
        id: this.answer.id,
        index,
      }
      if (this.groupQuestion) {
        //
      } else {
        this.handleUpdateSelectForFillBlank(data)
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
