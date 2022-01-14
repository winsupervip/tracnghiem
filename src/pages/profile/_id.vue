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
                    class="btn-outline-white font-smd btn-action"
                  >
                    <i class="icon-heart me-3"></i>
                    Yêu thích
                  </b-btn>
                  <b-dropdown
                    variant="outline-light"
                    no-caret
                    class="dropdown-save"
                  >
                    <template #button-content>
                      <i class="icon-bookmark me-3"></i>
                      Lưu
                    </template>
                    <b-dropdown-form class="">
                      <b-form-checkbox-group
                        v-model="selectedBookmark"
                        :options="optionsBookmark"
                        value-field="value"
                        text-field="text"
                      ></b-form-checkbox-group>
                      <div class="add-bookmark-input">
                        <b-input />
                        <b-btn variant="primary" class="btn-circle">
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
                    Chia sẻ
                  </b-btn>
                </div>
                <div class="exam-report">
                  <b-btn class="btn-transparent font-smd btn-text">
                    <i class="icon-flag"></i> Báo cáo
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
export default defineComponent({
  components: {},
  layout: 'default',
  auth: false,
  setup() {
    const { app, $loader } = useContext()
    const route = useRoute()
    const userId = route?.value.params?.id

    const data = reactive({
      selectedBookmark: [],
      breadcrumbs: [],
      optionsBookmark: [
        { text: 'Yêu thích', value: 1 },
        { text: 'Đề vật lý', value: 2 },
      ],
      dataUser: {},
      totalExamPublic: 0,
      totalUserListExam: 0,
      examPublic: { Page: 1, PageSize: 6, Keyword: '', userId },
      userListExam: { Page: 1, PageSize: 6, Keyword: '', userId },
      dataExamDone: {},
      dataExamCreated: {},
    })
    const { fetch } = useFetch(async () => {
      $loader()

      const { data: result } = await ProfileApi.getAccountInfo(userId)
      const { data: result2 } = await ProfileApi.getExamPublicProfileOfUser(
        data.examPublic
      ) // đề thi đã thực hiện
      const { data: result3 } = await ProfileApi.getListExamCreateByUser(
        data.userListExam
      ) // đề thi đã tạo
      data.dataUser = result?.object

      data.dataExamDone = result2?.object?.items
      data.totalExamPublic = result2?.object?.total
      console.log(
        '🚀 ~ file: _id.vue ~ line 193 ~ const{fetch}=useFetch ~ data.totalExamPublic',
        data.totalExamPublic
      )
      console.log(
        '🚀 ~ file: _id.vue ~ line 178 ~ const{fetch}=useFetch ~ data.dataExamDone',
        data.dataExamDone
      )

      data.dataExamCreated = result3?.object?.items
      data.totalUserListExam = result3?.object?.total
      console.log(
        '🚀 ~ file: _id.vue ~ line 181 ~ const{fetch}=useFetch ~ data.dataExamCreated',
        data.dataExamCreated
      )

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
    }
  },
})
</script>
