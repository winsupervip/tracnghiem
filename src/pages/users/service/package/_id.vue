<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card class="mb-3">
      <b-card-text>
        Đăng ký gói cước để được tạo câu hỏi, đề thi sử dụng cho mục đích cá
        nhân.
      </b-card-text>
      <b-card-text class="mb-5">
        Black Friday 2021. Giảm 50% tất cả các gói VIP, S.VIP. Mã khuyến mãi:
        <b>{{ giftCode }}</b>
      </b-card-text>
    </b-card>
    <div class="container mb-5">
      <div class="row">
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 col-12">
          <p class="text-center mt-2"><b>Gói 1</b></p>
          <p>Thời gian : 30 ngày</p>
          <p>Câu hỏi : 50</p>
          <p>Đề thi : 20</p>
          <p>Giá tiền : 200.000</p>
          <b-button variant="outline-dark btn-md" class="d-block m-auto mb-3">
            Đăng ký ngay
          </b-button>
        </div>
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 col-12">
          <p class="text-center mt-2"><b>Gói 1</b></p>
          <p>Thời gian : 30 ngày</p>
          <p>Câu hỏi : 50</p>
          <p>Đề thi : 20</p>
          <p>Giá tiền : 200.000</p>
          <b-button variant="outline-dark btn-md" class="d-block m-auto mb-3">
            Đăng ký ngay
          </b-button>
        </div>
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 col-12">
          <p class="text-center mt-2"><b>Gói 1</b></p>
          <p>Thời gian : 30 ngày</p>
          <p>Câu hỏi : 50</p>
          <p>Đề thi : 20</p>
          <p>Giá tiền : 200.000</p>
          <b-button variant="outline-dark btn-md" class="d-block m-auto mb-3">
            Đăng ký ngay
          </b-button>
        </div>
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 col-12">
          <p class="text-center mt-2"><b>Gói 1</b></p>
          <p>Thời gian : 30 ngày</p>
          <p>Câu hỏi : 50</p>
          <p>Đề thi : 20</p>
          <p>Giá tiền : 200.000</p>
          <b-button variant="outline-dark btn-md" class="d-block m-auto mb-3">
            Đăng ký ngay
          </b-button>
        </div>
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 col-12">
          <p class="text-center mt-2"><b>Gói 1</b></p>
          <p>Thời gian : 30 ngày</p>
          <p>Câu hỏi : 50</p>
          <p>Đề thi : 20</p>
          <p>Giá tiền : 200.000</p>
          <b-button variant="outline-dark btn-md" class="d-block m-auto mb-3">
            Đăng ký ngay
          </b-button>
        </div>
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 col-12">
          <p class="text-center mt-2"><b>Gói 1</b></p>
          <p>Thời gian : 30 ngày</p>
          <p>Câu hỏi : 50</p>
          <p>Đề thi : 20</p>
          <p>Giá tiền : 200.000</p>
          <b-button variant="outline-dark btn-md" class="d-block m-auto mb-3">
            Đăng ký ngay
          </b-button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <b-card class="col-lg-6 col-12">
          <b-card-text> <b>Hãy liên hệ để được hỗ trợ ngay</b> </b-card-text>
          <b-card-text>
            Nếu có bất kỳ thắc mắc nào, hãy liên hệ ngay với chúng tôi để được
            giải đáp nhanh chóng.
          </b-card-text>
          <b-card-text>Hotline: 0932158760 </b-card-text>
          <b-card-text> Email: sales@tracnghiem.vn </b-card-text>
        </b-card>
        <b-card class="col-lg-6 col-12">
          <b-card-text> <b>Hướng dẫn sử dụng</b> </b-card-text>
          <b-card-text> Tài liệu hướng dẫn sử dụng: link </b-card-text>
          <b-card-text
            >Clip hướng dẫn: https://youtu.be/J98wE8gKN7I
          </b-card-text>
          <b-card-text> Hướng dẫn thanh toán: link </b-card-text>
        </b-card>
      </div>
    </div>
    <!-- <b-card>
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <b-pagination
          v-if="total > urlQuery.pageSize"
          v-model="urlQuery.page"
          class="pagination"
          align="center"
          :total-rows="total"
          :per-page="urlQuery.pageSize"
        ></b-pagination>
      </div>
    </b-card> -->
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  // useContext,
  // useFetch,
  // computed,
  // watch,
  useRoute,
  toRefs,
} from '@nuxtjs/composition-api'
// import userAPI from '@/api/agency'
export default defineComponent({
  auth: true,
  components: {},
  layout: 'dashboard',
  setup() {
    // const { $loader } = useContext()
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1
    // const id = computed(() => route.value.params.id)
    const data = reactive({
      breadcrumbs: [
        {
          text: 'Danh sách gói dịch vụ',
          href: '/agency/service/',
        },
        {
          text: 'abc',
          href: `/agency/service/detail`,
        },
      ],
      giftCode: 'BLACKFRIDAY',
      listActived: [],
      currentPage: queryPage,
      total: 0,
      urlQuery: {
        page: 1,
        pageSize: 10,
        sort: 1,
        status: '',
        keyword: '',
        createDateFrom: '',
        createDateTo: '',
      },
      agencyHashId: '',
    })
    // data.agencyHashId = id
    // const { fetch } = useFetch(async () => {
    //   $loader()
    //   const { data: result } = await userAPI.getAgenciesActived(
    //     data.agencyHashId,
    //     data.urlQuery
    //   )
    //   data.listActived = result?.object?.items
    //   data.total = result?.object?.total
    //   console.log(data.listActived)
    //   $loader().close()
    // })
    // const sortTypeAgencies = async () => {
    //   $loader()
    //   const { data: result } = await userAPI.getSortAgenciesActived()
    //   data.sorts = result?.object?.items
    //   $loader().close()
    // }
    // sortTypeAgencies()
    // fetch()
    // const search = () => {
    //   data.urlQuery.page = 1
    //   fetch()
    // }
    // watch(
    //   () => data.urlQuery.page,
    //   () => {
    //     fetch()
    //   }
    // )
    return {
      ...toRefs(data),
      // search,
    }
  },
  methods: {
    loadOptions({ action, searchQuery, callback }) {},
  },
})
</script>
<style lang="scss" scoped>
.btn-search {
  top: 0;
  right: 10%;
  height: 100%;
}
.row > div {
  border: 1px solid #000;
  border-radius: 5px;
  max-width: 100%;
}
</style>
