<template>
  <nuxt-link class="logo-link" to="/" @click.native="closeMenu">
    <img
      class="logo-header"
      src="https://storage.tracnghiem.vn/public/images/logo.svg"
      alt="Trắc nghiệm Online"
      @click="scrollToTop()"
    />
  </nuxt-link>
</template>

<script>
export default {
  name: 'Logo',
  methods: {
    scrollToTop() {
      if (this.$route.name === 'index') {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      }
    },
    closeMenu() {
      this.$emit('collapseMenu')
    },
  },
}
</script>

<style>
.logo-header {
  animation: 1s appear;
  margin: 0 20px 0 0;
  max-width: 100%;
  height: 40px;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
