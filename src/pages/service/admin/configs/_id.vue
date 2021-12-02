<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card class="mb-3">
      <b-form>
        <b-form-row class="row">
          <b-form-group
            class="col-12 col-md-3 mb-3 position-relative overflow-hidden"
          >
            <b-form-input
              id="keyword"
              v-model="urlQuery.keyword"
              trim
              type="search"
              placeholder="Tìm kiếm đại lý"
            >
            </b-form-input>
            <button
              class="btn btn-primary position-absolute btn-search"
              type="button"
              @click="search()"
            >
              <b-icon-search></b-icon-search>
            </button>
          </b-form-group>
          <b-form-group
            class="col-12 col-md-3 mb-3 position-relative overflow-hidden"
          >
            <b-form-input
              id="keyword"
              v-model="urlQuery.createDateFrom"
              trim
              type="search"
              placeholder="Ngày cấp từ"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            class="col-12 col-md-3 mb-3 position-relative overflow-hidden"
          >
            <b-form-input
              id="keyword"
              v-model="urlQuery.createDateTo"
              trim
              type="search"
              placeholder="Ngày cấp đến"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group class="col-12 col-md-3 mb-3">
            <treeselect
              id="status"
              v-model="urlQuery.isActive"
              :multiple="false"
              :options="status"
              :load-options="loadOptions"
              placeholder="Trạng thái"
            />
          </b-form-group>
          <b-form-group class="col-12 col-md-3 mb-3">
            <treeselect
              id="sort"
              v-model="urlQuery.sort"
              :multiple="false"
              :options="sorts"
              :load-options="loadOptions"
              placeholder="Sắp xếp"
            />
          </b-form-group>
          <b-form-group
            class="col-12 col-md-3 mb-3 position-relative overflow-hidden"
          >
            <b-form-input
              id="keyword"
              v-model="urlQuery.expireDateFrom"
              trim
              type="search"
              placeholder="Ngày hết hạn từ"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            class="col-12 col-md-3 mb-3 position-relative overflow-hidden"
          >
            <b-form-input
              id="keyword"
              v-model="urlQuery.expireDateTo"
              trim
              type="search"
              placeholder="Ngày hết hạn đến"
            >
            </b-form-input>
          </b-form-group>
          <div
            class="
              col-12 col-md-3
              mb-3
              d-flex
              justify-content-around
              align-items-end
            "
          >
            <b-button
              v-b-modal.modal-prevent-closing
              variant="outline-primary btn-sm"
              >Thêm đại lý</b-button
            >
          </div>
        </b-form-row>
      </b-form>
    </b-card>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Thông tin gói dịch vụ"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Tên gói (*)"
          label-for="name-input"
          invalid-feedback="Chưa nhập tên gói"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Thời hạn (ngày) (*)"
          label-for="name-input"
          invalid-feedback="Chưa nhập thời hạn"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="exp"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Số lượng câu hỏi (*)"
          label-for="name-input"
          invalid-feedback="Chưa nhập số lượng câu hỏi"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="limitQuestion"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Số lượng đề thi (*)"
          label-for="name-input"
          invalid-feedback="Chưa nhập số lượng đề thi"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="limitExam"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Giá tiền(*)"
          label-for="name-input"
          invalid-feedback="Chưa nhập giá tiền"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="price"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Trạng thái">
          <treeselect
            id="status"
            v-model="valueStatus"
            :multiple="false"
            :options="status"
            placeholder=""
          />
        </b-form-group>
        <b-form-group class="mt-3">
          <b-form-checkbox id="checkbox-1" v-model="isPublic">
            User tự động đăng ký?
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label="Ghi chú" label-for="note-input">
          <b-form-textarea id="note-input" v-model="note"></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
    <b-card>
      <ServiceTable
        :list="listServices"
        :url-query="urlQuery"
        @deleteService="handleDelete"
      />
      <b-pagination
        v-model="urlQuery.page"
        class="pagination"
        align="center"
        :total-rows="total"
        :per-page="urlQuery.pageSize"
      ></b-pagination>
    </b-card>
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  reactive,
  useFetch,
  toRefs,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import userAPI from '@/api/service'
import ServiceTable from '@/components/Service/ServiceTableDetail.vue'
export default defineComponent({
  auth: true,
  components: { ServiceTable },
  layout: 'dashboard',
  middleware: ['isAdmin'],
  setup() {
    const { $loader } = useContext()
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1
    const id = route.value.params.id
    console.log('id', id)
    const data = reactive({
      breadcrumbs: [
        {
          text: 'Danh sách gói dịch vụ',
        },
      ],
      listPackage: [],
      valueStatus: null,
      name: '',
      exp: null,
      limitQuestion: null,
      limitExam: null,
      price: null,
      isPublic: false,
      note: '',
      nameState: null,
      submittedNames: [],
      sorts: [],
      status: [
        {
          id: '',
          label: 'Khác',
        },
        {
          id: true,
          label: 'Hoạt động',
        },
        {
          id: false,
          label: 'Không hoạt động',
        },
      ],
      currentPage: queryPage,
      total: 1,
      urlQuery: {
        page: 1,
        hashId: id,
        pageSize: 10,
        sort: 1,
        status: 1,
        keyword: '',
        createDateFrom: '',
        createDateTo: '',
        expireDateFrom: '',
        expireDateTo: '',
      },
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getServiceDetailAgencies(
        id,
        data.urlQuery
      )
      data.listPackage = result?.object?.items
      data.total = result?.object?.total
      console.log('list-package : ', data.listPackage)
      $loader().close()
    })
    fetch()
    const sortTypeService = async () => {
      $loader()
      const { data: result } = await userAPI.getSortType()
      data.sorts = result?.object?.items
      $loader().close()
    }
    sortTypeService()
    const search = () => {
      fetch()
    }
    watch(
      () => data.urlQuery.page,
      () => {
        fetch()
      }
    )
    watch(
      () => data.urlQuery.sort,
      () => {
        fetch()
      }
    )
    watch(
      () => data.urlQuery.isActive,
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
    async handleDelete(hashId) {
      if (!window.confirm('Bạn thực sự muốn xóa?')) {
        return
      }
      try {
        const { data } = await userAPI.deleteService(hashId)
        const index = this.listServices.findIndex(
          (item) => item.hashId === hashId
        )
        this.listServices.splice(index, 1)
        this.$handleError(data)
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name)
      const data = {
        name: this.name,
        exp: Number(this.exp),
        limitQuestion: Number(this.limitQuestion),
        limitExam: Number(this.limitExam),
        price: Number(this.price),
        isActive: this.isActive,
        isPublic: this.isPublic,
        note: this.note,
      }
      try {
        const { result } = await userAPI.createService(data)
        this.$handleError(result)
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
    loadOptions({ action, searchQuery, callback }) {},
  },
})
</script>
<style lang="scss" scoped>
.btn-search {
  top: 0;
  right: 10px;
  height: 100%;
}
</style>
