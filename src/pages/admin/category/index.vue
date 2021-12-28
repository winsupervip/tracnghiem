<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card>
      <b-form>
        <b-form-row class="row">
          <b-form-group label-for="keyword" class="col-12 col-md-6 my-1">
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
            class="
              col-12 col-md-6
              d-flex
              justify-content-end
              align-self-end
              my-1
            "
          >
            <button
              type="button"
              class="btn btn-primary"
              @click="showModal('modal-add')"
            >
              <b-icon-plus></b-icon-plus> {{ $t('admin.category.add') }}
            </button>
          </div>
        </b-form-row>
      </b-form>
    </b-card>
    <b-card :sub-title="$t('admin.category.title')" class="mt-3">
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <b-table responsive striped hover :items="items" :fields="fields">
          <template #cell(actions)="data">
            <b-dropdown class="dropdown-action m-auto" no-caret size="sm">
              <template #button-content>
                <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
              </template>
              <b-dropdown-item @click="edit(data.item.id)">
                <b-icon-pencil-square></b-icon-pencil-square>
                {{ $t('admin.category.edit') }}
              </b-dropdown-item>
              <b-dropdown-item @click="deleteCategory(data.item.id)">
                <b-icon-trash></b-icon-trash>
                {{ $t('admin.category.delete') }}
              </b-dropdown-item>
            </b-dropdown>
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
      size="xl"
      :title="$t('admin.category.add')"
      :ok-title="$t('admin.category.save')"
      :cancel-title="$t('admin.category.cancel')"
      hide-footer
      @shown="shown"
      @hide="hide"
    >
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <CategoryForm
            v-if="doShow"
            :data-form="dataFormAdd"
            @input="handleInput"
          />
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
      size="xl"
      :title="$t('admin.category.edit')"
      :ok-title="$t('admin.category.save')"
      :cancel-title="$t('admin.category.cancel')"
      hide-footer
      @shown="shownEdit"
      @hide="hideEdit"
    >
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onEdit)">
          <CategoryForm
            v-if="doShowEdit"
            :data-form="dataFormAdd"
            @input="handleInput"
          />
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
  reactive,
  toRefs,
  useContext,
  useFetch,
  watch,
} from '@nuxtjs/composition-api'

import adminApi from '@/api/adminApi'
import EmptyData from '@/components/EmptyData.vue'
import CategoryForm from '@/components/Admin/Category/CategoryForm.vue'

export default defineComponent({
  components: { EmptyData, CategoryForm },
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
          text: app.i18n.t('admin.category.title'),
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
          key: 'categoryName',
          label: 'Danh mục',
          sortable: true,
        },
        {
          key: 'parentName',
          label: 'Danh mục cấp trên',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Chức năng',
          class: 'col-action',
        },
      ],
      doShow: false,
      doShowEdit: false,
      dataFormAdd: {
        id: null,
        categoryName: '',
        parentId: null,
        seoTitle: '',
        seoDescription: '',
        seoAvatar: '',
        slug: '',
        htmlContent: '',
      },
    })
    const { fetch } = useFetch(async () => {
      $logger.info('Danh sách category')
      $loader()
      const { data: exams } = await adminApi.listCategory(data.urlQuery)
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
      try {
        const { data } = await adminApi.addCategory(this.dataFormAdd)
        this.$handleError(data)
        this.resetDataForm()
        this.search()
        this.hideModal('modal-add')
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    async edit(id) {
      try {
        const { data } = await adminApi.getCategory(id)
        this.dataFormAdd = data.object
        this.showModal('modal-edit')
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    async onEdit() {
      try {
        const { data } = await adminApi.editCategory(this.dataFormAdd)
        this.$handleError(data)
        this.resetDataForm()
        this.search()
        this.hideModal('modal-edit')
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    handleInput(inputData) {
      this.dataFormAdd = inputData
    },
    resetDataForm() {
      this.dataFormAdd = {
        categoryName: '',
        parentId: null,
        seoTitle: '',
        seoDescription: '',
        seoAvatar: '',
        slug: '',
        htmlContent: '',
      }
    },
    async deleteCategory(id) {
      if (!window.confirm('Bạn thực sự muốn xóa?')) {
        return
      }
      try {
        const { data } = await adminApi.deleteCategory(id)
        this.$handleError(data)
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
