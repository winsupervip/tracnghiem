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
                  <b-btn
                    variant="outline-light"
                    :class="
                      dataUser.isLiked === false
                        ? 'btn-outline-white font-smd btn-action'
                        : 'btn-outline-white bg-white font-smd btn-action text-danger'
                    "
                    @click="saveWishList"
                  >
                    <i
                      :class="
                        dataUser.isLiked === true
                          ? 'icon-heart-fill text-danger me-3'
                          : 'icon-heart me-3'
                      "
                    ></i>
                    {{ $t('profile.like') }}
                  </b-btn>
                  <b-dropdown
                    variant="outline-light"
                    no-caret
                    class="dropdown-save"
                  >
                    <template #button-content>
                      <i
                        :class="
                          dataUser.isSaved === true
                            ? 'icon-bookmark    text-danger me-3'
                            : 'icon-bookmark me-3'
                        "
                      ></i>
                      {{ $t('profile.save') }}
                    </template>
                    <b-dropdown-form class="">
                      <b-form-checkbox-group
                        v-model="selectedBookmark"
                        :options="optionsBookmark"
                        value-field="hashId"
                        text-field="name"
                      ></b-form-checkbox-group>

                      <div class="add-bookmark-input">
                        <b-form-input
                          v-model="valueAddBookmark"
                          trim
                          type="text"
                          placeholder="Thêm"
                        >
                        </b-form-input>

                        <b-btn
                          variant="primary"
                          class="btn-circle"
                          @click="addBookmark"
                        >
                          <b-icon icon="plus" class="text-white" />
                        </b-btn>
                      </div>
                    </b-dropdown-form>
                  </b-dropdown>
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
                    @click="report"
                  >
                    <i class="icon-flag"></i>{{ $t('profile.report') }}
                  </b-btn>
                </div>
              </div>
            </b-col>
          </b-row>
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

import ProfileApi from '@/api/profile'
import WishListApi from '@/api/wishList'
import LabelApi from '@/api/label'
export default defineComponent({
  components: {},
  layout: 'default',
  auth: true,
  setup() {
    const { app, $loader } = useContext()
    const route = useRoute()
    const userId = route?.value.params?.id

    const data = reactive({
      valueAddBookmark: null,
      selectedBookmark: [],
      breadcrumbs: [],
      optionsBookmark: [],
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
    }
    const getLabelProfile = async () => {
      const { data: result } = await LabelApi.getLabelProfile(data.type, userId)
      data.optionsBookmark = result.object?.items
    }
    const { fetch } = useFetch(async () => {
      $loader()
      getAccountInfo()
      getLabelProfile()
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
    watch(
      () => data.selectedBookmark,
      async (newVal, oldVal) => {
        if (newVal.length > oldVal.length) {
          const addVal = {
            hashIdItem: userId,
            hashIdLabel: newVal[newVal.length - 1],
            status: true,
            itemType: 4,
          }
          console.log(addVal)
          const { data: result } = await LabelApi.addDeleteItemLabel(addVal)
          console.log(result)
          getLabelProfile()
        } else {
          const deleteVal = {
            hashIdItem: userId,
            hashIdLabel: oldVal.find(
              (x) => !newVal.find((newVal) => newVal === x)
            ),
            status: false,
            itemType: 4,
          }
          const { data: result } = await LabelApi.addDeleteItemLabel(deleteVal)
          console.log(result)
          getLabelProfile()
        }
      }
    )
    return {
      ...toRefs(data),
      getAccountInfo,
      getLabelProfile,
    }
  },

  methods: {
    async saveWishList() {
      if (this.dataUser?.isLiked === false) {
        this.wishList = {
          hashIdItem: this.userId,
          status: false,
          wishListType: 4,
        }
        const { data: result } = await WishListApi.saveWishList(this.wishList)
        console.log(
          '🚀 ~ file: _id.vue ~ line 210 ~ saveWishList ~ result',
          result
        )
        this.getAccountInfo()
      } else {
        this.wishList = {
          hashIdItem: this.userId,
          status: true,
          wishListType: 4,
        }
        const { data: result } = await WishListApi.saveWishList(this.wishList)
        console.log(
          '🚀 ~ file: _id.vue ~ line 210 ~ saveWishList ~ result',
          result
        )
        this.getAccountInfo()
      }
    },
    async addBookmark() {
      const label = { name: this.valueAddBookmark, color: '#000' }

      if (
        !this.optionsBookmark.find((val) => val.text === this.valueAddBookmark)
      ) {
        const { data: result } = await LabelApi.addLabel(label)
        console.log(
          '🚀 ~ file: _id.vue ~ line 315 ~ addBookmark ~ result',
          result
        )
        this.getLabelProfile()
      } else {
        alert('Đã có bookmark này')
      }
    },
    report() {},
  },
})
</script>
