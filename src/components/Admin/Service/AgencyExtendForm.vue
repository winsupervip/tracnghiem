<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <p>Ngày hết hạn cũ: {{}}</p>
      <ValidationProvider
        :name="$t('admin.service.expireDateNew')"
        rules="required|max:255|integer"
      >
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('admin.service.expireDateNew') + ' (*)'"
          label-for="expireDateNew"
          class="mb-3"
        >
          <b-form-input
            id="expireDateNew"
            v-model="dataSubmit.expireDate"
            type="text"
            :state="errors[0] ? false : valid ? true : null"
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
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
            v-model="dataSubmit.limitActive"
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
            v-model="dataSubmit.note"
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
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
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
    const data = reactive({
      dataSubmit: {
        HashId: props.id,
        expireDate: '',
        limitActive: 0,
        note: '',
      },
    })
    return {
      ...toRefs(data),
    }
  },
  methods: {
    loadOptions({ action, searchQuery, callback }) {},
    async onSubmit() {
      try {
        const { data } = await userAPI.updateServiceAgencies(this.dataSubmit)
        handleError(data, () => {
          this.$emit('submit')
        })
      } catch (err) {
        handleError(err, () => {
          console.log(err)
        })
      }
    },
  },
})
</script>
