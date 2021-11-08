<template>
  <div class="p-question p-question--singleChoice">
    <div class="p-question__left">
      <Header question-title="câu hỏi chùm" :errors="errors" />
      <AddChildrenAnswer />
      <ListChildrenAnswer :type-question="questionType" :errors="errors" />
    </div>
    <div class="p-question__right">
      <PublishQuestion :errors="errors" :on-submit="onSubmit" />
      <Category :errors="errors" />
      <LevelForm :errors="errors" />
      <Uploader :accept="'*/*'" :disabled="false"></Uploader>
      <AddSeo :errors="errors" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { mapGetters } from 'vuex'
import PublishQuestion from '../../../../components/Question/PublishQuestion.vue'
import AddSeo from '../../../../components/Question/AddSeo.vue'
import LevelForm from '../../../../components/Question/LevelForm.vue'
import Category from '../../../../components/Question/Category.vue'
import Header from '../../../../components/Question/Header.vue'
import ListChildrenAnswer from '../../../../components/Question/ListAnswers.vue'
import UploadImage from '../../../../components/Question/UploadImage.vue'
import AddChildrenAnswer from '../../../../components/Question/AddChildrenAnswer.vue'
import CauHoiApi from '../../../../api/cauHoi'
// eslint-disable-next-line import/no-unresolved
import Uploader from '../../../../components/Uploader.vue'
export default defineComponent({
  components: {
    Header,
    PublishQuestion,
    LevelForm,
    Category,
    ListChildrenAnswer,
    // eslint-disable-next-line vue/no-unused-components
    UploadImage,
    AddSeo,
    Uploader,
    AddChildrenAnswer,
  },
  layout: 'dashboard',
  auth: true,

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
  },

  setup() {
    const data = reactive({
      errors: [],
    })

    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters(['isValid', 'getQuestion']),
  },
  methods: {
    removeAnswerId(value) {
      const listAnswers = value.map((item) => {
        delete item.id
        return item
      })
      return listAnswers
    },
    onSubmit() {
      const valid = this.isValid
      this.errors = valid.errors
      if (valid.isValid) {
        const data = this.getQuestion
        data.question.questionTypeId = parseInt(this.questionTypeId)
        data.answers = this.removeAnswerId(this.getQuestion.answers)
        CauHoiApi.createQuestion(
          data,
          () => {
            this.$toast.show('Thêm Thành Công').goAway(1500)
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
