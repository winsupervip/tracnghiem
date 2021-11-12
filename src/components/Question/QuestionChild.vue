<template>
  <b-modal
    id="modal-group"
    :title="question.name"
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
        <TinyEditor v-if="doShow" v-model="questionContent" />
        <b-form-invalid-feedback :state="valid">{{
          errors[0]
        }}</b-form-invalid-feedback>
      </ValidationProvider>
      <AddAnswer
        :group-question="true"
        :child-question-id="question.id"
        :type-question="question.typeQuestion"
        :have-random-answer="haveRandomAnswer"
        :have-right-answer="haveRightAnswer"
        :is-pairing="question.questionType === 'paring' ? true : false"
      />
      <ListAnswers
        :type-question="question.typeQuestion"
        :errors="isErrors"
        :group-question="true"
        :list-child-answer="question.answers"
      />
    </div>
  </b-modal>
</template>

<script>
import AddAnswer from './AddAnswer.vue'
import ListAnswers from './ListAnswers.vue'
export default {
  components: {
    AddAnswer,
    ListAnswers,
  },
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      questionContent: '',
      isErrors: '',
      doShow: false,
      okOnly: true,
    }
  },
  computed: {
    haveRandomAnswer() {
      if (
        this.question.typeQuestion === 'fill-blank' ||
        this.question.typeQuestion === 'short-answer'
      ) {
        return false
      }
      return true
    },
    haveRightAnswer() {
      if (
        this.question.typeQuestion === 'fill-blank' ||
        this.question.typeQuestion === 'short-answer' ||
        this.question.typeQuestion === 'draggable'
      ) {
        return false
      }
      return true
    },
  },
  methods: {
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
      // this.updateAnswer('remove_data')
    },
  },
}
</script>

<style module>
.child {
  margin: 2rem;
}
</style>
