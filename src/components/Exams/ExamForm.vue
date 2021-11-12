<template>
  <div class="row">
    <div class="col-12 col-md-8">
      <b-card sub-title="Thông tin đề thi">
        <ValidationProvider
          v-slot="{ valid, errors }"
          rules="required"
          :name="$t('exam.form.title')"
        >
          <b-form-group
            :label="$t('exam.form.title')"
            label-for="title"
            class="col-12 mb-3"
          >
            <b-form-input
              id="title"
              v-model="dataForm.title"
              trim
              :state="errors[0] ? false : valid ? true : null"
            ></b-form-input>
            <b-form-invalid-feedback id="titleFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ valid, errors }"
          rules="required"
          :name="$t('exam.form.tags')"
        >
          <b-form-group
            :label="$t('exam.form.tags')"
            label-for="tags"
            class="col-12 mb-3"
          >
            <b-form-tags
              v-model="dataForm.tags"
              input-id="tags"
              :state="errors[0] ? false : valid ? true : null"
            ></b-form-tags>
            <b-form-invalid-feedback id="tagsFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ valid, errors }"
          rules="required"
          :name="$t('exam.form.description')"
        >
          <b-form-group
            :label="$t('exam.form.description')"
            label-for="description"
            class="col-12 mb-3"
          >
            <TinyEditor v-model="dataForm.description" />
            <b-form-invalid-feedback id="descriptionFeedback" :state="valid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <h2>{{ $t('exam.form.setting') }}</h2>
        <div class="row">
          <div class="col-12 col-md-4">
            <h3>Xáo trộn</h3>
            <b-form-checkbox
              id="suffleQuestions"
              v-model="dataForm.suffleQuestions"
              name="suffleQuestions"
            >
              {{ $t('exam.form.suffleQuestions') }}
            </b-form-checkbox>
            <b-form-checkbox
              id="suffleAnswers"
              v-model="dataForm.suffleAnswers"
              name="suffleAnswers"
            >
              {{ $t('exam.form.suffleAnswers') }}
            </b-form-checkbox>
          </div>
          <div class="col-12 col-md-4">
            <h3>Xem đáp án</h3>
            <b-form-checkbox
              id="checkAnswersWhileTest"
              v-model="dataForm.checkAnswersWhileTest"
              name="checkAnswersWhileTest"
            >
              {{ $t('exam.form.checkAnswersWhileTest') }}
            </b-form-checkbox>
            <b-form-checkbox
              id="checkAnswersAfterTest"
              v-model="dataForm.checkAnswersAfterTest"
              name="checkAnswersAfterTest"
            >
              {{ $t('exam.form.checkAnswersAfterTest') }}
            </b-form-checkbox>
          </div>
          <div class="col-12 col-md-4">
            <h3>Thời gian làm bài</h3>
            <b-form-checkbox
              id="nonExamTime"
              v-model="dataForm.nonExamTime"
              name="nonExamTime"
            >
              {{ $t('exam.form.nonExamTime') }}
            </b-form-checkbox>
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
              :name="$t('exam.form.examTime')"
            >
              <b-form-group
                :label="$t('exam.form.examTime')"
                label-for="examTime"
                class="col-12 mb-3"
              >
                <b-form-input
                  id="examTime"
                  v-model="dataForm.examTime"
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
              rules="required"
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
                  v-model="dataForm.maximumTest"
                  trim
                  :state="errors[0] ? false : valid ? true : null"
                ></b-form-input>
                <b-form-invalid-feedback id="maximumTestFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </div>
          <div class="col-12 col-md-6">
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
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
                  v-model="dataForm.numberQuestionsTest"
                  trim
                  :state="errors[0] ? false : valid ? true : null"
                ></b-form-input>
                <b-form-invalid-feedback id="numberQuestionsTestFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </div>
          <div class="col-12">
            <b-form-group
              :description="$t('exam.form.allowChangeSettingsHelp')"
              class="col-12 mb-3"
            >
              <b-form-checkbox
                id="allowChangeSettings"
                v-model="dataForm.allowChangeSettings"
                name="allowChangeSettings"
              >
                {{ $t('exam.form.allowChangeSettings') }}
              </b-form-checkbox>
            </b-form-group>
          </div>
        </div>
      </b-card>
    </div>
    <div class="col-12 col-md-3">
      <div class="list-group">
        <div class="list-group-item disabled">
          <h3>{{ $t('exam.form.display') }}:</h3>
        </div>
        <div class="list-group-item">
          <ValidationProvider :name="$t('exam.form.display')" rules="required">
            <b-form-radio-group
              v-model="dataForm.statusId"
              slot-scope="{ valid, errors }"
            >
              <b-form-radio
                v-for="status in listStatus"
                :key="status.id"
                :value="status.id"
                >{{ status.label }}
              </b-form-radio>
              <b-form-invalid-feedback :state="valid">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-radio-group>
          </ValidationProvider>
        </div>
        <div class="list-group-item">
          <p>Chỉ bạn mới thấy được đề thi này</p>
          <b-button variant="outline-primary" @click="submit()">
            <b-icon-file-earmark-check></b-icon-file-earmark-check>
            {{ $t('exam.form.submitDraft') }}
          </b-button>
        </div>
      </div>
      <div class="list-group mt-3">
        <div class="list-group-item disabled border-bottom-0">
          <h3>{{ $t('exam.form.categoryTitle') }} (*):</h3>
        </div>
        <div class="list-group-item tree-select-container border-0 p-0 m-0">
          <ValidationProvider
            :name="$t('exam.form.categoryTitle')"
            rules="required"
          >
            <treeselect
              id="categories"
              v-model="dataForm.categories"
              :multiple="false"
              :options="categories"
              :load-options="loadOptions"
              :always-open="true"
              :placeholder="$t('exam.form.categorySelect')"
            />
          </ValidationProvider>
        </div>
      </div>
      <div class="list-group mt-3">
        <div class="list-group-item disabled">
          <h3>{{ $t('exam.form.level') }}:</h3>
        </div>
        <div class="list-group-item">
          <ValidationProvider :name="$t('exam.form.level')" rules="required">
            <b-form-radio-group
              v-model="dataForm.levelId"
              slot-scope="{ valid, errors }"
            >
              <b-form-radio
                v-for="level in levels"
                :key="level.id"
                :value="level.id"
                >{{ level.label }}</b-form-radio
              >
              <b-form-invalid-feedback :state="valid">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-radio-group>
          </ValidationProvider>
        </div>
      </div>
      <div class="list-group mt-3">
        <div class="list-group-item disabled border-bottom-0">
          <h3>{{ $t('exam.form.avatar') }}:</h3>
        </div>
        <div class="list-group-item p-0 m-0 border-0">
          <Uploader
            v-model="dataForm.image"
            :accept="'*/*'"
            :disabled="false"
          />
        </div>
      </div>
      <div class="list-group mt-3">
        <div class="list-group-item disabled">
          <h3>{{ $t('exam.form.seoSetting') }}:</h3>
        </div>
        <div class="list-group-item">
          <ValidationProvider :name="$t('exam.form.seoTitle')" rules="required">
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('exam.form.seoTitle')"
              label-for="seoTitle"
            >
              <b-form-input
                id="seoTitle"
                v-model="dataForm.seoTitle"
                trim
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback id="seoTitleFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            :name="$t('exam.form.seoDescription')"
            rules="required"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('exam.form.seoDescription')"
              label-for="seoDescription"
            >
              <b-form-textarea
                id="seoDescription"
                v-model="dataForm.seoDescription"
                trim
                rows="3"
                max-rows="6"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-textarea>
              <b-form-invalid-feedback id="seoDescriptionFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  useAsync,
  reactive,
  toRefs,
} from '@nuxtjs/composition-api'

