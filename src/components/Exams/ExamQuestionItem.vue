<template>
  <div class="exam-question-container">
    <component
      :is="dynamicComponent"
      ref="questionInExam"
      :item-data="itemData"
    />
  </div>
</template>
<script>
import ExamQuestionSection from './components/ExamQuestionSection.vue'
import ExamQuestionSingle from './components/ExamQuestionSingle.vue'
import ExamQuestionGroup from './components/ExamQuestionGroup.vue'
export default {
  components: {
    'exam-question-section': ExamQuestionSection,
    'exam-question-single': ExamQuestionSingle,
    'exam-question-group': ExamQuestionGroup,
  },
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dynamicComponent() {
      if (this.itemData.itemType === 'section') {
        return 'exam-question-section'
      }
      if (this.itemData.itemType === 'questionGroup') {
        return 'exam-question-group'
      }
      return 'exam-question-single'
    },
  },
}
</script>
