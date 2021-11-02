<template>
  <b-form-select v-model="isSelected" class="mb-3">
    <b-form-select-option :value="null" disabled>{{
      $t('-- choose --')
    }}</b-form-select-option>
    <b-form-select-option
      v-for="i in getListAnswer.length"
      :key="i"
      :value="String(answer.id) + 'index' + i"
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
    ...mapGetters(['getListAnswer', 'getUpdateValueAnswer']),
  },
  watch: {
    getListAnswer() {
      this.isSelected = null
    },
    // isSelected() {
    //   console.log('a', this.isSelected)
    //   if (this.isSelected) {
    //     console.log('b', this.isSelected)
    //     this.handleFillBlank(this.isSelected)
    //   }
    // },
  },
  methods: {
    ...mapActions(['addValueUpdateAnswer', 'deleteAnswer']),
  },
}
</script>
<style lang="scss" scoped></style>
