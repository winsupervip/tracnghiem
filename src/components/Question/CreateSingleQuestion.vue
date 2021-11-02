<template>
  <div class="p-question p-question--singleChoice">
    <div class="p-question__left">
      <Header :question-title="questionTitle" :errors="errors" />
      <AddAnswer :errors="errors" />

      <ListAnswer :type-question="questionType" :errors="errors" />
      <CommentOrNote />
    </div>
    <div class="p-question__right">
      <PublishQuestion :errors="errors" :on-submit="onSubmit" />
      <Category :errors="errors" />
      <LevelForm :errors="errors" />
      <!-- <UploadImage :get-image="getImage" /> -->
      <Uploader :accept="'*/*'" :disabled="false"></Uploader>
      <AddSeo :errors="errors" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { mapGetters } from 'vuex'
import PublishQuestion from './PublishQuestion.vue'
import LevelForm from './LevelForm.vue'
import Category from './Category.vue'
import Header from './Header.vue'
import ListAnswer from './ListAnswers.vue'
import UploadImage from './UploadImage.vue'
import AddSeo from './AddSeo.vue'
import CommentOrNote from './CommentOrNote.vue'
import AddAnswer from './AddAnswer.vue'
import CauHoiApi from '@/api/cauHoi'
// eslint-disable-next-line import/no-unresolved
import Uploader from '@/components/Uploader'
export default defineComponent({
  components: {
    Header,
    PublishQuestion,
    LevelForm,
    Category,
    ListAnswer,
    // eslint-disable-next-line vue/no-unused-components
    UploadImage,
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
