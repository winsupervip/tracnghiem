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
      <EmptyData v-if="!refList.length" />
      <div v-else>
        <b-table responsive striped hover :items="refList" :fields="fields">
          <template #cell(index)="data">
            {{ data.index + 1 + (urlQuery.page - 1) * 10 }}
          </template>
          <template #cell(createDate)="data">
            {{ data.item.createDate | formatDurationDay }}
          </template>
          <template #cell(displayName)="data">
            {{
              data.item.displayName !== null
                ? data.item.displayName
                : data.item.firstName + ' ' + data.item.lastName
            }}
          </template>
        </b-table>
      </div>
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
    console.log('list : ', this.refList)
    return {
      code: '',
      fields: [
        {
          key: 'index',
          label: this.$i18n.t('formAffiliate.ordinalNumber'),
        },
        {
          key: 'username',
          label: this.$i18n.t('formAffiliate.accountCode'),
        },
        {
          key: 'displayName',
          label: this.$i18n.t('formAffiliate.name'),
        },
        {
          key: 'createDate',
          label: this.$i18n.t('formAffiliate.registrationDate'),
        },
      ],
    }
  },
  computed: {},
  methods: {
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
