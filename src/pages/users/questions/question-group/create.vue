<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <div class="p-question p-question--singleChoice">
        <div class="p-question__left">
          <HeaderOfSingleQuestion :question-title="questionTitle" />
          <AddChildrenQuestion />

          <!-- <QuestionChild
            v-for="question in getChildQuestion"
            :key="question.id"
            :question="question"
          /> -->
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
                    cols="8 "
                    v-html="question.question.questionContent"
                  ></b-col>
                  <b-col cols="2" class="matching_style">
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
          <CommentOrNote />
        </div>

        <div class="p-question__right">
          <PublishQuestion />
          <Category />
          <LevelForm />
          <!-- <UploadImage :get-image="getImage" /> -->
          <Uploader :accept="'*/*'" :disabled="false"></Uploader>
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
      questionTitle: 'Câu hỏi chùm',
      dataUpdate: {},
      isUpdate: false,
      isValid: true,
    })

    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({
      getGroupQuestion: 'questions/getGroupQuestion',
      getChildQuestion: 'questions/getChildQuestion',
    }),
  },

  methods: {
    ...mapActions({
      restAnswer: 'questions/restAnswer',
      setNullAnswerId: 'questions/setNullAnswerId',
      deleteChildQuestion: 'questions/deleteChildQuestion',
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
      groupQuestion.childQuestions.forEach((element, index) => {
        if (element.typeQuestion === 'single-choice') {
          value = handler.singleChoiceAndRightWrong(element.answers)
        } else if (element.typeQuestion === 'short-answer') {
          value = handler.shortAnswer(element.answers)
        } else if (element.typeQuestion === 'right-wrong') {
          value = handler.singleChoiceAndRightWrong(element.answers)
        } else if (element.typeQuestion === 'multiple-choice') {
          value = handler.multipleChoice(element.answers)
        } else if (element.typeQuestion === 'pairing') {
          value = handler.matching(element.answers)
        } else if (element.typeQuestion === 'fill-blank') {
          value = handler.fillBlank(element.answers)
        } else if (element.typeQuestion === 'draggable') {
          value = handler.draggable(element.answers)
        }
        const question = {}
        question.title = groupQuestion.question.title
        question.questionTypeId = element.question.questionTypeId
        question.questionContent = element.question.questionContent
        question.explainationIfCorrect =
          groupQuestion.question.explainationIfCorrect
        question.explainationIfIncorrect =
          groupQuestion.question.explainationInIfcorrect
        question.statusId = groupQuestion.question.statusId
        question.levelId = groupQuestion.question.levelId
        question.plainText = element.question.plainText
        question.seoAvatar = groupQuestion.question.seoAvatar
        question.seoTitle = groupQuestion.question.seoTitle
        question.seoDescription = groupQuestion.question.seoDescription
        question.tags = groupQuestion.question.tags
        question.categories = groupQuestion.question.categories
        question.questionGroupId = null
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
    onSubmit() {
      const questionInGroups = this.validateChildQuestion(this.getGroupQuestion)
      const questionGroup = {
        questionGroup: {
          title: this.getGroupQuestion.question.title,
          hashId: '',
          questionGroupName: this.getGroupQuestion.question.questionContent,
          description:
            'Voluntary work helps foster independence and imparts the ability to deal with different situations, often simulaneously, thus teaching people how to (1)____ their way through different systems. It therefore brings people into touch with the real worls; and, hence, equips them for the future. Initially, young adults in their late teens might not seem to have the expertise or knowledge to impart to others that say a teacher or an agriculturalist or a nurse would have, (2)____ they do have many skills that can help others. And in the absence of any particular talent, their energy and enthusiasm can be harnessed for the benefit (3) ____ their fellow human beings, and ultimately themselves. From all this, the gain to any community no matter how many voluntees are involved is (4)_____ Employers will generally look favorably on people (5)_____ have shown an ability to work as part of a team. It demonstrates a willingness to learn and an independent spirit, which would be desirable qualities in any employee.',
          plainText: this.getGroupQuestion.question.plainText,
          random: false,
          statusId: 1,
          seoAvatar: this.getGroupQuestion.question.seoAvatar,
          seoTitle: this.getGroupQuestion.question.seoTitle,
          seoDescription: this.getGroupQuestion.question.seoDescription,
        },
        questionInGroups,
      }
      if (this.isValid) {
        CauHoiApi.createGroupQuestion(
          questionGroup,
          () => {
            // this.restAnswer()
            this.$toast.success('Thêm Thành Công').goAway(1500)
            window.location.href = '/users/questions/'
          },
          () => {
            this.$toast.show('Có lỗi xảy ra').goAway(1500)
          }
        )
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
