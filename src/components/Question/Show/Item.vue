<template>
  <div>
    <component :is="dynamicComponent" :question="question.item" />
    <!-- {{ question }} -->
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
import SectionView from './SectionView.vue'
import GroupView from './GroupView.vue'
export default defineComponent({
  name: 'Item',
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
      console.log(this.question)
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
        console.log('vo day')
        return listQuestionTypes[this.question.item.questionTypeId]
      } else if (this.question.itemType === 'section') {
        return listQuestionTypes[9]
      } else {
        return listQuestionTypes[8]
      }
    },
  },
  created() {
    console.log(this.question)
  },
})
</script>

<style></style>
