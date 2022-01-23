<template>
  <div>
    <form
      v-if="(isInitial || isSaving) && image.length === 0"
      class="wrapper-img"
      enctype="multipart/form-data"
      novalidate
    >
      <div class="form-group">
        <div class="dropzone">
          <div v-if="isInitial" class="dz-message" data-dz-message>
            <div class="icon">
              <i class="flaticon-file"></i>
            </div>
            <h4 class="message">Kéo thả tệp tin vào khung upload</h4>
            <div class="note">(Chỉ tải tệp tin Excel)</div>
          </div>
          <div v-if="isSaving" class="dz-message" data-dz-message>
            <h4 class="message">Đang tải tệp tin lên máy chủ</h4>
          </div>
          <div class="fallback">
            <input
              id="fileupload"
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
    </form>
    <!--PROCESS-->
    <div v-if="isProcess" class="text-center">
      <button class="btn btn-outline-primary" type="button" disabled>
        <span
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span>Hệ thống đang phân tích tệp tin</span>
      </button>
    </div>
    <!--SUCCESS-->
    <div v-if="isSuccess" class="text-center">
      <h2>Tải tệp tin thành công</h2>
      <div v-if="accept"></div>
      <p>
        <a href="javascript:void(0)" @click="reup()">Tải tệp tin khác</a>
      </p>
    </div>
    <!--FAILED-->
    <div v-if="isFailed" class="text-center">
      <h2>Tải tệp tin thất bại</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Thử lại</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
  </div>
</template>
<script>
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
    uploadStatus: {
      type: Number,
      required: false,
      default: STATUS_INITIAL,
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
  },
  watch: {
    uploadStatus(val) {
      this.currentStatus = val
    },
  },
  created() {
    this.currentStatus = STATUS_INITIAL
  },
  methods: {
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
        const { data } = await fileApi.upload(formData, this.isPrivate)
        if (data.state) {
          this.currentStatus = STATUS_SUCCESS
          this.$emit('input', data.object.url)
        } else {
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
      const allow = ['xls', 'xlsx']
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
</style>
