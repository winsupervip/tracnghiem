<template>
  <div class="layout">
    <div class="layout_left">
      <Header
        :question-type="questionType"
        :get-question="getQuestion"
        :add-or-update-answer="addOrUpdateAnswer"
        :get-tags="getTags"
        :get-title="getTitle"
      />
      <ListAnswer
        :list-answers="listAnswers"
        type-question="single-choice"
        :selected="selected"
      />
      <CommentOrNote :get-comment-or-note="getCommentOrNote" />
    </div>
    <div class="layout_right">
      <PublishQuestion
        :get-publish-question="getPublishQuestion"
        :save-question="saveQuestion"
      />
      <Category :get-categories="getCategories" />
      <LevelForm :get-level-form="getLevelForm" />
      <UploadImage :get-image="getImage" />
      <AddSeo :get-seo="getSeo" />
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
import PublishQuestion from '../components/PublishQuestion.vue'
import LevelForm from '../components/LevelForm.vue'
import Category from '../components/Category.vue'
import Header from '../components/Header.vue'
import ListAnswer from '../components/ListAnswers.vue'
import UploadImage from '../components/UploadImage.vue'
import AddSeo from '../components/AddSeo.vue'
import CommentOrNote from '../components/CommentOrNote.vue'
import CauHoiApi from '../../../../api/cauHoi'
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
      isUpdate: -1,
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
      this.explainationIfInCorrect = value.explainationIfInCorrect
      console.log(value)
    },
    getTags(value) {
      this.tags = value
    },
    getTitle(value) {
      this.title = value
    },
    addOrUpdateAnswer(data) {
      if (this.isUpdate === -1) {
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
      } else {
        // this.answers[index] = {
        //   answer: this.answerContent,
        //   isRandom: this.isRandom,
        //   isRightAnswer: this.isRightAnswer,
        // }
        this.isUpdate = -1
      }
      console.log(data)
      alert('Thêm câu trả lời thanh công')
    },
    saveQuestion() {
      const data = {
        question: {
          hashId: '',
          title: this.title,
          questionTypeId: 1,
          questionContent: this.questionContent,
          explainationIfCorrect: this.explainationIfCorrect,
          explainationIfIncorrect: this.explainationIfInCorrect,
          statusId: this.statusId,
          levelId: this.levelForm,
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
      CauHoiApi.createQuestion(
        data,
        () => {
          alert('Thêm Thành Công')
        },
        () => {
          alert('Có lỗi sảy ra')
        }
      )
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
