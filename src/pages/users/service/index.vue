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
                  v-model="code"
                  type="text"
                  trim
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
        <b-button variant="outline-dark mb-3" type="submit" @click="onSubmit"
          >Xác nhận</b-button
        >
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
          <h3 class="font-bold">{{ service.serviceName }}</h3>
        </b-card-text>
        <b-card-text>
          <b>Ngày kích hoạt: {{ service.activeDate | formatDurationDay }}</b>
        </b-card-text>
        <b-card-text>
          <b>Ngày kết thúc: {{ service.expireDate | formatDurationDay }}</b>
        </b-card-text>
        <b-button variant="outline-dark mb-3" @click="hide">Đóng</b-button>
      </b-card>
    </b-modal>
    <b-card>
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <b-table striped hover :items="listServices" :fields="fields">
          <template #cell(index)="data">
            {{ data.index + 1 + (urlQuery.page - 1) * 10 }}
          </template>
          <template #cell(activeDate)="data">
            {{ data.item.activeDate | formatDurationDay }}
          </template>
          <template #cell(expireDate)="data">
            {{ data.item.expireDate | formatDurationDay }}
          </template>
          <template #cell(isActive)="data">
            {{ data.item.isActive ? 'Hoạt động' : 'Không hoạt động' }}
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
  useContext,
  useFetch,
  toRefs,
  watch,
  useRoute,
} from '@nuxtjs/composition-api'
import userAPI from '@/api/user.js'
export default defineComponent({
  auth: true,
  components: {},
  layout: 'dashboard',
  setup() {
    const { $loader } = useContext()
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1
    const data = reactive({
      breadcrumbs: [
        {
          text: 'Gói dịch vụ',
        },
      ],
      code: '',
      isCheck: true,
      listServices: [],
      fields: [
        {
          key: 'index',
          label: 'STT',
        },
        {
          key: 'code',
          label: 'Mã kích hoạt',
        },
        {
          key: 'activeDate',
          label: 'Ngày kích hoạt',
        },
        {
          key: 'expireDate',
          label: 'Ngày hết hạn',
        },
        {
          key: 'isActive',
          label: 'Trạng thái',
        },
        {
          key: 'numberQuestionCreated',
          label: 'Số câu hỏi đã tạo',
        },
        {
          key: 'numberExamCreated',
          label: 'Số đề thi đã tạo',
        },
      ],
      currentPage: queryPage,
      total: 0,
      urlQuery: {
        page: 1,
        pageSize: 10,
        keyword: '',
      },
      service: {},
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getListService(data.urlQuery)
      data.listServices = result?.object?.items
      data.total = result?.object?.total
      $loader().close()
    })
    fetch()
    const search = () => {
      data.urlQuery.page = 1
      fetch()
    }
    watch(
      () => data.urlQuery.page,
      () => {
        fetch()
      }
    )
    return {
      ...toRefs(data),
      search,
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
    async onSubmit() {
      try {
        const { data } = await userAPI.createCodeActive({ code: this.code })
        this.$handleError(data)
        this.service = data?.object
        this.isCheck = false
        this.search()
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    hide() {
      this.hideModal('modal-edit')
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
