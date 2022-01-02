<template>
  <div>
    <component :is="dynamicComponent" :question="question" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import SingleChoice from './SingleChoice.vue'
import MultipleChoice from './MutlipleChoice.vue'
import RightWrong from './RightWrong.vue'
import Paring from './Paring.vue'
import FillBlank from './FillBlank.vue'
import ShortAnswer from './ShortAnswer.vue'
import Sort from './Sort.vue'
import GroupView from './GroupView.vue'
import SectionView from './SectionView.vue'
export default defineComponent({
  components: {
    SingleChoice,
    MultipleChoice,
    RightWrong,
    Paring,
    FillBlank,
    ShortAnswer,
    Sort,
    GroupView,
    SectionView,
  },
  props: {
    question: {
      type: [Array, Object],
      required: true,
    },
  },
  computed: {
    dynamicComponent() {
      const listQuestionTypes = {
        1: SingleChoice,
        2: MultipleChoice,
        3: RightWrong,
        4: Paring,
        5: FillBlank,
        6: ShortAnswer,
        7: Sort,
        8: GroupView,
        9: SectionView,
      }

      if (this.question.itemType === 'question') {
        console.log('a')
        return listQuestionTypes[this.question.item.questionTypeId]
      } else if (this.question.itemType === 'section') {
        console.log('b')
        return listQuestionTypes[9]
      } else {
        console.log('c')
        return listQuestionTypes[8]
      }
    },
  },
})
</script>

<style></style>
