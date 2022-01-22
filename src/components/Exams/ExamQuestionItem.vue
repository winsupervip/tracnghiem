<template>
  <div>
    <div class="list-single-question">
      <div class="list-questions-user">
        <b-card class="mt-3">
          <div class="d-flex justify-content-between">
            <h3 class="question-number">
              Câu hỏi {{ getSortNumber(itemData.sortOrder) }}.
            </h3>
            <div>
              <button
                class="btn btn-link"
                title="Thay đổi vị trí"
                @click="showModalSort"
              >
                <b-icon-shuffle></b-icon-shuffle>
              </button>
              <button
                class="btn btn-link"
                title="Chỉnh sửa câu hỏi"
                @click="fetchQuestion(itemData.hashId)"
              >
                <b-icon-pencil-square></b-icon-pencil-square>
              </button>
              <button
                class="btn btn-link"
                title="Xóa khỏi đề thi"
                @click="showModleDelete"
              >
                <b-icon-trash></b-icon-trash>
              </button>
            </div>
          </div>
          <div
            v-if="itemData.section && itemData.section.title.length > 0"
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
              {{ itemData.section.title }}
              <i class="icon-caret-down"></i>
            </strong>
            <b-collapse
              v-model="showFilterGroupSection"
              class="filter-group-body"
            >
              <p v-html="itemData.section.description"></p>
            </b-collapse>
          </div>
          <div
            v-if="itemData.group && itemData.group.title.length > 0"
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
              {{ itemData.group.title }}
              <i class="icon-caret-down"></i>
            </strong>
            <b-collapse
              v-model="showFilterGroupQuestion"
              class="filter-group-body"
            >
              <p v-html="itemData.group.description"></p>
            </b-collapse>
          </div>
          <component
            :is="dynamicComponent"
            ref="questionInExam"
            :questionlist="itemData"
          />
          <QuestionTags :questiontags="itemData" />
        </b-card>
      </div>
    </div>
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
        v-if="belongToUser && doShow"
        :question-type="questionType"
        :question-type-id="questionTypeId"
        :question-title="questionTitle"
        :have-right-answer="ishaveRightAnswer"
        :is-pairing="isPairing"
        :have-random-answer="isHaveRandomAnswer"
        :handle-answer="handleAnswer"
        :is-edit="true"
      />
      <p v-if="!belongToUser">Bạn không phải là chủ sở hửu câu hỏi này</p>
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
    <b-modal
      :id="`sort${itemData.hashId}`"
      title="Đổi vị trí câu hỏi"
      hide-footer
      size="lg"
      @shown="shown"
      @hide="hide"
    >
      <div class="container">
        <b-row>
          <b-col cols="10">
            <b-form-select v-model="selected" class="w-100">
              <b-form-select-option :value="null"
                >Chuyên muc mới</b-form-select-option
              >
              <b-form-select-option
                v-for="s in listSection"
                :key="s.hashId"
                :value="s.hashId"
                >{{ s.title }}</b-form-select-option
              >
            </b-form-select>
          </b-col>
          <b-col cols="1">
            <b-button variant="outline-primary" @click="opentAddSectionModal"
              ><b-icon-plus></b-icon-plus
            ></b-button>
          </b-col>
        </b-row>
        <div class="container">
          <b-row class="mt-2">
            <b-col cols="5">
              <b>Chuyên Mục hiện tại:</b>
            </b-col>
            <b-col>
              <b>{{ itemData.section ? itemData.section.title : '' }}</b>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col cols="5">
              <b>Thứ tự hiện tại:</b>
            </b-col>
            <b-col class="d-flex" cols="2">
              <b>{{ itemData.sortOrder }}</b>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col cols="5">
              <b>Thứ tự Mới:</b>
            </b-col>
            <b-col class="d-flex" cols="2">
              <b-form-input
                v-model="newPosition"
                class="widthModalAdd"
                type="number"
                :no-wheel="false"
                min="1"
                :max="total"
                :readonly="isDisable"
              ></b-form-input>
            </b-col>
            <b-col>
              <b-button
                variant="outline-primary"
                class="m-2"
                size="sm"
                @click="changeSortOrder"
                >{{ isDisable ? 'Đổi' : 'Ok' }}</b-button
              >
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col cols="5"></b-col>
            <b-col>{{ error.length > 0 ? error : null }}</b-col>
          </b-row>
          <div class="d-flex justify-content-end">
            <b-button variant="primary" class="m-1" @click="closeSortOrder"
              >Đóng</b-button
            >
            <b-button
              variant="primary"
              class="m-1"
              :disabled="!valid"
              @click="sortOrder"
              >Lưu</b-button
            >
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
      :id="`addSection${itemData.hashId}`"
      title="Thêm mới chuyên mục"
      hide-footer
      @shown="shown"
      @hide="hide"
    >
      <ModalAddSection
        :exam-hash-id="examHashId"
        @on-add-section="onAddSection"
      />
    </b-modal>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { uuid } from 'vue-uuid'
