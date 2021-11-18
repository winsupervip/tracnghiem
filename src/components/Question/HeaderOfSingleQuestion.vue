<template>
  <div>
    <div>
      <p class="p-headerQuestion">
        {{ $t('questionBank') }} > {{ questionTitle }}
      </p>
      <ValidationProvider rules="required" name="Tiêu Đề">
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('title')"
          :label-for="$t('title')"
        >
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
        <ValidationProvider rules="required" name="Tags">
          <b-form-group
            slot-scope="{ valid, errors }"
            :label-for="$t('addTags')"
          >
            <b-form-tags
              id="tags-with-dropdown"
              v-model="tags"
              :label="$t('tagYourQuestionUpTo5Tags')"
              no-outer-focus
              :state="errors[0] ? false : valid ? true : null"
              class="mb-2"
            >
              <template #default="{ tags, addTag, removeTag }">
                <ul
                  v-if="tags.length > 0"
                  class="list-inline d-inline-block mb-2"
                >
                  <li v-for="tag in tags" :key="tag" class="list-inline-item">
                    <b-form-tag
                      :title="tag"
                      variant="primary"
                      @remove="removeTag(tag)"
                      >{{ tag }}</b-form-tag
                    >
                  </li>
                </ul>

                <b-dropdown
                  size="sm"
                  variant="outline-primary"
                  block
                  menu-class="w-100"
                >
                  <template #button-content>
                    <b-icon icon="tag-fill" class="tag"></b-icon>
                    <span class="textTag">{{ $t('addTags') }}</span>
                  </template>
                  <b-dropdown-form @submit.stop.prevent="() => {}">
                    <b-form-group
                      label="Search tags"
                      label-for="tag-search-input"
                      label-cols-md="auto"
                      class="mb-0"
                      label-size="sm"
                      :description="searchDesc"
                    >
                      <b-form-input
                        id="tag-search-input"
                        v-model="search"
                        type="search"
                        size="sm"
                        autocomplete="off"
                      ></b-form-input>
                    </b-form-group>
                  </b-dropdown-form>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item-button
                    v-for="(option, index) in availableOptions"
                    :key="index"
                    @click="onOptionClick({ option, addTag })"
                  >
                    {{ option.label }}
                  </b-dropdown-item-button>

                  <b-button
                    v-if="search.length > 0"
                    variant="primary"
                    class="p-question__btnAdd"
                    @click="userAddTag"
                    >{{ $t('add') }}</b-button
                  >
                </b-dropdown>
              </template>
            </b-form-tags>
            <b-form-invalid-feedback id="inputLiveFeedback">
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
          <TinyEditor v-model="questionContent" />
          <b-form-invalid-feedback :state="valid">{{
            errors[0]
          }}</b-form-invalid-feedback>
        </ValidationProvider>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { mapActions, mapGetters } from 'vuex'
import CauHoiApi from '@/api/cauHoi'
export default defineComponent({
  name: 'Header',
  components: {},
  props: {
    questionTitle: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      optionsText: {
        convert_urls: false,
        entity_encoding: 'raw',
      },
      questionContent: '',
      isRightAnswer: false,
      isRandom: false,
      isUpdate: -1,
      doShow: false,
      okOnly: true,
      options: [],
      search: '',
      tags: [],
      title: '',
    })
    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({
      getQuestion: 'questions/getQuestion',
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
    search() {
      if (this.search.length >= 2) {
        CauHoiApi.getTagByKey(this.search, (response) => {
          this.options = response
        })
      }
    },
    title() {
      this.addTitle(this.title)
      console.log(this.getQuestion)
    },
    tags() {
      this.addTags(this.tags)
    },
    questionContent() {
      this.addQuestionContent(this.questionContent)
    },
  },
  mounted() {
    this.questionContent = this.getQuestion.question.questionContent
    this.title = this.getQuestion.question.title
    this.tags = this.getQuestion.question.tags
  },
  methods: {
    ...mapActions({
      addTags: 'questions/addTags',
      addTitle: 'questions/addTitle',
      addQuestionContent: 'questions/addQuestionContent',
    }),

    showTitle() {
      return this.getQuestion.question.title
    },
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
    },
    onOptionClick({ option, addTag }) {
      if (this.tags.length >= 5) {
        this.$toast.error(this.$18n.t('Tối đa 5 tags')).goAway(1500)
        return
      }
      addTag(option.label)
      this.search = ''
    },
    userAddTag() {
      try {
        if (this.tags.length >= 5) {
          this.$toast.error('Tối đa 5 tags').goAway(1500)
          return
        }
        this.tags.push(this.search)
      } catch (ex) {
        this.$logger.debug(ex)
      }
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
