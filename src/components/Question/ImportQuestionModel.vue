<template>
  <b-modal
    id="bv-modal-import-question"
    hide-footer
    title="Nhập câu hỏi từ tệp tin"
    size="lg"
  >
    <div class="mb-3 row">
      <label class="col-sm-2 col-form-label">Tệp tin mẫu</label>
      <div class="col-sm-10">
        <p class="text-muted">
          Click vào liên kết:
          <a href="https://tinyurl.com/tracnghiemvn" target="_blank"
            >CÂU HỎI MẪU</a
          >. Soạn nội dung bằng công cụ Excel và tải lên lại hệ thống để nhập
          vào hệ thống.
        </p>
      </div>
    </div>
    <div class="mb-3">
      <UploaderFile
        :accept="acceptType"
        :is-private="true"
        :value="fileUploadResponse"
        :upload-status="uploadStatus"
        @input="onUploadSuccess"
      />
    </div>
  </b-modal>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import UploaderFile from '@/components/UploaderFile.vue'
import cauHoi from '@/api/cauHoi'
export default defineComponent({
  components: {
    UploaderFile,
  },
  setup() {
    const data = reactive({
      acceptType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
      fileUploadResponse: '',
      uploadStatus: 1,
    })

    return {
      ...toRefs(data),
    }
  },
  methods: {
    async onUploadSuccess(res) {
      // import
      this.uploadStatus = 4
      await this.importProcess(res)
    },
    async importProcess(objName) {
      try {
        const { data } = await cauHoi.importFromStream(objName)
        console.log(data)
        this.uploadStatus = 2
        this.$emit('import-success')
      } catch (err) {
        const vm = this
        this.$handleError(err, () => {
          vm.uploadStatus = 3
        })
      }
    },
  },
})
</script>
