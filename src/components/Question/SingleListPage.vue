<template>
  <div class="list-single-question">
    <div class="list-questions-user">
      <b-card class="mt-3">
        <slot name="header">
          <QuestionHeader
            :question="questions"
            :is-delete-question="deleteQuestion"
          />
        </slot>
        <div class="list-question">
          <div class="question-item">
            <div class="question-content text-smd">
              <component
                :is="dynamicComponent"
                ref="questionInExam"
                :questionlist="questions"
              />
            </div>
          </div>
          <QuestionTags :questiontags="questions" />
        </div>
      </b-card>
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
import QuestionClusterList from './QuestionClusterList.vue'
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
    'question-cluster-list': QuestionClusterList,
  },
  props: {
    questions: {
      type: Object,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    deleteQuestion: {
      type: Function,
      required: false,
    },
  },

  setup: () => {},
  computed: {
    dynamicComponent() {
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
        return 'question-sort-answer-list'
      }
      if (this.questions.questionTypeName === 'Câu trả lời ngắn') {
        return 'question-short-answer-list'
      } else {
        return 'question-cluster-list'
      }
    },
  },
})
</script>
