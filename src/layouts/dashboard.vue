<template>
  <div>
    <header ref="headerDashboard" class="header--dashboardTheme">
      <nuxt-link v-b-toggle.sidebar-1 to="" class="toggle--sp">
        <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
          <path
            d="M5 15h14v2H5zm0-8h14v2H5zm0 4h14v2H5z"
            fill="currentColor"
            fill-rule="evenodd"
          ></path>
        </svg>
      </nuxt-link>
    </header>
    <div ref="dashboard" class="l-dashboard">
      <b-sidebar
        id="sidebar-1"
        ref="bSidebar"
        :visible="visible"
        :no-close-on-route-change="true"
        no-header
        :backdrop-variant="variant"
        :backdrop="backdrop"
        shadow
      >
        <div ref="nav" class="l-dashboard__nav">
          <div class="l-dashboard__nav__global">
            <div class="l-dashboard__nav__global__inner">
              <div class="p-nav__icons">
                <div class="p-navItem--logo">
                  <nuxt-link to="">
                    <img src="~/assets/img/dashboard/logo.svg" alt="logo" />
                  </nuxt-link>
                </div>
                <div class="p-navItem">
                  <nuxt-link to="">
                    <img
                      src="~/assets/img/dashboard/icon_plus.svg"
                      alt="icon_plus"
                    />
                  </nuxt-link>
                </div>
                <div class="p-navItem">
                  <nuxt-link to="">
                    <img
                      src="~/assets/img/dashboard/icon_search.svg"
                      alt="icon_search"
                    />
                  </nuxt-link>
                </div>
                <div class="p-navItem">
                  <nuxt-link to="">
                    <img
                      src="~/assets/img/dashboard/icon_tag.svg"
                      alt="icon_tag"
                    />
                  </nuxt-link>
                </div>
              </div>
              <div class="p-nav__icons">
                <div class="p-navItem--dropdown">
                  <div class="p-navItem--dropdown__inner">
                    <div class="p-navItem--dropdown__inner__icon">
                      <nuxt-link to="">
                        <img
                          src="~/assets/img/dashboard/icon_question.svg"
                          alt="icon_question.svg"
                        />
                      </nuxt-link>
                    </div>
                    <div class="p-navItem--dropdown__inner__menu help">
                      <div class="p-navItem--dropdown__inner__menu__child">
                        <div class="item item__heading">Hướng dẫn</div>
                        <nuxt-link class="item item__link" to="">
                          Hướng dẫn tạo đề thi
                        </nuxt-link>
                        <nuxt-link class="item item__link" to="">
                          Hướng dẫn tạo câu hỏi
                        </nuxt-link>
                      </div>
                      <div class="p-navItem--dropdown__inner__menu__child">
                        <div class="item item__heading">Chính sách</div>
                        <nuxt-link class="item item__link" to="">
                          Chính sách bảo mật
                        </nuxt-link>
                        <nuxt-link class="item item__link" to="">
                          Điều khoản sử dụng
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-navItem--dropdown">
                  <div class="p-navItem--dropdown__inner">
                    <div class="p-navItem--dropdown__inner__icon">
                      <nuxt-link to="">
                        <!-- src="~/assets/img/dashboard/user.jpg" -->
                        <img :src="avatar" alt="user.jpg" class="img-circle" />
                      </nuxt-link>
                    </div>
                    <div
                      class="p-navItem--dropdown__inner__menu account"
                      data-bottom="10"
                    >
                      <div class="p-navItem--dropdown__inner__menu__child">
                        <div class="item item__heading">
                          Thông tin tài khoản
                        </div>
                        <nuxt-link
                          class="item item__link"
                          to="/users/personal/personal"
                        >
                          {{
                            displayName
                              ? displayName
                              : firstName + ' ' + lastName
                          }}
                        </nuxt-link>
                        <!-- <nuxt-link class="item item__link" to="">
                          All workspaces
                        </nuxt-link> -->
                      </div>
                      <!-- <div class="p-navItem--dropdown__inner__menu__child">
                        <div class="item item__heading">Settings</div> -->
                      <!-- <nuxt-link
                          to="/users/personal/personal"
                          class="item item__link"
                        >
                          Personal settings
                        </nuxt-link> -->
                      <!-- <nuxt-link class="item item__link" to="">
                          Labs
                        </nuxt-link>
                      </div> -->
                      <div class="p-navItem--dropdown__inner__menu__child">
                        <!-- <div class="item item__heading">
                          {{
                            displayName
                              ? displayName
                              : firstName + ' ' + lastName
                          }}
                        </div> -->
                        <nuxt-link
                          class="item item__link"
                          to=""
                          @click.native="logout()"
                        >
                          Đăng xuất
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="l-dashboard__nav__menu">
            <div
              v-if="isDisplayMenu || isDisplayMenuSp"
              class="p-navMenu__logo"
            >
              <img
                src="~/assets/img/dashboard/logo_tracnghiemvn.svg"
                alt="logo tracnghiemvn.svg"
              />
            </div>
            <div class="p-navMenuList">
              <div
                v-if="isDisplayMenu || isDisplayMenuSp"
                class="p-navMenu__child"
              >
                <ul v-if="isAdmin">
                  <li>
                    <nuxt-link
                      :class="getNavClass('admin-service')"
                      to="/admin/service"
                    >
                      <div>
                        <b-icon-card-checklist></b-icon-card-checklist>
                      </div>
                      <span>Gói dịch vụ</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :class="getNavClass('admin-category')"
                      to="/admin/category"
                    >
                      <div>
                        <b-icon-card-checklist></b-icon-card-checklist>
                      </div>
                      <span>Danh mục đề thi</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :class="getNavClass('admin-configs-exam')"
                      to="/admin/configs/exam"
                    >
                      <div>
                        <b-icon-card-checklist></b-icon-card-checklist>
                      </div>
                      <span>TOP đề thi</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :class="getNavClass('admin-configs-categories')"
                      to="/admin/configs/categories"
                    >
                      <div>
                        <b-icon-card-checklist></b-icon-card-checklist>
                      </div>
                      <span>TOP danh mục</span>
                    </nuxt-link>
                  </li>
                </ul>
                <ul v-if="isAgency">
                  <li>
                    <nuxt-link
                      :class="getNavClass('agency-service')"
                      to="/agency/service"
                    >
                      <div>
                        <img
                          src="~/assets/img/dashboard/icon_lslambai.svg"
                          alt="icon_lslambai.svg"
                        />
                      </div>
                      <span>Gói dịch vụ</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :class="getNavClass('admin-configs-exam')"
                      to="/admin/configs/exam"
                    >
                      <div>
                        <img
                          src="~/assets/img/dashboard/icon_dethi.svg"
                          alt="icon_dethi.svg"
                        />
                      </div>
                      <span>Quản lý người dùng</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :class="getNavClass('admin-configs-categories')"
                      to="/admin/configs/categories"
                    >
                      <div>
                        <img
                          src="~/assets/img/dashboard/icon_nhch.svg"
                          alt="icon_nhch.svg"
                        />
                      </div>
                      <span>Lịch sử kích hoạt</span>
                    </nuxt-link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <nuxt-link
                      :class="getNavClass('users-service')"
                      to="/users/service"
                    >
                      <div>
                        <img
                          src="~/assets/img/dashboard/icon_lslambai.svg"
                          alt="icon_lslambai.svg"
                        />
                      </div>
                      <span>Gói dịch vụ</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :class="getNavClass('users-history')"
                      to="/users/history"
                    >
                      <div>
                        <img
                          src="~/assets/img/dashboard/icon_lslambai.svg"
                          alt="icon_lslambai.svg"
                        />
                      </div>
                      <span>Lịch sử làm bài</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :class="getNavClass('users-exams')"
                      to="/users/exams/"
                    >
                      <div>
                        <img
                          src="~/assets/img/dashboard/icon_dethi.svg"
                          alt="icon_dethi.svg"
                        />
                      </div>
                      <span>Đề thi của bạn</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :class="getNavClass('users-questions')"
                      to="/users/questions/"
                    >
                      <div>
                        <img
                          src="~/assets/img/dashboard/icon_nhch.svg"
                          alt="icon_nhch.svg"
                        />
                      </div>
                      <span>Ngân hàng câu hỏi</span>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
              <div
                v-if="isDisplayMenu || isDisplayMenuSp"
                class="p-navMenu__child"
              >
                <h2 class="one-line">Công cụ chung</h2>
                <ul>
                  <li>
                    <nuxt-link
                      :class="getNavClass('users-personal-affiliate')"
                      to="/users/personal/affiliate"
                    >
                      <div>
                        <img
                          src="~/assets/img/dashboard/bx_bx-network-chart.svg"
                          alt="bx_bx-network-chart.svg"
                        />
                      </div>
                      <span>Affiliate</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :class="getNavClass('users-notification')"
                      to="/users/notification/"
                    >
                      <div>
                        <img
                          src="~/assets/img/dashboard/carbon_notification.svg"
                          alt="carbon_notification.svg"
                        />
                      </div>
                      <span>Thông báo</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :class="getNavClass('users-history-payment')"
                      to="/users/history/payment"
                    >
                      <div>
                        <img
                          src="~/assets/img/dashboard/icon_dollar.svg"
                          alt="icon_dollar.svg"
                        />
                      </div>
                      <span>Lịch sử thanh toán</span>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
            <a
              ref="btnToggle"
              href="javascript:void(0)"
              class="btn-toggle"
              @click="toggleSidebar"
            >
              <img
                src="~/assets/img/dashboard/sidebar_toogle.svg"
                alt="icon_search"
              />
            </a>
          </div>
        </div>
      </b-sidebar>
      <div class="l-dashboard__content">
        <TinyEditor style="display: none" />
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery/dist/jquery.slim'
import { defineComponent } from '@vue/composition-api'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import userAPI from '@/api/user'

