<template>
  <div class="rightCardForAddQuestion">
    <div v-if="!image">
      <p class="border_title"><strong>Chọn ảnh</strong></p>
      <input type="file" @change="onFileChange" />
    </div>
    <div v-else>
      <img :src="image" class="card" />
      <button @click="removeImage">Remove image</button>
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

<style module>
.container {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
