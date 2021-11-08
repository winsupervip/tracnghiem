<template>
  <div>
    <div :class="$style.addQuestionTitle">
      <p style="font-weight: bold">{{ $t('Câu trả lời (*)') }}</p>
      <b-button class="btn btnQuestion btn-outline-primary">
        <b-dropdown :text="$t('addChildrenQuestion')" class="m-md-2">
          <b-dropdown-item
            v-for="(questions, index) in questionType"
            :key="index"
            @click="onChangeQuestions(questions.type)"
          >
            {{ $t(questions.name) }}
          </b-dropdown-item>
        </b-dropdown>
      </b-button>
    </div>
    <TinyEditor v-if="doShowTwo" class="mt-5" :options="optionsText" />
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
      <TinyEditor v-if="doShow" :options="optionsText" />
      <b-button
        class="btnQuestion"
        variant="outline-primary"
        @click="handleAnswer"
        >{{ $t('Thêm câu trả lời') }}</b-button
      >
      <b-button
        class="btnQuestion btnQuestion--close"
        variant="outline-primary"
        @click="hideModal"
        >{{ $t('Đóng') }}</b-button
      >
    </b-modal>
    <div v-if="doShowTwo" :class="$style.addQuestionTitle">
      <b-button
        v-b-modal.modal-1
        class="btnQuestion"
        variant="outline-primary"
        @click="hideTwo"
        >{{ $t('Đóng') }}</b-button
      >
    </div>
    <div v-if="doShowTwo" :class="$style.addQuestionTitle">
      <b-button
        v-b-modal.modal-1
        class="btnQuestion"
        variant="outline-primary"
        >{{ $t('Thêm câu trả lời') }}</b-button
      >
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
import { uuid } from 'vue-uuid'
import { mapActions, mapGetters } from 'vuex'
// import EventBus from '@/plugins/eventBus'
export default defineComponent({
  name: 'Header',
  props: {
    typeQuestion: {
      type: String,
      required: true,
    },
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
  setup() {
    const { $logger } = useContext()
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
      doShowTwo: false,
      okOnly: true,
      questionType: [
        { name: 'Thêm câu hỏi 1 lựa chọn', type: 'single-choice' },
        { name: 'Thêm câu hỏi nhiều lựa chọn', type: 'multiple-choice' },
        { name: 'Thêm câu hỏi đúng sai', type: 'right-wrong' },
        { name: 'Thêm câu hỏi điền vào chổ trống', type: 'fill-blank' },
        { name: 'Thêm câu hỏi trả lời ngắn', type: 'short-answer' },
        { name: 'Thêm câu hỏi ghép đôi', type: 'pairing' },
        { name: 'Thêm câu hỏi Sắp xếp thứ tự', type: 'draggable' },
      ],
    })
    function onChangeQuestions(questiontype) {
      data.doShowTwo = true
      $logger.info('type-question', questiontype)
    }
    return {
      ...toRefs(data),
      onChangeQuestions,
    }
  },
  computed: {
    ...mapGetters(['getUpdateValueAnswer']),
  },
  watch: {
    getUpdateValueAnswer() {
      if (this.getUpdateValueAnswer.id) {
        if (this.isPairing) {
          this.answerContent = this.getUpdateValueAnswer?.left?.answerContent
            ? this.getUpdateValueAnswer?.left.answerContent
            : ''
          // eslint-disable-next-line no-unneeded-ternary
          this.answerContentRight = this.getUpdateValueAnswer?.right
            ?.answerContent
            ? this.getUpdateValueAnswer?.right.answerContent
            : ''
          // eslint-disable-next-line no-unneeded-ternary
          this.isRandom = this.getUpdateValueAnswer?.left?.random
        } else {
          this.answerContent = this.getUpdateValueAnswer?.answerContent
            ? this.getUpdateValueAnswer.answerContent
            : ''
          // eslint-disable-next-line no-unneeded-ternary
          const isRight = this.getUpdateValueAnswer.rightAnswer === 1
          this.isRightAnswer = isRight
          // eslint-disable-next-line no-unneeded-ternary
          this.isRandom = this.getUpdateValueAnswer.random ? true : false
        }
      }
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
    hideTwo() {
      this.doShowTwo = false
    },
    hide() {
      this.doShow = false
      // this.updateAnswer('remove_data')
    },
    hideModal() {
      this.$refs['modal-question'].hide()
      // if (this.getUpdateValueAnswer?.id) {
      //   this.removeValueUpdateAnswer()
      // }
      console.log('ahihi')
    },
    handleAnswer() {
      if (this.answerContent === '') {
        // config: https://github.com/shakee93/vue-toasted
        // eslint-disable-next-line no-undef
        this.$toast
          .error(this.$i18n.t('Câu trả lời không được bỏ trống'))
          .goAway(1500)
        return 0
      }
      let data = {}
      if (this.isPairing) {
        data = {
          answer: {
            left: {
              id: uuid.v4(),
              position: 0,
              hashId: '',
              plainText: this.answerContent,
              rightAnswer: this.isRightAnswer ? 1 : 0,
              random: this.isRandom,
              answerContent: this.answerContent,
            },
            right: {
              id: uuid.v4(),
              position: 0,
              hashId: '',
              plainText: this.answerContentRight,
              rightAnswer: this.isRightAnswer ? 1 : 0,
              random: this.isRandom,
              answerContent: this.answerContentRight,
            },
            id: uuid.v4(),
          },
          typeQuestion: this.typeQuestion,
        }
      } else {
        data = {
          answer: {
            id: uuid.v4(),
            position: 0,
            hashId: '',
            plainText: this.answerContent,
            rightAnswer: this.isRightAnswer || !this.haveRightAnswer ? 1 : 0,
            random: this.isRandom,
            answerContent: this.answerContent,
          },
          typeQuestion: this.typeQuestion,
        }
      }
      this.isRightAnswer = false
      this.isRandom = false
      this.answerContent = ''
      this.answerContentRight = ''
      if (this.getUpdateValueAnswer?.id) {
        data.answer.id = this.getUpdateValueAnswer.id

        this.handleUpdateAnswer(data)
        this.removeValueUpdateAnswer()
      } else {
        this.handleAddAnswer(data)
        this.$toast.show('Thêm câu trả lời thanh công').goAway(1500)
        console.log(data)
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
