<template>
  <div class="card-do-exam card-filter mb-3">
    <b-btn
      variant="success"
      block
      class="font-lmd mb-3 button-do-exam button-do-exam-sp"
      @click="$emit('showModalStartExam')"
    >
      BẮT ĐẦU LÀM BÀI
    </b-btn>
    <b-btn
      variant="success"
      block
      class="font-lmd mb-3 button-do-exam"
      @click="$emit('showModalStartExam')"
    >
      BẮT ĐẦU LÀM BÀI
    </b-btn>
    <div class="card-filter-body">
      <div class="filter-group">
        <strong
          :class="
            showFilterGroup1
              ? 'filter-group-header'
              : 'filter-group-header collapsed'
          "
          @click="$emit('setShowFilterGroup1')"
        >
          Cài đặt đề thi
          <i class="icon-caret-down"></i>
        </strong>
        <b-collapse v-model="showFilterGroup1" class="filter-group-body">
          <b-form-checkbox-group v-model="sectionConfigIdsChecked">
            <template v-for="item in sectionConfig">
              <b-form-checkbox
                :key="item.sectionHashId"
                :value="item.sectionHashId"
                :disabled="!allowChangeSettings"
              >
                <div class="d-flex justify-content-between">
                  <span>{{ item.title }}</span>
                  <div class="group-input-xs">
                    <input
                      :value="item.numberQuestionsTest"
                      class="form-control"
                      type="text"
                      @input="
                        updateNumberQuestionsTest(
                          item.sectionHashId,
                          Number($event.target.value)
                        )
                      "
                    />
                    <strong>/ {{ item.totalQuestion }}</strong>
                  </div>
                </div>
              </b-form-checkbox>
            </template>
          </b-form-checkbox-group>
          <b-form-checkbox-group>
            <b-form-checkbox>
              <div class="d-flex justify-content-between">
                <span>Câu hỏi khác</span>
                <div class="group-input-xs">
                  <input
                    v-model="numberQuestionsTest"
                    class="form-control"
                    type="text"
                  />
                  <strong>/ 10</strong>
                </div>
              </div>
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-collapse>
      </div>
      <hr class="line-divide" />
      <div class="filter-group">
        <strong
          :class="
            showFilterGroup2
              ? 'filter-group-header'
              : 'filter-group-header collapsed'
          "
          @click="$emit('setShowFilterGroup2')"
        >
          Thời gian làm bài
          <i class="icon-caret-down"></i>
        </strong>
        <b-collapse v-model="showFilterGroup2" class="filter-group-body">
          <b-form-group>
            <b-form-radio
              v-model="nonExamTime"
              :disabled="!allowChangeSettings"
              name="time-radios"
              value="true"
            >
              Không tính giờ
            </b-form-radio>
            <b-form-radio
              v-model="nonExamTime"
              :disabled="!allowChangeSettings"
              name="time-radios"
              value="false"
            >
              <div class="d-flex justify-content-between">
                <span>Tính giờ</span>
                <div class="group-input-xs">
                  <input
                    v-model="examTimeSecond"
                    class="form-control"
                    type="text"
                    :disabled="!allowChangeSettings"
                  />
                  <strong>phút</strong>
                </div>
              </div>
            </b-form-radio>
          </b-form-group>
        </b-collapse>
      </div>
      <hr class="line-divide" />
      <div class="filter-group">
        <strong
          :class="
            showFilterGroup3
              ? 'filter-group-header'
              : 'filter-group-header collapsed'
          "
          @click="$emit('setShowFilterGroup3')"
        >
          Cài đặt khác
          <i class="icon-caret-down"></i>
        </strong>
        <b-collapse v-model="showFilterGroup3" class="filter-group-body">
          <b-form-checkbox
            v-model="suffleQuestions"
            :disabled="!configQuizData.allowChangeSettings"
          >
            <div class="d-flex justify-content-between">
              <span>Xáo trộn câu hỏi</span>
            </div>
          </b-form-checkbox>
          <b-form-checkbox
            v-model="suffleAnswers"
            :disabled="!configQuizData.allowChangeSettings"
          >
            <div class="d-flex justify-content-between">
              <span>Xáo trộn đáp án</span>
            </div>
          </b-form-checkbox>
          <b-form-checkbox
            v-model="checkAnswersWhileTest"
            :disabled="!configQuizData.allowChangeSettings"
          >
            <div class="d-flex justify-content-between">
              <span>Xem kết quả trong khi trả lời câu hỏi</span>
            </div>
          </b-form-checkbox>
          <b-form-checkbox
            v-model="checkAnswersAfterTest"
            :disabled="!configQuizData.allowChangeSettings"
          >
            <div class="d-flex justify-content-between">
              <span>Xem kết quả sau khi trả lời câu hỏi</span>
            </div>
          </b-form-checkbox>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import get from 'lodash/get'
