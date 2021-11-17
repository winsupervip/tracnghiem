<template>
  <div class="">
    <UserlInfo :show="type" />
    <div v-if="type">
      <ul>
        <li>
          <nuxt-link to="#" class="btn btn-outline-primary d-block">
            <b-icon icon="clock" aria-hidden="true"></b-icon>
            {{ $t('info.activityHistory') }}
          </nuxt-link>
        </li>
        <li class="mt-3">
          <nuxt-link to="#" class="btn btn-outline-primary d-block">
            <b-icon icon="key" rotate="135" aria-hidden="true"></b-icon>
            {{ $t('info.changePassword') }}
          </nuxt-link>
        </li>
        <li>
          <b-icon icon="share" aria-hidden="true"></b-icon>
          {{ $t('info.codeIntroduce') }}:<b>{{
            refCode ? refCode : ' Chưa có'
          }}</b>
        </li>
      </ul>
      <div class="input-group mb-3">
        <input type="text" class="form-control" readonly />

        <button class="btn btn-primary">
          <b-icon icon="file-code" aria-hidden="true"></b-icon>
        </button>
      </div>
      <b-icon icon="arrow-counterclockwise" aria-hidden="true"></b-icon>
      <p class="d-inline-block">{{ $t('info.logOut') }}</p>
    </div>
    <div v-if="!type">
      <ul>
        <li>
          <b-icon icon="share" aria-hidden="true"></b-icon>
          {{ $t('info.introduce') }}
        </li>
      </ul>
      <input
        v-if="refBy"
        :value="refBy"
        type="text"
        class="form-control text-input"
        :disabled="refBy"
      />
      <input
        v-if="!refBy"
        v-model="inputCode"
        type="text"
        class="form-control text-input"
        :disabled="isDisabled"
      />
      <button
        v-if="!checkRefCode"
        class="btn btn-outline-primary d-block m-auto mt-2 mb-4"
        :disabled="isDisabled"
        @click="handleUpdate"
      >
        {{ $t('info.btnUpdate') }}
      </button>
      <p v-if="!checkRefCode">{{ $t('info.note') }}</p>
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
import userAPI from '../../api/user'
import UserlInfo from './UserInfo.vue'
export default defineComponent({
  name: 'Info',
  auth: true,
  components: { UserlInfo },
  props: {
    type: {
      type: Boolean,
      required: true,
    },
    checkRefCode: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { $loader } = useContext()
    const data = reactive({
      refCode: '',
      inputCode: '',
      refBy: '',
      isDisabled: false,
    })
    useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getAccount()
      data.refCode = result?.object?.refCode
      data.refBy = result?.object?.refBy
      $loader().close()
    })

    return {
      ...toRefs(data),
    }
  },
  computed: {},
  methods: {
    async handleUpdate() {
      try {
        const { data } = await userAPI.postCode({ refCode: this.inputCode })
        this.$handleError(data)
        this.$toast.success(this.$i18n('info.success')).goAway(1500)
      } catch (err) {
        this.$handleError(err, () => {
          this.$toast.error(this.$i18n('info.error')).goAway(1500)
          console.log(err)
        })
      }
      console.log(this.examData)
    },
  },
})
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}
.text-input {
  text-align: center;
}
p {
  font-size: 14px;
}
</style>
