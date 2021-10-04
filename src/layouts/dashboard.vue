/* eslint-disable no-undef */
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
      <!-- <div class="l-dashboard__nav">
        <div class="l-dashboard__nav__global">
          <div class="l-dashboard__nav__global__inner">
            <div class="p-nav__icons">
              <div class="p-navItem--logo">
                <nuxt-link to="#">
                  <img src="~/assets/img/dashboard/logo.svg" alt="logo" />
                </nuxt-link>
              </div>
              <div class="p-navItem">
                <nuxt-link to="#">
                  <img src="~/assets/img/dashboard/icon_plus.png" alt="plus" />
                </nuxt-link>
              </div>
              <div class="p-navItem">
                <nuxt-link to="#">
                  <img
                    src="~/assets/img/dashboard/icon_search.png"
                    alt="icon_search"
                  />
                </nuxt-link>
              </div>
              <div class="p-navItem">
                <nuxt-link to="#">
                  <img src="~/assets/img/dashboard/icon_tag.png" alt="icon_tag" />
                </nuxt-link>
              </div>
            </div>
            <div class="p-nav__icons">
              <div class="p-navItem">
                <nuxt-link to="#">
                  <img
                    src="~/assets/img/dashboard/icon_question.png"
                    alt="icon_question"
                  />
                </nuxt-link>
              </div>
              <div class="p-navItem">
                <nuxt-link to="#">
                  <img
                    src="~/assets/img/dashboard/user.jpg"
                    alt="user.jpg"
                    class="img-circle"
                  />
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="l-dashboard__nav__menu">
          <div class="p-navMenu__logo">
            <img
              src="~/assets/img/dashboard/logo tracnghiemvn.svg"
              alt="logo tracnghiemvn.svg"
            />
          </div>
          <div class="p-navMenu__child">
            <ul>
              <li>
                <nuxt-link to="#" class="active">
                  <div>
                    <img
                      src="~/assets/img/dashboard/icon_lslambai.png"
                      alt="icon_lslambai.png"
                    />
                  </div>
                  <span>Lịch sử làm bài</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="#">
                  <div>
                    <img
                      src="~/assets/img/dashboard/icon_dethi.png"
                      alt="icon_dethi.png"
                    />
                  </div>
                  <span>Đề thi của bạn</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="#">
                  <div>
                    <img
                      src="~/assets/img/dashboard/icon_nhch.png"
                      alt="icon_nhch.png"
                    />
                  </div>
                  <span>Ngân hàng câu hỏi</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="p-navMenu__child">
            <h2>Công cụ chung</h2>
            <ul>
              <li>
                <nuxt-link to="#" class="active">
                  <div>
                    <img
                      src="~/assets/img/dashboard/bx_bx-network-chart.png"
                      alt="bx_bx-network-chart.png"
                    />
                  </div>
                  <span>Affiliate</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="#">
                  <div>
                    <img
                      src="~/assets/img/dashboard/carbon_notification.png"
                      alt="carbon_notification.png"
                    />
                  </div>
                  <span>Thông báo</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="#">
                  <div>
                    <img
                      src="~/assets/img/dashboard/ant-design_dollar-outlined.png"
                      alt="ant-design_dollar-outlined.png"
                    />
                  </div>
                  <span>Lịch sử thanh toán</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div> -->
      <b-sidebar
        id="sidebar-1"
        ref="bSidebar"
        no-header
        :backdrop-variant="variant"
        :backdrop="backdrop"
        shadow
        :visible="visible"
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
                      src="~/assets/img/dashboard/icon_plus.png"
                      alt="icon_plus"
                    />
                  </nuxt-link>
                </div>
                <div class="p-navItem">
                  <nuxt-link to="">
                    <img
                      src="~/assets/img/dashboard/icon_search.png"
                      alt="icon_search"
                    />
                  </nuxt-link>
                </div>
                <div class="p-navItem">
                  <nuxt-link to="">
                    <img
                      src="~/assets/img/dashboard/icon_tag.png"
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
                          src="~/assets/img/dashboard/icon_question.png"
                          alt="icon_question.png"
                        />
                      </nuxt-link>
                    </div>
                    <div class="p-navItem--dropdown__inner__menu help">
                      <div class="p-navItem--dropdown__inner__menu__child">
                        <div class="item item__heading">Help</div>
                        <nuxt-link class="item item__link" to="">
                          Nguyen Phuoc Tien
                        </nuxt-link>
                        <nuxt-link class="item item__link" to="">
                          Documentation
                        </nuxt-link>
                        <nuxt-link class="item item__link" to="">
                          Learn Git
                        </nuxt-link>
                      </div>
                      <div class="p-navItem--dropdown__inner__menu__child">
                        <div class="item item__heading">Settings</div>
                        <nuxt-link class="item item__link" to="">
                          Personal settings
                        </nuxt-link>
                        <nuxt-link class="item item__link" to="">
                          Labs
                        </nuxt-link>
                      </div>
                      <div class="p-navItem--dropdown__inner__menu__child">
                        <div class="item item__heading">NGUYEN PHUOC TIEN</div>
                        <nuxt-link class="item item__link" to="">
                          Privacy policy
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-navItem--dropdown">
                  <div class="p-navItem--dropdown__inner">
                    <div class="p-navItem--dropdown__inner__icon">
                      <nuxt-link to="">
                        <img
                          src="~/assets/img/dashboard/user.jpg"
                          alt="user.jpg"
                          class="img-circle"
                        />
                      </nuxt-link>
                    </div>
                    <div class="p-navItem--dropdown__inner__menu account">
                      <div class="p-navItem--dropdown__inner__menu__child">
                        <div class="item item__heading">Recent workspaces</div>
                        <nuxt-link class="item item__link" to="">
                          Nguyen Phuoc Tien
                        </nuxt-link>
                        <nuxt-link class="item item__link" to="">
                          All workspaces
                        </nuxt-link>
                      </div>
                      <div class="p-navItem--dropdown__inner__menu__child">
                        <div class="item item__heading">Settings</div>
                        <nuxt-link class="item item__link" to="">
                          Personal settings
                        </nuxt-link>
                        <nuxt-link class="item item__link" to="">
                          Labs
                        </nuxt-link>
                      </div>
                      <div class="p-navItem--dropdown__inner__menu__child">
                        <div class="item item__heading">NGUYEN PHUOC TIEN</div>
                        <nuxt-link class="item item__link" to="">
                          Logout
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
            <div
              v-if="isDisplayMenu || isDisplayMenuSp"
              class="p-navMenu__child"
            >
              <ul>
                <li>
                  <nuxt-link to="" class="active">
                    <div>
                      <img
                        src="~/assets/img/dashboard/icon_lslambai.png"
                        alt="icon_lslambai.png"
                      />
                    </div>
                    <span>Lịch sử làm bài</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="">
                    <div>
                      <img
                        src="~/assets/img/dashboard/icon_dethi.png"
                        alt="icon_dethi.png"
                      />
                    </div>
                    <span>Đề thi của bạn</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="">
                    <div>
                      <img
                        src="~/assets/img/dashboard/icon_nhch.png"
                        alt="icon_nhch.png"
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
                  <nuxt-link to="" class="active">
                    <div>
                      <img
                        src="~/assets/img/dashboard/bx_bx-network-chart.png"
                        alt="bx_bx-network-chart.png"
                      />
                    </div>
                    <span>Affiliate</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="">
                    <div>
                      <img
                        src="~/assets/img/dashboard/carbon_notification.png"
                        alt="carbon_notification.png"
                      />
                    </div>
                    <span>Thông báo</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="">
                    <div>
                      <img
                        src="~/assets/img/dashboard/ant-design_dollar-outlined.png"
                        alt="ant-design_dollar-outlined.png"
                      />
                    </div>
                    <span>Lịch sử thanh toán</span>
                  </nuxt-link>
                </li>
              </ul>
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
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { defineComponent } from '@vue/composition-api'
import _ from 'lodash'

