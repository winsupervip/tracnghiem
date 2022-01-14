<template>
  <div class="layout-default">
    <Header />
    <Nuxt />
    <SectionContribute />
    <SectionAdvantage />
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
import SectionContribute from '../components/SectionContribute'
// eslint-disable-next-line import/no-unresolved
import SectionAdvantage from '../components/SectionAdvantage'
// eslint-disable-next-line import/no-unresolved
import document from '@/utils/constants/document'
export default defineComponent({
  name: 'Layout',
  components: {
    Header,
    Footer,
    SectionContribute,
    SectionAdvantage,
  },
  data() {
    return {
      title: document.SEO.title,
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: 'vi',
      },
      link: [
        { rel: 'canonical', href: 'https://tracnghiem.vn' + this.$route.path },
      ],
      title: this.title,
    }
  },
})
</script>
