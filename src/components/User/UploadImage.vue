<template>
  <div>
    <div class="form-group">
      <div class="dropzone">
        <div class="fallback">
          <input
            ref="fileupload"
            name="formFile"
            type="file"
            :disabled="isSaving"
            :accept="accept"
            class="input-file"
            @change="
              filesChange($event, $event.target.name, $event.target.files)
              fileCount = $event.target.files.length
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import { mapActions, mapGetters } from 'vuex'
import fileApi from '@/api/fileApi'
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3
const STATUS_IMPORT = 4
export default {
  // middleware: "isAdmin",
  components: {},
  props: {
    value: {
      type: String,
      default: '',
    },
    accept: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: false,
    },
  },
  data: () => ({
    uploadError: null,
    currentStatus: null,
    uploadFieldName: 'photos',
    image: '',
  }),
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED
    },
    isProcess() {
      return this.currentStatus === STATUS_IMPORT
    },
    ...mapGetters({
      getQuestion: 'questions/getQuestion',
    }),
  },

  watch: {
    image() {
      console.log('watch', this.image)
      this.addSeoAvatar(this.image)
    },
  },
  created() {
    this.image = this.value
  },

  mounted() {
    this.image = this.getQuestion?.question?.seoAvatar
  },

  methods: {
    ...mapActions({ addSeoAvatar: 'questions/addSeoAvatar' }),
    reup() {
      this.$emit('reupload')
      this.reset()
    },
    // upload file
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadError = null
      if (this.$refs.fileupload) {
        this.$refs.fileupload.value = null
      }
      this.image = ''
    },
    async save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING
      try {
        const { data } = await fileApi.upload(formData)
        if (data.state) {
          this.currentStatus = STATUS_SUCCESS
          this.$emit('input', data.object.url)
          this.image = data.object.url
        } else {
          // console.log("upload fail");
          this.uploadError = data.data.message
          this.currentStatus = STATUS_FAILED
        }
      } catch (err) {
        this.currentStatus = STATUS_FAILED
      }
    },
    async filesChange(event, fieldName, fileList) {
      event.preventDefault()
      event.stopPropagation()

      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return

      // check ext
      for (let i = 0; i < fileList.length; i++) {
        if (this.checkFileExt(fileList[i].name) === false) {
          // common.noticeError(
          //   'Chỉ được upload các file có định dạng .doc|.docx|.xls|.xlsx|.png|.jpg|.jpeg|.gif|.pdf'
          // )
          this.currentStatus = STATUS_FAILED
          return false
        }
      }

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name)
        return 0
      })
      // save it
      await this.save(formData)
    },
    checkFileExt(fileName) {
      const allow = ['png', 'jpg', 'jpeg']
      const ext = fileName.split('.').pop().toLowerCase()
      // console.log(allow);
      return this.isInArray(ext, allow)
    },
    isInArray(value, array) {
      return array.includes(value)
    },
  },
}
</script>
<style lang="scss" scoped>
.input-file {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
}
.dropzone {
  position: relative;
}
.wrapper-img {
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.p-question__box__body {
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
