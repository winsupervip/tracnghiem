<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <div class="p-question p-question--singleChoice">
        <div class="p-question__left">
          <HeaderOfSingleQuestion :question-title="questionTitle" />
          <AddAnswer
            v-if="questionType !== 'short-answer'"
            :type-question="questionType"
            :have-random-answer="haveRandomAnswer"
            :have-right-answer="haveRightAnswer"
            :is-pairing="isPairing"
          />
          <strong v-else>Nhập Câu trả lời (*)</strong>
          <ListAnswer :type-question="questionType" :errors="errors" />
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
import PublishQuestion from './PublishQuestion.vue'
import LevelForm from './LevelForm.vue'
import Category from './Category.vue'
import HeaderOfSingleQuestion from './HeaderOfSingleQuestion.vue'
import ListAnswer from './ListAnswers.vue'
import AddSeo from './AddSeo.vue'
import CommentOrNote from './CommentOrNote.vue'
import AddAnswer from './AddAnswer.vue'
import CauHoiApi from '@/api/cauHoi'
// eslint-disable-next-line import/no-unresolved
import Uploader from '@/components/Uploader'
export default defineComponent({
  components: {
    HeaderOfSingleQuestion,
    PublishQuestion,
    LevelForm,
    Category,
    ListAnswer,
    AddSeo,
    CommentOrNote,
    Uploader,
    AddAnswer,
  },

  props: {
    questionType: {
      type: String,
      required: true,
    },
    questionTypeId: {
      type: String,
      required: true,
    },
    questionTitle: {
      type: String,
      required: true,
    },
    haveRightAnswer: {
      type: Boolean,
      default: true,
    },
    haveRandomAnswer: {
      type: Boolean,
      default: true,
    },
    isPairing: {
      type: Boolean,
      default: false,
    },
    handleAnswer: {
      type: Function,
      required: true,
    },
  },

  setup() {
    const store = useStore()
    store.dispatch('questions/restData')
    const data = reactive({
      errors: '',
    })

    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({ getQuestion: 'questions/getQuestion' }),
  },
  methods: {
    ...mapActions({
      restData: 'questions/restData',
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
    async onSubmit() {
      const validState = this.isValidAnswer(this.getQuestion.answers)
      if (validState.valid) {
        const question = this.getQuestion
        question.answers = validState.validateAnswers
        this.$logger.info('í dâttr', question)
        question.question.questionTypeId = parseInt(this.questionTypeId)
        try {
          const { data } = await CauHoiApi.createQuestion(question)
          this.$handleError(data)
          //  this.restData()
          window.location.href = '/users/questions/'
        } catch (err) {
          this.$handleError(err, () => {
            console.log(err)
          })
        }
      }
    },
  },
})
</script>
