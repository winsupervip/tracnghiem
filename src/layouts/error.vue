<template>
  <div class="content-error">
    <div v-if="error.statusCode === 404">
      <img src="/images/404.jpg" alt="Trang không tồn tại" />
      <h1 class="error-title">Trang không tồn tại</h1>
    </div>
    <div v-else>
      <img src="/images/error.jpg" alt="Đã có lỗi xảy ra" />
      <h1 class="error-title">Đã có lỗi xảy ra</h1>
    </div>
    <nuxt-link to="/" class="btn btn-lg btn-primary">
      Quay lại trang chủ
    </nuxt-link>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
// eslint-disable-next-line import/no-unresolved
import document from '@/utils/constants/document'
export default defineComponent({
  name: 'Error',
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: document.SEO.title,
      description: document.SEO.description,
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: 'vi',
      },
      link: [{ rel: 'canonical', href: '' }],
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
      ],
    }
  },
})
</script>
<style lang="scss">
.content-error {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 50px 0;
  .error-title {
    color: #1c3988;
    text-transform: uppercase;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  img {
    max-height: 400px;
    margin-bottom: 1rem;
    user-select: none;
    pointer-events: none;
  }
}
</style>
