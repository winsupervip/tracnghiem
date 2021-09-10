<template>
  <div class="layout-default">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
// eslint-disable-next-line import/no-unresolved
import Header from '../components/Header'
// eslint-disable-next-line import/no-unresolved
import Footer from '../components/Footer'
// eslint-disable-next-line import/no-unresolved
import document from '@/utils/constants/document'
export default defineComponent({
  name: 'Layout',
  components: {
    Header,
    Footer,
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
