<template>
  <div class="exam-question-container">
    <div class="d-flex justify-content-between">
      <h3 class="question-number">
        Câu hỏi: {{ getSortNumber(itemData.sortOrder) }}
      </h3>
      <div>
        <b-icon-pencil-square
          @click="fetchQuestion(itemData.hashId)"
        ></b-icon-pencil-square>
        <b-icon-trash @click="showModleDelete"></b-icon-trash>
      </div>
    </div>
    <div v-if="itemData.section">
      <h3 class="question-number">{{ itemData.section.title }}</h3>
      <p>
        {{ itemData.section.description }}
      </p>
    </div>
    <div v-if="itemData.group">
      <h3 class="question-number">{{ itemData.group.title }}</h3>
    </div>
    {{ itemData.hashId }}
    <QuestionTags :questiontags="itemData" />
    <component
      :is="dynamicComponent"
      ref="questionInExam"
      :questionlist="itemData"
    />
    <b-modal
      :id="`update-question${itemData.hashId}`"
      title="Sửa câu hỏi"
      ok-title="Cập nhập"
      cancel-title="Đóng"
      size="xl"
      @shown="shown"
      @hide="hide"
    >
      <CreateSingleQuestion
        v-if="doneCall && doShow"
        :question-type="questionType"
        :question-type-id="questionTypeId"
        :question-title="questionTitle"
        :have-right-answer="ishaveRightAnswer"
        :is-pairing="isPairing"
        :have-random-answer="isHaveRandomAnswer"
        :handle-answer="handleAnswer"
        :is-edit="true"
      />
      <b-spinner
        v-if="!doneCall"
        variant="success"
        label="Spinning"
      ></b-spinner>
      <p v-if="!doneCall">Bạn không phải là chủ sở hửu câu hỏi này</p>
    </b-modal>
    <b-modal
      :id="`delete-question${itemData.hashId}`"
      title="Xóa chuyên mục"
      ok-title="Xóa"
      cancel-title="Đóng"
      size="sm"
      @shown="shown"
      @hide="hide"
      @ok="deleteQuestion"
    >
      <p>Bạn có chắn chắn muốn xóa không</p>
    </b-modal>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { uuid } from 'vue-uuid'
