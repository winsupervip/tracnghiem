<template>
  <div>
    <h3 class="p-headerQuestion">{{ $t('PersonalInfo.personal') }}</h3>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4">
          <b-card :sub-title="$t('personal.userInfo')">
            <Info :type="true" :bio="user" />
          </b-card>
        </div>
        <div class="col-12 col-md-8">
          <b-card :sub-title="$t('personal.updateInfo')">
            <FormInfo />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  reactive,
  useFetch,
  toRefs,
} from '@nuxtjs/composition-api'
import userAPI from '@/api/user'
import Info from '@/components/User/Info.vue'
import FormInfo from '@/components/User/FormInfo.vue'
export default defineComponent({
  auth: true,
  components: { Info, FormInfo },
  layout: 'dashboard',
  setup() {
    const { $loader } = useContext()
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
    })
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

    return {
      ...toRefs(data),
    }
  },
  methods: {},
})
</script>
