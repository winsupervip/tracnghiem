<template>
  <header class="header">
    <b-container>
      <div class="header-container">
        <Logo class="logo-header" />
        <div :class="visibleMenuMb ? 'header-right open' : 'header-right'">
          <div class="header-menu-mb">
            <span class="font-merri">MENU</span>
            <b-button
              :class="
                visibleMenuMb ? 'navbar-toggler' : 'navbar-toggler collapsed'
              "
              @click="visibleMenuMb = !visibleMenuMb"
            >
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </b-button>
          </div>
          <div class="main-menu">
            <ul>
              <li v-for="item in mainMenu" :key="item.name">
                <nuxt-link :to="item.target" @click.native="collapseMenuMb">
                  {{ item.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="menu-action">
            <b-button
              variant="outline-primary"
              size="lg"
              @click.native="collapseMenuMb"
              >Đăng ký</b-button
            >
            <b-button
              variant="primary"
              size="lg"
              @click.native="collapseMenuMb"
            >
              Đăng nhập
            </b-button>
          </div>
        </div>
        <b-button
          :class="visibleMenuMb ? 'navbar-toggler' : 'navbar-toggler collapsed'"
          @click="visibleMenuMb = !visibleMenuMb"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </b-button>
        <div
          :class="
            visibleMenuMb ? 'menu-open-backdrop active' : 'menu-open-backdrop'
          "
          @click="visibleMenuMb = !visibleMenuMb"
        ></div>
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
      visibleMenuMb: false,
    }
  },
  methods: {
    collapseMenuMb() {
      this.visibleMenuMb = false
    },
  },
}
</script>
