<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <div class="p-question p-question--singleChoice">
        <div class="p-question__left">
          <HeaderOfSingleQuestion :question-title="questionTitle" />
          <div class="mt-2">
            <b-form-checkbox v-model="hasNoCorrectAnswer" name="checkbox-1">
              Chưa có đáp án đúng
            </b-form-checkbox>
          </div>

          <AddAnswer
            v-if="questionType !== 'short-answer'"
            :type-question="questionType"
            :have-random-answer="haveRandomAnswer"
            :have-right-answer="haveRightAnswer"
            :is-pairing="isPairing"
            :block-right-answer="hasNoCorrectAnswer"
          />
          <strong v-else>Nhập Câu trả lời (*)</strong>
          <ListAnswer
            :type-question="questionType"
            :errors="errors"
            :block-right-answer="hasNoCorrectAnswer"
          />
          <CommentOrNote />
        </div>
        <div class="p-question__right">
          <PublishQuestion :is-edit="isEdit" :is-copy="isCopy" />
          <Category />
          <LevelForm />

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
      type: [Number, String],
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
    isCopy: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const store = useStore()
    if (!props.isEdit && !props.isCopy) {
      store.dispatch('questions/restData')
    }
    const data = reactive({
      errors: '',
      image: '',
      hasNoCorrectAnswer: false,
    })

    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({
      getSeoAvatar: 'questions/getSeoAvatar',
      getQuestion: 'questions/getQuestion',
    }),
  },
  watch: {
    image() {
      this.addSeoAvater(this.image)
    },
    getSeoAvatar() {
      this.image = this.getSeoAvatar
    },
  },
  mounted() {
    this.image = this.getSeoAvatar
  },
  methods: {
    ...mapActions({
      addSeoAvater: 'questions/addSeoAvatar',
      restData: 'questions/restData',
      setNullAnswerId: 'questions/setNullAnswerId',
    }),

    isValidAnswer(answers) {
      this.errors = ''
      let validateAnswers = []
      let valid = true
      if (answers.length === 0) {
        this.errors = 'Câu trả lời hiện đang trống'
        valid = false
        this.$toast.show('Câu trả lời hiện đang bỏ trống').goAway(1000)
        return { valid, validateAnswers }
      }
      const result = this.handleAnswer({
        answers,
        hasNoCorrectAnswer: this.hasNoCorrectAnswer,
      })
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
        const question = {
          question: {
            hasNoCorrectAnswer: this.hasNoCorrectAnswer,
            hashId: this.getQuestion.question.hashId,
            title: this.getQuestion.question.title,
            questionTypeId: this.questionTypeId,
            questionContent: this.getQuestion.question.questionContent,
            explainationIfCorrect:
              this.getQuestion.question.explainationIfCorrect,
            explainationIfIncorrect:
              this.getQuestion.question.explainationIfIncorrect,
            statusId: this.getQuestion.question.statusId,
            levelId: this.getQuestion.question.levelId,
            plainText: this.getQuestion.question.plainText,
            seoAvatar: this.getQuestion.question.seoAvatar,
            seoTitle: this.getQuestion.question.seoTitle,
            seoDescription: this.getQuestion.question.seoDescription,
            tags: this.getQuestion.question.tags,
            categories: this.getQuestion.question.categories,
          },
          // nếu mà không có đáp án đúng thì trả về []
          answers: validState?.validateAnswers,
        }
        if (this.isCopy) {
          question.question.hashId = ''
          question.answers = question.answers.map((item) => {
            item.hashId = ''
            return item
          })
        }
        try {
          if (this.isEdit) {
            await QuestionApi.updateQuestion(question)
            // this.$handleError(data)
            this.$toast.success(this.$i18n.t('errors.00000000'))
          } else if (this.isCopy) {
            console.log('day la quasetiion copy')
            // await QuestionApi.createQuestion(question)

            this.$toast.success(this.$i18n.t('errors.00000000'))
          } else {
            const { data } = await CauHoiApi.createQuestion(question)
            this.$handleError(data)
          }
          window.location.href = '/users/questions/'
          //  this.restData()
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
