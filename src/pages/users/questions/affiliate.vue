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
            <FormAffiliate
              :check-ref-code="refCode"
              :ref-list="items"
              :url-query="urlQuery"
            />
            <b-pagination
              v-model="urlQuery.page"
              class="pagination"
              align="center"
              :total-rows="total"
              :per-page="urlQuery.pageSize"
            ></b-pagination>
          </b-card>
        </div>
        <div class="col-12 col-md-4">
          <b-card sub-title="Thông tin tổng quan">
            <CountShare
              :type="false"
              :check-ref-code="refCode"
              :total-share="sharingNumber"
            />
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
  watch,
  reactive,
  useContext,
  useRoute,
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
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1
    const data = reactive({
      refCode: '',
      sharingNumber: 0,
      currentPage: queryPage,
      total: 1,
      items: [],
      urlQuery: {
        page: 1,
        pageSize: 10,
      },
    })
    async function pagination() {
      $loader()
      const { data: result } = await userAPI.getRefList(data.urlQuery)
      data.sharingNumber = result?.object?.total
      data.items = result?.object?.items
      $loader().close()
    }
    pagination()
    useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getAccount()
      data.refCode = result?.object?.refCode
      $loader().close()
    })
    watch(
      () => data.urlQuery.page,
      () => {
        pagination()
      }
    )
    return {
      ...toRefs(data),
    }
  },
})
</script>
