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
              v-model="urlQuery.activeDateFrom"
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
              v-model="urlQuery.activeDateTo"
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
          <div
            class="
              col-12 col-md-3
              mb-3
              d-flex
              justify-content-around
              align-items-end
            "
          >
            <b-button variant="outline-primary btn-sm" @click="search()">
              <b-icon-filter></b-icon-filter>
              Áp dụng
            </b-button>
          </div>
        </b-form-row>
      </b-form>
    </b-card>

    <b-card>
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <b-table striped hover :items="listAccount" :fields="fields">
          <template #cell(actions)="data">
            <b-dropdown class="m-md-2" no-caret size="sm">
              <template #button-content>
                <b-icon-three-dots></b-icon-three-dots>
              </template>
              <b-dropdown-item>
                <b-icon-file-text></b-icon-file-text>
                Danh sách tài khoản
              </b-dropdown-item>
              <b-dropdown-item @click="updateStatus(data.item.hashId)">
                <b-icon-check2-circle></b-icon-check2-circle>
                {{
                  data.item.status === 1
                    ? 'Hủy kích hoạt'
                    : data.item.status === 2
                    ? 'Kích hoạt'
                    : 'Giải quyết'
                }}
              </b-dropdown-item>
              <b-dropdown-item
                v-b-modal.modal-prevent-closing
                @click="handleSubmit(data.item.hashId)"
              >
                <b-icon-pencil-square></b-icon-pencil-square>
                Gia hạn
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="handleDelete(data.item.hashId)">
                <b-icon-trash></b-icon-trash>
                Xóa
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template #cell(status)="data">
            {{
              data.item.status === 1
                ? 'Active'
                : data.item.status === 2
                ? 'Deactive'
                : 'Pending'
            }}
          </template>
          <template #cell(createDate)="data">
            {{ data.item.createDate | formatDurationDay }}
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
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Thông tin gói dịch vụ"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <AgencyDetailForm :id="serviceHashId" />
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
import AgencyDetailForm from '@/components/Admin/Service/AgencyDetailForm.vue'
export default defineComponent({
  auth: true,
  components: { AgencyDetailForm },
  layout: 'dashboard',
  middleware: ['isAdmin'],
  setup() {
    const { $loader } = useContext()
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1
    const id = route.value.params.id

    console.log('id', id)
    const data = reactive({
      serviceHashId: 'emecauxop',
      breadcrumbs: [
        {
          text: 'Danh sách gói dịch vụ',
        },
      ],
      listAccount: [],
      sorts: [],
      status: [],
      fields: [
        {
          label: 'STT',
        },
        {
          key: '',
          label: 'Tài Khoản',
        },
        {
          key: '',
          label: 'Ngày kích hoạt',
        },
        {
          key: '',
          label: 'Ngày hết hạn',
        },
        {
          key: '',
          label: 'Trạng thái',
        },
        {
          key: '',
          label: 'Số câu hỏi đã tạo',
        },
        {
          key: 'numberActived',
          label: 'Số đề thi đã tạo',
        },
        {
          key: 'actions',
          label: 'Chức năng',
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
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getServiceDetailAgencies(
        'emecauxop',
        data.urlQuery
      )
      data.listAccount = result?.object?.items
      data.total = result?.object?.total
      $loader().close()
    })
    fetch()
    const statusTypeAgencies = async () => {
      $loader()
      const { data: result } = await userAPI.getServiceStatusAgencies()
      data.status = result?.object?.items
      $loader().close()
    }
    statusTypeAgencies()
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
    async handleDelete(hashId) {
      if (!window.confirm('Bạn thực sự muốn xóa?')) {
        return
      }
      try {
        const { data } = await userAPI.deleteServiceAgencies(hashId)
        this.$handleError(data)
        this.search()
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    async updateStatus(hashId, status) {
      if (status === 1) {
        console.log('hashId ', hashId, ' status ', status)
        try {
          const { data } = await userAPI.updateServiceAgenciesActive(hashId)
          this.$handleError(data)
          this.search()
        } catch (err) {
          this.$handleError(err, () => {
            console.log(err)
          })
        }
      } else {
        console.log('hashId ', hashId, ' status ', status)
        try {
          const { data } = await userAPI.updateServiceAgenciesDeactivePending(
            hashId
          )
          this.$handleError(data)
          this.search()
        } catch (err) {
          this.$handleError(err, () => {
            console.log(err)
          })
        }
      }
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
