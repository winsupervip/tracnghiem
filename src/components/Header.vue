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
                <a :href="item.target" :title="item.name">
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
          <div v-if="!isLogin" class="menu-action">
            <b-button variant="primary" @click="$auth.loginWith('keycloak')">
              <b-icon-person-circle></b-icon-person-circle>
              <span class="ms-1">Tài khoản</span>
            </b-button>
          </div>
          <div v-else class="menu-logined">
            <b-dropdown variant="" class="user-create" no-caret>
              <template #button-content>
                <i class="fa fa-pencil text-primary" />
              </template>
              <b-dropdown-item href="/users/exams/add">
                <i class="icon-clock text-primary" />
                Tạo đề thi
              </b-dropdown-item>
              <b-dropdown-item href="/users/questions/">
                <i class="icon-exam text-primary" />
                Tạo câu hỏi
              </b-dropdown-item>
            </b-dropdown>
            <b-dropdown variant="primary" class="user-info-dropdown" no-caret>
              <template #button-content>
                <div class="user-avatar">
                  <img
                    src="https://storage.tracnghiem.vn/public/images/default-avatar.jpg"
                    :alt="userInfo.name"
                  />
                </div>
              </template>
              <div class="user-info">
                <img
                  class="avatar"
                  src="https://storage.tracnghiem.vn/public/images/default-avatar.jpg"
                  :alt="userInfo.name"
                />
                <div class="d-flex flex-column">
                  <strong>{{ userInfo.name }}</strong>
                  <span>{{ userInfo.email }}</span>
                </div>
              </div>
              <b-dropdown-item href="/users/history">
                <i class="icon-clock text-primary" />
                Lịch sử làm bài
              </b-dropdown-item>
              <b-dropdown-item href="/users/exams">
                <i class="icon-exam text-primary" />
                Đề thi của bạn
              </b-dropdown-item>
              <b-dropdown-item href="/users/questions">
                <i class="icon-question text-primary" />
                Ngân hàng câu hỏi
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="logout()">
                <i class="fa fa-sign-out text-primary" /> Đăng xuất
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <div class="action-mobile d-flex align-items-center">
          <div v-if="isLogin" class="d-lg-none menu-logined me-2">
            <b-dropdown variant="" class="user-create" no-caret>
              <template #button-content>
                <i class="fa fa-pencil text-primary" />
              </template>
              <b-dropdown-item href="/users/exams/add">
                <i class="icon-clock text-primary" />
                Tạo đề thi
              </b-dropdown-item>
              <b-dropdown-item href="/users/questions">
                <i class="icon-exam text-primary" />
                Tạo câu hỏi
              </b-dropdown-item>
            </b-dropdown>
            <b-dropdown variant="primary" class="user-info-dropdown" no-caret>
              <template #button-content>
                <div class="user-avatar">
                  <img
                    src="https://storage.tracnghiem.vn/public/images/default-avatar.jpg"
                    :alt="userInfo.name"
                  />
                </div>
              </template>
              <div class="user-info">
                <img
                  class="avatar"
                  src="https://storage.tracnghiem.vn/public/images/default-avatar.jpg"
                  :alt="userInfo.name"
                />
                <div class="d-flex flex-column">
                  <strong>{{ userInfo.name }}</strong>
                  <span>{{ userInfo.email }}</span>
                </div>
              </div>
              <b-dropdown-item href="/users/history">
                <i class="icon-clock text-primary" />
                Lịch sử làm bài
              </b-dropdown-item>
              <b-dropdown-item href="/users/exams">
                <i class="icon-exam text-primary" />
                Đề thi của bạn
              </b-dropdown-item>
              <b-dropdown-item href="/users/questions">
                <i class="icon-question text-primary" />
                Ngân hàng câu hỏi
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="logout()">
                <i class="fa fa-sign-out text-primary" /> Đăng xuất
              </b-dropdown-item>
            </b-dropdown>
          </div>
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
      isLogin: this.$auth.loggedIn,
      userInfo: this.$auth.user,
    }
  },
  methods: {
    collapseMenuMb() {
      this.visibleMenuMb = false
    },
    getAuth() {
      if (this.$auth.loggedIn) {
        this.userInfo = this.$auth.user
        console.log('this.isLogin', this.$auth.user)
      }
    },
    logout() {
      this.$auth.logout()
    },
  },
}
</script>
