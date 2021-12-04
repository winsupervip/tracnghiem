<template>
  <ValidationObserver v-slot="{ handleSubmit }">
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
            v-model="serviceHashId"
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
            <!-- <b-input-group-append> -->
            <b-form-datepicker
              v-model="expireDate"
              button-only
              right
              locale="en-US"
              aria-controls="example-input"
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
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  // useAsync,
  // useContext,
} from '@nuxtjs/composition-api'
import {
  ASYNC_SEARCH,
  LOAD_CHILDREN_OPTIONS,
  LOAD_ROOT_OPTIONS,
} from '@riophae/vue-treeselect'
import _ from 'lodash'
import userAPI from '@/api/service'
import handleError from '~/plugins/handle-error'
export default defineComponent({
  props: {
    id: {
      type: String,
      default: () => '',
    },
  },
  setup(props) {
    // const { $loader, $logger } = useContext()
    const data = reactive({
      serviceHashId: '',
      agencyId: props.id,
      expireDate: '',
      price: 0,
      limitActive: 0,
      note: '',
    })
    return {
      ...toRefs(data),
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
    async onSubmit() {
      const dataSubmit = {
        serviceHashId: this.agencyId,
        agencyId: this.serviceHashId,
        expireDate: this.expireDate,
        limitActive: Number(this.limitActive),
        price: Number(this.price),
        note: '',
      }
      try {
        const { data } = await userAPI.createServiceAgencies(dataSubmit)
        handleError(data, () => {
          this.$emit('submit')
        })
      } catch (err) {
        handleError(err, () => {
          console.log(err)
        })
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
  },
})
</script>
