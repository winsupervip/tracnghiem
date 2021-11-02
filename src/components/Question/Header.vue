<template>
  <div>
    <div>
      <p class="p-headerQuestion">
        {{ $t('Ngân Hàng câu hỏi') }} > {{ questionTitle }}
      </p>

      <b-form-input
        v-model="title"
        class="form-control"
        :placeholder="$t('title')"
      ></b-form-input>
      <b-alert v-if="errors[0]" id="error" show variant="warning">{{
        errors[0]
      }}</b-alert>
      <div class="marginTag">
        <b-form-group label-for="tags-with-dropdown">
          <b-form-tags
            id="tags-with-dropdown"
            v-model="value"
            :label="$t('tagYourQuestion,UpTo5Tags(*)')"
            no-outer-focus
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
                    variant="info"
                    @remove="removeTag(tag)"
                    >{{ tag }}</b-form-tag
                  >
                </li>
              </ul>

              <b-dropdown
                size="sm"
                variant="outline-secondary"
                block
                menu-class="w-100"
              >
                <template #button-content>
                  <b-icon icon="tag-fill"></b-icon> {{ $t('selectTag') }}
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
                  variant="success"
                  @click="userAddTag"
                  >{{ $t('add') }}</b-button
                >
              </b-dropdown>
            </template>
          </b-form-tags>
        </b-form-group>
        <b-alert v-if="errors[2]" id="error" show variant="warning">{{
          errors[2]
        }}</b-alert>
      </div>
      <div>
        <TinyEditor v-model="questionContent" />
        <b-alert v-if="errors[1]" id="error" show variant="warning">{{
          errors[1]
        }}</b-alert>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { mapActions } from 'vuex'
import CauHoiApi from '@/api/cauHoi'
export default defineComponent({
  name: 'Header',
  components: {},
  props: {
    questionTitle: {
      type: String,
      required: true,
    },

    errors: {
      type: Array,
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
      value: [],
      title: '',
    })
    return {
      ...toRefs(data),
    }
  },
  computed: {
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
          console.log(response)
        })
      }
    },
    title() {
      this.addTitle(this.title)
    },
    value() {
      this.addTags(this.value)
    },
    questionContent() {
      this.addQuestionContent(this.questionContent)
    },
  },
  methods: {
    ...mapActions(['addTags', 'addTitle', 'addQuestionContent']),
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
    },
    onOptionClick({ option, addTag }) {
      if (this.value.length >= 5) {
        this.$toast.error(this.$18n.t('Tối đa 5 tags')).goAway(1500)
        return
      }
      addTag(option.label)
      this.search = ''
    },
    userAddTag() {
      if (this.value.length >= 5) {
        this.$toast.error('Tối đa 5 tags').goAway(1500)
        return
      }
      this.value.push(this.search)
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
