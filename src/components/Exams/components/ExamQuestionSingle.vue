<template>
  <div class="list-single-question">
    <h3 class="question-number">
      Câu hỏi: {{ getSortNumber(itemData.sortOrder) }}
    </h3>
    {{ questions.hashId }}
    <div class="list-questions-user">
      <b-card
        class="card-question mb-3"
        header-tag="header"
        footer-tag="footer"
      >
        <slot name="header"></slot>
        <template #header>
          <QuestionHeader :questions="questions" />
        </template>
        <div class="list-question">
          <div class="question-item">
            <div class="question-content text-smd">
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
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionTags from '@/components/Question/QuestionTags.vue'
import QuestionHeader from '@/components/Question/QuestionHeader.vue'
import QuestionSingleChoiceList from '@/components/Question/QuestionSingleChoiceList.vue'
import QuestionMultiChoiceList from '@/components/Question/QuestionMultiChoiceList.vue'
import QuestionRightWrongList from '@/components/Question/QuestionRightWrongList.vue'
import QuestionParingList from '@/components/Question/QuestionParingList.vue'
import QuestionFillBlankList from '@/components/Question/QuestionFillBlankList.vue'
import QuestionShortAnswerList from '@/components/Question/QuestionShortAnswerList.vue'
export default defineComponent({
  name: 'ExamQuestionSingle',
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
    itemData: {
      type: Object,
      required: true,
    },
    sectionOrder: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  setup: () => {},
  computed: {
    questions() {
      return this.itemData.item
    },
  },
  methods: {
    getSortNumber(sortNumber) {
      console.log(this.sectionOrder)
      return (this.sectionOrder > 0 ? this.sectionOrder - 1 : 0) + sortNumber
    },
  },
})
</script>
