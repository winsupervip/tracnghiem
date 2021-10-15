<template>
  <div>
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
