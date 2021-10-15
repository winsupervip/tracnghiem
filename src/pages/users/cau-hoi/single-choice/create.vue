<template>
  <div class="layout">
    <div class="layout_left">
      <Header :question-type="questionType" :get-question="getQuestion" />
    </div>
    <div class="layout_right">
      <CategoryForm :get-category-form="getCategoryForm" />
      <ChoiceForm :get-form-checkbox="getFormCheckbox" />
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
import CategoryForm from '../components/CategoryForm.vue'
import LevelForm from '../components/LevelForm.vue'
import ChoiceForm from '../components/ChoideForm.vue'
import Header from '../components/Header.vue'
export default defineComponent({
  components: {
    Header,
    CategoryForm,
    LevelForm,
    ChoiceForm,
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
        menubar: false,
      },
      isRightAnswer: false,
      isRandom: false,
      answers: [],
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
    addOrUpdateAnswer(index) {
      if (index === -1) {
        this.answers.push({
          answer: this.answerContent,
          isRandom: this.isRandom,
          isRightAnswer: this.isRightAnswer,
        })
      } else {
        this.answers[index] = {
          answer: this.answerContent,
          isRandom: this.isRandom,
          isRightAnswer: this.isRightAnswer,
        }
        this.isUpdate = -1
      }
      this.isRightAnswer = false
      this.isRandom = false
      this.answerContent = ''
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
