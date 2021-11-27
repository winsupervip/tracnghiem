<template>
  <div>
    <b-form-row class="row">
      <ValidationProvider
        :name="$t('admin.category.categoryName')"
        rules="required|max:255"
        class="col-12 col-md-6"
      >
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('admin.category.categoryName') + ' (*)'"
          label-for="categoryName"
          class="mb-3"
        >
          <b-form-input
            id="categoryName"
            v-model="categoryName"
            trim
            :state="errors[0] ? false : valid ? true : null"
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        :name="$t('admin.category.parentId')"
        class="col-12 col-md-6"
      >
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('admin.category.parentId')"
          label-for="categoryName"
          class="mb-3"
        >
          <treeselect
            id="parentId"
            v-model="parentId"
            :multiple="false"
            :options="categoryItems"
            :load-options="loadOptions"
            :placeholder="$t('admin.category.parentId')"
          />
          <b-form-invalid-feedback :state="valid">
            {{ errors ? errors[0] : '' }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
    </b-form-row>
    <b-form-row class="row">
      <ValidationProvider
        :name="$t('admin.category.seoTitle')"
        rules="required|max:255"
        class="col-12 col-md-6"
      >
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('admin.category.seoTitle') + ' (*)'"
          label-for="seoTitle"
          class="mb-3"
        >
          <b-form-input
            id="seoTitle"
            v-model="seoTitle"
            trim
            :state="errors[0] ? false : valid ? true : null"
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        :name="$t('admin.category.slug')"
        rules="required|max:255"
        class="col-12 col-md-6"
      >
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('admin.category.slug') + ' (*)'"
          label-for="slug"
          class="mb-3"
        >
          <b-form-input
            id="slug"
            v-model="slug"
            trim
            :state="errors[0] ? false : valid ? true : null"
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
    </b-form-row>
    <b-form-row class="row">
      <ValidationProvider
        :name="$t('admin.category.seoDescription')"
        rules="required|max:1000"
        class="col-12 col-md-6"
      >
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('admin.category.seoDescription') + ' (*)'"
          label-for="seoDescription"
          class="mb-3"
        >
          <b-form-textarea
            id="seoDescription"
            v-model="seoDescription"
            trim
            :state="errors[0] ? false : valid ? true : null"
            rows="5"
          ></b-form-textarea>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        :name="$t('admin.category.seoAvatar')"
        rules="required|max:1000"
        class="col-12 col-md-6"
      >
        <b-form-group
          slot-scope="{ errors }"
          :label="$t('admin.category.seoAvatar') + ' (*)'"
          label-for="seoDescription"
          class="mb-3"
        >
          <Uploader v-model="seoAvatar" :accept="'*/*'" :disabled="false" />
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
    </b-form-row>

    <ValidationProvider :name="$t('admin.category.htmlContent')">
      <b-form-group
        slot-scope="{ valid, errors }"
        :label="$t('admin.category.htmlContent')"
        label-for="htmlContent"
        class="mb-3"
      >
        <TinyEditor v-model="htmlContent" />
        <b-form-invalid-feedback id="htmlContentFeedback" :state="valid">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
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
import QuestionApi from '@/api/question-list-page'
import Uploader from '@/components/Uploader.vue'
export default defineComponent({
  components: { Uploader },
  props: {
    dataForm: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { $loader, $logger } = useContext()
    const data = reactive({
      categoryItems: [],
      categoryName: '',
      parentId: null,
      seoTitle: '',
      seoDescription: '',
      seoAvatar: null,
      slug: '',
      htmlContent: '',
    })
    useAsync(async () => {
      $loader()
      $logger.info('load data exam')
      const [{ data: categories }] = await Promise.all([
        QuestionApi.getCategory(),
      ])
      data.categoryItems = categories.object.items
      $loader().close()
    })
    return {
      ...toRefs(data),
    }
  },
  watch: {
    categoryName(val) {
      this.commitData()
    },
    parentId(val) {
      this.commitData()
    },
    seoTitle(val) {
      this.slug = this.$options.filters.slugify(val)
      this.commitData()
    },
    seoDescription(val) {
      this.commitData()
    },
    seoAvatar(val) {
      this.commitData()
    },
    slug(val) {
      this.commitData()
    },
    htmlContent(val) {
      this.commitData()
    },
  },
  created() {
    this.categoryName = this.dataForm.categoryName
    this.parentId = this.dataForm.parentId
    this.seoTitle = this.dataForm.seoTitle
    this.seoDescription = this.dataForm.seoDescription
    this.seoAvatar = this.dataForm.seoAvatar
    this.slug = this.dataForm.slug
    this.htmlContent = this.dataForm.htmlContent
  },
  methods: {
    loadOptions({ action, parentNode, callback }) {},
    commitData: _.debounce(function () {
      this.$emit('input', {
        categoryName: this.categoryName,
        parentId: this.parentId,
        seoTitle: this.seoTitle,
        seoDescription: this.seoDescription,
        seoAvatar: this.seoAvatar,
        slug: this.slug,
        htmlContent: this.htmlContent,
        id: this.dataForm.id,
      })
    }, 200),
  },
})
</script>
