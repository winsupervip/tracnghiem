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
        <b-table striped hover :items="listAgency" :fields="fields">
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
                @click="updateStatus(data.item.hashId, data.item.status)"
              >
                <b-icon-check2-circle></b-icon-check2-circle>
                {{ data.item.status === 1 ? 'Tạm dừng' : 'Kích hoạt' }}
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
        },
      ],
      listAgency: [],
      sorts: [],
      status: [],
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
          label: 'Ngày cấp',
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
        createDateFrom: '',
        createDateTo: '',
      },
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getAgency(data.urlQuery)
      data.listAgency = result?.object?.items
      data.total = result?.object?.total
      $loader().close()
    })
    fetch()
    const statusTypeAgencies = async () => {
      $loader()
      const { data: result } = await userAPI.getStatusAgencies()
      data.status = result?.object?.items
      $loader().close()
    }
    statusTypeAgencies()
    const sortTypeAgencies = async () => {
      $loader()
      const { data: result } = await userAPI.getSortType()
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
    loadOptions({ action, searchQuery, callback }) {},
    async updateStatus(hashId, status) {
      if (status === 1) {
        try {
          const { data } = await userAPI.updateAgenciesDeactivePending(hashId)
          this.$handleError(data)
          this.search()
        } catch (err) {
          this.$handleError(err, () => {
            console.log(err)
          })
        }
      } else {
        try {
          const { data } = await userAPI.updateAgenciesActive(hashId)
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
