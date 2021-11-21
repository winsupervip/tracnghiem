<template>
  <div class="list-single-question">
    <div class="list-questions-user">
      <b-card
        class="card-question mb-3"
        header-tag="header"
        footer-tag="footer"
      >
        <slot name="header"></slot>
        <template #header>
          <QuestionHeader
            :question="questions"
            :is-delete-question="deleteQuestion"
          />
        </template>
        <div class="list-question">
          <div class="question-item">
            <div class="question-content text-smd">
              <!-- <QuestionSingleChoiceList
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
              <QuestionClusterList
                v-if="questions.itemType == 'group'"
                :questionlist="questions"
              /> -->
              <component
                :is="dynamicComponent"
                ref="questionInExam"
                :questionlist="questions"
              />
            </div>
          </div>
          <QuestionTags :questiontags="questions" />
          <div class="list-status-question">
            <div v-if="questions.itemType === 'question'">
              <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                questions.levelName
              }}</span>
              <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                questions.questionTypeName
              }}</span>
              <span
                :class="
                  questions.statusName === 'Bản nháp'
                    ? 'btn btn-xs rounded-pill btn-yellow-light me-2'
                    : questions.statusName === 'Không công khai'
                    ? 'btn btn-xs rounded-pill btn-blue-light me-2'
                    : 'btn btn-xs rounded-pill btn-green-light me-2'
                "
              >
                {{ questions.statusName }}</span
              >
            </div>
            <div v-if="questions.itemType === 'group'">
              <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                questions.levelName
              }}</span>

              <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                questions.statusName
              }}</span>
            </div>
          </div>
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
    deleteQuestion: {
      type: Function,
      required: true,
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
