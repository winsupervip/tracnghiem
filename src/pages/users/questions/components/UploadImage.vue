<template>
  <div class="rightCardForAddQuestion">
    <div>
      <div class="wrapper">
        <p class="border_title1"><strong> Ảnh đại diện</strong></p>
        <b-icon icon="trash" aria-hidden="true" @click="removeImage"></b-icon>
      </div>
      <div class="wrapper-img">
        <b-icon
          class="wrapper-icon"
          icon="card-image"
          aria-hidden="true"
        ></b-icon>
        <img :src="image" class="card" />
      </div>
      <p>Vui lòng sử dụng hình ảnh chất lượng cao để thu hút người dùng</p>
      <div class="wrapper">
        <label class="btn btn-outline-primary" @click="handleFileAvata"
          ><b-icon icon="cloud-upload" aria-hidden="true"></b-icon> Tải
          lên</label
        >
        <input
          ref="fileAvata"
          class="input-avata"
          type="file"
          @change="onFileChange"
        />
        <b-button
          v-b-modal.modal-prevent-closing
          class="btn btn-outline-primary btn_transparent"
          ><b-icon icon="link45deg" aria-hidden="true"></b-icon>Link
          ảnh</b-button
        >
        <b-modal id="modal-prevent-closing" ref="modal" title="Link ảnh">
          <form ref="form">
            <b-form-group
              label-for="name-input"
              invalid-feedback="Name is required"
              :state="nameState"
            >
              <b-form-input
                id="name-input"
                v-model="image"
                :state="nameState"
                required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    getImage: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      image: '',
    }
  },
  methods: {
    upImage(value) {
      // call api
      this.getImage('url')
    },
    handleFileAvata(e) {
      this.$refs.fileAvata.click()
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
      this.upImage(files[0])
    },
    createImage(file) {
      const reader = new FileReader()
      const vm = this
      console.log(reader)
      reader.onload = (e) => {
        console.log(e)
        vm.image = e.target.result
      }
      const a = reader.readAsDataURL(file)
      console.log(a)
    },
    removeImage(e) {
      this.image = ''
    },
  },
}
</script>

<style scope>
.container {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.input-avata {
  display: none;
}
</style>
