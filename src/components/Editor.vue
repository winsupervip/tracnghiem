<template>
  <vue2-tinymce-editor
    v-model="content"
    :options="options"
    @editorChange="onInput"
  ></vue2-tinymce-editor>
</template>
<script>
// import {
//   defineComponent,
//   reactive,
//   toRefs,
//   watch,
// } from '@nuxtjs/composition-api'
// eslint-disable-next-line import/no-unresolved
import uploadHandler from '@/extensions/uploadHandler'
export default {
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      options: {
        images_upload_handler: uploadHandler,
        convert_urls: false,
        entity_encoding: 'raw',
      },
      content: '',
    }
  },
  watch: {
    value(val) {
      this.content = this.value
    },
  },
  created() {
    this.content = this.value
  },
  methods: {
    onInput(event) {
      this.$emit('input', this.content)
    },
  },
}
// export default defineComponent({
//   props: {
//     value: {
//       type: String,
//       required: true,
//     },
//   },
//   setup(props) {
//     const data = reactive({
//       options: {
//         images_upload_handler: uploadHandler,
//         convert_urls: false,
//         entity_encoding: 'raw',
//       },
//       content: props.value,
//     })
//     watch(
//       () => props.value,
//       () => {
//         data.content = props.value
//       }
//     )
//     const onInput = (event) => {
//       this.$emit('input', data.content)
//     }
//     return {
//       ...toRefs(data),
//       onInput,
//     }
//   },
// })
</script>
