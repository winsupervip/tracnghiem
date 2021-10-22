<template>
  <div>
    <div>
      <p>Ngân Hàng câu hỏi > {{ questionType }}</p>
      <b-form-input
        v-model="title"
        class="form-control"
        placeholder="Tiêu Đề (*)"
        required
      ></b-form-input>
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
      </div>
      <div>
        <editor v-model="questionContent" required />
      </div>
    </div>
    <div>
      <div :class="$style.addQuestionTitle">
        <p>Câu Trả lời(*)</p>
        <b-button v-b-modal.modal-1>Thêm câu trả lời</b-button>
      </div>

      <b-modal
        id="modal-1"
        size="xl"
        title="Add Answer"
        :ok-only="okOnly"
        ok-title="Đóng"
        @shown="shown"
        @hide="hide"
      >
        <div>
          <vue2-tinymce-editor
            v-if="doShow"
            v-model="answerContent"
            :options="optionsText"
          ></vue2-tinymce-editor>
          <div>
            <div :class="$style.checkBoxView">
              <div :class="$style.checkBox">
                <input
                  v-model="isRandom"
                  type="checkbox"
                  :class="$style.checkBoxInput"
                />
                <p :class="$style.checkBoxTitle">Cho phép xáo trộn</p>
              </div>
              <div :class="$style.checkBox">
                <input
                  v-model="isRightAnswer"
                  type="checkbox"
                  :class="$style.checkBoxInput"
                />
                <p :class="$style.checkBoxTitle">Câu trả lời đúng</p>
              </div>
            </div>
            <b-button variant="outline-primary" @click="handleAnswer">{{
              isUpdate != -1 ? 'Cập nhập câu trả lời' : 'Thêm câu trả lời'
            }}</b-button>
          </div>
        </div>
      </b-modal>
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
      // const criteria = this.criteria
      // // Filter out already selected options
      // const options = this.options.filter(
      //   (opt) => !this.value.includes(opt.label)
      // )
      // if (criteria) {
      //   // Show only options that match criteria
      //   return options.filter((opt) => opt.label.includes(criteria))
      // }
      // Show all options available
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
