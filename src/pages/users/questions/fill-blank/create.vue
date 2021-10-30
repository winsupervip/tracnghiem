<template>
  <div class="p-question p-question--singleChoice">
    <div class="p-question__left">
      <Header
        :question-type="questionType"
        :get-question="getQuestion"
        :get-tags="getTags"
        :get-title="getTitle"
        :errors="errors"
      />
      <AddAnswer
        :have-right-answer="false"
        :have-random-answer="true"
        :update-value="updateValue"
        :errors="errors"
        :update-answer="updateAnswer"
        :index-answer-update="indexDataUpdate"
        @add="addListAnswer"
      />

      <ListAnswer
        :list-answers="listAnswers"
        type-question="fill-blank"
        :update-answer="updateAnswer"
        :update-right-answer="updateRightAnswer"
        :errors="errors"
        :delete-answer="deleteAnswer"
        @updateListAnswer="updateListAnswer"
      />
      <CommentOrNote :get-comment-or-note="getCommentOrNote" />
    </div>
    <div class="p-question__right">
      <PublishQuestion
        :get-publish-question="getPublishQuestion"
        :errors="errors"
        :on-submit="onSubmit"
      />
      <Category :get-categories="getCategories" :errors="errors" />
      <LevelForm :get-level-form="getLevelForm" :errors="errors" />
      <!-- <UploadImage :get-image="getImage" /> -->
      <Uploader
        v-model="seoAvatar"
        :accept="'*/*'"
        :disabled="false"
        :get-image="getImage"
      ></Uploader>
      <AddSeo :get-seo="getSeo" :errors="errors" />
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
import { uuid } from 'vue-uuid'
// import EventBus from '../../../../plugins/eventBus'
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
    const { $logger, i18n } = useContext()
    const data = reactive({
      questionType: i18n.t('Thêm câu hỏi điền vào chổ trống'),
      questionContent: '',
      answerContent: '',
      options: {
        convert_urls: false,
        entity_encoding: 'raw',
      },
      isRightAnswer: false,
      isRandom: false,
      listAnswers: [],
      indexDataUpdate: -1,
      categories: [],
      levelForm: false,
      statusId: false,
      levelId: false,
      seoAvatar: '',
      seoTitle: '',
      seoDescription: '',
      explainationIfCorrect: '',
      explainationIfInCorrect: '',
      tags: [],
      title: '',
      modalShow: false,
      updateValue: {},
      errors: [],
      position: 0,
    })
    const getQuestion = (value) => {
      data.questionContent = value
      $logger.info(value)
    }

    return {
      ...toRefs(data),
      getQuestion,
    }
  },
  methods: {
    getCategories(value) {
      this.categories = value
      console.log(value)
    },
    getLevelForm(value) {
      this.levelId = value
      console.log(value)
    },
    getPublishQuestion(value) {
      this.statusId = value
      console.log(value)
    },
    getSeo(value) {
      this.seoTitle = value.seoTitle
      this.seoDescription = value.seoDescription
      console.log(value)
    },
    getImage(value) {
      this.seoAvatar = value
    },
    getCommentOrNote(value) {
      this.explainationIfCorrect = value.explainationIfCorrect
      this.explainationIfInCorrect = value.explainationIfIncorrect
      console.log(value)
      console.log(this.explainationIfCorrect, this.explainationIfInCorrect)
    },
    getTags(value) {
      this.tags = value
    },
    getTitle(value) {
      this.title = value
    },
    updateAnswer(value) {
      if (value === 'remove_data') {
        this.updateValue = {}
        this.indexDataUpdate = -1
      } else {
        this.indexDataUpdate = this.listAnswers.findIndex(
          (item) => item.id === value
        )
        this.updateValue = this.listAnswers[this.indexDataUpdate]
      }
    },
    updateRightAnswer(value) {
      this.listAnswers = value
    },
    addListAnswer(data) {
      const value = {
        answerContent: data.answerContent,
        random: data.isRandom,
        rightAnswer: 1,
        hashId: '',
        position: 0,
        plainText: data.answerContent,
        id: data.id,
      }
      this.listAnswers.push(value)
      this.$toast.show(this.$i18n.t('Thêm câu trả lời thanh công')).goAway(1500)
      console.log(this.listAnswers)
    },
    updateListAnswer(item) {
      console.log(3)
      const answer = this.listAnswers[item.index]
      answer.answerContent = item.answerContent
      answer.random = item.isRandom
      answer.plainText = item.answerContent
      answer.rightAnswer = item.isRightAnswer
      console.log(4)
      this.$toast
        .show(this.$i18n.t('Cập nhâp câu trả lời thanh công'))
        .goAway(1500)
    },
    deleteAnswer(value) {
      const index = this.listAnswers.findIndex((item) => item.id === value)
      this.listAnswers.splice(index, 1)
    },
    isValid(data) {
      // 0
      this.errors = []
      let valid = true
      if (data.question.title === '') {
        this.errors.push(this.$i18n.t('Tiêu đề là bắt buộc'))
        valid = false
      } else {
        this.errors.push(false)
      }
      // 1
      if (data.question.questionContent === '') {
        this.errors.push(this.$i18n.t('Bạn phải gán ít nhất 1 tag cho câu hỏi'))
        valid = false
      } else {
        this.errors.push(false)
      }
      // 2
      if (data.question.tags.length === 0) {
        this.errors.push(this.$i18n.t('Bạn phải gán ít nhất 1 tag cho câu hỏi'))
        valid = false
      } else {
        this.errors.push(false)
      }
      // 3
      if (!data.question.levelId) {
        this.errors.push(this.$i18n.t('Bạn phải chọn level cho câu hỏi'))
        valid = false
      } else {
        this.errors.push(false)
      }
      // 4
      if (data.question.categories.length === 0) {
        this.errors.push(this.$i18n.t('Bạn phải chọn 1 danh mục cho câu hỏi'))
        valid = false
      } else {
        this.errors.push(false)
      }
      // 5
      if (data.answers.length === 0) {
        this.$i18n.t('Loại câu hỏi này phải có từ 1 câu trả lời')
        valid = false
      } else {
        const n = data.answers.length
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            if (data.answers[i].rightAnswer === data.answers[j].rightAnswer) {
              this.errors.push(this.$i18n.t('Vị trí điền bị trùng lặp'))
              valid = false
            }
          }
        }
        if (valid) {
          this.errors.push(false)
        }
      }
      // 6
      console.log(data.question.statusId)
      if (!data.question.statusId) {
        this.errors.push(this.$i18n.t('Bạn có muốn xuất bản câu hỏi'))
        valid = false
      } else {
        this.errors.push(false)
      }
      if (data.question.seoTitle === '') {
        this.errors.push(this.$i18n.t('Bạn Phải nhập vào SEO'))
        valid = false
      } else {
        this.errors.push(false)
      }
      return valid
    },
    removeAnswerId(value) {
      const listAnswers = value.map((item) => {
        delete item.id
        return item
      })
      return listAnswers
    },
    rest() {
      this.listAnswers = []
      this.questionContent = []
    },
    onSubmit() {
      console.log('okkkk')
      const data = {
        question: {
          hashId: '',
          title: this.title,
          questionTypeId: 5,
          questionContent: this.questionContent,
          explainationIfCorrect: this.explainationIfCorrect,
          explainationIfIncorrect: this.explainationIfInCorrect,
          statusId: this.statusId,
          levelId: this.levelId,
          plainText: this.title,
          seoAvatar: this.seoAvatar,
          seoTitle: this.seoTitle,
          seoDescription: this.seoDescription,
          tags: this.tags,
          categories: this.categories,
          questionGroupId: null,
          groupOrder: null,
        },
        answers: this.listAnswers,
      }

      if (this.isValid(data)) {
        data.answers = this.removeAnswerId(this.listAnswers)

        this.listAnswers = []
        CauHoiApi.createQuestion(
          data,
          () => {
            this.$toast.show(this.$i18n.t('Thêm Thành Công')).goAway(1500)
          },
          () => {
            this.$toast.show(this.$i18n.t('Có lỗi xảy ra')).goAway(1500)
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
