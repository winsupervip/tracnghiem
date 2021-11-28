<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider :name="$t('admin.configs.category.id')">
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('admin.configs.category.id')"
          label-for="id"
          class="mb-3"
        >
          <treeselect
            id="id"
            v-model="dataSubmit.id"
            :multiple="false"
            :options="parentItems"
            :load-options="loadOptions"
            :placeholder="$t('admin.configs.category.id')"
          />
          <b-form-invalid-feedback :state="valid">
            {{ errors ? errors[0] : '' }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        :name="$t('admin.configs.category.sortOrder')"
        rules="required|min:0"
      >
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('admin.configs.category.sortOrder') + ' (*)'"
          label-for="sortOrder"
          class="mb-3"
        >
          <b-form-input
            id="sortOrder"
            v-model="dataSubmit.sortOrder"
            type="number"
            :state="errors[0] ? false : valid ? true : null"
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider :name="$t('admin.configs.category.children')">
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('admin.configs.category.children')"
          label-for="children"
          class="mb-3"
        >
          <treeselect
            id="children"
            v-model="childItemsSelected"
            :multiple="true"
            :options="childItems"
            :load-options="loadOptions"
            :placeholder="$t('admin.configs.category.children')"
          />
          <b-form-invalid-feedback :state="valid">
            {{ errors ? errors[0] : '' }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <footer class="modal-footer">
        <button type="button" class="btn btn-secondary">Hủy Bỏ</button>
        <button type="submit" class="btn btn-primary">Lưu</button>
      </footer>
    </b-form>
  </ValidationObserver>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useAsync,
  useContext,
} from '@nuxtjs/composition-api'
import QuestionApi from '@/api/question-list-page'
import apiHome from '@/api/apiHome'
import handleError from '~/plugins/handle-error'
import adminApi from '~/api/adminApi'
export default defineComponent({
  setup() {
    const { $loader, $logger } = useContext()
    const data = reactive({
      parentItems: [],
      childItems: [],
      childItemsSelected: [],
      dataSubmit: {
        id: null,
        type: 'highlight',
        sortOrder: 0,
        children: [
          {
            id: 0,
            sortOrder: 0,
          },
        ],
      },
    })
    useAsync(async () => {
      $loader()
      $logger.info('load data exam')
      const [{ data: categories }] = await Promise.all([
        QuestionApi.getCategory(),
      ])
      data.parentItems = categories.object.items
      $loader().close()
    })
    return {
      ...toRefs(data),
    }
  },
  watch: {
    async 'dataSubmit.id'() {
      this.childItemsSelected = []
      await this.getChildByParent()
    },
  },
  created() {},
  methods: {
    loadOptions({ action, parentNode, callback }) {},
    async getChildByParent() {
      if (!this.dataSubmit.id) return
      try {
        const { data } = await apiHome.categoriesAtHomePage({
          parent: this.dataSubmit.id,
          recursive: 5,
        })
        this.$logger.info(data)
        this.childItems = data.object.items
      } catch (err) {
        handleError(err, () => {
          console.log(err)
        })
      }
    },
    async onSubmit() {
      if (this.childItemsSelected.length === 0) {
        this.$toast
          .error(this.$i18n.t('admin.configs.category.emptySelected'))
          .goAway(1500)
      } else {
        this.dataSubmit.children = this.childItemsSelected.map(function (
          value,
          index
        ) {
          return {
            id: value,
            sortOrder: index + 1,
          }
        })
        this.$logger.info(this.dataSubmit)

        try {
          const { data } = await adminApi.addConfigCategory(this.dataSubmit)
          handleError(data, () => {
            this.$emit('submit')
          })
        } catch (err) {
          handleError(err, () => {
            console.log(err)
          })
        }
      }
    },
  },
})
</script>