import { mapActions } from 'vuex'
import Uploader from '@/components/Uploader.vue'

import QuestionApi from '@/api/question-list-page'
import catalogApi from '@/api/catalogApi'
export default defineComponent({
  components: { Uploader },
  layout: 'sidebar',
  auth: true,
  props: {
    exam: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { app, $loader, $logger } = useContext()
    const data = reactive({
      breadcrumbs: [
        {
          text: app.i18n.t('exam.dashboard'),
          href: '#',
        },
        {
          text: app.i18n.t('exam.exam_title'),
          href: '/users/exams',
        },
        {
          text: app.i18n.t('exam.add'),
          active: true,
        },
      ],
      categories: [],
      paymentTypes: [],
      listStatus: [],
      levels: [],
      sortBy: [],
      dataForm: {
        hashId: '',
        payementTypeId: 0,
        title: '',
        image: '',
        description: '',
        nonExamTime: true,
        examTime: 0,
        maximumTest: 0,
        numberQuestionsTest: 0,
        suffleQuestions: true,
        suffleAnswers: true,
        checkAnswersWhileTest: true,
        checkAnswersAfterTest: true,
        allowChangeSettings: true,
        statusId: 0,
        levelId: 0,
        seoTitle: '',
        seoDescription: '',
        categories: [],
        tags: [],
      },
    })

    useAsync(async () => {
      $loader()
      $logger.info('load data')
      const [
        { data: categories },
        { data: paymentTypes },
        { data: listStatus },
        { data: levels },
        { data: sortBy },
      ] = await Promise.all([
        QuestionApi.getCategory(),
        catalogApi.getPaymentType(),
        QuestionApi.getListStatus(),
        QuestionApi.getLevel(),
        catalogApi.getExamSortBy(),
      ])
      data.categories = categories.object.items
      data.paymentTypes = paymentTypes.object.items
      data.listStatus = listStatus.object.items
      data.levels = levels.object.items
      data.sortBy = sortBy.object.items
      $loader().close()
    })
    return {
      ...toRefs(data),
    }
  },
  created() {
    this.dataForm = Object.assign({}, this.exam)
  },
  methods: {
    ...mapActions({
      setExam: 'exams/setExam',
    }),
    loadOptions({ action, parentNode, callback }) {},
    async submit() {
      console.log('submit')
      await this.setExam(Object.assign({}, this.dataForm))
    },
  },
})
</script>
