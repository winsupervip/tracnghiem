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
              placeholder="Tìm kiếm tên gói"
            >
            </b-form-input>
            <b-icon-search
              v-show="!urlQuery.keyword"
              class="position-absolute btn-search"
            ></b-icon-search>
          </b-form-group>
          <b-form-group
            class="col-12 col-md-3 mb-3 position-relative overflow-hidden"
          >
            <b-form-input
              id="keyword"
              v-model="urlQuery.fromDate"
              trim
              type="search"
              placeholder="Ngày tạo từ"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            class="col-12 col-md-3 mb-3 position-relative overflow-hidden"
          >
            <b-form-input
              id="keyword"
              v-model="urlQuery.toDate"
              trim
              type="search"
              placeholder="Ngày tạo đến"
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
          <div
            class="col-12 col-md-3 mb-3 d-flex justify-content-around align-items-end"
          >
            <b-button variant="outline-primary btn-sm" @click="search()">
              <b-icon-filter></b-icon-filter>
              Áp dụng
            </b-button>
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
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <b-table striped hover :items="listServices" :fields="fields">
          <template #cell(actions)="data">
            <b-dropdown class="m-md-2" no-caret size="sm">
              <template #button-content>
                <b-icon-three-dots></b-icon-three-dots>
              </template>
              <b-dropdown-item @click="detail(data.item.hashId)">
                <b-icon-file-text></b-icon-file-text>
                Chi tiết
              </b-dropdown-item>
              <b-dropdown-item
                v-b-modal.modal-prevent-closing
                @click="handleUpdate(data.item.hashId)"
              >
                <b-icon-pencil-square></b-icon-pencil-square>
                Cập nhật
              </b-dropdown-item>
              <b-dropdown-item @click="updateActive(data.item.hashId)">
                <b-icon-check2-circle></b-icon-check2-circle>
                {{ data.item.status ? 'Hủy kích hoạt' : 'Kích hoạt' }}
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="handleDelete(data.item.hashId)">
                <b-icon-trash></b-icon-trash>
                Xóa
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template #cell(status)="data">
            {{ data.item.status ? 'Hoạt động' : 'Không hoạt động' }}
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
  useContext,
  reactive,
  useFetch,
  toRefs,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import userAPI from '@/api/service'
export default defineComponent({
  auth: true,
  components: {},
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
      sorts: [],
      isCheck: false,
      hashId: '',
      fields: [
        {
          label: 'STT',
        },
        {
          key: 'name',
          label: 'Tên gói',
        },
        {
          key: 'exp',
          label: 'Thời hạn (ngày)',
        },
        {
          key: 'status',
          label: 'Trạng thái',
        },
        {
          key: 'limitQuestion',
          label: 'Số câu hỏi',
        },
        {
          key: 'limitExam',
          label: 'Số đề thi',
        },
        {
          key: 'price',
          label: 'Giá tiền',
        },
        {
          key: 'createDate',
          label: 'Ngày tạo',
        },
        {
          key: 'actions',
          label: 'Chức năng',
        },
      ],
      listActive: [
        {
          id: '',
          label: 'Khác',
        },
        {
          id: 1,
          label: 'Hoạt động',
        },
        {
          id: 0,
          label: 'Không hoạt động',
        },
      ],
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
      total: 0,
      urlQuery: {
        page: 1,
        pageSize: 10,
        sort: 1,
        isActive: '',
        keyword: '',
        fromDate: '',
        toDate: '',
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
    const search = () => {
      fetch()
    }
    const render = () => {
      data.urlQuery.page = 1
      fetch()
    }
    watch(
      () => data.urlQuery.page,
      () => {
        fetch()
      }
    )
    // watch(
    //   () => data.urlQuery.sort,
    //   () => {
    //     fetch()
    //   }
    // )
    // watch(
    //   () => data.urlQuery.isActive,
    //   () => {
    //     fetch()
    //   }
    // )
    return {
      ...toRefs(data),
      search,
      render,
    }
  },
  methods: {
    async handleDelete(hashId) {
      if (!window.confirm('Chắc chưa ba ?')) {
        return
      }
      try {
        const { data } = await userAPI.deleteService(hashId)
        this.$handleError(data)
        this.render()
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    async updateActive(hashId) {
      try {
        const { result } = await userAPI.updateService(hashId)
        this.$handleError(result)
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
      const data = {
        name: this.name,
        exp: Number(this.exp),
        limitQuestion: Number(this.limitQuestion),
        limitExam: Number(this.limitExam),
        price: Number(this.price),
        status: this.isActive,
        isPublic: this.isPublic,
        note: '',
      }
      const dataUpdate = {
        name: this.name,
        exp: Number(this.exp),
        limitQuestion: Number(this.limitQuestion),
        limitExam: Number(this.limitExam),
        price: Number(this.price),
        isActive: this.valueStatus,
        isPublic: this.isPublic,
        hashId: this.hashId,
        note: '',
      }
      if (this.isCheck) {
        console.log('isCheck ', dataUpdate)
        try {
          const { result } = await userAPI.updateService(dataUpdate)
          this.isCheck = false
          this.render()
          this.$handleError(result)
        } catch (err) {
          this.$handleError(err, () => {
            console.log(err)
          })
        }
      } else {
        try {
          const { result } = await userAPI.createService(data)
          this.$handleError(result)
          this.render()
        } catch (err) {
          this.$handleError(err, () => {
            console.log(err)
          })
        }
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
  right: 10%;
  height: 100%;
}
</style>
