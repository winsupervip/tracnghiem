<template>
  <div class="p-question p-question--singleChoice">
    <div class="p-question__left">
      <Header :question-type="questionType" :errors="errors" />
      <AddAnswer :errors="errors" />
      <ListAnswer type-question="single-choice" :errors="errors" />
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
import {
  defineComponent,
  reactive,
  toRefs,
  useContext,
} from '@nuxtjs/composition-api'
// import _ from 'lodash'
// eslint-disable-next-line no-unused-vars
// import { uuid } from 'vue-uuid'
// import EventBus from '../../../../plugins/eventBus'
import { mapGetters } from 'vuex'
import PublishQuestion from '@/components/Question/PublishQuestion.vue'
import LevelForm from '@/components/Question/LevelForm.vue'
import Category from '@/components/Question/Category.vue'
import Header from '@/components/Question/Header.vue'
import ListAnswer from '@/components/Question/ListAnswers.vue'
import UploadImage from '@/components/Question/UploadImage.vue'
import AddSeo from '@/components/Question/AddSeo.vue'
import CommentOrNote from '@/components/Question/CommentOrNote.vue'
import CauHoiApi from '@/api/cauHoi'
import AddAnswer from '@/components/Question/AddAnswer.vue'
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
  layout: 'dashboard',
  auth: true,
  setup() {
    const { i18n } = useContext()
    const data = reactive({
      questionType: i18n.t('Thêm câu hỏi 1 lựa chọn'),
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
        data.question.questionTypeId = 1
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
<style lang="scss" module>
.addQuestionTitle {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
.checkBox {
  display: flex;
  margin: 2rem;
}
.checkBoxView {
  display: flex;
}
.checkBoxInput {
  align-self: center;
  margin-right: 1rem;
}
.checkBoxTitle {
  align-self: center;
  margin: 0 auto;
}
</style>
