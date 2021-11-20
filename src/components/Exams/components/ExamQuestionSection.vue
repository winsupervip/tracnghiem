<template>
  <div v-if="itemData.item.questions.length > 0" class="section-container">
    <h3 class="section-exam-title">
      {{ itemData.item.section.title }}
    </h3>
    <div v-for="(question, index) in itemData.item.questions" :key="index">
      <component
        :is="dynamicComponent(question.itemType)"
        ref="questionInSection"
        :item-data="question"
        :section-order="itemData.sortOrder"
      />
    </div>
  </div>
</template>
<script>
import ExamQuestionSingle from './ExamQuestionSingle.vue'
import ExamQuestionGroup from './ExamQuestionGroup.vue'
export default {
  components: {
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
      return (itemType) => {
        if (itemType === 'questionGroup') {
          return 'exam-question-group'
        }
        return 'exam-question-single'
      }
    },
  },
}
</script>
