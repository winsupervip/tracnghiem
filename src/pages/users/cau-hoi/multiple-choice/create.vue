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
      <PublishQuestion :get-category-form="getCategoryForm" />
      <Category :get-form-checkbox="getFormCheckbox" />
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
      question: '',
      answerContent: '',
      options: {
        convert_urls: false,
        entity_encoding: 'raw',
      },
      isRightAnswer: false,
      isRandom: false,
      listAnswers: [],
      isUpdate: -1,
    })
    const getQuestion = (value) => {
      data.question = value
      $logger.info(value)
    }

    return {
      ...toRefs(data),
      getQuestion,
    }
  },
  methods: {
    getFormCheckbox(value) {
      this.formCheckbox = value
    },
    getLevelForm(value) {
      this.levelForm = value
    },
    getCategoryForm(value) {
      this.categoryForm = value
    },
    addOrUpdateAnswer(data) {
      if (this.isUpdate === -1) {
        this.listAnswers.push({
          answerContent: data.answerContent,
          isRandom: data.isRandom,
          isRightAnswer: data.isRightAnswer,
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
