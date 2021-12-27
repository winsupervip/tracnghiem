<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card>
      <b-form>
        <b-form-row class="row">
          <b-form-group label-for="keyword" class="col-12 col-md-6">
            <div class="input-group">
              <input
                v-model="urlQuery.keyword"
                type="search"
                class="form-control"
                :placeholder="$t('admin.category.search')"
              />
              <button class="btn btn-primary" type="button" @click="search()">
                <b-icon-search></b-icon-search>
              </button>
            </div>
          </b-form-group>
          <div
            class="col-12 col-md-6 d-flex justify-content-end align-self-end"
          >
            <button
              type="button"
              class="btn btn-primary me-2"
              @click="showModal('modal-add')"
            >
              <b-icon-plus></b-icon-plus> {{ $t('admin.category.add') }}
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="clearAll"
            >
              <b-icon-trash></b-icon-trash>
              {{ $t('admin.configs.category.clear') }}
            </button>
          </div>
        </b-form-row>
      </b-form>
    </b-card>
    <b-card :sub-title="$t('admin.configs.category.title')" class="mt-3">
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <b-table striped hover :items="items" :fields="fields">
          <template #cell(actions)="data">
            <b-button @click="deleteCategory(data.item.id)">
              <b-icon-trash></b-icon-trash>
              {{ $t('admin.category.delete') }}
            </b-button>
          </template>
        </b-table>
        <div class="mt-2">
          <b-pagination
            v-if="total > urlQuery.pageSize"
            v-model="urlQuery.page"
            class="pagination"
            :total-rows="total"
            :per-page="urlQuery.pageSize"
            align="center"
          ></b-pagination>
        </div>
      </div>
    </b-card>
    <b-modal
      id="modal-add"
      size="md"
      hide-footer
      :title="$t('admin.category.add')"
    >
      <CategoryHomeForm @submit="onSubmit" @cancel="hideModal" />
    </b-modal>
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useContext,
  useFetch,
  watch,
} from '@nuxtjs/composition-api'

import adminApi from '@/api/adminApi'
import EmptyData from '@/components/EmptyData.vue'
import CategoryHomeForm from '~/components/Admin/Category/CategoryHomeForm.vue'

export default defineComponent({
  components: { EmptyData, CategoryHomeForm },
  layout: 'dashboard',
  auth: true,
  middleware: ['isAdmin'],
  setup() {
    const { app, $loader, $logger } = useContext()
    const data = reactive({
      breadcrumbs: [
        {
          text: app.i18n.t('admin.dashboard'),
          href: '/admin/dashboard',
        },
        {
          text: app.i18n.t('admin.configs.category.title'),
          active: true,
        },
      ],
      urlQuery: {
        page: 1,
        pageSize: 10,
        keyword: '',
      },
      items: [],
      total: 0,
      fields: [
        {
          key: 'id',
        },
        {
          key: 'type',
          label: 'Loại',
          sortable: true,
        },
        {
          key: 'createDate',
          label: 'Ngày tạo',
          sortable: true,
        },
        {
          key: 'categoryName',
          label: 'Danh mục',
        },
        {
          key: 'parentId',
          label: 'Nhóm',
        },
        {
          key: 'sortOrder',
          label: 'Thứ tự',
        },
        {
          key: 'actions',
          label: 'Chức năng',
        },
      ],
      dataForm: {},
    })
    const { fetch } = useFetch(async () => {
      $logger.info('Danh sách category')
      $loader()
      const { data: exams } = await adminApi.listConfigCategories(data.urlQuery)
      data.items = exams.object.items
      data.total = exams.object.total
      $loader().close()
    })

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
    showModal(id) {
      this.$bvModal.show(id)
    },
    hideModal() {
      this.$bvModal.hide('modal-add')
    },
    onSubmit() {
      this.$bvModal.hide('modal-add')
      this.search()
    },
    async deleteCategory(id) {
      try {
        const { data } = await adminApi.deleteConfigCategory(id)
        this.$handleError(data, () => {
          this.search()
        })
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    async clearAll() {
      if (!window.confirm('Bạn thực sự muốn xóa tất cả?')) return
      try {
        const { data } = await adminApi.clearAllConfigCategory('highlight')
        this.$handleError(data, () => {
          this.search()
        })
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
  },
})
</script>
