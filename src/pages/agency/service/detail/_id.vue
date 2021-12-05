<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card-group>
      <b-card sub-title="Thông tin gói dịch vụ">
        <p>Tên Gói: {{ listDetail.name }}</p>
        <p>Ngày kích hoạt: {{ listDetail.activeDate | formatDurationDay }}</p>
        <p>Ngày hết hạn: {{ listDetail.expriDate | formatDurationDay }}</p>
        <p>Số ngày sử dụng: {{ listDetail.exp }}</p>
        <p>Số lượng câu hỏi: {{ listDetail.limitQuestion }}</p>
        <p>Số lượng đề thi: {{ listDetail.limitExam }}</p>
        <b-button variant="outline-primary">Yêu cầu gia hạn gói</b-button>
        <b-button variant="outline-primary">Tạm dừng kích hoạt user</b-button>
      </b-card>

      <b-card sub-title="Thông tin mã kích hoạt">
        <p>
          Đã kích hoạt /tổng được cấp {{ listDetail.numberActived }}/{{
            listDetail.limitActive
          }}
        </p>
        <p>Số lượng mã đã tạo: {{ listDetail.numberActiveCode }}</p>
        <p>
          User kích hoạt gần nhất:
          {{ listDetail.lastUserActive }}
          -
          {{ listDetail.lastUserActive }}
        </p>
        <footer>
          <nuxt-link
            class="btn btn-sm btn-primary"
            :to="{
              path: `/agency/service/${agencyHashId}`,
            }"
          >
            <b-icon-plus></b-icon-plus> Danh sách mã kích hoạt
          </nuxt-link>
          <b-button variant="outline-primary">Thêm mã kích hoạt</b-button>
        </footer>
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  reactive,
  useFetch,
  computed,
  toRefs,
  useRoute,
  // watch,
} from '@nuxtjs/composition-api'
import userAPI from '@/api/agency'
export default defineComponent({
  auth: true,
  components: {},
  layout: 'dashboard',
  middleware: ['isAgency'],
  setup() {
    const { $loader } = useContext()

    const route = useRoute()
    const data = reactive({
      breadcrumbs: [
        {
          text: 'Danh sách gói dịch vụ',
          href: '/agency/service/',
        },
        {
          text: 'abc',
        },
      ],

      listDetail: {},
      agencyHashId: '',
    })
    const id = computed(() => route.value.params.id)
    data.agencyHashId = id
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getAgencyDetail(data.agencyHashId)
      data.listDetail = result?.object
      $loader().close()
    })
    fetch()
    return {
      ...toRefs(data),
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
</style>
