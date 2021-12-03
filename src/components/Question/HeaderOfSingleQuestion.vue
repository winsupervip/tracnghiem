<template>
  <div>
    <div>
      <p class="p-headerQuestion">
        <u> {{ $t('questionBank') }} </u>> <u>{{ questionTitle }}</u>
      </p>
      <ValidationProvider rules="required|max:255" name="Tiêu Đề">
        <b-form-group slot-scope="{ valid, errors }" :label-for="$t('title')">
          <b-form-input
            v-model="title"
            type="text"
            :state="errors[0] ? false : valid ? true : null"
            :placeholder="$t('title')"
          >
          </b-form-input>
          <b-form-invalid-feedback id="inputLiveFeedback">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <div class="p-question__tagGroup">
        <ValidationProvider
          v-slot="{ errors, valid }"
          rules="required"
          :name="$t('addTags')"
        >
          <b-form-group
            :label-for="$t('addTags')"
            :label="$t('exam.form.tags') + ' (*)'"
            class="col-12 mb-3"
            :description="$t('exam.form.tagHelper')"
          >
            <Tag v-model="tags" />
            <b-form-invalid-feedback id="inputLiveFeedback" :state="valid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
      </div>
      <div>
        <ValidationProvider
          v-slot="{ valid, errors }"
          name="Nội dung câu hỏi"
          rules="required"
        >
          <TinyEditor v-model="questionContent" @text="getText" />
          <b-form-invalid-feedback :state="valid">{{
            errors[0]
          }}</b-form-invalid-feedback>
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
  useRoute,
  computed,
} from '@nuxtjs/composition-api'
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import Tag from '@/components/Tag.vue'
export default defineComponent({
  name: 'Header',
  components: { Tag },
  props: {
    questionTitle: {
      type: String,
      required: true,
    },
  },
  setup() {
    const route = useRoute()
    const ItemType = computed(() => route.value.query.type)

    const data = reactive({
      optionsText: {
        convert_urls: false,
        entity_encoding: 'raw',
      },
      questionItemType: ItemType.value,
      isTagValid: false,
      questionContent: '',
      questionPlanText: '',
      isRightAnswer: false,
      isRandom: false,
      doShow: false,
      okOnly: true,
      options: [],
      search: '',
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

      title: '',
    })

    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({
      getQuestion: 'questions/getQuestion',
      getGroupQuestion: 'questions/getGroupQuestion',
    }),
    criteria() {
      // Compute the search criteria
      return this.search.trim()
    },
    availableOptions() {
      return this.options
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return this.$i18n.t('thereAreNoTagsMatchingYourSearchCriteria')
      }
      return ''
    },
  },
  watch: {
    title() {
      this.commitTitle()
    },
    tags() {
      this.addTags(this.tags)
    },
    questionContent() {
      this.commitQuestion()
    },
  },
  updated() {
    // khi mà edit thì đọc từ store vào
    console.log('aaa', this.getQuestion.question.questionContent)
    console.log('abc', this.title)
    if (this.getQuestion.question.questionContent !== '') {
      this.questionContent = this.getQuestion.question.questionContent
      this.title = this.getQuestion.question.title
      this.tags = this.getQuestion.question.tags
      this.questionPlanText = this.getQuestion.question.plainText
    }
  },
  methods: {
    isAddTag(value) {
      this.addTags(value)
    },
    checktagValid(evt) {
      console.log(evt)
      if (this.tags.length > 0) {
        return true
      }
      return false
    },
    ...mapActions({
      addTags: 'questions/addTags',
      addTitle: 'questions/addTitle',
      addQuestionContent: 'questions/addQuestionContent',
    }),
    commitTitle: _.debounce(function () {
      this.addTitle(this.title)
    }, 200),
    commitQuestion: _.debounce(function () {
      this.addQuestionContent({
        questionContent: this.questionContent,
        questionPlanText: this.questionPlanText,
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
        this.questionPlanText = description.replace('\n', '')
      }
    },
    showTitle() {
      return this.getQuestion.question.title
    },
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
    },
  },
})
</script>
<style lang="scss" module>
.addQuestionTitle {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
.checkBox {
  display: flex;
  margin: 2rem;
}
.checkBoxView {
  display: flex;
}
.checkBoxInput {
  align-self: center;
  margin-right: 1rem;
}
.checkBoxTitle {
  align-self: center;
  margin: 0 auto;
}
</style>

<style lang="scss" scoped>
.p-headerQuestion {
  font-size: 16px;
  font-weight: bold;
  font-family: 'Open Sans', sans-serif;
}
</style>
