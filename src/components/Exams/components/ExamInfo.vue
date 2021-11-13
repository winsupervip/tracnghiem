<template>
  <div>
    <ValidationProvider :name="$t('exam.form.title')" rules="required">
      <b-form-group
        slot-scope="{ valid, errors }"
        :label="$t('exam.form.title') + ' (*)'"
        label-for="title"
        class="col-12 mb-3"
      >
        <b-form-input
          id="title"
          v-model="title"
          trim
          :state="errors[0] ? false : valid ? true : null"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>

    <ValidationProvider rules="required" :name="$t('exam.form.tags')">
      <b-form-group
        slot-scope="{ valid, errors }"
        :label="$t('exam.form.tags') + ' (*)'"
        label-for="tags"
        class="col-12 mb-3"
      >
        <b-form-tags
          v-model="tags"
          input-id="tags"
          :state="errors[0] ? false : valid ? true : null"
        ></b-form-tags>
        <b-form-invalid-feedback id="tagsFeedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>

    <ValidationProvider rules="required" :name="$t('exam.form.description')">
      <b-form-group
        slot-scope="{ valid, errors }"
        :label="$t('exam.form.description') + ' (*)'"
        label-for="description"
        class="col-12 mb-3"
      >
        <TinyEditor v-model="description" @text="getText" />
        <b-form-invalid-feedback id="descriptionFeedback" :state="valid">
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
export default defineComponent({
  setup() {
    const data = reactive({
      title: '',
      description: '',
      tags: [],
    })
    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({
      examInfo: 'exams/getExamInfo',
    }),
  },
  watch: {
    title() {
      this.commitData()
    },
    description() {
      this.commitData()
    },
    tags() {
      this.commitData()
    },
  },
  created() {
    this.title = this.examInfo.title
    this.description = this.examInfo.description
    this.tags = this.examInfo.tags
    console.log(this.title)
  },
  methods: {
    ...mapActions({
      setExamInfo: 'exams/setExamInfo',
      setSeoDescription: 'exams/setSeoDescription',
    }),
    commitData: _.debounce(function () {
      this.setExamInfo({
        title: this.title,
        description: this.description,
        tags: this.tags,
      })
    }, 200),
    getText(val) {
      if (val) {
        let description = ''
        if (val.length > 500) {
          description = val.substring(0, 500)
        } else {
          description = val
        }
        this.setSeoDescription(description.replace('\n', ''))
      }
    },
  },
})
</script>
