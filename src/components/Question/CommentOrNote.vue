<template>
  <div class="card p-question__box">
    <p class="p-question__box__heading">
      <strong>{{ $t('Comment / Annotation') }}</strong>
    </p>
    <div class="p-question__box__body">
      <div class="p-question__box__body__item">
        <b-form-textarea
          id="textarea-default"
          v-model="explainationIfCorrect"
          class="mb-20"
          :placeholder="$t('whenTheAnswerIsCorrect')"
        ></b-form-textarea>
        <b-form-textarea
          v-if="!group"
          id="textarea-default"
          v-model="explainationIfIncorrect"
          :placeholder="$t('whenTheAnswerIsIncorrect')"
        ></b-form-textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    group: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      explainationIfCorrect: '',
      explainationIfIncorrect: '',
    }
  },
  computed: {
    ...mapGetters({
      getExplainationIfCorrect: 'questions/getExplainationIfCorrect',

      getExplainationIfInCorrect: 'questions/getExplainationIfInCorrect',
    }),
  },
  watch: {
    explainationIfCorrect() {
      this.addExplainationIfCorrect(this.explainationIfCorrect)
    },
    explainationIfIncorrect() {
      this.addExplainationIfInCorrect(this.explainationIfIncorrect)
    },
  },
  mounted() {
    this.explainationIfCorrect = this.getExplainationIfCorrect
    this.explainationIfIncorrect = this.getExplainationIfInCorrect
  },
  methods: {
    ...mapActions({
      addExplainationIfCorrect: 'questions/addExplainationIfCorrect',
      addExplainationIfInCorrect: 'questions/addExplainationIfInCorrect',
    }),
  },
}
</script>

<style lang="scss" scope>
.mb-20 {
  margin-bottom: 15px;
}
</style>
