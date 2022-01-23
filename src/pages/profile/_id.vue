<template>
  <div class="page-container position-relative">
    <section class="page-heading exam-page-heading bg-gradient-blue">
      <div class="page-heading-inner">
        <b-container class="position-relative">
          <b-row>
            <b-col md="12" lg="12">
              <b-breadcrumb :items="breadcrumbs" class="mb-2"></b-breadcrumb>
              <div class="page-heading-title my-4">
                <div class="user-heading">
                  <img
                    class="avatar border-2 border-white border-solid"
                    :src="dataUser.avatar"
                    :alt="dataUser.name"
                  />
                  <div class="user-heading-name">
                    <h1 class="page-title">
                      {{ dataUser.name }}
                    </h1>
                  </div>
                </div>
              </div>
              <div class="page-heading-description mb-5">
                {{ dataUser.bio }}
              </div>
              <div class="toolbar-action-exam">
                <div class="action-exam">
                  <WishList
                    :hash-id="userId"
                    :is-wishlist="dataUser.isLiked"
                    :type-wishlist="4"
                  />
                  <SaveLable :hash-id="userId" :type-label="4" />
                  <b-btn
                    variant="outline-light"
                    class="btn-outline-white font-smd btn-action"
                  >
                    <i class="icon-share me-3"></i>
                    {{ $t('profile.share') }}
                  </b-btn>
                </div>
                <div class="exam-report">
                  <b-btn
                    class="btn-transparent font-smd btn-text"
                    @click="openReportModal"
                  >
                    <i class="icon-flag"></i>{{ $t('profile.report') }}
                  </b-btn>
                </div>
                <Report
                  :hash-id="userId"
                  report-type-id="5"
                  :is-open="isOpen"
                  @isClose="isClose"
                />
              </div>
            </b-col>
          </b-row>
          <b-modal id="mustLogin" title="Thông báo" ok-only>
            <p class="d-flex justify-content-center">Bạn cần đăng nhập</p>
          </b-modal>
        </b-container>
      </div>
    </section>
    <section class="exam-main-container">
      <b-container>
        <b-row>
          <b-col md="12" lg="12" class="exam-main-content">
            <b-tabs class="common-tabs">
              <b-tab title="Đề thi đã thực hiện" active>
                <div class="tab-content-container">
                  <div class="list-exam">
                    <b-row v-if="dataExamDone.length > 0">
                      <b-col
                        v-for="item in dataExamDone"
                        :key="item.id"
                        cols="12"
                        sm="6"
                        md="6"
                        lg="4"
                      >
                        <CardExam :data="item"></CardExam>
                      </b-col>

                      <b-pagination
                        v-model="examPublic.Page"
                        :total-rows="totalExamPublic"
                        class="pagination bg-transparent"
                        align="center"
                        :per-page="examPublic.PageSize"
                        aria-controls="my-table"
                      ></b-pagination>
                    </b-row>
                    <NoData v-else title="Chưa có đề thi" />
                  </div>
                </div>
              </b-tab>
              <b-tab title="Đề thi đã tạo">
                <div class="tab-content-container">
                  <div class="list-exam">
                    <b-row v-if="dataExamCreated.length > 0">
                      <b-col
                        v-for="item in dataExamCreated"
                        :key="item.id"
                        cols="12"
                        sm="6"
                        md="6"
                        lg="4"
                      >
                        <CardExam :data="item"></CardExam>
                      </b-col>

                      <b-pagination
                        v-model="userListExam.Page"
                        align="center"
                        class="pagination bg-transparent"
                        :total-rows="totalUserListExam"
                        :per-page="userListExam.PageSize"
                        aria-controls="my-table"
                      ></b-pagination>
                    </b-row>
                    <NoData
                      v-else
                      img="https://storage.tracnghiem.vn/public/images/empty.svg"
                      title="Người dùng chưa tạo đề thi nào."
                    />
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  useFetch,
  useContext,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import WishList from '@/components/WishList.vue'
import ProfileApi from '@/api/profile'
import SaveLable from '@/components/SaveLabel.vue'
import Report from '@/components/Report.vue'
export default defineComponent({
  components: {
    WishList,
    SaveLable,
    Report,
  },
  layout: 'default',
  auth: false,
  setup() {
    const { app, $loader } = useContext()
    const route = useRoute()
    const userId = route?.value.params?.id
    console.log('🚀 ~ file: _id.vue ~ line 220 ~ setup ~ route', route)

    const data = reactive({
      isOpen: false,
      valueAddBookmark: null,
      selectedBookmark: [],
      breadcrumbs: [],
      dataUser: {},
      totalExamPublic: 0,
      totalUserListExam: 0,
      examPublic: { Page: 1, PageSize: 6, Keyword: '', userId },
      userListExam: { Page: 1, PageSize: 6, Keyword: '', userId },
      dataExamDone: {},
      dataExamCreated: {},
      userId,
      wishList: { hashIdItem: userId, status: false, wishListType: 0 },
      type: 4,
    })
    const getAccountInfo = async () => {
      const { data: result } = await ProfileApi.getAccountInfo(userId)
      data.dataUser = result?.object
      console.log('data', data.dataUser)
    }
    const { fetch } = useFetch(async () => {
      $loader()
      getAccountInfo()
      const [{ data: result2 }, { data: result3 }] = await Promise.all([
        ProfileApi.getExamPublicProfileOfUser(data.examPublic), // đề thi đã thực hiện
        ProfileApi.getListExamCreateByUser(data.userListExam), // đề thi đã tạo
      ])
      data.dataExamDone = result2?.object?.items
      data.totalExamPublic = result2?.object?.total

      data.dataExamCreated = result3?.object?.items
      data.totalUserListExam = result3?.object?.total

      data.breadcrumbs = [
        {
          text: app.i18n.t(`profile.homepage`),
          href: '/',
        },

        {
          text: app.i18n.t(`profile.test`),
          href: '/de-thi',
        },
        {
          text: app.i18n.t(`${data.dataUser.name}`),
          active: true,
        },
      ]

      $loader().close()
    })

    fetch()
    watch(
      () => data.userListExam.Page,

      () => {
        fetch()
      }
    )
    watch(
      () => data.examPublic.Page,

      () => {
        fetch()
      }
    )

    return {
      ...toRefs(data),
      getAccountInfo,
    }
  },

  methods: {
    openReportModal() {
      this.isOpen = true
    },
    isClose() {
      this.isOpen = false
    },
  },
})
</script>
