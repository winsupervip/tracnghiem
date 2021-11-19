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
          <PublishQuestion :on-submit="onSubmit" :is-edit="isEdit" />
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
import PublishQuestion from './PublishQuestion.vue'
import LevelForm from './LevelForm.vue'
import Category from './Category.vue'
import HeaderOfSingleQuestion from './HeaderOfSingleQuestion.vue'
import ListAnswer from './ListAnswers.vue'
import AddSeo from './AddSeo.vue'
import CommentOrNote from './CommentOrNote.vue'
import AddAnswer from './AddAnswer.vue'
import CauHoiApi from '@/api/cauHoi'
import QuestionApi from '@/api/question-list-page'
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
    isEdit: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
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
      restAnswer: 'questions/restAnswer',
      setNullAnswerId: 'questions/setNullAnswerId',
    }),

    isValidAnswer(answers) {
      this.errors = ''
      let validateAnswers = []
      let valid = true
      console.log('qanswer', answers)
      const result = this.handleAnswer(answers)
      console.log('result', result)
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
        if (this.isEdit) {
          QuestionApi.updateQuestion(
            question,
            () => {
              this.$toast.success('Thêm Thành Công').goAway(1500)
              setTimeout(() => {
                this.$router.push({ path: '/users/questions/' })
              }, 500)
            },
            () => {
              this.$toast.show('Có lỗi xảy ra').goAway(1500)
            }
          )
        } else {
          CauHoiApi.createQuestion(
            question,
            () => {
              // this.restAnswer()
              this.$toast.success('Thêm Thành Công').goAway(1500)
              setTimeout(() => {
                this.$router.push({ path: '/users/questions/' })
              }, 500)
            },
            () => {
              this.$toast.show('Có lỗi xảy ra').goAway(1500)
            }
          )
        }
      }
    },
  },
})
</script>
