<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card class="mb-3">
      <b-form>
        <b-form-row class="row">
          <b-form-group class="col-12 col-md-3 mb-3">
            <b-form-input
              id="keyword"
              trim
              type="search"
              placeholder="Tìm kiếm tên gói"
            ></b-form-input>
          </b-form-group>
          <b-form-group class="col-12 col-md-3 mb-3">
            <treeselect
              id="categories"
              :multiple="false"
              :load-options="loadOptions"
              placeholder="Ngày tạo từ"
            />
          </b-form-group>
          <b-form-group class="col-12 col-md-3 mb-3">
            <treeselect
              id="paymentTypes"
              :multiple="false"
              :load-options="loadOptions"
              placeholder="Ngày tạo đến"
            />
          </b-form-group>

          <b-form-group class="col-12 col-md-3 mb-3">
            <treeselect
              id="status"
              :multiple="false"
              :load-options="loadOptions"
              placeholder="Trạng thái"
            />
          </b-form-group>
          <b-form-group class="col-12 col-md-3 mb-3">
            <treeselect
              id="sort"
              v-model="urlQuery.sortType"
              :multiple="false"
              :options="sorts"
              :load-options="loadOptions"
              placeholder="Sắp xếp"
            />
          </b-form-group>
          <div
            class="col-12 col-md-3 mb-3 d-flex justify-content-around align-items-end"
          >
            <b-button
              v-b-modal.modal-prevent-closing
              variant="outline-primary btn-sm"
              >Thêm gói</b-button
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
import userAPI from '@/api/user'
import ServiceTable from '@/components/Service/ServiceTable.vue'
export default defineComponent({
  auth: true,
  components: { ServiceTable },
  layout: 'dashboard',
  middleware: ['isAdmin'],
  setup() {
    const { $loader } = useContext()
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1
    const data = reactive({
      breadcrumbs: [
        {
          text: 'Danh sách gói dịch vụ',
        },
      ],
      listServices: [],
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
        pageSize: 10,
        sortType: 1,
      },
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getServices(data.urlQuery)
      data.listServices = result?.object?.items
      data.total = result?.object?.total
      $loader().close()
    })
    const sortTypeService = async () => {
      $loader()
      const { data: result } = await userAPI.getSortType()
      data.sorts = result?.object?.items
      $loader().close()
    }
    sortTypeService()
    watch(
      () => data.urlQuery.page,
      () => {
        fetch()
      }
    )
    watch(
      () => data.urlQuery.sortType,
      () => {
        fetch()
      }
    )
    return {
      ...toRefs(data),
    }
  },
  methods: {
    async handleDelete(hashId) {
      try {
        const { data } = await userAPI.deleteService(hashId)
        const index = this.listServices.findIndex(
          (item) => item.hashId === hashId
        )
        this.listServices.splice(index, 1)
        console.log('list ', this.list)
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
      console.log(data)
      try {
        const { result } = await userAPI.postService(data)
        this.$handleError(result)
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
      console.log(data)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
    loadOptions({ action, parentNode, callback }) {},
  },
})
</script>
