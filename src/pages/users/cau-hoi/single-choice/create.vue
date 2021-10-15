<template>
  <div>
    <header-component
      :question-type="questionType"
      :get-question="getQuestion"
    />
    <div>
      <div :class="$style.addQuestionTitle">
        <p>Câu Trả lời(*)</p>
        <b-button v-b-modal.modal-1>Thêm câu trả lời</b-button>
      </div>

      <b-modal
        id="modal-1"
        size="xl"
        title="Add Answer"
        ok-only="true"
        ok-title="Đóng"
        @shown="shown"
        @hide="hide"
      >
        <div>
          <vue2-tinymce-editor
            v-if="doShow"
            v-model="answerContent"
            :options="options"
          ></vue2-tinymce-editor>
          <div>
            <div :class="$style.checkBoxView">
              <div :class="$style.checkBox">
                <input
                  v-model="isRandom"
                  type="checkbox"
                  :class="$style.checkBoxInput"
                />
                <p :class="$style.checkBoxTitle">Cho phép xáo trộn</p>
              </div>
              <div :class="$style.checkBox">
                <input
                  v-model="isRightAnswer"
                  type="checkbox"
                  :class="$style.checkBoxInput"
                />
                <p :class="$style.checkBoxTitle">Câu trả lời đúng</p>
              </div>
            </div>
            <b-button variant="outline-primary">{{
              isUpdate != -1 ? 'Cập nhập câu trả lời' : 'Thêm câu trả lời'
            }}</b-button>
          </div>
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
      answerContent: '',
      options: {
        menubar: false,
      },
      doShow: false,
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
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
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
