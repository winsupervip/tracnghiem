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
      <!-- <QuestionMultiChoiceList :questionlist="questions" /> -->
      <QuestionRightWrongList
        v-if="questions.questionTypeName == 'Đúng sai'"
        :questionlist="questions"
      />
      <!-- <QuestionParingList :questionlist="questions" /> -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionTags from './QuestionTags.vue'
import QuestionHeader from './QuestionHeader.vue'
import QuestionSingleChoiceList from './QuestionSingleChoiceList.vue'
// import QuestionMultiChoiceList from './QuestionMultiChoiceList.vue'
import QuestionRightWrongList from './QuestionRightWrongList.vue'
// import QuestionParingList from './QuestionParingList.vue'

export default defineComponent({
  name: 'SingleListPage',
  components: {
    QuestionHeader,
    QuestionTags,
    QuestionSingleChoiceList,
    // QuestionMultiChoiceList,
    QuestionRightWrongList,
    // QuestionParingList,
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
