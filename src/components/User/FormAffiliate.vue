<template>
  <div>
    <div v-if="!checkRefCode">
      <p class="text-center">
        <b>{{ $t('formAffiliate.createIntroduce') }}</b>
      </p>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            rules="required|max:20"
            :name="$t('formAffiliate.code')"
          >
            <b-form-group slot-scope="{ valid, errors }" label-cols-sm="3">
              <b-form-input
                v-model="code"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
                class="col"
              >
              </b-form-input>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-button
            variant="outline-primary d-block m-auto mt-3 mb-5"
            type="submit"
            >{{ $t('formAffiliate.btnCreateCode') }}</b-button
          >
        </b-form>
      </ValidationObserver>
      <p>
        <b>{{ $t('formAffiliate.noteCase') }}</b>
      </p>
    </div>
    <div v-if="checkRefCode">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">TT</th>
            <th scope="col">Mã tài khoản</th>
            <th scope="col">Họ tên</th>
            <th scope="col">Ngày đăng ký</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.username }}</td>
            <td>
              {{
                item.displayName
                  ? item.displayName
                  : item.firstName + ' ' + item.lastName
              }}
            </td>
            <td>
              {{ item.createDate }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useFetch,
  useContext,
} from '@nuxtjs/composition-api'
import userAPI from '../../api/user'
export default defineComponent({
  name: 'FormAffiliate',
  auth: true,
  components: {},
  props: {
    checkRefCode: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { $logger, $loader } = useContext()
    const data = reactive({
      total: 1,
      items: [],
      urlQuery: {
        page: 1,
        pageSize: 10,
      },
    })
    useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getRefList(data.urlQuery)
      data.total = result?.object?.total
      data.items = result?.object?.items
      $logger.info('total : ', data.total, 'items : ', data.items)
      $loader().close()
    })
    return {
      ...toRefs(data),
    }
  },
  computed: {},
  methods: {
    onSubmit() {
      const data = {
        refCode: this.code,
      }
      userAPI.createCode(
        data,
        () => {
          this.$toast.success('tạo mã code thành công').goAway(1500)
        },
        () => {
          this.$toast.error('tạo mã code thất bại').goAway(1500)
        }
      )
    },
  },
})
</script>
<style lang="scss" scoped>
p {
  font-size: 14px;
}
</style>
