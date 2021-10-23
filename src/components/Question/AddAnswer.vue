<template>
  <div>
    <div :class="$style.addQuestionTitle">
      <p>Câu Trả lời(*)</p>
      <b-button v-b-modal.modal-1 class="btn--addAnswer"
        >Thêm câu trả lời</b-button
      >
    </div>
    <b-modal
      id="modal-1"
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
            updateValue.answerContent
              ? 'Cập nhập câu trả lời'
              : 'Thêm câu trả lời'
          }}</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
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
    updateAnswer: {
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
      answerContent: '',
      isRightAnswer: false,
      isRandom: false,
      isUpdate: -1,
      doShow: false,
      okOnly: true,
    })
    return {
      ...toRefs(data),
    }
  },
  watch: {
    updateValue() {
      console.log(this.updateValue)
      this.answerContent = this.updateValue?.answerContent
        ? this.updateValue.answerContent
        : ''
    },
  },
  methods: {
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
      this.updateAnswer('remove_data')
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

<style lang="scss" scoped>
.btn--addAnswer {
  border: 1px solid #051e40;
  background: #fff;
  color: #051e40;
  width: 187px;
  height: 27px;
  font-family: 'Open Sans';
  font-size: 13px;
  border-radius: 5px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>
