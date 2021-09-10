<template>
  <header class="header">
    <b-container>
      <div class="header-container">
        <Logo class="logo-header" />
        <div class="main-menu">
          <ul>
            <li v-for="item in mainMenu" :key="item.name">
              <nuxt-link :to="item.target">{{ item.name }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="menu-action">
          <b-button variant="outline-primary" size="lg">Đăng ký</b-button>
          <b-button variant="primary" size="lg">Đăng nhập</b-button>
        </div>
      </div>
    </b-container>
  </header>
</template>

<script>
import Logo from './Logo.vue'
// eslint-disable-next-line import/no-unresolved
import document from '@/utils/constants/document'
export default {
  name: 'Header',
  components: {
    Logo,
  },
  data() {
    return {
      mainMenu: document.MENU,
    }
  },
  methods: {},
}
</script>