import { mapActions } from 'vuex'
export default defineComponent({
  name: 'ConfigQuiz',
  auth: false,
  props: {
    configQuiz: {
      type: Object,
      default: () => {},
    },
    configQuizData: {
      type: Object,
      default: () => {},
    },
  },
  setup() {},
  data() {
    return {
      maximumTest: 0,
    }
  },
  computed: {
    sectionConfigIdsChecked: {
      get() {
        return get(this.configQuiz, 'sectionConfigIdsChecked', null)
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit(
          'update:data',
          // eslint-disable-next-line vue/no-mutating-props
          (this.configQuiz.sectionConfigIdsChecked = val)
        )
      },
    },
    selectedOptions3: {
      get() {
        return get(this.configQuiz, 'selectedOptions3', null)
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit('update:data', (this.configQuiz.selectedOptions3 = val))
      },
    },
    showFilterGroup1: {
      get() {
        return get(this.configQuiz, 'showFilterGroup1', null)
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit('update:data', (this.configQuiz.showFilterGroup1 = val))
      },
    },
    showFilterGroup2: {
      get() {
        return get(this.configQuiz, 'showFilterGroup2', null)
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit('update:data', (this.configQuiz.showFilterGroup2 = val))
      },
    },
    showFilterGroup3: {
      get() {
        return get(this.configQuiz, 'showFilterGroup3', null)
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit('update:data', (this.configQuiz.showFilterGroup3 = val))
      },
    },
    suffleQuestions: {
      get() {
        return (
          // eslint-disable-next-line no-unneeded-ternary
          get(this.configQuizData, 'suffleQuestions', null)
        )
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit('update:data', (this.configQuizData.suffleQuestions = val))
      },
    },
    suffleAnswers: {
      get() {
        return (
          // eslint-disable-next-line no-unneeded-ternary
          get(this.configQuizData, 'suffleAnswers', null)
        )
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit('update:data', (this.configQuizData.suffleAnswers = val))
      },
    },
    checkAnswersWhileTest: {
      get() {
        return (
          // eslint-disable-next-line no-unneeded-ternary
          get(this.configQuizData, 'checkAnswersWhileTest', null)
        )
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit(
          'update:data',
          // eslint-disable-next-line vue/no-mutating-props
          (this.configQuizData.checkAnswersWhileTest = val)
        )
      },
    },
    checkAnswersAfterTest: {
      get() {
        return (
          // eslint-disable-next-line no-unneeded-ternary
          get(this.configQuizData, 'checkAnswersAfterTest', null)
        )
      },
      set(val) {
        this.$emit(
          'update:data',
          // eslint-disable-next-line vue/no-mutating-props
          (this.configQuizData.checkAnswersAfterTest = val)
        )
      },
    },
    nonExamTime: {
      get() {
        return (
          // eslint-disable-next-line no-unneeded-ternary
          get(this.configQuizData, 'nonExamTime', null)
        )
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit('update:data', (this.configQuizData.nonExamTime = val))
      },
    },
    // sectionConfigData: {
    //   get() {
    //     return (
    //       // eslint-disable-next-line no-unneeded-ternary
    //       get(this.configQuizData, 'sectionConfig', null)
    //     )
    //   },
    // },
    sectionConfig: {
      get() {
        console.log('this.configQuizData: ', this.configQuizData)
        return (
          // eslint-disable-next-line no-unneeded-ternary
          get(this.configQuizData, 'sectionConfig', null)
        )
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        // this.sectionConfigData = val
        // eslint-disable-next-line vue/no-mutating-props
        console.log('set .sectionConfig: ', val)

        // eslint-disable-next-line vue/no-mutating-props
        this.$emit('update:data', (this.configQuizData.sectionConfig = val))
      },
    },
    examTimeSecond: {
      get() {
        return (
          // eslint-disable-next-line no-unneeded-ternary
          get(this.configQuizData, 'examTimeSecond', null) / 60
        )
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit(
          'update:data',
          // eslint-disable-next-line vue/no-mutating-props
          (this.configQuizData.examTimeSecond = val * 60)
        )
      },
    },
    allowChangeSettings: {
      get() {
        console.log('allowChangeSettings configQuizData: ', this.configQuizData)
        return (
          // eslint-disable-next-line no-unneeded-ternary
          get(this.configQuizData, 'allowChangeSettings', null)
        )
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit(
          'update:data',
          // eslint-disable-next-line vue/no-mutating-props
          (this.configQuizData.allowChangeSettings = val)
        )
      },
    },
    questionOutsideSection: {
      get() {
        return (
          // eslint-disable-next-line no-unneeded-ternary
          get(this.configQuizData, 'questionOutsideSection', null)
        )
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit(
          'update:data',
          // eslint-disable-next-line vue/no-mutating-props
          (this.configQuizData.questionOutsideSection = val)
        )
      },
    },
    numberQuestionsTest: {
      get() {
        return (
          // eslint-disable-next-line no-unneeded-ternary
          get(this.configQuizData, 'numberQuestionsTest', null)
        )
      },
      set(val) {
        // eslint-disable-next-line vue/no-mutating-props
        this.$emit(
          'update:data',
          // eslint-disable-next-line vue/no-mutating-props
          (this.configQuizData.numberQuestionsTest = Number(val))
        )
      },
    },
  },
  methods: {
    ...mapActions({
      setSectionConfig: 'exams/setSectionConfig',
    }),
    updateNumberQuestionsTest(id, value) {
      // eslint-disable-next-line no-undef
      this.setSectionConfig({ id, value })
    },
  },
  // watch: {
  //   sectionConfig() {
  //     this.sectionConfigData = this.sectionConfig
  //   },

  //   sectionConfigData() {
  //     this.sectionConfig = this.sectionConfigData
  //   },
  // },
})
</script>