import QuestionTags from '@/components/Question/QuestionTags.vue'
import QuestionSingleChoiceList from '@/components/Question/QuestionSingleChoiceList.vue'
import QuestionMultiChoiceList from '@/components/Question/QuestionMultiChoiceList.vue'
import QuestionRightWrongList from '@/components/Question/QuestionRightWrongList.vue'
import QuestionParingList from '@/components/Question/QuestionParingList.vue'
import QuestionFillBlankList from '@/components/Question/QuestionFillBlankList.vue'
import QuestionShortAnswerList from '@/components/Question/QuestionShortAnswerList.vue'
import CreateSingleQuestion from '@/components/Question/CreateSingleQuestion.vue'
import QuestionApi from '@/api/question-list-page'
import handler from '@/utils/question/handleAnswer.js'
export default defineComponent({
  name: 'ExamQuestionSingle',
  components: {
    QuestionTags,
    QuestionSingleChoiceList,
    QuestionMultiChoiceList,
    QuestionRightWrongList,
    QuestionParingList,
    QuestionFillBlankList,
    QuestionShortAnswerList,
    CreateSingleQuestion,
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
  data() {
    return {
      questionTypeId: 0,
      questionType: '',
      questionTitle: '',
      ishaveRightAnswer: true,
      isPairing: false,
      isHaveRandomAnswer: true,
      doneCall: false,
      doShow: false,
      questionItemType: 'question',
    }
  },
  computed: {
    dynamicComponent() {
      const questionType = this.itemData.questionTypeId
      if (questionType === 1) {
        return 'QuestionSingleChoiceList'
      }
      if (questionType === 2) {
        return 'QuestionMultiChoiceList'
      }
      if (questionType === 3) {
        return 'QuestionRightWrongList'
      }
      if (questionType === 4) {
        return 'QuestionParingList'
      }
      if (questionType === 5) {
        return 'QuestionFillBlankList'
      }
      if (questionType === 6) {
        return 'QuestionShortAnswerList'
      }
      if (questionType === 7) {
        return 'QuestionSortAnswerList'
      }
      return 'QuestionSingleChoiceList'
    },
  },
  methods: {
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
      // this.updateAnswer('remove_data')
    },
    showModleDelete() {
      this.$bvModal.show(`delete-question${this.itemData.hashId}`)
    },
    deleteQuestion() {},
    handleAnswer(data) {
      if (this.questionType === 'single-choice') {
        return handler.singleChoiceAndRightWrong(data)
      }
      if (this.questionType === 'multiple-choice') {
        return handler.multipleChoice(data)
      }
      if (this.questionType === 'right-wrong') {
        return handler.singleChoiceAndRightWrong(data)
      }
      if (this.questionType === 'pairing') {
        return handler.matching(data)
      }
      if (this.questionType === 'fill-blank') {
        return handler.fillBlank(data)
      }
      if (this.questionType === 'short-answer') {
        return handler.shortAnswer(data)
      }
      if (this.questionType === 'draggable') {
        return handler.draggable(data)
      }
    },
    checkQuestionType(value) {
      switch (value.questionTypeId) {
        case 1:
          this.questionType = 'single-choice'
          this.questionTypeId = 1
          this.questionTitle = 'Sửa câu hỏi 1 lựa chọn'
          break
        case 2:
          this.questionType = 'multiple-choice'
          this.questionTypeId = 2
          this.questionTitle = 'Sửa câu hỏi nhiều lựa chọn'
          break
        case 3:
          this.questionType = 'right-wrong'
          this.questionTypeId = 3
          this.questionTitle = 'Sửa câu hỏi đúng sai'
          break
        case 4:
          this.questionType = 'pairing'
          this.questionTypeId = 4
          this.isPairing = true
          this.isHaveRandomAnswer = false
          this.questionTitle = 'Sửa câu hỏi ghép đôi'
          break
        case 5:
          this.questionType = 'fill-blank'
          this.questionTypeId = 5
          this.questionTitle = 'Sửa câu hỏi điền vào chổ trống'
          this.isHaveRandomAnswer = false
          break
        case 6:
          this.questionType = 'short-answer'
          this.questionTypeId = 6
          this.questionTitle = 'Sửa câu hỏi trả lời ngắn'
          this.isHaveRandomAnswer = false
          this.isHaveRandomAnswer = false
          break
        case 7:
          this.questionType = 'draggable'
          this.questionTypeId = 7
          this.questionTitle = 'Sửa câu hỏi sắp xếp thứ tự'
          this.isHaveRandomAnswer = false
          break
      }
    },
    getSortNumber(sortNumber) {
      console.log(this.sectionOrder)
      return (this.sectionOrder > 0 ? this.sectionOrder - 1 : 0) + sortNumber
    },
    async fetchQuestion(questionId) {
      console.log('quessstion ididd', this.itemData, this.itemData.hashId)
      this.$bvModal.show(`update-question${this.itemData.hashId}`)
      try {
        let result = {}
        if (!this.itemData.group) {
          result = await QuestionApi.getUserQuestionDetails(questionId)
          const answers = result.data.object.answers
          let listAnswer = []
          if (result.data.object.question.questionTypeId === 4) {
            const lefts = answers.filter((answer) => answer.position === 1)
            const rights = answers.filter((answer) => answer.position === 2)
            const convertLeft = lefts.map((left) => {
              const right = rights.find(
                (x) => x.rightAnswer === left.rightAnswer
              )
              return {
                id: uuid.v4(),
                left: {
                  id: uuid.v4(),
                  position: 1,
                  hashId: left.hashId || '',
                  plainText: left.plainText || '',
                  rightAnswer: left.rightAnswer || 0,
                  random: left.random || true,
                  answerContent: left.answerContent,
                },
                right: {
                  id: uuid.v4(),
                  position: 2,
                  hashId: right.hashId,
                  plainText: right?.plainText || '',
                  rightAnswer: right?.rightAnswer || 0,
                  random: right?.random || true,
                  answerContent: right?.answerContent || '',
                },
              }
            })
            const convertRight = rights
              .filter(
                (x) => !lefts.find((l) => l.rightAnswer === x.rightAnswer)
              )
              .map((x) => ({
                id: uuid.v4(),
                left: {
                  id: uuid.v4(),
                  position: 1,
                  hashId: '',
                  plainText: '',
                  rightAnswer: '',
                  random: false,
                  answerContent: '',
                },
                right: {
                  id: uuid.v4(),
                  position: 2,
                  hashId: '',
                  plainText: x.plainText,
                  rightAnswer: x.rightAnswer,
                  random: x.random,
                  answerContent: x.answerContent,
                },
              }))
            listAnswer = [...convertLeft, ...convertRight]
          } else {
            listAnswer = answers.map((item) => {
              item.id = uuid.v4()
              return item
            })
          }

          result.data.object.answers = listAnswer

          await this.$store.dispatch('questions/copyQuestion', result.data)

          this.checkQuestionType(result.data.object.question)
        } else {
          result = await QuestionApi.getUserQuestionGroupDetails(questionId)
          console.log('longlol', result)
          await this.$store.dispatch('questions/copyGroupQuestion', result.data)
        }
        this.doneCall = true
      } catch (error) {
        // this.$router.push('/users/questions/')
      }
    },
  },
})
</script>
