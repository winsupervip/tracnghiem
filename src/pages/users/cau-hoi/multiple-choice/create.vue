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
  auth: false,
  components: { LevelForm, CategoryForm, ChoiceForm, Header },
  layout: 'dashboard',
  setup() {
    const { $logger } = useContext()
    const data = reactive({
      question: '',
      formCheckbox: null,
      levelForm: null,
      categoryForm: null,
      questionType: 'Thêm câu hỏi nhiều lựa chọn',
      options: {
        convert_urls: false,
        entity_encoding: 'raw',
      },
      doShow: false,
    })
    const getQuestion = (value) => {
      data.question = value
      $logger.info(data.question)
    }
    const getFormCheckbox = (value) => {
      data.formCheckbox = value
      $logger.info(data.formCheckbox)
    }
    const getLevelForm = (value) => {
      data.levelForm = value
      $logger.info(value)
    }
    const getCategoryForm = (value) => {
      data.categoryForm = value
      $logger.info(value)
    }
    return {
      ...toRefs(data),
      getQuestion,
      getFormCheckbox,
      getLevelForm,
      getCategoryForm,
    }
  },
  methods: {
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
    },
  },
})
</script>
