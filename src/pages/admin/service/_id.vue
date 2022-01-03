<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card class="mb-3">
      <b-form>
        <b-form-row class="row">
          <b-form-group
            label="Tìm kiếm tên gói"
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
            label="Ngày cấp từ"
            class="col-12 col-md-3 mb-3 position-relative overflow-hidden"
          >
            <b-form-input
              id="keyword"
              v-model="urlQuery.activeDateFrom"
              trim
              type="date"
              placeholder="Ngày cấp từ"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            label="Ngày cấp đến"
            class="col-12 col-md-3 mb-3 position-relative overflow-hidden"
          >
            <b-form-input
              id="keyword"
              v-model="urlQuery.activeDateTo"
              trim
              type="date"
              placeholder="Ngày cấp đến"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group label="Trạng thái" class="col-12 col-md-3 mb-3">
            <treeselect
              id="status"
              v-model="urlQuery.isActive"
              :multiple="false"
              :options="status"
              :load-options="loadOptions"
              placeholder="Trạng thái"
            />
          </b-form-group>
          <b-form-group label="Sắp xếp" class="col-12 col-md-3 mb-3">
            <treeselect
              id="sort"
              v-model="urlQuery.sort"
              :multiple="false"
              :options="sorts"
              :load-options="loadOptions"
              placeholder="Sắp xếp"
            />
          </b-form-group>
          <div class="form-search-action col-12">
            <b-button variant="primary btn-sm" @click="search()">
              <b-icon-filter></b-icon-filter>
              Áp dụng
            </b-button>
          </div>
        </b-form-row>
      </b-form>
    </b-card>
    <b-modal
      id="modal-edit"
      ref="modal"
      :title="$t('admin.service.infoPackage')"
      hide-footer
      @shown="showModal"
      @hide="hideModal"
      @oke="onSubmit"
    >
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <p>Tài khoản: {{ user.email }}</p>
          <ValidationProvider
            rules="required|max:255"
            :name="$t('admin.service.expireDate')"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.expireDate') + ' (*)'"
              label-for="expireDate"
            >
              <b-input-group class="mb-1">
                <b-form-input
                  id="expireDate"
                  v-model="user.expireDate"
                  type="text"
                  autocomplete="off"
                ></b-form-input>
                <b-form-datepicker
                  v-model="user.expireDate"
                  button-only
                  right
                  locale="vi-VN"
                  aria-controls="expireDate"
                ></b-form-datepicker>
              </b-input-group>
              <b-form-invalid-feedback :state="valid">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            :name="$t('admin.service.numberQuestion')"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.numberQuestion') + ' (*)'"
              label-for="numberQuestion"
              class="mb-3"
            >
              <b-form-input
                id="numberQuestion"
                v-model="user.limitQuestion"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            :name="$t('admin.service.numberExam')"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.numberExam') + ' (*)'"
              label-for="numberExam"
              class="mb-3"
            >
              <b-form-input
                id="numberExam"
                v-model="user.limitExam"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider rules="max:1000" :name="$t('admin.service.note')">
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.note')"
              label-for="note"
            >
              <b-form-textarea
                id="note"
                v-model="user.note"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-textarea>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
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
    <b-card>
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <b-table responsive striped hover :items="listAccount" :fields="fields">
          <template #cell(actions)="data">
            <b-dropdown class="dropdown-action m-auto" no-caret size="sm">
              <template #button-content>
                <b-icon-three-dots></b-icon-three-dots>
              </template>
              <b-dropdown-item @click="updateStatus(data.item.hashId)">
                <b-icon-check2-circle></b-icon-check2-circle>
                {{ data.item.isActive ? 'Hủy kích hoạt' : 'Kích hoạt' }}
              </b-dropdown-item>
              <b-dropdown-item
                v-b-modal.modal-edit
                @click="onEdit(data.item.hashId)"
              >
                <b-icon-pencil-square></b-icon-pencil-square>
                Điều chỉnh gói
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="handleDelete(data.item.hashId)">
                <b-icon-trash></b-icon-trash>
                Xóa
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template #cell(isActive)="data">
            {{ data.item.isActive ? 'Hoạt động' : 'Không hoạt động' }}
          </template>
          <template #cell(index)="data">
            {{ data.index + 1 + (urlQuery.page - 1) * 10 }}
          </template>
          <template #cell(activeDate)="data">
            {{ data.item.activeDate | formatDurationDay }}
          </template>
          <template #cell(expireDate)="data">
            {{ data.item.expireDate | formatDurationDay }}
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
  computed,
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
    const id = computed(() => route.value.params.id)
    const data = reactive({
      breadcrumbs: [
        {
          text: 'Danh sách gói dịch vụ',
          href: '/admin/service/',
        },
        {
          text: 'abc',
          href: `/admin/service/package/${id.value}`,
        },
        {
          text: 'Đại lý Mr.bean',
          active: true,
        },
      ],
      listAccount: [],
      sorts: [],
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
      fields: [
        {
          key: 'index',
          label: 'STT',
        },
        {
          key: 'user.lastName',
          label: 'Tài Khoản',
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
        {
          key: 'actions',
          label: 'Chức năng',
          class: 'col-action',
        },
      ],
      currentPage: queryPage,
      total: 0,
      urlQuery: {
        page: 1,
        hashId: id,
        pageSize: 10,
        sort: 1,
        status: '',
        keyword: '',
        activeDateFrom: '',
        activeDateTo: '',
        isActive: '',
      },
      serviceHashId: '',
      user: {
        limitQuestion: 0,
        limitExam: 0,
        email: '',
        expireDate: '',
        hashId: '',
        note: '',
      },
    })
    data.serviceHashId = id
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getServiceListAccount(
        data.serviceHashId,
        data.urlQuery
      )
      data.listAccount = result?.object?.items
      data.total = result?.object?.total
      $loader().close()
    })
    fetch()
    const sortTypeAgencies = async () => {
      $loader()
      const { data: result } = await userAPI.getServiceAccountSort()
      data.sorts = result?.object?.items
      $loader().close()
    }
    sortTypeAgencies()
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
    showModal(id) {
      this.$bvModal.show(id)
    },
    hideModal(id) {
      this.$bvModal.hide(id)
    },
    async handleDelete(hashId) {
      if (!window.confirm('Bạn thực sự muốn xóa?')) {
        return
      }
      try {
        const { data } = await userAPI.deleteServiceUser(hashId)
        this.$handleError(data)
        this.search()
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    async updateStatus(hashId) {
      try {
        const { data } = await userAPI.updateServiceUserActive(hashId)
        this.$handleError(data)
        this.search()
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    async onEdit(hashId) {
      const { data: result } = await userAPI.getUserService(hashId)
      this.user = result?.object
      this.user.email = result?.object?.user?.email
    },
    async onSubmit() {
      try {
        const { data } = await userAPI.updateAccountService(this.user)
        this.$handleError(data)
        this.hideModal('modal-edit')
        this.search()
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },

    loadOptions({ action, searchQuery, callback }) {},
  },
})
</script>
<style lang="scss" scoped>
// .btn-search {
//   top: 0;
//   right: 10%;
//   height: 100%;
// }
</style>
