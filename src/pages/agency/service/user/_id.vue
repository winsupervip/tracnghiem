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
            <b-button variant="outline-primary btn-sm">
              Thêm tài khoản</b-button
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
        <!-- <b-table striped hover :items="listActived" :fields="fields">
          <template #cell(actions)="data">
            <b-dropdown class="m-md-2" no-caret size="sm">
              <template #button-content>
                <b-icon-three-dots></b-icon-three-dots>
              </template>
              <b-dropdown-item
                :to="{
                  path: `/agency/service/detail/${data.item.hashId}`,
                }"
              >
                <b-icon-file-text></b-icon-file-text>
                Chi tiết
              </b-dropdown-item>
              <b-dropdown-item
                @click="updateActive(data.item.hashId, data.item.isActive)"
              >
                <b-icon-check2-circle></b-icon-check2-circle>
                {{ data.item.isActive ? 'Tạm dừng' : 'Kích hoạt' }}
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template #cell(isActive)="data">
            {{ data.item.isActive ? 'Hoạt động' : 'Không hoạt động' }}
          </template>
          <template #cell(index)="data"> {{ data.index + 1 }} </template>
          <template #cell(createDate)="data">
            {{ data.item.createDate | formatDurationDay }}
          </template>
        </b-table> -->
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
import userAPI from '@/api/agency'
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
      // fields: [
      //   {
      //     key: 'index',
      //     label: 'STT',
      //   },
      //   {
      //     key: 'code',
      //     label: 'Mã kích hoạt',
      //   },
      //   {
      //     key: 'limitActive',
      //     label: 'Số lượng kích hoạt',
      //   },
      //   {
      //     key: 'isActive',
      //     label: 'Trạng thái',
      //   },
      //   {
      //     key: 'numberActived',
      //     label: 'Số lượt người dùng',
      //   },
      //   {
      //     key: 'createDate',
      //     label: 'Ngày cấp',
      //   },
      //   {
      //     key: 'actions',
      //     label: 'Chức năng',
      //   },
      // ],
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
      listAccount: [],
      HashId: '',
    })
    const id = computed(() => route.value.params.id)
    data.HashId = id
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getAgenciesListAccounts(
        data.HashId,
        data.urlQuery
      )
      data.listAccounts = result?.object?.items
      data.total = result?.object?.total
      console.log(data.listActived)
      $loader().close()
    })
    const sortTypeAgencies = async () => {
      $loader()
      const { data: result } = await userAPI.getSortAgenciesActived()
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
    loadOptions({ action, searchQuery, callback }) {},
    async updateActive(hashId, status) {
      if (status) {
        try {
          const { data } = await userAPI.updateAgenciesListDeactive(hashId)
          this.$handleError(data)
          this.search()
        } catch (err) {
          this.$handleError(err, () => {
            console.log(err)
          })
        }
      } else {
        try {
          const { data } = await userAPI.updateAgenciesListActive(hashId)
          this.$handleError(data)
          this.search()
        } catch (err) {
          this.$handleError(err, () => {
            console.log(err)
          })
        }
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
