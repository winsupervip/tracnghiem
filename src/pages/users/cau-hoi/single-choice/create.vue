<template>
  <div>
    <header-component
      :question-type="questionType"
      :get-question="getQuestion"
    />
    <div>
      <div :class="$style.addQuestionTitle">
        <p>Câu Trả lời(*)</p>
        <b-button v-b-modal.modal-1>Thêm câu Trả lời</b-button>
      </div>
      <b-modal id="modal-1" title="Add Answer" size="xl">
        <div>
          <client-only>
            <editor v-model="editorModel" />
          </client-only>
        </div>
      </b-modal>
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
import header from '../components/header.vue'
export default defineComponent({
  components: {
    'header-component': header,
  },
  layout: 'dashboard',
  auth: false,
  setup() {
    const { $logger } = useContext()
    const data = reactive({
      questionType: 'Thêm câu hỏi 1 lựa chọn',
      question: '',
      answerItem: '',
      options: {
        menubar: false,
      },
      editorModel: 'hello the world',
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
})
</script>
<style module>
.addQuestionTitle {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>
