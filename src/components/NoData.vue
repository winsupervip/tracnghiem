<template>
  <div class="no-data">
    <div class="text-center">
      <img v-if="!!img" :src="img" alt="empty" />
      <h3 class="h3 text-primary fw-bold">{{ title }}</h3>
      <p class="text-gray-dark">{{ description }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NoData',
  props: {
    img: {
      type: String,
      required: false,
      default: '../images/empty.svg',
    },
    title: {
      type: String,
      required: false,
      default: 'Không tìm thấy',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
<style scoped lang="scss">
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 30px;

  img {
    max-height: 180px;
    margin-bottom: 2rem;
  }
}
</style>
