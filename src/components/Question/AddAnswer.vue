<template>
  <div>
    <div :class="$style.addQuestionTitle">
      <p>Câu Trả lời(*)</p>
      <b-button v-b-modal.modal-1>Thêm câu trả lời</b-button>
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
        zz {{ indexAnswerUpdate }}
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
import { uuid } from 'vue-uuid'
import EventBus from '@/plugins/eventBus'

export default defineComponent({
  name: 'Header',
  props: {
    // addOrUpdateAnswer: {
    //   type: Function,
    //   required: true,
    // },
    updateValue: {
      type: Object,
      required: true,
    },
    updateAnswer: {
      type: Function,
      required: true,
    },
    indexAnswerUpdate: {
      type: Number,
      default: -1,
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
        id: uuid.v4(),
        isRightAnswer: this.isRightAnswer ? 1 : 0,
        isRandom: this.isRandom,
        answerContent: this.answerContent,
      }
      this.isRightAnswer = false
      this.isRandom = false
      this.answerContent = ''
      if (this.updateValue.answerContent) {
        data.index = this.indexAnswerUpdate
        EventBus.$emit('updateListAnswer', data)
      } else {
        this.$emit('add', data)
      }
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
