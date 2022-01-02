<template>
  <b-card class="card-question" header-tag="header" footer-tag="footer">
    <template #header>
      <div class="d-flex justify-content-between card-question-header">
        <div class="font-bold">Câu {{ question.sortOrder }}</div>
        <b-form-input
          style="width: 120px"
          :state="question.isCorrect"
          :value="question.score + ' điểm'"
        >
        </b-form-input>
      </div>
    </template>
    <div class="list-question mb-4">
      <div
        v-if="
          question.sectionInformation &&
          question.sectionInformation.title.length > 0
        "
        class="section-question question-content text-smd"
      >
        <strong
          :class="
            showFilterGroupSection
              ? 'filter-group-header'
              : 'filter-group-header collapsed'
          "
          @click="showFilterGroupSection = !showFilterGroupSection"
        >
          {{ question.sectionInformation.title }}
          <i class="icon-caret-down"></i>
        </strong>
        <b-collapse v-model="showFilterGroupSection" class="filter-group-body">
          <p>{{ question.sectionInformation.descrription }}</p>
        </b-collapse>
      </div>
      <div
        v-if="
          question.groupInformation &&
          question.groupInformation.title.length > 0
        "
        class="question-group question-content text-smd"
      >
        <strong
          :class="
            showFilterGroupQuestion
              ? 'filter-group-header'
              : 'filter-group-header collapsed'
          "
          @click="showFilterGroupQuestion = !showFilterGroupQuestion"
        >
          {{ question.groupInformation.title }}
          <i class="icon-caret-down"></i>
        </strong>
        <b-collapse v-model="showFilterGroupQuestion" class="filter-group-body">
          <p>{{ question.groupInformation.descrription }}</p>
        </b-collapse>
      </div>
      <component
        :is="dynamicComponent(question.questionTypeId)"
        ref="questionInExam"
        :question="question"
        :show-right-answer="settings.showRightAnswer"
      />
    </div>
    <div v-if="settings.showRightAnswer">
      <div v-if="question.isCorrect && question.explainIfCorrect" class="mb-4">
        <div class="explain-head">
          <span class="font-sm text-gray">Chú thích:</span>
        </div>
        <div
          class="question-content text-smd"
          v-html="question.explainIfCorrect"
        ></div>
      </div>
      <div
        v-if="!question.isCorrect && question.explainIfIncorrrect"
        class="mb-4"
      >
        <div class="explain-head">
          <span class="font-sm text-gray">Gợi ý:</span>
        </div>
        <div
          class="question-content text-smd"
          v-html="question.explainIfCorrect"
        ></div>
      </div>
    </div>
    <template v-if="!hideButton" #footer>
      <b-btn variant="outline" @click="prevQuestion(question.sortOrder)">
        <i class="icon-arrow-left me-2"></i>
        Câu trước
      </b-btn>
      <b-btn variant="outline" @click="nextQuestion(question.sortOrder)">
        Câu sau
        <i class="icon-arrow-right ms-2"></i>
      </b-btn>
    </template>
  </b-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
// import get from 'lodash/get'
import ResultSingleChoice from './ResultSingleChoice.vue'
import ResultMultipleChoice from './ResultMultipleChoice'
import ResultRightWrong from './ResultRightWrong.vue'
import ResultPairing from './ResultPairing.vue'
import ResultFillBlank from './ResultFillBlank.vue'
import ResultShortAnswer from './ResultShortAnswer.vue'
import ResultSort from './ResultSort.vue'

export default defineComponent({
  name: 'ResultQuestion',
  component: {
    ResultSingleChoice,
    ResultMultipleChoice,
    ResultRightWrong,
    ResultPairing,
    ResultFillBlank,
    ResultShortAnswer,
    ResultSort,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
    settings: {
      type: Object,
      required: true,
    },
    hideButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {},
  data() {
    return {
      showFilterGroupSection: false,
      showFilterGroupQuestion: true,
    }
  },
  computed: {
    dynamicComponent() {
      const listQuestionTypes = {
        1: ResultSingleChoice,
        2: ResultMultipleChoice,
        3: ResultRightWrong,
        4: ResultPairing,
        5: ResultFillBlank,
        6: ResultShortAnswer,
        7: ResultSort,
      }
      return (questionTypeId) => {
        return listQuestionTypes[questionTypeId]
      }
    },
  },
  methods: {
    prevQuestion(sortOrder) {
      this.$emit('prev', sortOrder)
    },
    nextQuestion(sortOrder) {
      this.$emit('next', sortOrder)
    },
  },
})
</script>

<style lang="scss" module>
.questionItem__content p {
  font-weight: bold;
}
.explain-head {
  border-bottom: 1px solid #dddddd;
  position: relative;
  margin: 1rem 0;
}
</style>
