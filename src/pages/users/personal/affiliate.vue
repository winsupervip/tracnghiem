<template>
  <div>
    <h3 class="p-headerQuestion">{{ $t('userInfo.introduce') }}</h3>
    <RefCodeLink v-if="user.refCode" :ref-code="user.refCode" />
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 mb-3">
          <b-card class="mb-3">
            <Info :type="false" :bio="user" />
          </b-card>
          <b-card v-if="user.refCode" :sub-title="$t('affiliate.info')">
            <CountShare :total-share="sharingNumber" />
          </b-card>
        </div>
        <div class="col-12 col-md-8">
          <b-card>
            <FormAffiliate
              :check-ref-code="user.refCode"
              :ref-list="items"
              :url-query="urlQuery"
              @isCreateRefCode="isCreateRefCode"
            />
            <b-pagination
              v-if="user.refCode && items.length"
              v-model="urlQuery.page"
              class="pagination"
              align="center"
              :total-rows="total"
              :per-page="urlQuery.pageSize"
            ></b-pagination>
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
import userAPI from '@/api/user'
import Info from '@/components/User/Info.vue'
import CountShare from '@/components/User/CountShare.vue'
import RefCodeLink from '@/components/User/RefCodeLink.vue'
import FormAffiliate from '@/components/User/FormAffiliate.vue'
export default defineComponent({
  auth: true,
  components: { Info, FormAffiliate, RefCodeLink, CountShare },
  layout: 'dashboard',
  setup() {
    const { $loader } = useContext()
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1
    const data = reactive({
      user: {
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        school: '',
        avatar: '',
        refCode: '',
        refBy: '',
      },
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
      data.total = result?.object?.total
      data.items = result?.object?.items
      $loader().close()
    }
    pagination()
    useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getAccount()
      data.user.refBy = result?.object?.refBy
      data.user.firstName = result?.object?.firstName
      data.user.lastName = result?.object?.lastName
      data.user.displayName = result?.object?.displayName
      data.user.email = result?.object?.email
      data.user.school = result?.object?.school?.label
      data.user.refCode = result?.object?.refCode
      data.user.avatar = result?.object?.avatar
      $loader().close()
    })
    watch(
      () => data.urlQuery.page,
      () => {
        pagination()
      }
    )
    const isCreateRefCode = (value) => {
      data.user.refCode = value
    }
    return {
      ...toRefs(data),
      isCreateRefCode,
    }
  },
})
</script>
