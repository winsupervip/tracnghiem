<template>
  <div>
    <div :class="$style.addQuestionTitle">
      <p style="font-weight: bold">{{ $t('Câu trả lời (*)') }}</p>
      <b-button
        v-b-modal.modal-1
        class="btnQuestion"
        variant="outline-primary"
        >{{ $t('Thêm câu trả lời') }}</b-button
      >
    </div>
    <b-modal
      id="modal-1"
      ref="modal-question"
      size="xl"
      :title="$t('Thêm câu trả lời')"
      :ok-only="okOnly"
      :ok-title="$t('Đóng')"
      hide-footer
      @shown="shown"
      @hide="hide"
    >
      <div>
        <TinyEditor
          v-if="doShow"
          v-model="answerContent"
          :options="optionsText"
        />
        <div>
          <div :class="$style.checkBoxView">
            <div v-if="haveRandomAnswer" :class="$style.checkBox">
              <input
                v-model="isRandom"
                type="checkbox"
                :class="$style.checkBoxInput"
              />
              <p :class="$style.checkBoxTitle">{{ $t('Cho phép xáo trộn') }}</p>
            </div>
            <div v-if="haveRightAnswer" :class="$style.checkBox">
              <input
                v-model="isRightAnswer"
                type="checkbox"
                :class="$style.checkBoxInput"
              />
              <p :class="$style.checkBoxTitle">{{ $t('Câu trả lời đúng') }}</p>
            </div>
          </div>
          <b-button
            class="btnQuestion"
            variant="outline-primary"
            @click="handleAnswer"
            >{{
              updateValue.answerContent
                ? $t('Cập nhập câu trả lời')
                : $t('Thêm câu trả lời')
            }}</b-button
          >
          <b-button
            class="btnQuestion btnQuestion--close"
            variant="outline-primary"
            @click="hideModal"
            >{{ $t('Đóng') }}</b-button
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
      // eslint-disable-next-line no-unneeded-ternary
      this.isRightAnswer = this.updateValue.rightAnswer === 1 ? true : false
      // eslint-disable-next-line no-unneeded-ternary
      this.isRandom = this.updateValue.random ? true : false
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
        // eslint-disable-next-line no-undef
        this.$toast.error($t('Câu trả lời không được bỏ trống')).goAway(1500)
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
</style>
