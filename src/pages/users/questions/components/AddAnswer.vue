<template>
  <div>
    <div :class="$style.addQuestionTitle">
      <p>Câu Trả lời(*)</p>
      <b-button v-b-modal.modal-1>Thêm câu trả lời</b-button>
    </div>
    <b-modal
      id="modal-1"
      v-model="isShowModal"
      size="xl"
      title="Add Answer"
      :ok-only="okOnly"
      ok-title="Đóng"
      @shown="shown"
      @hide="hide"
    >
      <div>
        <vue2-tinymce-editor
          v-if="doShow"
          v-model="answerContent"
          :options="optionsText"
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
          <b-button variant="outline-primary" @click="handleAnswer">{{
            isUpdate != -1 ? 'Cập nhập câu trả lời' : 'Thêm câu trả lời'
          }}</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
} from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Header',
  props: {
    addOrUpdateAnswer: {
      type: Function,
      required: true,
    },
    updateValue: {
      type: Object,
      required: true,
    },
    modalShow: {
      type: Boolean,
      required: true,
    },
    hideModal: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      optionsText: {
        convert_urls: false,
        entity_encoding: 'raw',
      },
      answerContent: props.updateValue.answerContent
        ? props.updateValue.answerContent
        : '',
      isRightAnswer: false,
      isRandom: false,
      isUpdate: -1,
      doShow: false,
      okOnly: true,
      isShowModal: false,
    })
    watch(
      () => data.questionContent,
      () => {
        props.getQuestion(data.questionContent)
      }
    )
    return {
      ...toRefs(data),
    }
  },
  watch: {
    modalShow() {
      this.isShowModal = this.modalShow
    },
    isShowModal() {
      if (this.isShowModal === false) {
        this.hideModal()
      }
    },
  },

  methods: {
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
    },
    handleAnswer() {
      if (this.answerContent === '') {
        alert('Câu trả lời không được bỏ trống')
        return 0
      }
      const data = {
        isRightAnswer: this.isRightAnswer ? 1 : 0,
        isRandom: this.isRandom,
        answerContent: this.answerContent,
      }
      this.isRightAnswer = false
      this.isRandom = false
      this.answerContent = ''
      this.addOrUpdateAnswer(data)
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
