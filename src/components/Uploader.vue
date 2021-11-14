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
            <div class="note">(Chỉ tải tệp tin Hình ảnh)</div>
          </div>
          <div v-if="isSaving" class="dz-message" data-dz-message>
            <h4 class="message">Đang tải tệp tin lên máy chủ</h4>
          </div>
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
    </form>
    <div v-else class="wrapper-img">
      <img :src="image" class="img-fluid" style="width: 100%" />
    </div>
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
    <!-- <div v-if="isSuccess" class="text-center">
      <h2>Tải tệp tin thành công</h2>
      <div v-if="accept"></div>
      <p>
        <a href="javascript:void(0)" @click="reup()">Tải tệp tin khác</a>
      </p>
    </div> -->
    <!--FAILED-->
    <div v-if="isFailed" class="text-center">
      <h2>Tải tệp tin thất bại</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Thử lại</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
    <div class="p-question__box__body">
      <div class="p-question__box__body__item">
        <p>
          <b>Vui lòng sử dụng hình ảnh chất lượng cao để thu hút người dùng</b>
        </p>
        <div class="wrapper d-flex justify-content-between">
          <b-button
            v-b-modal.modal-prevent-closing
            class="btn btn-sm btn-outline-primary btn_transparent"
            ><b-icon icon="link45deg" aria-hidden="true" class="icon"></b-icon
            >Link ảnh</b-button
          >
          <button
            class="btn btn-sm btn-outline-primary"
            type="button"
            @click="reup()"
          >
            <b-icon
              icon="cloud-upload"
              aria-hidden="true"
              class="icon"
            ></b-icon>
            Tải lại
          </button>
          <b-modal id="modal-prevent-closing" ref="modal" title="Link ảnh">
            <form ref="form">
              <b-form-group
                label-for="name-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="name-input"
                  v-model="image"
                  required
                ></b-form-input>
              </b-form-group>
            </form>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import { mapActions } from 'vuex'
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
      required: true,
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
  },
  watch: {
    image() {
      this.addSeoAvatar(this.image)
    },
  },
  created() {
    this.image = this.value
  },
  mounted() {
    // this.reset()
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
