<template>
  <div class="layout">
    <div class="layout_left">
      <p>
        <u>Ngân Hàng câu hỏi</u> ><u> {{ questionType }}</u>
      </p>
      <p class="form-control">Tiêu Đề (*)</p>
      <p class="form-control">Gắn Thẻ câu hỏi của bạn. Tối Đa 5 thẻ(*)</p>
      <NewQuestionForm :get-question="getQuestion" />
      <b-button
        v-b-modal.modal-lg
        variant="outline-primary "
        size="lx"
        class="btn_layout"
        >Thêm câu trả lời</b-button
      >
      <b-modal
        id="modal-lg"
        size="lg"
        title="Thêm câu trả lời"
        @shown="shown"
        @hide="hide"
      >
        <div>
          <NewQuestionForm v-if="doShow" :get-question="getQuestion" />
        </div>
      </b-modal>
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
import NewQuestionForm from './components/NewQuestionForm.vue'
import CategoryForm from './components/CategoryForm.vue'
import LevelForm from './components/LevelForm.vue'
import ChoiceForm from './components/ChoideForm.vue'
export default defineComponent({
  auth: false,
  components: { NewQuestionForm, LevelForm, CategoryForm, ChoiceForm },
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
