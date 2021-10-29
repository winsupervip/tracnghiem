<template>
  <div>
    <div :class="$style.addQuestionTitle">
      <p style="font-weight: bold">Câu trả lời (*)</p>
      <b-button v-b-modal.modal-1 class="btnQuestion" variant="outline-primary"
        >Thêm câu trả lời</b-button
      >
    </div>
    <b-modal
      id="modal-1"
      ref="modal-question"
      size="xl"
      title="Thêm câu hỏi"
      :ok-only="okOnly"
      ok-title="Đóng"
      hide-footer
      @shown="shown"
      @hide="hide"
    >
      <div>
        <div class="wrapper">
          <div class="wrapper-left">
            <p v-if="isPairing">Vế Trái</p>
            <TinyEditor
              v-if="doShow"
              v-model="answerContent"
              :options="optionsText"
            />
          </div>
          <div v-if="isPairing" class="wrapper-right">
            <p>Vế Phải</p>
            <TinyEditor
              v-if="doShow"
              v-model="answerContentRight"
              :options="optionsText"
            />
          </div>
        </div>
        <div>
          <div :class="$style.checkBoxView">
            <div v-if="haveRandomAnswer" :class="$style.checkBox">
              <input
                v-model="isRandom"
                type="checkbox"
                :class="$style.checkBoxInput"
              />
              <p :class="$style.checkBoxTitle">Cho phép xáo trộn</p>
            </div>
          </div>
          <b-button
            class="btnQuestion"
            variant="outline-primary"
            @click="handleAnswer"
            >{{
              updateValue.answerContent
                ? 'Cập nhập câu trả lời'
                : 'Thêm câu trả lời'
            }}
          </b-button>
          <b-button
            class="btnQuestion btnQuestion--close"
            variant="outline-primary"
            @click="hideModal"
            >Đóng</b-button
          >
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
    isPairing: {
      type: Boolean,
      default: false,
    },
    indexAnswerUpdate: {
      type: Number,
      default: -1,
    },
    haveRightAnswer: {
      type: Boolean,
      default: true,
    },
    haveRandomAnswer: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const data = reactive({
      optionsText: {
        convert_urls: false,
        entity_encoding: 'raw',
      },
      answerContent: '',
      answerContentRight: '',
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
      console.log('hoang', this.updateValue)
      if (this.isPairing) {
        this.answerContent = this.updateValue?.left?.answerContent
          ? this.updateValue?.left?.answerContent
          : ''
        this.answerContentRight = this.updateValue?.right?.answerContent
          ? this.updateValue?.right?.answerContent
          : ''
        // eslint-disable-next-line no-unneeded-ternary
        this.isRandom = this.updateValue.random ? true : false
      } else {
        this.answerContent = this.updateValue?.answerContent
          ? this.updateValue.answerContent
          : ''
        // eslint-disable-next-line no-unneeded-ternary
        this.isRightAnswer = this.updateValue.rightAnswer === 1 ? true : false
        // eslint-disable-next-line no-unneeded-ternary
        this.isRandom = this.updateValue.random ? true : false
      }
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
    hideModal() {
      this.$refs['modal-question'].hide()
    },
    handleAnswer() {
      if (this.answerContent === '') {
        // config: https://github.com/shakee93/vue-toasted
        this.$toast.error('Câu trả lời không được bỏ trống').goAway(1500)
        return 0
      }
      let data = {}
      if (this.isPairing) {
        data = {
          left: {
            id: uuid.v4(),
            position: 1,
            isRightAnswer: this.isRightAnswer ? 1 : 0,
            isRandom: this.isRandom,
            answerContent: this.answerContent,
          },
          right: {
            id: uuid.v4(),
            position: 2,
            isRightAnswer: this.isRightAnswer ? 1 : 0,
            isRandom: this.isRandom,
            answerContent: this.answerContentRight,
          },
          id: uuid.v4(),
        }
      } else {
        data = {
          id: uuid.v4(),
          position: 0,
          isRightAnswer: this.isRightAnswer ? 1 : 0,
          isRandom: this.isRandom,
          answerContent: this.answerContent,
        }
      }
      this.isRightAnswer = false
      this.isRandom = false
      this.answerContent = ''
      if (
        this.updateValue.answerContent ||
        this.updateValue?.left?.answerContent
      ) {
        data.index = this.indexAnswerUpdate
        console.log('a')
        EventBus.$emit('updateListAnswer', data)
        console.log('b')
      } else {
        this.$emit('add', data)
      }
    },
  },
})
</script>
<style lang="scss" module>
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
::v-deep .modal-body {
  padding-bottom: 50px;
}

.btnQuestion--close {
  margin-left: 20px;
  width: auto;
}
.wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
