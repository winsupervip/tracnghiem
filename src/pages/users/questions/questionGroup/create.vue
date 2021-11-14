<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <div class="p-question p-question--singleChoice">
        <div class="p-question__left">
          <HeaderOfSingleQuestion :question-title="questionTitle" />
          <AddChildrenAnswer />
          <!-- <CommentOrNote /> -->
          <!-- <QuestionChild
            v-for="question in getChildQuestion"
            :key="question.id"
            :question="question"
          /> -->
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
// import ListChildrenAnswer from '../../../../components/Question/ListAnswers.vue'
import UploadImage from '../../../../components/Question/UploadImage.vue'
import AddChildrenAnswer from '../../../../components/Question/AddChildrenAnswer.vue'
import CauHoiApi from '../../../../api/cauHoi'
// eslint-disable-next-line import/no-unresolved
import Uploader from '../../../../components/Uploader.vue'
export default defineComponent({
  components: {
    HeaderOfSingleQuestion,
    PublishQuestion,
    LevelForm,
    Category,
    // ListChildrenAnswer,
    // eslint-disable-next-line vue/no-unused-components
    UploadImage,
    AddSeo,
    Uploader,
    AddChildrenAnswer,
  },
  layout: 'dashboard',
  auth: true,

  setup() {
    const data = reactive({
      errors: '',
      questionTitle: 'Câu hỏi chùm',
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
    }),

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
        this.$logger.debug('í dâttr', question)
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
