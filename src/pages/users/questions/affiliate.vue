<template>
  <div>
    <h3 class="p-headerQuestion">{{ $t('userInfo.introduce') }}</h3>
    <div v-if="refCode" class="mb-4">
      <b-card>
        <p>
          <b-icon icon="share" aria-hidden="true"></b-icon>
          {{ $t('info.codeIntroduce') }}: <b>{{ refCode }}</b>
        </p>
        <div class="input-group mb-3">
          <input type="text" class="form-control" readonly />
          <button class="btn btn-outline-primary">
            <b-icon icon="file-code" aria-hidden="true"></b-icon>
          </button>
        </div>
      </b-card>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4">
          <b-card>
            <Info :type="false" :check-ref-code="refCode" />
          </b-card>
        </div>
        <div class="col-12 col-md-8">
          <b-card>
            <FormAffiliate :check-ref-code="refCode" />
          </b-card>
        </div>
        <div class="col-12 col-md-4">
          <b-card sub-title="Thông tin tổng quan">
            <CountShare :type="false" :check-ref-code="refCode" />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  toRefs,
  useFetch,
  reactive,
  useContext,
} from '@nuxtjs/composition-api'
import userAPI from '../../../api/user'
import Info from '@/components/User/Info.vue'
import CountShare from '@/components/User/CountShare.vue'
import FormAffiliate from '@/components/User/FormAffiliate.vue'
export default defineComponent({
  auth: true,
  components: { Info, FormAffiliate, CountShare },
  layout: 'dashboard',
  setup() {
    const { $loader } = useContext()
    const data = reactive({
      refCode: '',
    })
    useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getAccount()
      data.refCode = result?.object?.refCode
      $loader().close()
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>
