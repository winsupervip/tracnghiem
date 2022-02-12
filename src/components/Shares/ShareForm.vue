<template>
  <b-modal :id="`shared-${itemHashId}`" :title="$t('shared.title')" hide-footer>
    <form @submit.prevent="saveForm">
      <div class="mb-3">
        <b-form-checkbox v-model="setPassword">
          {{ $t('shared.password') }}
        </b-form-checkbox>
        <input
          v-model="password"
          type="password"
          class="form-control"
          :disabled="!setPassword"
        />
      </div>
      <div class="mb-3">
        <b-form-checkbox v-model="setExpiration">
          {{ $t('shared.expiration') }}
        </b-form-checkbox>
        <input
          v-model="expiration"
          type="date"
          class="form-control"
          :disabled="!setExpiration"
        />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ $t('shared.submit') }}
      </button>
    </form>
  </b-modal>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import moment from 'moment'
export default defineComponent({
  props: {
    itemHashId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const data = reactive({
      setPassword: false,
      setExpiration: false,
      password: '',
      expiration: moment().format('YYYY-MM-DD'),
    })
    return {
      ...toRefs(data),
    }
  },
  methods: {
    saveForm() {
      const pwd = this.setPassword ? this.password : ''
      const exp = this.setExpiration ? this.expiration : null
      this.$emit('submit', {
        password: pwd,
        expiration: exp,
      })
    },
  },
})
</script>
