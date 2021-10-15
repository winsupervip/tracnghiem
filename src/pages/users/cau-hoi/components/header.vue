<template>
  <div>
    <div>
      <p>Ngân Hàng câu hỏi > {{ questionType }}</p>
      <p>Tiêu Đề (*)</p>
      <p>Gắn Thẻ câu hỏi của bạn. Tối Đa 5 thẻ(*)</p>
      <div>
        <editor v-model="content" />
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
        ok-only="true"
        ok-title="Đóng"
        @shown="shown"
        @hide="hide"
      >
        <div>
          <vue2-tinymce-editor
            v-if="doShow"
            v-model="answerContent"
            :options="options"
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
            <b-button variant="outline-primary">{{
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
export default defineComponent({
  props: {
    questionType: {
      type: String,
      required: true,
    },
    getQuestion: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      options: {
        menubar: false,
      },
      content: '',
    })
    watch(
      () => data.content,
      () => {
        props.getQuestion(data.content)
      }
    )
    return {
      ...toRefs(data),
    }
  },
})
</script>
