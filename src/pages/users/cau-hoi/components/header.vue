<template>
  <div>
    <p>Ngân Hàng câu hỏi > {{ questionType }}</p>
    <p>Tiêu Đề (*)</p>
    <p>Gắn Thẻ câu hỏi của bạn. Tối Đa 5 thẻ(*)</p>
    <div>
      <vue2-tinymce-editor
        v-model="content"
        :options="options"
      ></vue2-tinymce-editor>
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
