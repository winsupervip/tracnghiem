<template>
  <b-form-select v-model="isSelected" class="mb-3">
    <b-form-select-option :value="null" disabled
      >-- Chọn --</b-form-select-option
    >
    <b-form-select-option
      v-for="i in lengthAnswers"
      :key="i"
      :value="String(answer.id) + 'index' + i"
      >({{ i }})</b-form-select-option
    >
  </b-form-select>
</template>

<script>
export default {
  props: {
    lengthAnswers: {
      type: Number,
      required: true,
    },
    answer: {
      type: Object,
      required: true,
    },
    handleFillBlank: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isSelected: null,
    }
  },
  watch: {
    lengthAnswers() {
      this.isSelected = null
    },
    isSelected() {
      console.log('a', this.isSelected)
      if (this.isSelected) {
        console.log('b', this.isSelected)
        this.handleFillBlank(this.isSelected)
      }
    },
  },
}
</script>

<style></style>
