<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card class="mb-3" sub-title="Tìm kiếm gói dịch vụ">
      <b-form>
        <b-form-row class="row">
          <b-form-group
            label="Tìm kiếm tên gói"
            class="
              col-12 col-md-6 col-lg-4 col-xl-3
              mb-3
              position-relative
              overflow-hidden
            "
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
            label="Từ ngày"
            class="
              col-12 col-md-6 col-lg-4 col-xl-3
              mb-3
              position-relative
              overflow-hidden
            "
          >
            <b-form-input
              id="keyword"
              v-model="urlQuery.fromDate"
              trim
              type="date"
              placeholder="Từ ngày"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            label="Ngày tạo đến"
            class="
              col-12 col-md-6 col-lg-4 col-xl-3
              mb-3
              position-relative
              overflow-hidden
            "
          >
            <b-form-input
              id="keyword"
              v-model="urlQuery.toDate"
              trim
              type="date"
              placeholder="Ngày tạo đến"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            label="Trạng thái"
            class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3"
          >
            <treeselect
              id="status"
              v-model="urlQuery.isActive"
              :multiple="false"
              :options="status"
              :load-options="loadOptions"
              placeholder="Trạng thái"
            />
          </b-form-group>
          <b-form-group
            label="Sắp xếp"
            class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3"
          >
            <treeselect
              id="sort"
              v-model="urlQuery.sort"
              :multiple="false"
              :options="sorts"
              :load-options="loadOptions"
              placeholder="Sắp xếp"
            />
          </b-form-group>
          <div class="d-flex justify-content-end form-search-action col-12">
            <b-button variant="outline-primary" @click="search()">
              <b-icon-filter></b-icon-filter>
              Áp dụng
            </b-button>
            <b-button variant="primary" @click="showModal('modal-add')"
              >Thêm gói</b-button
            >
          </div>
        </b-form-row>
      </b-form>
    </b-card>
    <b-card sub-title="Danh sách gói dịch vụ">
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <b-table
          responsive
          striped
          hover
          :items="listServices"
          :fields="fields"
        >
          <template #cell(actions)="data">
            <b-dropdown class="dropdown-action m-auto" no-caret size="sm">
              <template #button-content>
                <b-icon-three-dots></b-icon-three-dots>
              </template>
              <b-dropdown-item
                :to="{
                  path: `/admin/service/package/${data.item.hashId}`,
                }"
              >
                <b-icon-file-text></b-icon-file-text>
                Chi tiết
              </b-dropdown-item>
              <b-dropdown-item v-b-modal.modal-edit @click="edit(data.item)">
                <b-icon-pencil-square></b-icon-pencil-square>
                Cập nhật
              </b-dropdown-item>
              <b-dropdown-item @click="updateActive(data.item)">
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
    <b-modal
      id="modal-add"
      ref="modal"
      title="Thông tin gói dịch vụ"
      hide-footer
      @shown="shown"
      @hide="hide"
    >
      <ValidationObserver v-if="doShow" ref="form" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider rules="required|max:255" name="Tên gói">
            <b-form-group
              slot-scope="{ valid, errors }"
              label="Tên gói (*)"
              label-for="name"
              class="mb-3"
            >
              <b-form-input
                id="name"
                v-model="name"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            name="Thời hạn (ngày) (*)"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              label="Thời hạn (ngày) (*)"
              label-for="exp"
              class="mb-3"
            >
              <b-form-input
                id="exp"
                v-model="exp"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            name="Số lượng câu hỏi (*)"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              label="Số lượng câu hỏi (*)"
              label-for="limitQuestion"
              class="mb-3"
            >
              <b-form-input
                id="limitQuestion"
                v-model="limitQuestion"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            name="Số lượng đề thi (*)"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              label="Số lượng đề thi (*)"
              label-for="limitExam"
              class="mb-3"
            >
              <b-form-input
                id="limitExam"
                v-model="limitExam"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            name="Giá tiền (*)"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              label="Giá tiền (*)"
              label-for="price"
              class="mb-3"
            >
              <b-form-input
                id="price"
                v-model="price"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-form-group label="Trạng thái" label-for="status" class="mb-3">
            <treeselect
              id="status"
              v-model="isActive"
              :multiple="false"
              :options="status"
              :load-options="loadOptions"
            />
          </b-form-group>
          <b-form-group class="mt-3" label-for="checkbox-1">
            <b-form-checkbox id="checkbox-1" v-model="isPublic">
              User tự động đăng ký?
            </b-form-checkbox>
          </b-form-group>
          <ValidationProvider rules="max:1000">
            <b-form-group label="ghi chú" label-for="note">
              <b-form-textarea id="note" v-model="note"></b-form-textarea>
            </b-form-group>
          </ValidationProvider>
          <footer class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="hideModal('modal-add')"
            >
              Hủy Bỏ
            </button>
            <button type="submit" class="btn btn-primary">Lưu</button>
          </footer>
        </b-form>
      </ValidationObserver>
    </b-modal>
    <b-modal
      id="modal-edit"
      ref="modal"
      title="Thông tin gói dịch vụ"
      hide-footer
      @shown="shownEdit"
      @hide="hideEdit"
      @oke="onEdit"
    >
      <ValidationObserver
        v-if="doShowEdit"
        ref="form"
        v-slot="{ handleSubmit }"
      >
        <b-form @submit.prevent="handleSubmit(onEdit)">
          <ValidationProvider rules="required|max:255" name="Tên gói">
            <b-form-group
              slot-scope="{ valid, errors }"
              label="Tên gói (*)"
              label-for="name"
              class="mb-3"
            >
              <b-form-input
                id="name"
                v-model="name"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            name="Thời hạn (ngày) (*)"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              label="Thời hạn (ngày) (*)"
              label-for="exp"
              class="mb-3"
            >
              <b-form-input
                id="exp"
                v-model="exp"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            name="Số lượng câu hỏi (*)"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              label="Số lượng câu hỏi (*)"
              label-for="limitQuestion"
              class="mb-3"
            >
              <b-form-input
                id="limitQuestion"
                v-model="limitQuestion"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            name="Số lượng đề thi (*)"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              label="Số lượng đề thi (*)"
              label-for="limitExam"
              class="mb-3"
            >
              <b-form-input
                id="limitExam"
                v-model="limitExam"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            name="Giá tiền (*)"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              label="Giá tiền (*)"
              label-for="price"
              class="mb-3"
            >
              <b-form-input
                id="price"
                v-model="price"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-form-group label="Trạng thái" label-for="status" class="mb-3">
            <treeselect
              id="status"
              v-model="isActive"
              :multiple="false"
              :options="status"
              :load-options="loadOptions"
            />
          </b-form-group>
          <b-form-group class="mt-3" label-for="checkbox-1">
            <b-form-checkbox id="checkbox-1" v-model="isPublic">
              User tự động đăng ký?
            </b-form-checkbox>
          </b-form-group>
          <ValidationProvider rules="max:1000">
            <b-form-group label="ghi chú" label-for="note">
              <b-form-textarea id="note" v-model="note"></b-form-textarea>
            </b-form-group>
          </ValidationProvider>
          <footer class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="hideModal('modal-edit')"
            >
              Hủy Bỏ
            </button>
            <button type="submit" class="btn btn-primary">Lưu</button>
          </footer>
        </b-form>
      </ValidationObserver>
    </b-modal>
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
      isActive: null,
      name: '',
      exp: null,
      limitQuestion: null,
      limitExam: null,
      price: null,
      isPublic: false,
      note: '',
      hashId: '',
      doShow: false,
      doShowEdit: false,
      sorts: [],
      fields: [
        {
          key: 'index',
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
          class: 'col-action',
        },
      ],
      listActive: [
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
          id: false,
          label: 'Không hoạt động',
        },
        {
          id: true,
          label: 'Hoạt động',
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
    fetch()
    const sortTypeService = async () => {
      $loader()
      const { data: result } = await userAPI.getSortType()
      data.sorts = result?.object?.items
      $loader().close()
    }
    sortTypeService()
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
    async handleDelete(hashId) {
      if (!window.confirm('Chắc chưa ba ?')) {
        return
      }
      try {
        const { data } = await userAPI.deleteService(hashId)
        this.$handleError(data)
        this.search()
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    async updateActive(item) {
      const result = {
        name: item.name,
        exp: item.exp,
        limitQuestion: item.limitQuestion,
        limitExam: item.limitExam,
        price: item.price,
        isActive: !item.status,
        isPublic: item.isPublic,
        hashId: item.hashId,
        note: '',
      }
      try {
        const { data } = await userAPI.updateService(result)
        this.$handleError(data)
        this.search()
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    showModal(id) {
      this.$bvModal.show(id)
    },
    hideModal(id) {
      this.$bvModal.hide(id)
    },
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
    },
    shownEdit() {
      this.doShowEdit = true
    },
    hideEdit() {
      this.doShowEdit = false
    },
    async onSubmit() {
      const formData = {
        name: this.name,
        exp: Number(this.exp),
        limitQuestion: Number(this.limitQuestion),
        limitExam: Number(this.limitExam),
        price: Number(this.price),
        isActive: this.isActive,
        isPublic: this.isPublic,
        hashId: this.hashId,
        note: '',
      }
      try {
        const { data } = await userAPI.createService(formData)
        this.$handleError(data)
        // this.resetDataForm()
        this.search()
        this.hideModal('modal-add')
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    edit(item) {
      this.name = item.name
      this.exp = item.exp
      this.limitQuestion = item.limitQuestion
      this.limitExam = item.limitExam
      this.price = item.price
      this.isActive = item.status
      this.isPublic = item.isPublic
      this.hashId = item.hashId
      this.note = ''
    },
    async onEdit() {
      const result = {
        name: this.name,
        exp: this.exp,
        limitQuestion: this.limitQuestion,
        limitExam: this.limitExam,
        price: this.price,
        isActive: !!this.isActive,
        isPublic: this.isPublic,
        hashId: this.hashId,
        note: '',
      }
      console.log(result)
      try {
        const { data } = await userAPI.updateService(result)
        this.$handleError(data)
        this.hideModal('modal-edit')
        console.log('1', result)
        // this.resetDataForm()
        console.log('2', result)
        this.search()
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    // resetDataForm() {
    //   this.isActive= null,
    //   this.name= '',
    //   this.exp= null,
    //   this.limitQuestion= null,
    //   this.limitExam= null,
    //   this.price=null,
    //   this.isPublic= false,
    //   this.note='',
    // }
  },
})
</script>
