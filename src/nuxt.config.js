/* eslint-disable prettier/prettier */
import { murmurHash128 } from 'murmurhash-native'
require('dotenv').config({ path: 'environments/.env.' + process.env.NODE_ENV })

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title:
      'Trắc nghiệm Online, Ngân hàng câu hỏi, đề thi mới nhất cập nhật 24h/7',
    htmlAttrs: {
      lang: 'vi',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        property: 'og:image',
        content: 'https://tracnghiem.vn/images/logo-shared.png',
      },
      { property: 'og:image:width', content: '400' },
      { property: 'og:image:height', content: '400' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      {
        name: 'msapplication-TileImage',
        content: '/favicon/ms-icon-144x144.png',
      },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        href: '/favicon/apple-icon-57x57.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        href: '/favicon/apple-icon-60x60.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: '/favicon/apple-icon-72x72.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        href: '/favicon/apple-icon-76x76.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        href: '/favicon/apple-icon-114x114.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/favicon/apple-icon-120x120.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: '/favicon/apple-icon-144x144.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/favicon/apple-icon-152x152.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/apple-icon-180x180.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/favicon/android-icon-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon/favicon-96x96.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/favicon/manifest.json' },
    ],
    script: [
      {
        name: 'TracNghiem',
        alternateName:
          'Trắc nghiệm Online, Ngân hàng câu hỏi, đề thi mới nhất cập nhật 24h/7',
        url: 'https://tracnghiem.vn',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://tracnghiem.vn/tim-kiem/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
        author: {
          '@type': 'Team',
          name: 'TracNghiemTeam',
        },
        description:
          'Thi trắc nghiệm online với hàng ngàn đề thi, ngân hàng câu hỏi phong phú đa dạng trên nhiều lĩnh vực',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/css/main.css',
    { src: '@/assets/scss/custom-bootstrap.scss', lang: 'sass' },
    '@/assets/scss/style.scss',
    '@/assets/scss/dashboard.scss',
    '@/assets/scss/question.scss',
  ],

  styleResources: {
    scss: ['@/assets/scss/foundation/_mixins.scss'],
  },

  render: {
    etag: {
      hash: (html) => murmurHash128(html),
    },
  },

  serverMiddleware: ['@/middleware/cache.js'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/i18n', ssr: true },
    { src: '@/plugins/bootstrapPlugin.js', ssr: false },
    { src: '@/plugins/polyfills.client.js', ssr: false },
    { src: '@/plugins/editor.js', ssr: false },
    { src: '@/logger/vue-logger.js', ssr: true },
    { src: '@/plugins/loading.js', ssr: true },
    { src: '@/plugins/filters.js', ssr: true },
    { src: '@/plugins/vue2-scrollspy', ssr: false },
    { src: '@/plugins/treeselect.js', ssr: true },
    { src: '@/plugins/validators', ssr: false },
    { src: '@/plugins/uuid.js', ssr: true },
    { src: '~/plugins/persistedState.js' },
    { src: '@/plugins/WIRISplugins.js', ssr: false },
    { src: '~/plugins/vue-tags-input', ssr: false },
    { src: '@/plugins/handle-error' },
    { src: '@/plugins/vue-slider-component.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/google-gtag',
    '@nuxtjs/auth-next',
    'bootstrap-vue/nuxt',
    '@nuxtjs/toast',
    '@nuxtjs/recaptcha',
  ],
  // https://github.com/nuxt-community/google-gtag-module
  'google-gtag': {
    id: 'G-4RQGST5TRG',
  },
  recaptcha: {
    hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    language: 'vi', // Recaptcha language (v2)
    siteKey: process.env.RECAPTCHA_SITE_KEY, // Site key for requests
    version: 2, // Version
    size: 'normal', // Size: 'compact', 'normal', 'invisible' (v2)
  },

  // bootstrap-vue
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: true, // Or `bvCSS: false`
    icons: true,
  },
  toast: {
    position: 'top-right',
    register: [
      // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error',
        },
      },
    ],
  },
  i18n: {
    locales: [
      { code: 'vi', iso: 'vi-VN', file: 'vi-VN.js' },
      { code: 'en', iso: 'en-US', file: 'en-US.js' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/',
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.apiURI,
    proxyHeaders: false,
    credentials: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    publicPath: '/public/',
    babel: {
      cacheDirectory: true,
      compact: true,
      presets({ envName }) {
        const envTargets = {
          client: { browsers: ['last 2 versions'], ie: 11 },
          server: { node: 'current' },
        }

        return [
          [
            '@nuxt/babel-preset-app',
            {
              targets: envTargets[envName],
              corejs: { version: 3 },
              polyfills: [
                'es.array.iterator',
                'es.promise',
                'es.object.assign',
                'es.promise.finally',
                'es.weak-map',
              ],
              useBuiltIns: 'usage',
            },
          ],
        ]
      },
    },

    transpile: [/@nuxtjs[\\/]composition-api/],
    extend(config, ctx) {
      if (ctx.isDev) {
        config.mode = 'development'
      } else {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
    vendor: ['tinymce', '@johmun/vue-tags-input'],
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom1',
        path: '',
        component: resolve(__dirname, 'pages/home'),
      })
      routes.push({
        name: 'de-thi-categories',
        path: '/de-thi/*',
        component: resolve(__dirname, 'pages/de-thi/index.vue'),
      })
      routes.push({
        name: 'de-thi-id-slug',
        path: '/:slug-:id',
        component: resolve(__dirname, 'pages/chi-tiet-de-thi/index.vue'),
      })
      routes.push({
        name: 'ket-qua-id-slug',
        path: '/ket-qua/:slug-:id',
        component: resolve(__dirname, 'pages/ket-qua/index.vue'),
      })
    },
    middleware: ['auth'],
  },
  auth: {
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        maxAge: 3600,
      },
    },
    plugins: [{ src: '@/plugins/http.js', ssr: true }],
    strategies: {
      local: false,
      keycloak: {
        scheme: 'oauth2',
        endpoints: {
          authorization:
            process.env.AUTH_URL +
            '/auth/realms/tracnghiemvn/protocol/openid-connect/auth',
          userInfo:
            process.env.AUTH_URL +
            '/auth/realms/tracnghiemvn/protocol/openid-connect/userinfo',
          token: process.env.AUTH_TOKEN,
          logout:
            process.env.AUTH_URL +
            '/auth/realms/tracnghiemvn/protocol/openid-connect/logout?redirect_uri=' +
            encodeURIComponent(process.env.BASE_URL || 'http://localhost:3000'),
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 60 * 60 * 5, // Can be dynamic ?
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30, // Can be dynamic ?
        },
        responseType: 'code',
        grantType: 'authorization_code',
        clientId: process.env.AUTH_CLIENT_ID,
        scope: ['openid', 'profile', 'email'],
        codeChallengeMethod: 'S256',
      },
    },
    redirect: {
      login: '/login',
      logout: encodeURIComponent(
        process.env.BASE_URL || 'http://localhost:3000'
      ),
      home: '/',
    },
  },
}
