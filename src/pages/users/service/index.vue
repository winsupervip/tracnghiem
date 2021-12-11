<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <b-button
        v-b-modal.modal-edit
        variant="outline-dark btn-md"
        @click="reset"
      >
        Đăng ký gói mới
      </b-button>
    </div>
    <b-modal
      id="modal-edit"
      ref="modal"
      hide-footer
      @shown="showModal"
      @hide="hideModal"
      @oke="onSubmit"
    >
      <b-card v-if="isCheck" align="center">
        <b-card-text>
          <b>Điền vào mã kích hoạt bạn có để đăng ký gói dịch vụ</b>
        </b-card-text>
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider
              :name="$t('admin.service.agencies.codeActive')"
              rules="required|max:255"
            >
              <b-form-group
                slot-scope="{ valid, errors }"
                label-for="code"
                class="mb-3"
              >
                <b-form-input
                  id="code"
                  type="text"
                  size="lg"
                  :state="errors[0] ? false : valid ? true : null"
                ></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-form>
        </ValidationObserver>
        <b-button variant="outline-dark mb-3" @click="check">Xác nhận</b-button>
        <b-card-text>
          Tôi không có mã kích hoạt?
          <a href="/users/service/package" class="card-link">Đăng ký ngay</a>
        </b-card-text>
        <a href="#" class="card-link">Đăng ký người dùng</a>
      </b-card>

      <b-card v-else align="center">
        <b-card-text>
          <b>Chúc mừng bạn đã kích hoạt thành công gói cước</b>
        </b-card-text>
        <b-card-text>
          <h3 class="font-bold">V.I.P 01</h3>
        </b-card-text>
        <b-card-text>
          <b>Ngày kích hoạt: 21/11/2021</b>
        </b-card-text>
        <b-card-text>
          <b>Ngày kết thúc: 21/11/2022</b>
        </b-card-text>
        <b-button variant="outline-dark mb-3">Đóng</b-button>
      </b-card>
    </b-modal>
    <b-card>
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <b-table striped hover :items="listAgency" :fields="fields">
          <template #cell(status)="data">
            {{
              data.item.status === 1
                ? 'Active'
                : data.item.status === 2
                ? 'Deactive'
                : 'Pending'
            }}
          </template>
          <template #cell(index)="data">
            {{ data.index + 1 + (urlQuery.page - 1) * 10 }}
          </template>
          <template #cell(createDate)="data">
            {{ data.item.createDate | formatDurationDay }}
          </template>
          <template #cell(price)="data">
            {{ data.item.price | formatMoney }}
          </template>
        </b-table>
        <b-pagination
          v-if="total > urlQuery.pageSize"
          v-model="urlQuery.page"
          class="pagination"
          align="center"
          :total-rows="total"
          :per-page="urlQuery.pageSize"
        ></b-pagination>
      </div>
    </b-card>
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  // useContext,
  // useFetch,
  // watch,
  toRefs,
  useRoute,
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
    const data = reactive({
      breadcrumbs: [
        {
          text: 'Gói dịch vụ',
        },
      ],
      isCheck: true,
      listAgency: [],
      sorts: [],
      status: [],
      fields: [
        {
          key: 'index',
          label: 'STT',
        },
        {
          key: 'name',
          label: 'Mã kích hoạt',
        },
        {
          key: 'exp',
          label: 'Ngày kích hoạt',
        },
        {
          key: 'status',
          label: 'Ngày hết hạn',
        },
        {
          key: 'isActive',
          label: 'Trạng thái',
        },
        {
          key: 'limitExam',
          label: 'Số câu hỏi đã tạo',
        },
        {
          key: 'price',
          label: 'Số đề thi đã tạo',
        },
      ],
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
    })
    // const { fetch } = useFetch(async () => {
    //   $loader()
    //   const { data: result } = await userAPI.getAgency(data.urlQuery)
    //   data.listAgency = result?.object?.items
    //   data.total = result?.object?.total
    //   $loader().close()
    // })
    // fetch()
    // const statusTypeAgencies = async () => {
    //   $loader()
    //   const { data: result } = await userAPI.getStatusAgencies()
    //   data.status = result?.object?.items
    //   $loader().close()
    // }
    // statusTypeAgencies()
    // const sortTypeAgencies = async () => {
    //   $loader()
    //   const { data: result } = await userAPI.getSortType()
    //   data.sorts = result?.object?.items
    //   $loader().close()
    // }
    // sortTypeAgencies()
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
    showModal(id) {
      this.$bvModal.show(id)
    },
    hideModal(id) {
      this.$bvModal.hide(id)
    },
    reset() {
      this.isCheck = true
    },
    check() {
      this.isCheck = false
    },
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
