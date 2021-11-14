<template>
  <div>
    <div class="list-group">
      <div class="list-group-item disabled">
        <h3>{{ $t('exam.form.display') }}:</h3>
      </div>
      <div class="list-group-item">
        <ValidationProvider :name="$t('exam.form.display')" rules="required">
          <b-form-radio-group v-model="statusId" slot-scope="{ valid, errors }">
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
        <p>{{ statusMessage }}</p>
        <b-button variant="outline-primary" type="submit">
          <b-icon-file-earmark-check></b-icon-file-earmark-check>
          {{ $t('exam.form.submitDraft') }}
        </b-button>
      </div>
    </div>
    <ValidationProvider
      v-slot="{ valid, errors, validate }"
      :name="$t('exam.form.categoryTitle')"
      rules="required"
    >
      <div class="list-group mt-3">
        <b-form-invalid-feedback :state="valid">
          {{ errors ? errors[0] : '' }}
        </b-form-invalid-feedback>
        <div class="list-group-item disabled border-bottom-0">
          <h3>{{ $t('exam.form.categoryTitle') }} (*):</h3>
        </div>
        <div class="list-group-item tree-select-container border-0 p-0 m-0">
          <treeselect
            id="categories"
            v-model="categories"
            :multiple="false"
            :options="categoryItems"
            :load-options="loadOptions"
            :always-open="true"
            :placeholder="$t('exam.form.categorySelect')"
            @input="validate"
          />
        </div>
      </div>
    </ValidationProvider>
    <div class="list-group mt-3">
      <div class="list-group-item disabled">
        <h3>{{ $t('exam.form.level') }}:</h3>
      </div>
      <div class="list-group-item">
        <ValidationProvider :name="$t('exam.form.level')" rules="required">
          <b-form-radio-group v-model="levelId" slot-scope="{ valid, errors }">
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
        <Uploader v-model="image" :accept="'*/*'" :disabled="false" />
      </div>
    </div>
    <div class="list-group mt-3">
      <div class="list-group-item disabled">
        <h3>{{ $t('exam.form.seoSetting') }}:</h3>
      </div>
      <div class="list-group-item">
        <ValidationProvider
          :name="$t('exam.form.seoTitle')"
          rules="required|max:255"
        >
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('exam.form.seoTitle')"
            label-for="seoTitle"
          >
            <b-form-input
              id="seoTitle"
              v-model="seoTitle"
              trim
              :state="errors[0] ? false : valid ? true : null"
            ></b-form-input>
            <b-form-invalid-feedback id="seoTitleFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          :name="$t('exam.form.slug')"
          rules="required|max:255"
        >
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('exam.form.slug')"
            label-for="slug"
          >
            <b-form-input
              id="slug"
              v-model="slug"
              trim
              :state="errors[0] ? false : valid ? true : null"
            ></b-form-input>
            <b-form-invalid-feedback id="slugFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          :name="$t('exam.form.seoDescription')"
          rules="required|max:1000"
        >
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('exam.form.seoDescription')"
            label-for="seoDescription"
          >
            <b-form-textarea
              id="seoDescription"
              v-model="seoDescription"
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
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useAsync,
  useContext,
} from '@nuxtjs/composition-api'
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import QuestionApi from '@/api/question-list-page'
import catalogApi from '@/api/catalogApi'
import Uploader from '@/components/Uploader.vue'
const STATUS_PUBLIC = 1
const STATUS_PRIVATE = 2
const STATUS_DRAFT = 3
export default defineComponent({
  components: { Uploader },
  setup() {
    const { $loader, $logger } = useContext()
    const data = reactive({
      image: '',
      payementTypeId: 0,
      statusId: 0,
      levelId: 0,
      seoTitle: '',
      seoDescription: '',
      slug: '',
      categories: [],
      categoryItems: [],
      paymentTypes: [],
      listStatus: [],
      levels: [],
      sortBy: [],
    })
    useAsync(async () => {
      $loader()
      $logger.info('load data exam')
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
      data.categoryItems = categories.object.items
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
  computed: {
    ...mapGetters({
      examExtra: 'exams/getExamExtra',
      getTitle: 'exams/getTitle',
      getDescription: 'exams/getDescription',
    }),
    statusMessage() {
      switch (this.statusId) {
        case STATUS_PUBLIC:
          return this.$i18n.t('exam.form.publish')
        case STATUS_PRIVATE:
          return this.$i18n.t('exam.form.private')
        case STATUS_DRAFT:
        default:
          return this.$i18n.t('exam.form.draft')
      }
    },
  },
  watch: {
    image() {
      this.commitData()
    },
    payementTypeId() {
      this.commitData()
    },
    statusId() {
      this.commitData()
    },
    levelId() {
      this.commitData()
    },
    seoTitle() {
      this.commitData()
    },
    seoDescription() {
      this.commitData()
    },
    categories() {
      this.commitData()
    },
    getTitle() {
      this.slug = this.$options.filters.slugify(this.getTitle)
      this.seoTitle = this.getTitle
    },
    getDescription() {
      this.seoDescription = this.getDescription
    },
  },
  created() {
    this.image = this.examExtra.image
    this.payementTypeId = this.examExtra.payementTypeId
    this.statusId = this.examExtra.statusId
    this.levelId = this.examExtra.levelId
    this.seoTitle = this.examExtra.seoTitle
    this.seoDescription = this.examExtra.seoDescription
    this.categories = this.examExtra.categories
    this.slug = this.examExtra.slug
  },
  methods: {
    ...mapActions({
      setExamExtra: 'exams/setExamExtra',
    }),
    loadOptions({ action, parentNode, callback }) {},
    commitData: _.debounce(function () {
      this.setExamExtra({
        image: this.image,
        payementTypeId: this.payementTypeId,
        statusId: this.statusId,
        levelId: this.levelId,
        seoTitle: this.seoTitle,
        seoDescription: this.seoDescription,
        slug: this.slug,
        categories: this.categories,
      })
    }, 200),
  },
})
</script>
