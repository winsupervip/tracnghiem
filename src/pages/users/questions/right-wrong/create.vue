<template>
  <div class="p-question">
    <div class="p-question__left">
      <Header
        :question-type="questionType"
        :get-question="getQuestion"
        :add-or-update-answer="addOrUpdateAnswer"
        :get-tags="getTags"
        :get-title="getTitle"
        :errors="errors"
      />
      <AddAnswer
        :add-or-update-answer="addOrUpdateAnswer"
        :update-value="updateValue"
        :errors="errors"
        :update-answer="updateAnswer"
      />
      <ListAnswer
        :list-answers="listAnswers"
        type-question="single-choice"
        :selected="selected"
        :update-answer="updateAnswer"
        :update-right-answer="updateRightAnswer"
        :errors="errors"
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
      <UploadImage :get-image="getImage" />
      <AddSeo :get-seo="getSeo" :errors="errors" />
      <div>
        <Uploader
          v-model="seoAvatar"
          :accept="'*/*'"
          :disabled="false"
        ></Uploader>
      </div>
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
    UploadImage,
    AddSeo,
    CommentOrNote,
    Uploader,
    AddAnswer,
  },
  layout: 'dashboard',
  auth: false,
  setup() {
    const { $logger } = useContext()
    const data = reactive({
      questionType: 'Thêm câu hỏi 1 lựa chọn',
      questionContent: '',
      answerContent: '',
      options: {
        convert_urls: false,
        entity_encoding: 'raw',
      },
      isRightAnswer: false,
      isRandom: false,
      listAnswers: [
        {
          hashId: '',
          answerContent: 'Đúng',
          rightAnswer: 1,
          random: true,
          position: 0,
          plainText: 'Đúng',
        },
        {
          hashId: '',
          answerContent: 'Sai',
          rightAnswer: 0,
          random: true,
          position: 0,
          plainText: 'Sai',
        },
        {
          hashId: '',
          answerContent: 'Không có đáp án',
          rightAnswer: 0,
          random: true,
          position: 0,
          plainText: 'Không có đáp án',
        },
      ],
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
      selected: {},
      tags: [],
      title: '',
      modalShow: false,
      updateValue: {},
      errors: [],
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
        this.updateValue = this.listAnswers[value]
        this.indexDataUpdate = value
      }
    },
    updateRightAnswer(value) {
      this.listAnswers = value
    },
    addOrUpdateAnswer(data) {
      if (this.indexDataUpdate === -1) {
        const value = {
          answerContent: data.answerContent,
          random: data.isRandom,
          rightAnswer: data.isRightAnswer,
          hashId: '',
          position: 0,
          plainText: data.answerContent,
        }
        this.listAnswers.push(value)
        if (data.isRightAnswer) {
          this.selected = value
        }
        alert('Thêm câu trả lời thanh công')
      } else {
        this.listAnswers[this.indexDataUpdate] = data
        console.log(this.listAnswers)
        this.indexDataUpdate = -1
        alert('Cập nhâp câu trả lời thanh công')
      }
      console.log(data)
    },
    isValid(data) {
      // 0
      this.errors = []
      let valid = true
      if (data.question.title === '') {
        this.errors.push('Tiêu Đề Là Bắt Buột')
        valid = false
      } else {
        this.errors.push(false)
      }
      // 1
      if (data.question.questionContent === '') {
        this.errors.push('Bạn Phải Nhập Vào Nội dung câu hỏi')
        valid = false
      } else {
        this.errors.push(false)
      }
      // 2
      if (data.question.tags.length === 0) {
        this.errors.push('Bạn Phải Gán 1 Tag cho câu hỏi')
        valid = false
      } else {
        this.errors.push(false)
      }
      // 3
      if (!data.question.levelId) {
        this.errors.push('Bạn Phải chọn level cho câu hỏi')
        valid = false
      } else {
        this.errors.push(false)
      }
      // 4
      if (data.question.categories.length === 0) {
        this.errors.push('Bạn Phải chọn 1 danh mục cho câu hỏi')
        valid = false
      } else {
        this.errors.push(false)
      }
      // 5
      if (data.answers.length === 0 || data.answers.length > 3) {
        this.errors.push('Loại câu hỏi này phải có từ 2->3 câu trả lời')
        valid = false
      } else {
        this.errors.push(false)
      }
      // 6
      console.log(data.question.statusId)
      if (!data.question.statusId) {
        this.errors.push('Bạn có muốn xuất bản câu hỏi')
        valid = false
      } else {
        this.errors.push(false)
      }
      if (data.question.seoTitle === '') {
        this.errors.push('Bạn có muốn xuất bản câu hỏi')
        valid = false
      } else {
        this.errors.push(false)
      }
      return valid
    },
    onSubmit() {
      console.log('okkkk')
      const data = {
        question: {
          hashId: '',
          title: this.title,
          questionTypeId: 1,
          questionContent: this.questionContent,
          explainationIfCorrect: this.explainationIfCorrect,
          explainationIfIncorrect: this.explainationIfInCorrect,
          statusId: this.statusId,
          levelId: this.levelId,
          plainText: this.title,
          seoAvatar: 'string',
          seoTitle: this.seoTitle,
          seoDescription: this.seoDescription,
          tags: this.tags,
          categories: this.categories,
          questionGroupId: null,
          groupOrder: null,
        },
        answers: this.listAnswers,
      }
      console.log(this.errors)
      if (this.isValid(data)) {
        CauHoiApi.createQuestion(
          data,
          () => {
            alert('Thêm Thành Công')
          },
          () => {
            alert('Có lỗi sảy ra')
          }
        )
      }
    },
  },
})
</script>
<style module>
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
