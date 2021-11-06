<template>
  <div class="form-single-question">
    <QuestionHeader :questions="questions" />
    <div class="line"></div>
    <div class="question">
      <QuestionTags :questiontags="questions" />
      <QuestionSingleChoiceList
        v-if="questions.questionTypeName == 'Một lựa chọn'"
        :questionlist="questions"
      />
      <QuestionMultiChoiceList
        v-if="questions.questionTypeName == 'Nhiều lựa chọn'"
        :questionlist="questions"
      />
      <QuestionRightWrongList
        v-if="questions.questionTypeName == 'Đúng sai'"
        :questionlist="questions"
      />
      <QuestionParingList
        v-if="questions.questionTypeName == 'Ghép đôi'"
        :questionlist="questions"
      />
      <QuestionFillBlankList
        v-if="questions.questionTypeName == 'Điền vào chỗ trống'"
        :questionlist="questions"
      />
      <QuestionShortAnswerList
        v-if="questions.questionTypeName == 'Câu trả lời ngắn'"
        :questionlist="questions"
      />
      <QuestionSortAnswerList
        v-if="questions.questionTypeName == 'Sắp xếp thứ tự'"
        :questionlist="questions"
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

export default defineComponent({
  name: 'SingleListPage',
  components: {
    QuestionHeader,
    QuestionTags,
    QuestionSingleChoiceList,
    QuestionMultiChoiceList,
    QuestionRightWrongList,
    QuestionParingList,
    QuestionFillBlankList,
    QuestionShortAnswerList,
  },
  props: {
    questions: {
      type: Object,
      required: true,
    },
  },

  setup: () => {},
})
</script>