export default defineComponent({
  name: 'Dashboard',
  data() {
    return {
      firstName: '',
      lastName: '',
      displayName: '',
      avatar: '',
      backdrop: false,
      visible: true,
      variant: 'transparent',
      isDisplayMenu: true,
      isDisplayMenuSp: false,
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: 'user/isAdmin',
      isAgency: 'user/isAgency',
    }),
  },
  watch: {
    visible(val) {
      console.log('visible ' + val)
    },
  },
  created() {
    this.personal()
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      if (window.innerWidth < 991) {
        console.log('created 991')
        this.visible = false
      } else {
        this.visible = true
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.handleWindowResize)
  },
  mounted() {
    console.log('mounted')
    this.handleWindowResize()
    document.body.classList.add('dashboard')
    this.toggleItemMenu()
  },
  destroyed() {
    document.body.classList.remove('dashboard')
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    async personal() {
      const { data: result } = await userAPI.getAccount()
      this.firstName = result?.object?.firstName
      this.lastName = result?.object?.lastName
      this.displayName = result?.object?.displayName
      this.avatar = result?.object?.avatar
    },
    toggleSidebar() {
      if (this.$refs.bSidebar.$el.children[0].offsetWidth === 304) {
        this.isDisplayMenu = false
        this.$refs.dashboard.classList.add('toggle--close')
      } else {
        this.$refs.dashboard.classList.remove('toggle--close')
        this.isDisplayMenu = true
      }
    },
    handleWindowResize() {
      console.log('handleWindowResize')
      if ($(window).innerWidth() < 991) {
        console.log('handleWindowResize 991')
        this.visible = false
        this.backdrop = true
        this.variant = 'dark'
        this.isDisplayMenuSp = true
      } else {
        console.log('handleWindowResize >= 991')
        this.visible = true
        this.backdrop = false
        this.variant = 'transparent'
        this.isDisplayMenuSp = false
      }
    },
    toggleItemMenu() {
      console.log('toggleItemMenu')
      // window.addEventListener('resize', this.handleWindowResize)
      $('.p-navItem--dropdown__inner__icon').click(function () {
        const menu = $(this.closest('.p-navItem--dropdown__inner')).find(
          '.p-navItem--dropdown__inner__menu'
        )

        _.forEach($('.p-navItem--dropdown__inner__menu'), function (x) {
          $(x).css('display', 'none')
          $(x).removeClass('block')
          $(x).closest('.p-navItem--dropdown__inner').removeClass('block')
        })

        if (menu[0].style.display === 'flex') {
          $(menu).css('display', 'none')
          $(menu).removeClass('block')
          $(menu).closest('.p-navItem--dropdown__inner').removeClass('block')
        } else {
          $(menu).css('display', 'flex')
          $(menu).addClass('block')
          // eslint-disable-next-line no-undef
          $(menu).css('top', 'calc(100% - ' + $('.account').offsetHeight + ')')
          $(menu).closest('.p-navItem--dropdown__inner').addClass('block')
        }
      })
      // --- BEGIN Close menu when click outside
      $(document).on('click', function (event) {
        const $trigger = $('.p-navItem--dropdown__inner.block')

        if ($trigger !== event.target && !$trigger.has(event.target).length) {
          $('.p-navItem--dropdown__inner__menu.block').css('display', 'none')
          $('.p-navItem--dropdown__inner__menu.block')
            .closest('.p-navItem--dropdown__inner')
            .removeClass('block')
          $('.p-navItem--dropdown__inner__menu.block').removeClass('block')
        }
      })
    },
    getNavClass(currentRoute) {
      return this.$route.name.includes(currentRoute) ? 'active' : ''
    },
    logout() {
      this.$auth.logout()
    },
  },
})
</script>

<style lang="scss">
@import '/assets/scss/layout-user';
</style>
