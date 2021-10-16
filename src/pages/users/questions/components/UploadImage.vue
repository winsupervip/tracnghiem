<template>
  <div>
    <div v-if="!image">
      <h2>Chọn ảnh</h2>
      <input type="file" @change="onFileChange" />
    </div>
    <div v-else>
      <img :src="image" />
      <button @click="removeImage">Remove image</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: '',
      a: '',
    }
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
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

<style module></style>
