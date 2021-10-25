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
        :update-value="updateValue"
        :errors="errors"
        :update-answer="updateAnswer"
        :index-answer-update="indexDataUpdate"
        @add="addListAnswer"
      />
      <ListAnswer
        :list-answers="listAnswers"
        type-question="single-choice"
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
// import _ from 'lodash'
// eslint-disable-next-line no-unused-vars
// import { uuid } from 'vue-uuid'
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
    const getQuestionDelete = (e) => {
      const newList = [...data.listAnswers]
      const cal = newList.filter((item) => newList.indexOf(item) !== e)
      data.listAnswers = cal
      console.log('list answers', data.listAnswers)
    }
    return {
      ...toRefs(data),
      getQuestion,
      getQuestionDelete,
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
        rightAnswer: data.isRightAnswer,
        hashId: '',
        position: 0,
        plainText: data.answerContent,
        id: data.id,
      }
      this.listAnswers.push(value)
      alert('Thêm câu trả lời thanh công')
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
      alert('Cập nhâp câu trả lời thanh công nhé')
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
        this.errors.push('Tiêu đề là bắt buộc')
        valid = false
      } else {
        this.errors.push(false)
      }
      // 1
      if (data.question.questionContent === '') {
        this.errors.push('Bạn phải nhập vào nội dung câu hỏi')
        valid = false
      } else {
        this.errors.push(false)
      }
      // 2
      if (data.question.tags.length === 0) {
        this.errors.push('Bạn phải gán ít nhất 1 tag cho câu hỏi')
        valid = false
      } else {
        this.errors.push(false)
      }
      // 3
      if (!data.question.levelId) {
        this.errors.push('Bạn phải chọn level cho câu hỏi')
        valid = false
      } else {
        this.errors.push(false)
      }
      // 4
      if (data.question.categories.length === 0) {
        this.errors.push('Bạn phải chọn 1 danh mục cho câu hỏi')
        valid = false
      } else {
        this.errors.push(false)
      }
      // 5
      if (data.answers.length === 0 || data.answers.length > 3) {
        this.errors.push('Loại câu hỏi này phải có từ 2->3 câu trả lời')
        valid = false
      } else {
        let count = 0
        data.answers.forEach((e) => {
          if (e.rightAnswer === 1) {
            count += 1
          }
        })
        if (count === 0) {
          alert('Chọn 1 câu trả lời đúng đi')
          valid = false
        } else if (count > 1) {
          alert('Loại câu hỏi ni có 1 đáp án thôi')
          valid = false
        } else {
          this.errors.push(false)
        }
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
            alert('Có lỗi xảy ra')
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
