<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <div class="p-question p-question--singleChoice">
        <div class="p-question__left">
          <HeaderOfSingleQuestion :question-title="questionTitle" />
          <AddChildrenQuestion />

          <div>
            <b-container>
              <div
                v-for="(question, index) in getChildQuestion"
                :key="question.id"
                :class="$style.question_child"
              >
                <b-row>
                  <b-col cols="2">
                    <strong>Câu {{ index + 1 }}</strong>
                  </b-col>
                  <b-col
                    cols="8"
                    v-html="question.question.questionContent"
                  ></b-col>
                  <b-col cols="2" class="d-flex justify-content-between">
                    <b-icon icon="shuffle"></b-icon>
                    <b-icon
                      v-b-modal.update-child-question
                      icon="pencil-square"
                      @click="openUpdate(question)"
                    ></b-icon>
                    <b-icon
                      icon="trash"
                      @click="deleteQuestion(question.id)"
                    ></b-icon>
                  </b-col>
                </b-row>
                <b-alert
                  v-if="errors[index] && errors[index].length > 0"
                  show
                  variant="danger"
                  >{{ errors[index] }}</b-alert
                >
              </div>
            </b-container>
          </div>
          <QuestionChild
            :question-child="dataUpdate"
            modal-id="update-child-question"
          />
          <CommentOrNote :group="true" />
        </div>

        <div class="p-question__right">
          <PublishQuestion />
          <Category />
          <LevelForm />
          <!-- <UploadImage :get-image="getImage" /> -->
          <Uploader
            v-model="image"
            :accept="'*/*'"
            :disabled="false"
          ></Uploader>
          <AddSeo />
        </div>
      </div>
    </b-form>
  </ValidationObserver>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useStore,
} from '@nuxtjs/composition-api'
import { mapGetters, mapActions } from 'vuex'
import PublishQuestion from '../../../../components/Question/PublishQuestion.vue'
import AddSeo from '../../../../components/Question/AddSeo.vue'
import LevelForm from '../../../../components/Question/LevelForm.vue'
import Category from '../../../../components/Question/Category.vue'
import HeaderOfSingleQuestion from '../../../../components/Question/HeaderOfSingleQuestion.vue'
import QuestionChild from '../../../../components/Question/QuestionChild.vue'
import AddChildrenQuestion from '../../../../components/Question/AddChildrenQuestion.vue'
import CauHoiApi from '../../../../api/cauHoi'
import Uploader from '../../../../components/Uploader.vue'
import CommentOrNote from '@/components/Question/CommentOrNote.vue'
// eslint-disable-next-line import/no-unresolved
import handler from '@/utils/question/handleAnswer.js'
export default defineComponent({
  components: {
    HeaderOfSingleQuestion,
    PublishQuestion,
    LevelForm,
    Category,
    AddSeo,
    Uploader,
    AddChildrenQuestion,
    QuestionChild,
    CommentOrNote,
  },
  layout: 'dashboard',
  auth: false,

  setup() {
    const store = useStore()
    store.dispatch('questions/restData')
    const data = reactive({
      errors: [],
      questionTitle: 'Thêm câu hỏi chùm',
      dataUpdate: {},
      isUpdate: false,
      isValid: true,
      image: '',
    })

    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({
      getGroupQuestion: 'questions/getGroupQuestion',
      getChildQuestion: 'questions/getChildQuestion',
      getSeoAvatar: 'questions/getSeoAvatar',
    }),
  },
  watch: {
    image() {
      this.addSeoAvater(this.image)
    },
  },
  mounted() {
    this.image = this.getSeoAvatar
  },
  methods: {
    ...mapActions({
      restAnswer: 'questions/restAnswer',
      setNullAnswerId: 'questions/setNullAnswerId',
      deleteChildQuestion: 'questions/deleteChildQuestion',
      addSeoAvater: 'questions/addSeoAvatar',
    }),
    openUpdate(data) {
      this.dataUpdate = data
      this.isUpdate = true
    },
    closeUpdate() {
      this.isUpdate = false
    },
    deleteQuestion(id) {
      this.deleteChildQuestion(id)
    },
    isValidAnswer(answers) {
      this.errors = ''
      let validateAnswers = []
      let valid = true

      const result = this.handleAnswer(answers)
      console.log(result)
      if (result.errors.length === 0) {
        validateAnswers = result.data
      } else {
        this.errors = result.errors
        valid = false
      }
      return { valid, validateAnswers }
    },
    validateChildQuestion(groupQuestion) {
      const result = []
      let value = []
      this.errors = []
      this.isValid = true
      console.log(groupQuestion)
      if (groupQuestion.childQuestions.length === 0) {
        this.errors.push('Bạn phải nhập vào nội dung câu hỏi')
        this.isValid = false
        return
      }
      groupQuestion.childQuestions.forEach((element, index) => {
        console.log('emler', element)
        if (element.question.questionContent === '') {
          this.errors.push('Bạn phải nhập vào nội dung câu hỏi con')
          this.isValid = false
        }
        if (element.typeQuestion === 'single-choice') {
          value = handler.singleChoiceAndRightWrong({
            answers: element.answers,
            hasNoCorrectAnswer: element.question.hasNoCorrectAnswer,
          })
        } else if (element.typeQuestion === 'short-answer') {
          value = handler.shortAnswer({
            answers: element.answers,
            hasNoCorrectAnswer: element.question.hasNoCorrectAnswer,
          })
        } else if (element.typeQuestion === 'right-wrong') {
          value = handler.singleChoiceAndRightWrong({
            answers: element.answers,
            hasNoCorrectAnswer: element.question.hasNoCorrectAnswer,
          })
        } else if (element.typeQuestion === 'multiple-choice') {
          value = handler.multipleChoice({
            answers: element.answers,
            hasNoCorrectAnswer: element.question.hasNoCorrectAnswer,
          })
        } else if (element.typeQuestion === 'pairing') {
          value = handler.matching({
            answers: element.answers,
            hasNoCorrectAnswer: element.question.hasNoCorrectAnswer,
          })
        } else if (element.typeQuestion === 'fill-blank') {
          value = handler.fillBlank({
            answers: element.answers,
            hasNoCorrectAnswer: element.question.hasNoCorrectAnswer,
          })
        } else if (element.typeQuestion === 'draggable') {
          value = handler.draggable({
            answers: element.answers,
            hasNoCorrectAnswer: element.question.hasNoCorrectAnswer,
          })
        }
        const question = {}
        question.hasNoCorrectAnswer = element.question.hasNoCorrectAnswer
        question.title = groupQuestion.question.title
        question.questionTypeId = element.question.questionTypeId
        question.questionContent = element.question.questionContent
        question.explainationIfCorrect =
          groupQuestion.question.explainationIfCorrect
        question.explainationIfIncorrect =
          groupQuestion.question.explainationIfIncorrect
        question.statusId = groupQuestion.question.statusId
        question.levelId = groupQuestion.question.levelId
        question.plainText = element.question.plainText
        question.seoAvatar = groupQuestion.question.seoAvatar
        question.seoTitle = groupQuestion.question.seoTitle
        question.seoDescription = groupQuestion.question.seoDescription
        question.tags = groupQuestion.question.tags
        question.categories = groupQuestion.question.categories
        question.questionGroupId = element.questionGroupId
        question.groupOrder = index + 1
        const data = {
          question,
          answers: value.data,
        }
        result.push(data)
        this.errors.push(value.errors)
        if (value.errors.length !== 0) {
          this.isValid = false
        }
      })
      return result
    },
    async onSubmit() {
      const questionInGroups = this.validateChildQuestion(this.getGroupQuestion)
      const questionGroup = {
        questionGroup: {
          title: this.getGroupQuestion.question.title,
          hashId: '',
          questionGroupName: this.getGroupQuestion.question.questionContent,
          description: this.getGroupQuestion.question.questionContent,
          plainText: this.getGroupQuestion.question.plainText,
          random: false,
          levelId: this.getGroupQuestion.question.levelId,
          statusId: this.getGroupQuestion.question.statusId,
          seoAvatar: this.getGroupQuestion.question.seoAvatar,
          seoTitle: this.getGroupQuestion.question.seoTitle,
          seoDescription: this.getGroupQuestion.question.seoDescription,
        },
        questionInGroups,
      }
      if (this.isValid) {
        await CauHoiApi.createGroupQuestion(questionGroup)
        this.$toast.success('Thêm Thành Công').goAway(1500)
        window.location.href = '/users/questions/'
      } else {
        this.$toast.error('Có lỗi xảy ra ở phần câu hỏi con').goAway(1500)
      }
    },
  },
})
</script>
<style module>
.question_child {
  margin: 1rem;
}
</style>
