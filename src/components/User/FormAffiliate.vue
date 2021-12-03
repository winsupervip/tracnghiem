<template>
  <div>
    <div v-if="!checkRefCode">
      <p class="text-center">
        <b>{{ $t('formAffiliate.createIntroduce') }}</b>
      </p>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            rules="required|max:255|alpha_num|min:5"
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
            <th scope="col">{{ $t('formAffiliate.ordinalNumber') }}</th>
            <th scope="col">{{ $t('formAffiliate.name') }}</th>
            <th scope="col">{{ $t('formAffiliate.accountCode') }}</th>
            <th scope="col">{{ $t('formAffiliate.registrationDate') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr v-for="(item, index) in refList" :key="index">
            <th scope="row">
              {{ index + 1 }}
            </th>
            <td>{{ item.username }}</td>
            <td>
              {{
                item.displayName
                  ? item.displayName
                  : item.firstName
                  ? item.firstName + ' ' + item.lastName
                  : ''
              }}
            </td>
            <td>
              {{ formatDate(item.createDate) }}
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
      <EmptyData v-if="!refList.length" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import userAPI from '../../api/user'
import EmptyData from '@/components/EmptyData.vue'
export default defineComponent({
  name: 'FormAffiliate',
  auth: true,
  components: { EmptyData },
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
  data() {
    return {
      code: '',
    }
  },
  computed: {},
  methods: {
    formatDate(value) {
      return value.slice(0, 10).split('-').reverse().join('/')
    },
    async onSubmit() {
      try {
        const { data } = await userAPI.createCode({ refCode: this.code })
        this.$emit('isCreateRefCode', this.code)
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
