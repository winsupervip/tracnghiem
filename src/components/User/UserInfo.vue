<template>
  <div>
    <div class="info">
      <div class="info-image">
        <img :src="avatar ? avatar : '/images/logo.svg  '" class="card" />
        <p v-if="show" class="text-image">{{ $t('userInfo.change') }}</p>
      </div>

      <div class="info-content">
        <p>
          <b>{{ displayName ? displayName : firstName + ' ' + lastName }}</b>
        </p>
        <p>{{ email }}</p>
        <p>{{ school }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  useFetch,
  useContext,
  reactive,
  toRefs,
} from '@nuxtjs/composition-api'
import userAPI from '../../api/user'
export default defineComponent({
  name: 'UserlInfo',
  auth: true,
  components: {},
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const { $loader } = useContext()
    const data = reactive({
      firstName: '',
      lastName: '',
      displayName: '',
      email: '',
      school: '',
      avatar: '',
    })
    useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getAccount()
      data.firstName = result?.object?.firstName
      data.lastName = result?.object?.lastName
      data.displayName = result?.object?.displayName
      data.email = result?.object?.email
      data.school = result?.object?.school?.label
      data.refCode = result?.object?.refCode
      data.avatar = result?.object?.avatar
      $loader().close()
    })
    return {
      ...toRefs(data),
    }
  },
  computed: {},
  methods: {},
})
</script>
<style lang="scss" scoped>
.card {
  width: 125px;
  height: 125px;
  border-radius: 50%;
  border: 1px solid transparent;
}
.text-image {
  text-decoration: underline;
  padding: 5px 0;
}
p {
  word-break: break-word;
  font-size: 14px;
}
.info {
  display: flex;
  gap: 1rem;
}
.info-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  flex-shrink: 0;
}
.info-content {
  flex-shrink: 1;
}
</style>
