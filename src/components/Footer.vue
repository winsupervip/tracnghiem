<template>
  <footer class="footer">
    <b-container>
      <div class="footer-container">
        <div class="footer-top">
          <b-row>
            <b-col class="footer-col-intro" sm="12" md="6" lg="3">
              <div class="footer-widget">
                <div class="footer-logo mb-4">
                  <LogoFooter />
                </div>
                <div class="mb-4 site-description">{{ intro }}</div>
                <div class="social-list">
                  <ul class="list-unstyled d-flex">
                    <li>
                      <a :href="socialList.facebook" target="_blank">
                        <i class="icon-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a :href="socialList.twitter" target="_blank">
                        <i class="icon-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a :href="socialList.instagram" target="_blank">
                        <i class="icon-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a :href="socialList.linked" target="_blank">
                        <i class="icon-linked"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </b-col>
            <b-col class="footer-col-info" sm="12" md="6" lg="3">
              <div class="footer-widget">
                <h3 class="footer-widget-title">Liên Hệ</h3>
                <div class="footer-widget-content">
                  <ul class="list-infor">
                    <li><i class="icon-place"></i> {{ siteInfo.address }}</li>
                    <li><i class="icon-mail"></i> {{ siteInfo.email }}</li>
                    <li><i class="icon-phone"></i> {{ siteInfo.phone }}</li>
                  </ul>
                </div>
              </div>
            </b-col>
            <b-col class="footer-col-info" sm="12" md="6" lg="3">
              <div class="footer-widget">
                <h3 class="footer-widget-title">Liên Kết</h3>
                <div class="footer-widget-content">
                  <ul class="list-menu">
                    <li v-for="item in linkMenu" :key="item.name">
                      <nuxt-link :to="item.target">{{ item.name }}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </b-col>
            <b-col class="footer-col-info" sm="12" md="6" lg="3">
              <div class="footer-widget">
                <h3 class="footer-widget-title">Điều khoản & Điều kiện</h3>
                <div class="footer-widget-content">
                  <ul class="list-menu">
                    <li v-for="item in policyMenu" :key="item.name">
                      <nuxt-link :to="item.target">{{ item.name }}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="footer-copyright">
          <p>{{ siteInfo.copyright }}</p>
        </div>
      </div>
    </b-container>
  </footer>
</template>

<script>
import LogoFooter from './LogoFooter.vue'
// eslint-disable-next-line import/no-unresolved
import document from '@/utils/constants/document'
export default {
  name: 'Footer',
  components: {
    LogoFooter,
  },
  data() {
    return {
      linkMenu: document.MENU_LINK,
      policyMenu: document.MENU_POLICY,
      intro: document.SEO.content,
      socialList: document.SOCIAL,
      siteInfo: document.SITE_INFO,
    }
  },
  methods: {},
}
</script>
