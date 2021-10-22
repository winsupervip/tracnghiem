<template>
  <div>
    <div>
      <p>Ngân Hàng câu hỏi > {{ questionType }}</p>
      <!-- <ValidationProvider v-slot="{ errors }" rules="required">
        <input
          v-model="title"
          type="text"
          name="Tiêu Dề"
          class="form-control"
          placeholder="Tiêu Đề (*)"
        />
        <b-alert v-if="errors[0]" id="error" show variant="warning">{{
          errors[0]
        }}</b-alert>
      </ValidationProvider> -->
      <b-form-input
        v-model="title"
        class="form-control"
        placeholder="Tiêu Đề (*)"
      ></b-form-input>
      <b-alert v-if="errors[0]" id="error" show variant="warning">{{
        errors[0]
      }}</b-alert>

      <div class="marginTag">
        <b-form-group label-for="tags-with-dropdown">
          <b-form-tags
            id="tags-with-dropdown"
            v-model="value"
            label="Gắn thẻ câu hỏi của bạn, tối đa 5 thẻ(*)"
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
                  <b-icon icon="tag-fill"></b-icon> Chọn tag
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
                  >Add</b-button
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
        <editor v-model="questionContent" required />
        <b-alert v-if="errors[1]" id="error" show variant="warning">{{
          errors[1]
        }}</b-alert>
      </div>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
} from '@nuxtjs/composition-api'
import CauHoiApi from '../../../../api/cauHoi'
export default defineComponent({
  name: 'Header',
  props: {
    questionType: {
      type: String,
      required: true,
    },
    getQuestion: {
      type: Function,
      required: true,
    },
    addOrUpdateAnswer: {
      type: Function,
      required: true,
    },
    getTags: {
      type: Function,
      required: true,
    },
    getTitle: {
      type: Function,
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
      answerContent: '',
      isRightAnswer: false,
      isRandom: false,
      isUpdate: -1,
      doShow: false,
      okOnly: true,
      options: [],
      listQuestions: [],
      search: '',
      value: [],
      title: '',
    })
    watch(
      () => data.content,
      () => data.options,

      () => data.questionContent,

      () => {
        props.getQuestion(data.questionContent)
      }
    )
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
        return 'There are no tags matching your search criteria'
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
      this.getTitle(this.title)
    },
    value() {
      this.getTags(this.value)
    },
  },
  methods: {
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
    },
    handleAnswer() {
      if (this.answerContent === '') {
        alert('Câu trả lời không được bỏ trống')
        return 0
      }
      const data = {
        isRightAnswer: this.isRightAnswer ? 1 : 0,
        isRandom: this.isRandom,
        answerContent: this.answerContent,
      }
      this.isRightAnswer = false
      this.isRandom = false
      this.answerContent = ''
      this.listQuestions.push(data)
      this.addOrUpdateAnswer(data)
    },
    onOptionClick({ option, addTag }) {
      if (this.value.length >= 5) {
        alert('Tối đa 5 tags')
        return
      }
      addTag(option.label)
      this.search = ''
    },
    userAddTag() {
      if (this.value.length >= 5) {
        alert('Tối đa 5 tags')
        return
      }
      this.value.push(this.search)
    },
  },
})
</script>
<style module>
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
