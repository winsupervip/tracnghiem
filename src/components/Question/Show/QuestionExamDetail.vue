<template>
  <div>
    <div class="question-title d-flex justify-content-between">
      <div class="question-name font-bold">
        Câu hỏi {{ getSortNumber(itemData.sortOrder) }}
      </div>
      <div class="question-category text-gray">
        <i class="icon-tag" />
        <span class="font-sm">{{ itemData.levelName }},</span>
        <span class="font-sm">{{ itemData.questionTypeName }}</span>
      </div>
    </div>
    <div
      v-if="itemData.section"
      class="section-question question-content text-smd my-3"
    >
      <span
        :class="
          showFilterGroupSection
            ? 'filter-group-header'
            : 'filter-group-header collapsed'
        "
        @click="showFilterGroupSection = !showFilterGroupSection"
      >
        Thông tin chuyên mục
        <i class="icon-caret-down"></i>
      </span>
      <b-collapse v-model="showFilterGroupSection" class="filter-group-body">
        {{ itemData.section.title }}
        <p>{{ itemData.section.descrription }}</p>
      </b-collapse>
    </div>
    <div
      v-if="itemData.group"
      class="question-group question-content text-smd my-3"
    >
      <span
        :class="
          showFilterGroupQuestion
            ? 'filter-group-header'
            : 'filter-group-header collapsed'
        "
        @click="showFilterGroupQuestion = !showFilterGroupQuestion"
      >
        Mô tả chung
        <i class="icon-caret-down"></i>
      </span>
      <b-collapse v-model="showFilterGroupQuestion" class="filter-group-body">
        {{ itemData.group.title }}
        <p>{{ itemData.group.descrription }}</p>
      </b-collapse>
    </div>
    <component
      :is="dynamicComponent"
      ref="questionInExam"
      :questionlist="itemData"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import SingleChoice from './SingleChoice.vue'
import FillBlank from './FillBlank.vue'
import MutlipleChoice from './MutlipleChoice.vue'
import RightWrong from './RightWrong.vue'
import Paring from './Paring.vue'
import ShortAnswer from './ShortAnswer.vue'
import Sort from './Sort.vue'
export default defineComponent({
  components: {
    SingleChoice,
    MutlipleChoice,
    RightWrong,
    Paring,
    FillBlank,
    ShortAnswer,
    Sort,
  },
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showFilterGroupSection: false,
      showFilterGroupQuestion: false,
    }
  },
  computed: {
    dynamicComponent() {
      const questionType = this.itemData.questionTypeId
      if (questionType === 1) {
        return 'SingleChoice'
      }
      if (questionType === 2) {
        return 'MutlipleChoice'
      }
      if (questionType === 3) {
        return 'RightWrong'
      }
      if (questionType === 4) {
        return 'Paring'
      }
      if (questionType === 5) {
        return 'FillBlank'
      }
      if (questionType === 6) {
        return 'ShortAnswer'
      }
      if (questionType === 7) {
        return 'Sort'
      }
      return 'SingleChoice'
    },
  },
  methods: {
    getSortNumber(sortNumber) {
      return sortNumber
    },
  },
})
</script>

<style></style>
