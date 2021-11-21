<template>
  <div>
    <ValidationProvider :name="$t('exam.form.title')" rules="required|max:255">
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

    <b-form-group
      :label="$t('exam.form.tags') + ' (*)'"
      label-for="tags"
      class="col-12 mb-3"
      :description="$t('exam.form.tagHelper')"
    >
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        :autocomplete-items="autocompleteItems"
        :validation="validation"
        :placeholder="$t('exam.form.tagHolder')"
        @tags-changed="update"
      />
    </b-form-group>

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
import catalogApi from '@/api/catalogApi'
export default defineComponent({
  setup() {
    const data = reactive({
      title: '',
      description: '',
      tags: [],
      tag: '',
      autocompleteItems: [],
      validation: [
        {
          classes: 'min-length',
          rule: (tag) => tag.text.length < 4,
        },
        {
          classes: 'no-numbers',
          rule: /^([^0-9]*)$/,
        },
        {
          classes: 'avoid-item',
          rule: /^(?!Cannot).*$/,
          disableAdd: true,
        },
        {
          classes: 'no-braces',
          rule: ({ text }) => text.includes('{') || text.includes('}'),
        },
      ],
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
    tag() {
      this.initItems()
    },
    examInfo() {
      this.title = this.examInfo.title
      this.description = this.examInfo.description
      this.tags = this.examInfo.tags
    },
  },
  created() {},
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
    update(newTags) {
      this.autocompleteItems = []
      this.tags = newTags.map((x) => x.text)
      // console.log(newTags)
      // this.tags = newTags
    },
    initItems() {
      if (this.tag.length < 2) return
      this.searchTag(this.tag)
    },
    searchTag: _.debounce(async function (term) {
      try {
        const { data } = await catalogApi.getTagByKey(term)
        this.autocompleteItems = data.object.items.map((a) => {
          return { text: a.label }
        })
        console.log(this.autocompleteItems)
      } catch (err) {
        this.$logger.debug(err)
      }
    }, 200),
  },
})
</script>
