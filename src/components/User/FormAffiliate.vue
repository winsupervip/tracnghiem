<template>
  <div>
    <div v-if="!checkRefCode">
      <p class="text-center">
        <b>{{ $t('formAffiliate.createIntroduce') }}</b>
      </p>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            rules="required|max:255|alpha_num"
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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr v-for="(item, index) in 10" :key="index">
            <th scope="row">
              {{ item * urlQuery.page }}
            </th>
            <td>{{ compareUserName(index).username }}</td>
            <td>
              {{
                compareUserName(index).displayName
                  ? compareUserName(index).displayName
                  : compareUserName(index).firstName
                  ? compareUserName(index).firstName +
                    ' ' +
                    compareUserName(index).lastName
                  : ''
              }}
            </td>
            <td>
              {{ compareUserName(index).createDate }}
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
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
    refList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    urlQuery: {
      type: Object,
      default: () => {},
    },
  },
  setup() {},
  computed: {},
  methods: {
    compareUserName(index) {
      if (index < this.refList.length) {
        return this.refList[index]
      }
      return {}
    },
    async onSubmit() {
      try {
        const { data } = await userAPI.createCode({ refCode: this.code })
        this.$handleError(data)
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
  },
})
</script>
<style lang="scss" scoped>
p {
  font-size: 14px;
}
</style>
