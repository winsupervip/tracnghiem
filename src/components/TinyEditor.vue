<template>
  <div :id="id">
    <textarea
      :id="inputId"
      v-model="content"
      :style="{
        height: height + 'px',
        width: width <= 0 ? 'auto' : width + 'px',
      }"
    ></textarea>
  </div>
</template>

<script>
// upload handler
import uploadHandler from '@/extensions/uploadHandler'
export default {
  name: 'TinyEditor',
  props: {
    id: {
      default: 'tracnghiem-editor-' + new Date().getTime(),
      type: String,
    },
    // eslint-disable-next-line vue/require-prop-types
    value: { default: '' },
    options: {
      default() {
        return {}
      },
      type: Object,
    },
    height: {
      default: 300,
      type: Number,
    },
    width: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      inputId: 'tiny-editor-' + new Date().getTime(),
      content: '',
      editor: null,
      checkerTimeout: null,
      isTyping: false,
      plugins:
        'advlist autolink charmap code codesample directionality emoticons ' +
        'fullscreen help hr image imagetools insertdatetime link lists ' +
        'media nonbreaking pagebreak paste preview print save searchreplace ' +
        'table template textpattern toc visualblocks visualchars wordcount tiny_mce_wiris',
      toolbar:
        'fontselect fontsizeselect formatselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | link image table removeformat code | tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry',
    }
  },
  watch: {
    value(newValue) {
      if (!this.isTyping) {
        if (this.editor !== null) this.editor.setContent(newValue)
        else this.content = newValue
      }
    },
  },
  mounted() {
    this.content = this.value
    document.addEventListener('focusin', this.onFocusin)
    this.init()
  },
  beforeDestroy() {
    if (this.editor) this.editor.destroy()
    document.removeEventListener('focusin', this.onFocusin)
  },
  methods: {
    init() {
      const options = {
        selector: '#' + this.inputId,
        skin: false,
        toolbar: this.toolbar,
        plugins: this.plugins,
        init_instance_callback: this.initEditor,
        // Necessary
        // htmlAllowedTags: ['.*'],
        // htmlAllowedAttrs: ['.*'],

        // We recommend to set 'draggable_modal' to true to avoid overlapping issues
        // with the different UI modal dialog windows implementations between core and third-party plugins on TinyMCE.
        // @see: https://github.com/wiris/html-integrations/issues/134#issuecomment-905448642
        // draggable_modal: true,
        images_upload_handler: uploadHandler,
        // imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        // convert_urls: false,
        // entity_encoding: 'raw',
        // image_caption: true,
        // image_advtab: true,
      }
      // copy all options keys
      for (const key in this.options) {
        if (key === 'selector' || key === 'init_instance_callback') {
          continue
        }
        options[key] = this.options[key]
      }

      // eslint-disable-next-line no-undef
      tinymce.init(options)
    },
    initEditor(editor) {
      this.editor = editor
      editor.on('KeyUp', () => {
        this.submitContent()
      })
      editor.on('Change', (e) => {
        if (this.editor.getContent() !== this.value) {
          this.submitContent()
        }
        this.$emit('editorChange', e)
      })
      editor.on('init', () => {
        editor.setContent(this.content)
        this.$emit('input', this.content)
      })
      this.$emit('editorInit', editor)
    },
    submitContent() {
      this.isTyping = true
      if (this.checkerTimeout !== null) clearTimeout(this.checkerTimeout)
      this.checkerTimeout = setTimeout(() => {
        this.isTyping = false
      }, 700)
      this.$emit('input', this.editor.getContent())

      this.$emit('text', this.editor.getContent({ format: 'text' }))
    },
    onFocusin() {
      // if (
      //   event.target.closest(
      //     '.wrs_modal_dialogContainer, .wrs_formulaDisplayWrapper, .wrs_focusElementContainer, .wrs_focusElement'
      //   ) !== null
      // ) {
      //   event.stopImmediatePropagation()
      // }
      event.stopImmediatePropagation()
    },
  },
}
</script>
