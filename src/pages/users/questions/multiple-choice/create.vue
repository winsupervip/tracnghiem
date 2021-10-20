<template>
  <div class="layout">
    <div class="layout_left">
      <Header
        :question-type="questionType"
        :get-question="getQuestion"
        :add-or-update-answer="addOrUpdateAnswer"
      />
      <ListAnswer :list-answers="listAnswers" type-question="multiple-choice" />
    </div>
    <div class="layout_right">
      <PublishQuestion :get-publish-question="getPublishQuestion" />
      <Category :get-categories="getCategories" />
      <LevelForm :get-level-form="getLevelForm" />
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

export default defineComponent({
  components: {
    Header,
    PublishQuestion,
    LevelForm,
    Category,
    ListAnswer,
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
    addOrUpdateAnswer(data) {
      if (this.isUpdate === -1) {
        this.listAnswers.push({
          answerContent: data.answerContent,
          random: data.isRandom,
          rightAnswer: data.isRightAnswer,
          hashId: '',
          position: 0,
          plainText: data.answerContent,
        })
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
    createQuestion() {
      const data = {
        question: {
          hashId: '',
          title: 'Thế nào là nguồn vốn của NHTM?',
          questionTypeId: 1,
          questionContent: this.questionContent,
          explainationIfCorrect: 'Chúc mừng, bạn đã chọn đúng',
          explainationIfIncorrect: 'Xem hướng dẫn tại địa chỉ abc.com',
          statusId: this.statusId,
          levelId: this.levelForm,
          plainText: 'Thế nào là nguồn vốn của NHTM?',
          tags: ['nguôn vốn', 'ngân hàng', 'ngân hàng thương mại'],
          categories: this.categories,
          questionGroupId: null,
          groupOrder: null,
        },
        answers: this.listAnswers,
      }
      console.log(data)
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
