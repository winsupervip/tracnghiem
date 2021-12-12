<template>
  <div>
    <h2>{{ $t('exam.form.setting') }}</h2>
    <div class="row">
      <div class="col-12 col-md-4">
        <h3>Xáo trộn</h3>
        <b-form-checkbox
          id="suffleQuestions"
          v-model="suffleQuestions"
          name="suffleQuestions"
        >
          {{ $t('exam.form.suffleQuestions') }}
        </b-form-checkbox>
        <b-form-checkbox
          id="suffleAnswers"
          v-model="suffleAnswers"
          name="suffleAnswers"
        >
          {{ $t('exam.form.suffleAnswers') }}
        </b-form-checkbox>
      </div>
      <div class="col-12 col-md-4">
        <h3>Xem đáp án</h3>
        <b-form-checkbox
          id="checkAnswersWhileTest"
          v-model="checkAnswersWhileTest"
          name="checkAnswersWhileTest"
        >
          {{ $t('exam.form.checkAnswersWhileTest') }}
        </b-form-checkbox>
        <b-form-checkbox
          id="checkAnswersAfterTest"
          v-model="checkAnswersAfterTest"
          name="checkAnswersAfterTest"
        >
          {{ $t('exam.form.checkAnswersAfterTest') }}
        </b-form-checkbox>
      </div>
      <div class="col-12 col-md-4">
        <h3>Thời gian làm bài</h3>
        <b-form-checkbox
          id="nonExamTime"
          v-model="nonExamTime"
          name="nonExamTime"
        >
          {{ $t('exam.form.nonExamTime') }}
        </b-form-checkbox>
        <ValidationProvider
          v-slot="{ valid, errors }"
          rules="required|min_value:0|max_value:1000"
          :name="$t('exam.form.examTime')"
        >
          <b-form-group
            :label="$t('exam.form.examTime')"
            label-for="examTime"
            class="col-12 mb-3"
          >
            <b-form-input
              id="examTime"
              v-model="examTime"
              :style="nonExamTime ? ' background: gray;' : ''"
              :disabled="nonExamTime"
              trim
              :state="errors[0] ? false : valid ? true : null"
            ></b-form-input>
            <b-form-invalid-feedback id="examTimeFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
      </div>
      <div class="col-12 col-md-6">
        <ValidationProvider
          v-slot="{ valid, errors }"
          rules="required|min_value:0|max_value:1000"
          :name="$t('exam.form.maximumTest')"
        >
          <b-form-group
            :label="$t('exam.form.maximumTest')"
            :description="$t('exam.form.maximumTestHelper')"
            label-for="maximumTest"
            class="col-12 mb-3"
          >
            <b-form-input
              id="maximumTest"
              v-model="maximumTest"
              trim
              :state="errors[0] ? false : valid ? true : null"
            ></b-form-input>
            <b-form-invalid-feedback id="maximumTestFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <b-form-group
          :description="$t('exam.form.allowChangeSettingsHelp')"
          class="col-12 mb-3"
        >
          <b-form-checkbox
            id="allowChangeSettings"
            v-model="allowChangeSettings"
            name="allowChangeSettings"
          >
            {{ $t('exam.form.allowChangeSettings') }}
          </b-form-checkbox>
        </b-form-group>
      </div>
      <div class="col-12 col-md-6">
        <ValidationProvider
          v-slot="{ valid, errors }"
          rules="required|min_value:0|max_value:1000"
          :name="$t('exam.form.numberQuestionsTest')"
        >
          <b-form-group
            :label="$t('exam.form.numberQuestionsTest')"
            :description="$t('exam.form.numberQuestionsTestHelp')"
            label-for="numberQuestionsTest"
            class="col-12 mb-3"
          >
            <b-form-input
              id="numberQuestionsTest"
              v-model="numberQuestionsTest"
              trim
              :state="errors[0] ? false : valid ? true : null"
            ></b-form-input>
            <b-form-invalid-feedback id="numberQuestionsTestFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <h3>Ví dụ có chuyên mục:</h3>
        <ul>
          <li>Chuyên mục 1: 5 câu</li>
          <li>Chuyên mục 2: 5 câu</li>
          <li>Các câu không thuộc chuyên mục: {{ numberQuestionsTest }} câu</li>
          <li>
            Tổng số câu / 1 đề:
            <span class="fw-bold">
              {{ 5 + 5 + Number(numberQuestionsTest) }} câu
            </span>
          </li>
        </ul>
        <h3>Ví dụ không có chuyên mục:</h3>
        <ul>
          <li>
            Tổng số câu / 1 đề:
            <span class="fw-bold"> {{ Number(numberQuestionsTest) }} câu </span>
          </li>
        </ul>
      </div>
      <div class="col-12"></div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
export default defineComponent({
  setup() {
    const data = reactive({
      nonExamTime: true,
      examTime: 0,
      maximumTest: 0,
      numberQuestionsTest: 0,
      suffleQuestions: true,
      suffleAnswers: true,
      checkAnswersWhileTest: true,
      checkAnswersAfterTest: true,
      allowChangeSettings: true,
    })
    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({
      examSettings: 'exams/getExamSettings',
    }),
  },
  watch: {
    nonExamTime() {
      this.commitData()
    },
    examTime() {
      this.commitData()
    },
    maximumTest() {
      this.commitData()
    },
    numberQuestionsTest() {
      this.commitData()
    },
    suffleQuestions() {
      this.commitData()
    },
    suffleAnswers() {
      this.commitData()
    },
    checkAnswersWhileTest() {
      this.commitData()
    },
    checkAnswersAfterTest() {
      this.commitData()
    },
    allowChangeSettings() {
      this.commitData()
    },
    examSettings() {
      this.nonExamTime = this.examSettings.nonExamTime
      this.examTime = this.examSettings.examTime
      this.maximumTest = this.examSettings.maximumTest
      this.numberQuestionsTest = this.examSettings.numberQuestionsTest
      this.suffleQuestions = this.examSettings.suffleQuestions
      this.suffleAnswers = this.examSettings.suffleAnswers
      this.checkAnswersWhileTest = this.examSettings.checkAnswersWhileTest
      this.checkAnswersAfterTest = this.examSettings.checkAnswersAfterTest
      this.allowChangeSettings = this.examSettings.allowChangeSettings
    },
  },
  created() {},
  methods: {
    ...mapActions({
      setExamSettings: 'exams/setExamSettings',
    }),
    commitData: _.debounce(function () {
      this.setExamSettings({
        nonExamTime: this.nonExamTime,
        examTime: this.examTime,
        maximumTest: this.maximumTest,
        numberQuestionsTest: this.numberQuestionsTest,
        suffleQuestions: this.suffleQuestions,
        suffleAnswers: this.suffleAnswers,
        checkAnswersWhileTest: this.checkAnswersWhileTest,
        checkAnswersAfterTest: this.checkAnswersAfterTest,
        allowChangeSettings: this.allowChangeSettings,
      })
    }, 200),
  },
})
</script>
<style>
.disiableExamTime {
  background: gray;
}
</style>