export default defineComponent({
  name: 'Dashboard',
  layout: 'dashboard',
  setup() {
    // eslint-disable-next-line no-unused-expressions
    // onbeforeMounted(() => {
    //   document.body.className = 'dashboard'
    // })
    // onBeforeUnmount(() => {
    //   window.removeEventListener('resize', this.handleWindowResize)
    // })
  },
  data() {
    return {
      backdrop: false,
      visible: true,
      variant: 'transparent',
      isDisplayMenu: true,
      isDisplayMenuSp: false,
    }
  },
  created() {
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      if (window.innerWidth < 991) {
        this.visible = false
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
    // --- END Close menu when click outside
    // $(document).ready(function () {
    //   $('.l-dashboard.toggle--close .l-dashboard__nav__menu').hover(function (
    //     e
    //   ) {
    //     console.log('mouseover')
    //     this.$refs.dashboard.classList.remove('toggle--close')
    //     this.isDisplayMenu = true
    //   })
    // })
  },
  destroyed() {
    document.body.classList.remove('dashboard')
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
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
        this.visible = false
        this.backdrop = true
        this.variant = 'dark'
        this.isDisplayMenuSp = true
      } else {
        this.visible = true
        this.backdrop = false
        this.variant = 'transparent'
        this.isDisplayMenuSp = false
      }
    },
  },
})
</script>
