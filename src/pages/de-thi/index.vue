<template>
  <div class="page-container">
    <HeadingPage title="Danh sách đề thi" :breadcrumbs="breadcrumbs" />
    <div class="exam-page-container">
      <b-container>
        <b-row>
          <b-col cols="12" sm="12" md="4" lg="3" class="filter-sidebar">
            <SidebarExam />
          </b-col>
          <b-col
            cols="12"
            sm="12"
            md="8"
            lg="9"
            class="exam-page-main-container"
          >
            <b-tabs class="custom-tabs" content-class="mt-3">
              <b-tab title="Tất cả đề thi" active>
                <div class="count-result mb-4">
                  <div class="count-result-left">
                    <strong>1909</strong>
                    <span>kết quả</span>
                  </div>
                  <div class="count-result-right">
                    <span>Sắp xếp:</span>
                    <b-form-select
                      v-model="selectedSort"
                      :options="optionsSort"
                      class="form-control"
                    ></b-form-select>
                  </div>
                </div>
                <div class="list-exam">
                  <b-row>
                    <b-col
                      v-for="item in dataExam"
                      :key="item.id"
                      cols="12"
                      sm="6"
                      md="12"
                      lg="6"
                    >
                      <CardExam :data="item"></CardExam>
                    </b-col>
                  </b-row>
                </div>
              </b-tab>
              <b-tab title="Gợi ý cho bạn">
                <div class="count-result mb-4">
                  <div class="count-result-left">
                    <strong>19</strong>
                    <span>kết quả</span>
                  </div>
                  <div class="count-result-right">
                    <span>Sắp xếp:</span>
                    <b-form-select
                      v-model="selectedSort"
                      :options="optionsSort"
                      class="form-control"
                    ></b-form-select>
                  </div>
                </div>
                <div class="list-exam">
                  <b-row>
                    <b-col
                      v-for="item in dataExam"
                      :key="item.id"
                      cols="12"
                      sm="6"
                      md="12"
                      lg="6"
                    >
                      <CardExam :data="item"></CardExam>
                    </b-col>
                  </b-row>
                </div>
              </b-tab>
            </b-tabs>
            <div class="pagination-center">
              <b-pagination
                v-if="rows > 0"
                v-model="queryUrl.page"
                :total-rows="rows"
                :per-page="queryUrl.perPage"
                aria-controls="my-table"
              ></b-pagination>
              <h4 v-else>{{ mess }}</h4>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import {
  defineComponent,
  reactive,
  toRefs,
  useRoute,
  useFetch,
  useContext,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
// eslint-disable-next-line import/no-unresolved
import HeadingPage from '@/components/HeadingPage'
// eslint-disable-next-line import/no-unresolved
import SidebarExam from '@/components/SidebarExam'
// eslint-disable-next-line import/no-unresolved
import CardExam from '@/components/CardExam'
import examApi from '@/api/examApi'
export default defineComponent({
  components: {
    HeadingPage,
    SidebarExam,
    CardExam,
  },
  layout: 'default',
  auth: false,
  setup() {
    const { $logger, $loader } = useContext()
    const route = useRoute()
    const router = useRouter()
    const category = route?.value?.query.category || false
    const keyword = route?.value?.query.keyword || false

    const data = reactive({
      breadcrumbs: [
        {
          text: 'Trang chủ',
          href: '/',
        },
        {
          text: 'Danh sách đề thi',
          active: true,
        },
      ],
      selectedSort: 'latest',
      optionsSort: [
        { value: 'latest', text: 'Mới nhất' },
        { value: 'rating', text: 'Đánh giá cao nhất' },
      ],
      dataExam: [],
      currentPage: 0,
      rows: 0,
      perPage: 1,
      queryUrl: {
        page: 1,
        pageSize: 10,
        Keyword: keyword,
        categories: category,
        tags: false,
        levels: false,
        ratings: false,
        amountquestionleft: false,
        amountquestionright: false,
        amountexamtimeleft: false,
        amountexamtimeright: false,
        orderBy: false,
      },
      mess: '',
    })
    const { fetch } = useFetch(async () => {
      try {
        $loader()
        const { data: result } = await examApi.searchExam(data.queryUrl)
        data.dataExam = result.object.items
        data.rows = result.object.total
        if (data.rows > 0) {
          data.perPage =
            result.object.total % data.queryUrl.pageSize !== 0
              ? parseInt(result.object.total / data.queryUrl.pageSize) + 1
              : parseInt(result.object.total / data.queryUrl.pageSize)
          $logger.info('khue', result, data.perPage)
        } else {
          data.mess = 'Không có đề thi nào được tìm thấy'
        }
        window.scrollTo(0, 0)
        $loader().close()
      } catch (err) {
        $loader().close()
        // this.$handleError(err, () => {
        //   console.log(err)
        // })
      }
    })
    fetch()
    watch(
      () => data.queryUrl.page,
      () => {
        router.push({
          query: {
            ...route.value.query,
            page: data.queryUrl.page,
          },
        })
        fetch()
      }
    )
    return {
      ...toRefs(data),
    }
  },
})
</script>
