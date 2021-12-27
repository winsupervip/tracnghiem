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
              Áp dụng
            </b-button>
            <b-button
              v-b-modal.modal-edit
              variant="outline-primary btn-sm"
              @click="onEdit()"
            >
              Thêm tài khoản</b-button
            >
          </div>
        </b-form-row>
      </b-form>
    </b-card>
    <b-modal
      id="modal-edit"
      ref="modal"
      :title="$t('admin.service.agencies.infoAgencies')"
      hide-footer
      @shown="showModal"
      @hide="hideModal"
      @oke="onSubmit"
    >
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            rules="required|max:255"
            :name="$t('admin.service.agencies.username')"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.agencies.username') + ' (*)'"
              label-for="userId"
              class="mb-3"
            >
              <treeselect
                id="userId"
                v-model="user.userId"
                :multiple="false"
                :async="true"
                :load-options="loadOptions"
                :placeholder="$t('admin.service.agencies.placeholder')"
              />
              <b-form-invalid-feedback :state="valid">
                {{ errors ? errors[0] : '' }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            :name="$t('admin.service.agencies.codeActive')"
            rules="required|max:255"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.agencies.codeActive') + ' (*)'"
              label-for="code"
              class="mb-3"
            >
              <b-form-input
                id="code"
                v-model="user.code"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            rules="max:1000"
            :name="$t('admin.service.agencies.note') + ' (*)'"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.agencies.note')"
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
            <button type="button" class="btn btn-secondary">Hủy Bỏ</button>
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
        <b-table striped hover :items="listAccounts" :fields="fields">
          <template #cell(actions)="data">
            <b-dropdown class="dropdown-action m-auto" no-caret size="sm">
              <template #button-content>
                <b-icon-three-dots></b-icon-three-dots>
              </template>
              <b-dropdown-item @click="updateActive(data.item.hashId)">
                <b-icon-check2-circle></b-icon-check2-circle>
                {{ data.item.isActive ? 'Tạm dừng' : 'Kích hoạt' }}
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
  computed,
  useRoute,
  toRefs,
  watch,
} from '@nuxtjs/composition-api'
import {
  ASYNC_SEARCH,
  LOAD_CHILDREN_OPTIONS,
  LOAD_ROOT_OPTIONS,
} from '@riophae/vue-treeselect'
import _ from 'lodash'
import agencyAPI from '@/api/agency'
export default defineComponent({
  auth: true,
  components: {},
  layout: 'dashboard',
  middleware: ['isAgency'],
  setup() {
    const { $loader } = useContext()
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1
    const data = reactive({
      breadcrumbs: [
        {
          text: 'Danh sách gói dịch vụ',
          href: '/agency/service/',
        },
        {
          text: 'abc',
          href: '/agency/service/detail/',
        },
        {
          text: 'Mã kích hoạt',
          active: true,
        },
      ],
      sorts: [],
      status: [
        { id: true, label: 'Hoạt động' },
        { id: false, label: 'Không hoạt động' },
      ],
      fields: [
        {
          key: 'index',
          label: 'STT',
        },
        {
          key: 'user.lastName',
          label: 'Tài khoản',
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
          key: 'codeCreated',
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
        pageSize: 10,
        sort: 1,
        status: '',
        keyword: '',
        activeDateFrom: '',
        activeDateTo: '',
      },
      listAccounts: [],
      hashId: '',
      user: {
        userId: '',
        code: '',
        note: '',
      },
    })
    const id = computed(() => route.value.params.id)
    data.hashId = id
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await agencyAPI.getUserAgencies(
        data.hashId,
        data.urlQuery
      )
      data.listAccounts = result?.object?.items
      data.total = result?.object?.total
      $loader().close()
    })
    const sortTypeAgencies = async () => {
      $loader()
      const { data: result } = await agencyAPI.getSortAgenciesActived()
      data.sorts = result?.object?.items
      $loader().close()
    }
    sortTypeAgencies()
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
    loadOptions({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        this.searchAsync(callback, searchQuery)
      } else if (action === LOAD_CHILDREN_OPTIONS) {
        // eslint-disable-next-line
      } else if (action === LOAD_ROOT_OPTIONS) {
        console.log('load root')
      }
    },
    searchAsync: _.debounce(async function (callback, searchQuery) {
      try {
        const response = await agencyAPI.getListUser(this.axios, searchQuery)
        const options = response.data?.object?.items
        callback(null, options)
      } catch (err) {
        callback(null, [])
      }
    }, 200),
    showModal(id) {
      this.$bvModal.show(id)
    },
    hideModal(id) {
      this.$bvModal.hide(id)
    },
    async updateActive(hashId) {
      try {
        const { data } = await agencyAPI.updateUserAgenciesActive(hashId)
        this.$handleError(data)
        this.search()
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    onEdit() {
      this.user = {
        userId: '',
        code: '',
        note: '',
      }
    },
    async onSubmit() {
      try {
        const { data } = await agencyAPI.createAccountServiceAgencies(this.user)
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
