<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <div class="p-question p-question--singleChoice">
        <div class="p-question__left">
          <HeaderOfSingleQuestion :question-title="questionTitle" />
          <AddChildrenQuestion />
          <!-- <CommentOrNote /> -->
          <!-- <QuestionChild
            v-for="question in getChildQuestion"
            :key="question.id"
            :question="question"
          /> -->
          <div>
            <b-container>
              <b-row
                v-for="(question, index) in getChildQuestion"
                :key="question.id"
                :class="$style.question_child"
              >
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
            </b-container>
          </div>
          <QuestionChild
            :question-child="dataUpdate"
            modal-id="update-child-question"
          />
        </div>

        <div class="p-question__right">
          <PublishQuestion :on-submit="onSubmit" />
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
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { mapGetters, mapActions } from 'vuex'
import PublishQuestion from '../../../../components/Question/PublishQuestion.vue'
import AddSeo from '../../../../components/Question/AddSeo.vue'
import LevelForm from '../../../../components/Question/LevelForm.vue'
import Category from '../../../../components/Question/Category.vue'
import HeaderOfSingleQuestion from '../../../../components/Question/HeaderOfSingleQuestion.vue'
import QuestionChild from '../../../../components/Question/QuestionChild.vue'
import AddChildrenQuestion from '../../../../components/Question/AddChildrenQuestion.vue'
import CauHoiApi from '../../../../api/cauHoi'
// eslint-disable-next-line import/no-unresolved
import Uploader from '../../../../components/Uploader.vue'
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
  },
  layout: 'dashboard',
  auth: true,

  setup() {
    const data = reactive({
      errors: '',
      questionTitle: 'Câu hỏi chùm',
      dataUpdate: {},
      isUpdate: false,
    })

    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({
      getQuestion: 'questions/getQuestion',
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
    onSubmit() {
      const validState = this.isValidAnswer(this.getQuestion.answers)
      if (validState.valid) {
        const question = this.getQuestion
        question.answers = validState.validateAnswers
        question.question.questionTypeId = parseInt(this.questionTypeId)
        CauHoiApi.createQuestion(
          question,
          () => {
            // this.restAnswer()
            this.$toast.success('Thêm Thành Công').goAway(1500)
          },
          () => {
            this.$toast.show('Có lỗi xảy ra').goAway(1500)
          }
        )
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
