<template>
  <div>
    <div :class="$style.addQuestionTitle">
      <p style="font-weight: bold">{{ $t('AddAnswer.answer') }}(*)</p>
      <b-button
        v-b-modal.modal-1
        :disabled="disabledAddAnswer"
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
        <div>
          <!-- class="wrapper" -->
          <div class="wrapper-left">
            <p v-if="isPairing">Vế Trái</p>
            <TinyEditor
              v-if="doShow"
              v-model="answerContent"
              :options="optionsText"
              @text="getText"
            />
          </div>
          <div v-if="isPairing" class="wrapper-right">
            <p>Vế Phải</p>
            <TinyEditor
              v-if="doShow"
              v-model="answerContentRight"
              :options="optionsText"
              @text="getTextRight"
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
                :disabled="blockRightAnswer"
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
              getUpdateValueAnswer.id
                ? $t('updateAnswer')
                : $t('addMoreAnswers')
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
    groupQuestion: {
      type: Boolean,
      default: false,
    },
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
    childQuestionId: {
      type: String,
      default: '',
    },
    blockRightAnswer: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const data = reactive({
      optionsText: {
        convert_urls: false,
        entity_encoding: 'raw',
      },
      answerContent: '',
      answerContentPlantext: '',
      answerContentRight: '',
      answerContentRightPlantext: '',
      isRightAnswer: false,
      isRandom: true,
      doShow: false,
      okOnly: true,
    })
    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({
      getUpdateValueAnswer: 'questions/getUpdateValueAnswer',
      getListAnswer: 'questions/getListAnswer',
      getListChildrenAnswer: 'questions/getListChildrenAnswer',
    }),
    disabledAddAnswer() {
      if (
        this.typeQuestion === 'right-wrong' &&
        !this.getUpdateValueAnswer.id
      ) {
        if (this.groupQuestion && this.getListChildrenAnswer.length > 0) {
          const index = this.getListChildrenAnswer.findIndex(
            (item) => item.id === this.childQuestionId
          )
          if (
            index !== -1 &&
            this.getListChildrenAnswer[index].answers?.length >= 3
          ) {
            this.$bvModal.hide('modal-1')
            return true
          }
        } else if (this.getListAnswer.length >= 3) {
          this.$bvModal.hide('modal-1')
          return true
        }
      }
      return false
    },
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
    ...mapActions({
      handleAddAnswer: 'questions/handleAddAnswer',
      handleUpdateAnswer: 'questions/handleUpdateAnswer',
      removeValueUpdateAnswer: 'questions/removeValueUpdateAnswer',
      addAnswerInChildQuestion: 'questions/addAnswerInChildQuestion',
      updateAnswerQuestionChild: 'questions/updateAnswerQuestionChild',
    }),
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
      // this.updateAnswer('remove_data')
    },
    hideModal() {
      this.answerContent = ''
      this.answerContentPlantext = ''
      this.answerContentRight = ''
      this.answerContentRightPlantext = ''
      this.isRightAnswer = false
      this.isRandom = true
      this.$refs['modal-question'].hide()
      if (this.getUpdateValueAnswer?.id) {
        this.removeValueUpdateAnswer()
      }
    },

    getText(val) {
      if (val) {
        let description = ''
        if (val.length > 500) {
          description = val.substring(0, 500)
        } else {
          description = val
        }
        this.answerContentPlantext = description.replace('\n', '')
      }
    },

    getTextRight(val) {
      if (val) {
        let description = ''
        if (val.length > 500) {
          description = val.substring(0, 500)
        } else {
          description = val
        }
        this.answerContentRightPlantext = description.replace('\n', '')
      }
    },

    resetData() {
      this.isRightAnswer = false
      this.isRandom = true
      this.answerContentPlantext = ''
      this.answerContent = ''
      if (this.isPairing) {
        this.answerContentRight = ''
        this.answerContentRightPlantext = ''
      }
    },
    async handleAnswer() {
      if (this.answerContent === '' && this.answerContentRight === '') {
        // config: https://github.com/shakee93/vue-toasted
        // eslint-disable-next-line no-undef
        this.$toast.error(this.$i18n.t('answersCannotBeLeftBlank')).goAway(1500)
        return 0
      }

      let data = {}
      if (this.isPairing) {
        data = {
          answer: {
            left: {
              id: uuid.v4(),
              position: 1,
              hashId: '',
              plainText: this.answerContentPlantext,
              rightAnswer: this.isRightAnswer ? 1 : 0,
              random: this.isRandom,
              answerContent: this.answerContent,
            },
            right: {
              id: uuid.v4(),
              position: 2,
              hashId: '',
              plainText: this.answerContentRightPlantext,
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
            plainText: this.answerContentPlantext,
            rightAnswer: this.isRightAnswer || !this.haveRightAnswer ? 1 : 0,
            random: this.isRandom,
            answerContent: this.answerContent,
          },
          typeQuestion: this.typeQuestion,
        }
      }
      if (this.groupQuestion) {
        if (this.getUpdateValueAnswer?.id) {
          data.answer.id = this.getUpdateValueAnswer.id
          await this.updateAnswerQuestionChild({
            id: this.childQuestionId,
            answer: data.answer,
          })
          this.$toast.success('Cập nhập câu trả lời thành công').goAway(1000)
          this.resetData()
        } else {
          await this.addAnswerInChildQuestion({
            id: this.childQuestionId,
            answer: data?.answer,
          })
          this.$toast.success('Thêm câu trả lời thành công').goAway(1000)
        }
        this.resetData()
        return
      }
      if (this.getUpdateValueAnswer?.id) {
        data.answer.id = this.getUpdateValueAnswer.id
        await this.handleUpdateAnswer(data)
        this.$toast.success('Cập nhập câu trả lời thành công').goAway(1000)
        await this.removeValueUpdateAnswer()
        this.isRightAnswer = false
        this.answerContent = ''
        this.answerContentRight = ''
        this.resetData()
        setTimeout(() => {
          this.hideModal()
        }, 200)
      } else {
        console.log(this.getListAnswer.length, this.typeQuestion)
        if (
          this.getListAnswer.length >= 3 &&
          this.typeQuestion === 'right-wrong'
        ) {
          this.$toast
            .error('Không được quá 3 câu trả lời cho loại câu hỏi này')
            .goAway(1000)
          return 0
        }
        await this.handleAddAnswer(data)
        this.$toast.success('Thêm câu trả lời thành công').goAway(1000)
        this.resetData()
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
