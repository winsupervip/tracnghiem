<template>
  <div>
    <div :class="$style.addQuestionTitle">
      <p style="font-weight: bold">{{ $t('answer(*)') }}</p>
      <b-button
        v-b-modal.modal-1
        class="btnQuestion"
        variant="outline-primary"
        >{{ $t('addMoreAnswers') }}</b-button
      >
    </div>
    <b-modal
      id="modal-1"
      ref="modal-question"
      size="xl"
      :title="$t('addMoreAnswers')"
      :ok-only="okOnly"
      :ok-title="$t('close')"
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
              <p :class="$style.checkBoxTitle">{{ $t('allowShuffling') }}</p>
            </div>
            <div v-if="haveRightAnswer" :class="$style.checkBox">
              <input
                v-model="isRightAnswer"
                type="checkbox"
                :class="$style.checkBoxInput"
              />
              <p :class="$style.checkBoxTitle">{{ $t('rightAnswer') }}</p>
            </div>
          </div>
          <b-button
            class="btnQuestion"
            variant="outline-primary"
            @click="handleAnswer"
            >{{
              getUpdateValueAnswer.answerContent
                ? $t('updateAnswer')
                : $t('Thêm câu trả lời')
            }}</b-button
          >
          <b-button
            class="btnQuestion btnQuestion--close"
            variant="outline-primary"
            @click="hideModal"
            >{{ $t('close') }}</b-button
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { uuid } from 'vue-uuid'
import { mapActions, mapGetters } from 'vuex'
// import EventBus from '@/plugins/eventBus'
export default defineComponent({
  name: 'Header',
  props: {
    // addOrUpdateAnswer: {
    //   type: Function,
    //   required: true,
    // },

    isPairing: {
      type: Boolean,
      default: false,
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
  computed: {
    ...mapGetters(['getUpdateValueAnswer']),
  },
  watch: {
    // getUpdateValueAnswer() {
    //   console.log('hoang', this.updateValue)
    //   if (this.isPairing) {
    //     this.answerContent = this.updateValue?.left?.answerContent
    //       ? this.updateValue?.left?.answerContent
    //       : ''
    //     this.answerContentRight = this.updateValue?.right?.answerContent
    //       ? this.updateValue?.right?.answerContent
    //       : ''
    //     // eslint-disable-next-line no-unneeded-ternary
    //     this.isRandom = this.updateValue.random ? true : false
    //   } else {
    //     this.answerContent = this.updateValue?.answerContent
    //       ? this.updateValue.answerContent
    //       : ''
    //     // eslint-disable-next-line no-unneeded-ternary
    //     this.isRightAnswer = this.updateValue.rightAnswer === 1 ? true : false
    //     // eslint-disable-next-line no-unneeded-ternary
    //     this.isRandom = this.updateValue.random ? true : false
    //   }
    // },
    getUpdateValueAnswer() {
      this.answerContent = this.getUpdateValueAnswer?.answerContent
        ? this.getUpdateValueAnswer.answerContent
        : ''
      // eslint-disable-next-line no-unneeded-ternary
      this.isRightAnswer = this.getUpdateValueAnswer.rightAnswer === 1
      // eslint-disable-next-line no-unneeded-ternary
      this.isRandom = this.getUpdateValueAnswer.random ? true : false
    },
  },
  methods: {
    ...mapActions([
      'handleAddAnswer',
      'handleUpdateAnswer',
      'removeValueUpdateAnswer',
    ]),
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
      // this.updateAnswer('remove_data')
    },
    hideModal() {
      this.$refs['modal-question'].hide()
    },
    handleAnswer() {
      if (this.answerContent === '') {
        // config: https://github.com/shakee93/vue-toasted
        // eslint-disable-next-line no-undef
        this.$toast.error(this.$i18n.t('answersCannotBeLeftBlank')).goAway(1500)
        return 0
      }
      let data = {}
      if (this.isPairing) {
        data = {
          left: {
            id: uuid.v4(),
            position: 0,
            hashId: '',
            plainText: this.answerContent,
            rightAnswer: this.isRightAnswer ? 1 : 0,
            isRandom: this.isRandom,
            answerContent: this.answerContent,
          },
          right: {
            id: uuid.v4(),
            position: 0,
            hashId: '',
            plainText: this.answerContent,
            rightAnswer: this.isRightAnswer ? 1 : 0,
            isRandom: this.isRandom,
            answerContent: this.answerContentRight,
          },
          id: uuid.v4(),
        }
      } else {
        data = {
          id: uuid.v4(),
          position: 0,
          hashId: '',
          plainText: this.answerContent,
          rightAnswer: this.isRightAnswer ? 1 : 0,
          isRandom: this.isRandom,
          answerContent: this.answerContent,
        }
      }
      this.isRightAnswer = false
      this.isRandom = false
      this.answerContent = ''
      this.answerContentRight = ''
      if (
        this.getUpdateValueAnswer.answerContent ||
        this.updateValue?.left?.answerContent
      ) {
        // data.index = this.indexAnswerUpdate
        // EventBus.$emit('updateListAnswer', data)
        data.id = this.getUpdateValueAnswer.id
        this.handleUpdateAnswer(data)
        this.removeValueUpdateAnswer()
      } else {
        this.handleAddAnswer(data)
        this.$toast.show('Thêm câu trả lời thanh công').goAway(1500)
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
