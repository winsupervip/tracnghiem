<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider rules="required" :name="$t('formInfo.firstName')">
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('formInfo.firstName') + ' (*)'"
            label-cols-sm="3"
          >
            <b-form-input
              v-model="firstName"
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
        <ValidationProvider rules="required" :name="$t('formInfo.lastName')">
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('formInfo.lastName') + ' (*)'"
          >
            <b-form-input
              v-model="lastName"
              type="text"
              :state="errors[0] ? false : valid ? true : null"
            >
            </b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider rules="required" :name="$t('formInfo.displayName')">
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('formInfo.displayName') + ' (*)'"
          >
            <b-form-input
              v-model="displayName"
              type="text"
              :state="errors[0] ? false : valid ? true : null"
            >
            </b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider rules="required" :name="$t('formInfo.gender')">
          <b-form-radio-group
            v-model="treeValueGender"
            slot-scope="{ valid, errors }"
          >
            <b-dropdown id="dropdown-1" class="m-md-2">
              <b-form-radio
                v-for="gender in treeDataGenders"
                :key="gender.id"
                :value="gender.id"
                ><b-dropdown-item>
                  {{ gender.label }}
                </b-dropdown-item>
              </b-form-radio>
            </b-dropdown>
            <b-form-invalid-feedback :state="valid">{{
              errors[0]
            }}</b-form-invalid-feedback>
            <p>{{ treeValueGender }}</p>
          </b-form-radio-group>
        </ValidationProvider>
        <ValidationProvider rules="required" :name="$t('formInfo.birthday')">
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('formInfo.birthday') + ' (*)'"
          >
            <b-input-group class="mb-3">
              <b-form-input
                id="example-input"
                v-model="valueBirthday"
                type="text"
                autocomplete="off"
              ></b-form-input>
              <b-input-group-append>
                <b-form-datepicker
                  v-model="valueBirthday"
                  button-only
                  right
                  locale="en-US"
                  aria-controls="example-input"
                ></b-form-datepicker>
              </b-input-group-append>
            </b-input-group>
            <b-form-invalid-feedback :state="valid">{{
              errors[0]
            }}</b-form-invalid-feedback>
            <p>{{ valueBirthday }}</p>
          </b-form-group>
        </ValidationProvider>
        <b-form-group :label="$t('formInfo.address')">
          <b-form-input v-model="address" type="text"> </b-form-input>
        </b-form-group>
        <ValidationProvider rules="required" :name="$t('formInfo.phoneNumber')">
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('formInfo.phoneNumber') + ' (*)'"
          >
            <b-form-input
              v-model="phoneNumber"
              type="text"
              :state="errors[0] ? false : valid ? true : null"
            >
            </b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <b-form-group :label="$t('formInfo.workAt')">
          <treeselect
            ref="tree"
            v-model="treeValueWorkAt"
            :multiple="false"
            :async="true"
            :always-open="alwaysOpen"
            :load-options="loadOptions"
          />
        </b-form-group>
        <ValidationProvider
          rules="max:500"
          :name="$t('formInfo.aboutYourself')"
        >
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('formInfo.aboutYourself')"
          >
            <b-form-textarea
              id="textarea-default"
              v-model="bio"
              class="mb-20"
              :state="errors[0] ? false : valid ? true : null"
            ></b-form-textarea>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <b-button variant="outline-primary" type="submit">Cập nhật</b-button>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import {
  defineComponent,
  useFetch,
  reactive,
  toRefs,
  useContext,
} from '@nuxtjs/composition-api'
import {
  ASYNC_SEARCH,
  LOAD_CHILDREN_OPTIONS,
  LOAD_ROOT_OPTIONS,
} from '@riophae/vue-treeselect'
import _ from 'lodash'
import userAPI from '../../api/user'
export default defineComponent({
  name: 'FormInfo',
  auth: true,
  components: {},
  props: {},
  setup() {
    const { $loader } = useContext()
    const data = reactive({
      treeValueWorkAt: null,
      treeValueGender: null,
      valueBirthday: '',
      firstName: '',
      address: '',
      phoneNumber: '',
      lastName: '',
      displayName: '',
      bio: '',
      treeDataGenders: [],
      alwaysOpen: false,
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: genders } = await userAPI.getListgenders()
      data.treeDataGenders = genders?.object?.items
      $loader().close()
    })
    fetch()

    return {
      ...toRefs(data),
    }
  },
  computed: {},
  methods: {
    loadOptions({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        this.searchAsync(callback, searchQuery)
      } else if (action === LOAD_CHILDREN_OPTIONS) {
        // eslint-disable-next-line
      } else if (action === LOAD_ROOT_OPTIONS) {
        console.log('load root')
      }
    },
    onSubmit() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        avatar: '',
        bio: this.bio,
        schoolId: this.treeValueWorkAt,
        phone: this.phoneNumber,
        address: this.address,
        displayName: this.displayName,
        birthday: this.valueBirthday,
        genderId: this.treeValueGender,
      }
      console.log(data)
      userAPI.updateAccount(
        data,
        () => {
          this.$toast.success(this.$i18n('formInfo.updateUser')).goAway(1500)
        },
        () => {
          this.$toast.show(this.$i18n('formInfo.error')).goAway(1500)
        }
      )
    },
    searchAsync: _.debounce(async function (callback, searchQuery) {
      try {
        const response = await userAPI.getListSchools(this.axios, searchQuery)
        const options = response.data?.object?.items
        callback(null, options)
      } catch (err) {
        callback(null, [])
      }
    }, 200),
  },
})
</script>
<style lang="scss" scoped></style>
