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
              v-model="urlQuery.createDateFrom"
              trim
              type="date"
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
              type="date"
              placeholder="Ngày cấp đến"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group class="col-12 col-md-3 mb-3">
            <treeselect
              id="status"
              v-model="urlQuery.status"
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
              type="date"
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
              type="date"
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
            <b-button variant="outline-primary btn-sm" @click="search()">
              <b-icon-filter></b-icon-filter>
              Áp dụng
            </b-button>
            <b-button
              variant="outline-primary btn-sm"
              @click="showModal('modal-add')"
              >Thêm đại lý</b-button
            >
          </div>
        </b-form-row>
      </b-form>
    </b-card>

    <b-card>
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <b-table striped hover :items="listPackage" :fields="fields">
          <template #cell(actions)="data">
            <b-dropdown class="m-md-2" no-caret size="sm">
              <template #button-content>
                <b-icon-three-dots></b-icon-three-dots>
              </template>
              <b-dropdown-item>
                <nuxt-link
                  :to="{
                    path: `/admin/service/${data.item.hashId}`,
                  }"
                >
                  <b-icon-file-text></b-icon-file-text>
                  Danh sách tài khoản
                </nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item
                @click="updateStatus(data.item.hashId, data.item.status)"
              >
                <b-icon-check2-circle></b-icon-check2-circle>
                {{ data.item.status === 2 ? 'Kích hoạt' : 'Hủy kích hoạt' }}
              </b-dropdown-item>
              <b-dropdown-item v-b-modal.modal-edit @click="edit(data.item)">
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
          <template #cell(index)="data">
            {{ data.index + 1 + (urlQuery.page - 1) * 10 }}
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
      id="modal-add"
      ref="modal"
      title="Thông tin gói dịch vụ"
      hide-footer
      @shown="shown"
      @hide="hide"
    >
      <ValidationObserver v-if="doShow" ref="form" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            rules="required|max:255"
            :name="$t('admin.service.agency')"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.agency') + ' (*)'"
              label-for="agencyId"
              class="mb-3"
            >
              <treeselect
                id="agencyId"
                v-model="agencyId"
                :multiple="false"
                :async="true"
                :load-options="loadOptions"
                :placeholder="$t('admin.service.comments')"
              />
              <b-form-invalid-feedback :state="valid">
                {{ errors ? errors[0] : '' }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
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
                  id="example-input"
                  v-model="expireDate"
                  type="text"
                  autocomplete="off"
                ></b-form-input>
                <b-form-datepicker
                  v-model="expireDate"
                  button-only
                  right
                  locale="vi-VN"
                  aria-controls="example-input"
                ></b-form-datepicker>
              </b-input-group>
              <b-form-invalid-feedback :state="valid">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            :name="$t('admin.service.limitActive')"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.limitActive') + ' (*)'"
              label-for="limitActive"
              class="mb-3"
            >
              <b-form-input
                id="limitActive"
                v-model="limitActive"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            :name="$t('admin.service.paymentAmount')"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.paymentAmount') + ' (*)'"
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
          <ValidationProvider rules="max:1000" :name="$t('admin.service.note')">
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.note')"
              label-for="note"
            >
              <b-form-textarea
                id="note"
                v-model="note"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-textarea>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <footer class="modal-footer">
            <button type="button" class="btn btn-secondary">Hủy Bỏ</button>
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
          <p>Ngày hết hạn cũ: {{ expireDate | formatDurationDay }}</p>
          <ValidationProvider
            rules="required|max:255"
            :name="$t('admin.service.expireDateNew')"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.expireDateNew') + ' (*)'"
              label-for="expireDate"
            >
              <b-input-group class="mb-1">
                <b-form-input
                  id="expireDate"
                  v-model="expireDate"
                  type="text"
                  autocomplete="off"
                ></b-form-input>
                <!-- <b-input-group-append> -->
                <b-form-datepicker
                  v-model="expireDate"
                  button-only
                  right
                  locale="vi-VN"
                  aria-controls="expireDate"
                ></b-form-datepicker>
                <!-- </b-input-group-append> -->
              </b-input-group>
              <b-form-invalid-feedback :state="valid">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            :name="$t('admin.service.limitActive')"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.limitActive') + ' (*)'"
              label-for="limitActive"
              class="mb-3"
            >
              <b-form-input
                id="limitActive"
                v-model="limitActive"
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
                v-model="note"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-textarea>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <footer class="modal-footer">
            <button type="button" class="btn btn-secondary">Hủy Bỏ</button>
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
  computed,
} from '@nuxtjs/composition-api'
import {
  ASYNC_SEARCH,
  LOAD_CHILDREN_OPTIONS,
  LOAD_ROOT_OPTIONS,
} from '@riophae/vue-treeselect'
import _ from 'lodash'
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
      agencyId: '',
      expireDate: '',
      price: 0,
      limitActive: 0,
      note: '',
      hashId: '',
      breadcrumbs: [
        {
          text: 'Danh sách gói dịch vụ',
          href: '/admin/service/',
        },
        {
          text: 'abc',
          active: true,
        },
      ],
      listPackage: [],
      sorts: [],
      status: [],
      fields: [
        {
          key: 'index',
          label: 'STT',
        },
        {
          key: 'agency.firstName',
          label: 'Đại lý',
        },
        {
          key: 'createDate',
          label: 'Ngày cấp',
        },
        {
          key: 'expireDate',
          label: 'Ngày hết hạn',
        },
        {
          key: 'status',
          label: 'Trạng thái',
        },
        {
          key: 'limitActive',
          label: 'Số lượt kích hoạt được cấp',
        },
        {
          key: 'numberActived',
          label: 'Số lượt user đã kích hoạt',
        },
        {
          key: 'agency.lastName',
          label: 'Người cấp',
        },
        {
          key: 'actions',
          label: 'Chức năng',
        },
      ],
      doShow: false,
      doShowEdit: false,
      currentPage: queryPage,
      total: 0,
      urlQuery: {
        page: 1,
        hashId: id,
        pageSize: 10,
        sort: 1,
        status: '',
        keyword: '',
        createDateFrom: '',
        createDateTo: '',
        expireDateFrom: '',
        expireDateTo: '',
      },
      serviceHashId: '',
    })
    data.serviceHashId = id
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getServiceDetailAgencies(
        data.serviceHashId,
        data.urlQuery
      )
      data.listPackage = result?.object?.items
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
      const { data: result } = await userAPI.getSortTypeAgencies()
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
    loadOptions({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        this.searchAsync(callback, searchQuery)
      } else if (action === LOAD_CHILDREN_OPTIONS) {
        // eslint-disable-next-line
      } else if (action === LOAD_ROOT_OPTIONS) {
        console.log('load root')
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
      } else {
        try {
          const { data } = await userAPI.updateServiceAgenciesActive(hashId)
          this.$handleError(data)
          this.search()
        } catch (err) {
          this.$handleError(err, () => {
            console.log(err)
          })
        }
      }
    },
    searchAsync: _.debounce(async function (callback, searchQuery) {
      try {
        const response = await userAPI.getSericeCategoryAgencies(
          this.axios,
          searchQuery
        )
        const options = response.data?.object?.items
        callback(null, options)
      } catch (err) {
        callback(null, [])
      }
    }, 200),
    async onSubmit() {
      const dataSubmit = {
        serviceHashId: this.serviceHashId,
        agencyId: this.agencyId,
        expireDate: this.expireDate,
        limitActive: Number(this.limitActive),
        price: Number(this.price),
        note: this.note,
      }
      try {
        const { data } = await userAPI.createServiceAgencies(dataSubmit)
        this.$handleError(data)
        this.hideModal('modal-add')
        this.search()
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    edit(item) {
      this.limitActive = item.limitActive
      this.expireDate = item.expireDate
      this.hashId = item.hashId
      this.note = item.note
      console.log('item ', item)
    },
    async onEdit() {
      const result = {
        hashId: this.hashId,
        expireDate: this.expireDate,
        limitActive: this.limitActive,
        note: this.note,
      }
      console.log(result)
      try {
        const { data } = await userAPI.updateServiceAgencies(result)
        this.$handleError(data)
        this.hideModal('modal-edit')
        this.search()
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
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
