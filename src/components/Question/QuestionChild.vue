<template>
  <div>
    <b-modal
      :id="modalId"
      ref="modal-question-group"
      :title="questionChild.name"
      size="xl"
      :ok-only="okOnly"
      @shown="shown"
      @hide="hide"
    >
      <div :class="$style.child">
        <ValidationProvider
          v-slot="{ valid, errors }"
          name="Nội dung câu hỏi"
          rules="required"
        >
          <TinyEditor v-if="doShow" v-model="questionContent" @text="getText" />
          <b-form-invalid-feedback :state="valid">{{
            errors[0]
          }}</b-form-invalid-feedback>
        </ValidationProvider>
        <div class="mt-2">
          <b-form-checkbox
            v-model="hasNoCorrectAnswer"
            name="checkbox-1"
            @change="actionsHasNoCorrectAnswer($event)"
          >
            Chưa có đáp án đúng
          </b-form-checkbox>
        </div>
        <AddAnswer
          v-if="questionChild.typeQuestion !== 'short-answer'"
          :block-right-answer="hasNoCorrectAnswer"
          :group-question="true"
          :child-question-id="questionChild.id"
          :type-question="questionChild.typeQuestion"
          :have-random-answer="haveRandomAnswer"
          :have-right-answer="haveRightAnswer"
          :is-pairing="questionChild.typeQuestion === 'pairing' ? true : false"
        />
        <ListAnswers
          :block-right-answer="hasNoCorrectAnswer"
          :child-question-id="questionChild.id"
          :type-question="questionChild.typeQuestion"
          :errors="isErrors"
          :group-question="true"
          :list-child-answer="questionChild.answers"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
import AddAnswer from './AddAnswer.vue'
import ListAnswers from './ListAnswers.vue'
export default {
  components: {
    AddAnswer,
    ListAnswers,
  },
  props: {
    questionChild: {
      type: Object,
      required: true,
    },
    modalId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      questionContent: '',
      questionPlantext: '',
      isErrors: '',
      doShow: false,
      okOnly: true,
      question: {},
      hasNoCorrectAnswer: false,
    }
  },
  computed: {
    haveRandomAnswer() {
      if (
        this.questionChild.typeQuestion === 'fill-blank' ||
        this.questionChild.typeQuestion === 'short-answer'
      ) {
        return false
      }
      return true
    },
    haveRightAnswer() {
      if (
        this.questionChild.typeQuestion === 'fill-blank' ||
        this.questionChild.typeQuestion === 'short-answer' ||
        this.questionChild.typeQuestion === 'draggable' ||
        this.questionChild.typeQuestion === 'pairing'
      ) {
        return false
      }
      return true
    },
  },
  watch: {
    questionContent() {
      this.commitQuestion()
    },
  },
  methods: {
    ...mapActions({
      addChildQuestionContent: 'questions/addChildQuestionContent',
      hasNoCorrectAnswerG: 'questions/hasNoCorrectAnswerG',
    }),
    actionsHasNoCorrectAnswer(event) {
      this.hasNoCorrectAnswerG({
        id: this.questionChild.id,
        value: event,
      })
    },
    shown() {
      this.doShow = true
      this.hasNoCorrectAnswer = this.questionChild?.question?.hasNoCorrectAnswer
      // khi mở modal lên sẻ có 2 trường hợp nếu mà questionConten rổng thì là thêm mới
      // ngược lại là mở một câu hỏi có sẳn
      if (this.questionChild.question.questionContent !== '') {
        this.questionContent = this.questionChild.question.questionContent
      } else {
        this.questionContent = ''
      }
    },
    hide() {
      this.doShow = false
    },

    commitQuestion: _.debounce(function () {
      const data = {
        id: this.questionChild.id,
        value: this.questionContent,
        questionPlantext: this.questionPlantext,
      }
      this.addChildQuestionContent(data)
    }, 200),

    getText(val) {
      if (val) {
        let description = ''
        if (val.length > 500) {
          description = val.substring(0, 500)
        } else {
          description = val
        }
        this.questionPlantext = description.replace('\n', '')
      }
    },
  },
  // eslint-disable-next-line vue/order-in-components
  mounted() {
    console.log('khue log', this.modalId, this.questionChild)
  },
}
</script>

<style module>
.child {
  margin: 2rem;
}
.question_child {
  margin: 1rem;
}
</style>