import { mapGetters } from 'vuex'
import QuestionTags from '@/components/Question/QuestionTags.vue'
import QuestionSingleChoiceList from '@/components/Question/QuestionSingleChoiceList.vue'
import QuestionMultiChoiceList from '@/components/Question/QuestionMultiChoiceList.vue'
import QuestionRightWrongList from '@/components/Question/QuestionRightWrongList.vue'
import QuestionParingList from '@/components/Question/QuestionParingList.vue'
import QuestionFillBlankList from '@/components/Question/QuestionFillBlankList.vue'
import QuestionShortAnswerList from '@/components/Question/QuestionShortAnswerList.vue'
import CreateSingleQuestion from '@/components/Question/CreateSingleQuestion.vue'
import QuestionApi from '@/api/question-list-page'
import ExamApi from '@/api/examApi.js'
import handler from '@/utils/question/handleAnswer.js'
import ModalAddSection from '@/components/Exams/ModalAddSection.vue'
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
    ModalAddSection,
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
    total: {
      type: Number,
      required: true,
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
      belongToUser: false,
      doShow: false,
      questionItemType: 'question',
      selected: null,
      listSection: [],
      examHashId: this.$route.params.id,
      isDisable: true,
      newPosition: this.itemData.sortOrder,
      error: '',
      valid: false,
      showFilterGroupSection: false,
      showFilterGroupQuestion: true,
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
    ...mapGetters({
      getUserId: 'user/getUserId',
    }),
  },
  methods: {
    async sortOrder() {
      const data = {
        hashId: this.examHashId,
        oldSortOrder: this.itemData.sortOrder,
        newSortOrder: this.newPosition,
      }
      console.log(data)
      try {
        const result = await ExamApi.sortOrder(data)
        this.$toast.success('Cập nhập vị trí thành công').goAway(1000)
        window.location.reload()
        console.log(result)
      } catch (error) {
        this.$toast.show('Có lỗi sảy ra').goAway(1000)
      }
    },
    changeSortOrder() {
      this.isDisable = !this.isDisable
      if (this.newPosition < 1 || this.newPosition > this.total) {
        this.error = 'Vị trí mới cho câu hỏi không hợp lệ'
        this.valid = false
      } else if (this.newPosition === this.itemData.sortOrder) {
        this.error = 'Vị trí mới trùng với vị trí cũ'
        this.valid = false
      } else {
        this.error = ''
        this.valid = true
      }
    },
    opentAddSectionModal() {
      this.$bvModal.show(`addSection${this.itemData.hashId}`)
    },
    onAddSection(value) {
      this.$bvModal.hide(`addSection${this.itemData.hashId}`)
      this.listSection.push(value)
    },
    async getListExamSection() {
      const result = await ExamApi.getSectionsByExam(this.examHashId)
      this.listSection = result?.data?.object?.items
      this.selected = this.itemData?.section?.hashId
    },
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
    },
    closeSortOrder() {
      this.$bvModal.hide(`sort${this.itemData.hashId}`)
    },
    showModalSort() {
      this.$bvModal.show(`sort${this.itemData.hashId}`)
      this.getListExamSection()
    },
    showModleDelete() {
      this.$bvModal.show(`delete-question${this.itemData.hashId}`)
    },
    async deleteQuestion() {
      const data = {
        examHashId: this.examHashId,
        questionHashId: this.itemData.hashId,
      }
      try {
        const result = await ExamApi.deleteQuestionInExam(data)
        if (result.status === 200) {
          this.$toast.success('Xóa câu hỏi khỏi đề thi thành công').goAway(1000)

          window.location.reload()
        } else {
          this.$toast.show('Có lỗi sảy ra').goAway(1000)
        }
        console.log(result)
      } catch (error) {
        this.$toast.show('Có lỗi sảy ra').goAway(1000)
      }
    },
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
      this.$bvModal.show(`update-question${this.itemData.hashId}`)
      // nếu câu hỏi không phỉa do họ tạo ra thì không cho xóa
      if (this.itemData?.createBy !== this.getUserId) {
        this.belongToUser = false
        return
      }
      let result = {}
      result = await QuestionApi.getUserQuestionDetails(questionId)
      const answers = result.data.object.answers
      let listAnswer = []
      if (result.data.object.question.questionTypeId === 4) {
        const lefts = answers.filter((answer) => answer.position === 1)
        const rights = answers.filter((answer) => answer.position === 2)
        const convertLeft = lefts.map((left) => {
          const right = rights.find((x) => x.rightAnswer === left.rightAnswer)
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
          .filter((x) => !lefts.find((l) => l.rightAnswer === x.rightAnswer))
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

      // result = await QuestionApi.getUserQuestionGroupDetails(questionId)
      // await this.$store.dispatch('questions/copyGroupQuestion', result.data)

      this.belongToUser = true
    },
  },
})
</script>
