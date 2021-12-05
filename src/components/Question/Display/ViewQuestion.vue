<template>
  <component
    :is="dynamicComponent(question.questionTypeId)"
    ref="questionInExam"
    :question="question"
  />
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ViewSingleChoice from '@/components/Question/Display/ViewSingleChoice.vue'
import ViewMultipleChoice from '@/components/Question/Display/ViewMultipleChoice'
import ViewRightWrong from '@/components/Question/Display/ViewRightWrong.vue'
import ViewPairing from '@/components/Question/Display/ViewPairing.vue'
import ViewFillBlank from '@/components/Question/Display/ViewFillBlank.vue'
import ViewShortAnswer from '@/components/Question/Display/ViewShortAnswer.vue'
import ViewSort from '@/components/Question/Display/ViewSort.vue'

export default defineComponent({
  name: 'ViewQuestion',
  component: {
    ViewSingleChoice,
    ViewMultipleChoice,
    ViewRightWrong,
    ViewPairing,
    ViewFillBlank,
    ViewShortAnswer,
    ViewSort,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  setup() {},
  computed: {
    dynamicComponent() {
      const listQuestionTypes = {
        1: ViewSingleChoice,
        2: ViewMultipleChoice,
        3: ViewRightWrong,
        4: ViewPairing,
        5: ViewFillBlank,
        6: ViewShortAnswer,
        7: ViewSort,
      }
      return (questionTypeId) => {
        return listQuestionTypes[questionTypeId]
      }
    },
  },
})
</script>

<style lang="scss" module>
.questionItem__content p {
  font-weight: bold;
}
</style>
