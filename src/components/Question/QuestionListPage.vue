<template>
  <div class="form-single-question">
    <QuestionHeader :questions="questions" />
    <div class="line"></div>
    <div class="question">
      <QuestionTags :questiontags="questions" />

      <component
        :is="dynamicComponent"
        ref="questionInExam"
        :item-data="itemData"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionTags from './QuestionTags.vue'
import QuestionHeader from './QuestionHeader.vue'
import QuestionSingleChoiceList from './QuestionSingleChoiceList.vue'
import QuestionMultiChoiceList from './QuestionMultiChoiceList.vue'
import QuestionRightWrongList from './QuestionRightWrongList.vue'
import QuestionParingList from './QuestionParingList.vue'
import QuestionFillBlankList from './QuestionFillBlankList.vue'
import QuestionShortAnswerList from './QuestionShortAnswerList.vue'
import QuestionSortAnswerList from './QuestionSortAnswerList.vue'
export default defineComponent({
  name: 'SingleListPage',
  components: {
    QuestionHeader,
    QuestionTags,
    'question-single-choice-list': QuestionSingleChoiceList,
    'question-multi-choice-list': QuestionMultiChoiceList,
    'question-right-wrong-list': QuestionRightWrongList,
    'question-paring-list': QuestionParingList,
    'question-fill-blank-list': QuestionFillBlankList,
    'question-short-answer-list': QuestionShortAnswerList,
    'question-sort-answer-list': QuestionSortAnswerList,
  },
  props: {
    questions: {
      type: Object,
      required: true,
    },
  },

  setup: () => {},
  computed: {
    dynamicComponent(props) {
      if (this.questions.questionTypeName === 'Một lựa chọn') {
        return 'question-single-choice-list'
      }
      if (this.questions.questionTypeName === 'Nhiều lựa chọn') {
        return 'question-multi-choice-list'
      }
      if (this.questions.questionTypeName === 'Đúng sai') {
        return 'question-right-wrong-list'
      }
      if (this.questions.questionTypeName === 'Ghép đôi') {
        return 'question-paring-list'
      }
      if (this.questions.questionTypeName === 'Điền vào chỗ trống') {
        return 'question-fill-blank-list'
      }
      if (this.questions.questionTypeName === 'Sắp xếp thứ tự') {
        return 'question-sort-blank-list'
      } else {
        return 'question-short-answer-list'
      }
    },
  },
})
</script>
