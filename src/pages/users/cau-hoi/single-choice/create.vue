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

      <b-modal
        id="modal-1"
        size="xl"
        title="BootstrapVue"
        @shown="shown"
        @hide="hide"
      >
        <vue2-tinymce-editor
          v-if="doShow"
          v-model="answerItem"
          :options="options"
        ></vue2-tinymce-editor>
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
      doShow: false,
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
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
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
</style>
