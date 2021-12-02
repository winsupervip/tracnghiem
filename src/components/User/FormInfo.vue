<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider
          rules="required|max:255"
          :name="$t('formInfo.firstName')"
        >
          <b-form-group
            slot-scope="{ valid, errors }"
            class="mb-1"
            :label="$t('formInfo.firstName') + ' (*)'"
          >
            <b-form-input
              v-model="firstName"
              type="text"
              :state="errors[0] ? false : valid ? true : null"
            >
            </b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider
          rules="required|max:255"
          :name="$t('formInfo.lastName')"
        >
          <b-form-group
            slot-scope="{ valid, errors }"
            class="mb-1"
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
        <ValidationProvider
          rules="required|max:255"
          :name="$t('formInfo.displayName')"
        >
          <b-form-group
            slot-scope="{ valid, errors }"
            class="mb-1"
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
          <b-form-group
            slot-scope="{ valid, errors }"
            class="mb-1"
            :label="$t('formInfo.gender') + ' (*)'"
          >
            <treeselect
              v-model="treeValueGender"
              :multiple="false"
              :options="treeDataGenders"
              :always-open="alwaysOpen"
              :load-options="loadOptions"
            />
            <b-form-invalid-feedback :state="valid">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider rules="required" :name="$t('formInfo.birthday')">
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('formInfo.birthday') + ' (*)'"
          >
            <b-input-group class="mb-1">
              <b-form-input
                id="example-input"
                v-model="valueBirthday"
                type="text"
                autocomplete="off"
              ></b-form-input>
              <!-- <b-input-group-append> -->
              <b-form-datepicker
                v-model="valueBirthday"
                button-only
                right
                locale="en-US"
                aria-controls="example-input"
              ></b-form-datepicker>
              <!-- </b-input-group-append> -->
            </b-input-group>
            <b-form-invalid-feedback :state="valid">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <b-form-group class="mb-1" :label="$t('formInfo.address')">
          <b-form-input v-model="address" type="text"> </b-form-input>
        </b-form-group>
        <ValidationProvider
          rules="required|max:10|integer"
          :name="$t('formInfo.phoneNumber')"
        >
          <b-form-group
            slot-scope="{ valid, errors }"
            class="mb-1"
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
        <b-form-group class="mb-1" :label="$t('formInfo.workAt')">
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
          rules="max:1000"
          :name="$t('formInfo.aboutYourself')"
        >
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('formInfo.aboutYourself')"
          >
            <b-form-textarea
              id="textarea-default"
              v-model="bio"
              :state="errors[0] ? false : valid ? true : null"
            ></b-form-textarea>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
            <p>
              <i>{{ $t('formInfo.contentLimit') }}</i>
            </p>
          </b-form-group>
        </ValidationProvider>
        <div class="d-flex gap-2 justify-content-end">
          <b-button variant="outline-primary" @click="deleteContent">{{
            $t('formInfo.cancel')
          }}</b-button>
          <b-button
            :disabled="isShow"
            variant="outline-primary"
            type="submit"
            >{{ $t('formInfo.update') }}</b-button
          >
        </div>
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
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const { $loader } = useContext()
    const data = reactive({
      treeValueWorkAt: null || props.info.school,
      treeValueGender: null || props.info.gender,
      valueBirthday: '' || props.info.birthday,
      firstName: '' || props.info.firstName,
      address: '' || props.info.address,
      phoneNumber: '' || props.info.phone,
      lastName: '' || props.info.lastName,
      displayName: '' || props.info.displayName,
      bio: '' || props.info.bio,
      isShow: false,
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
  watch: {
    info: {
      handler(val) {
        this.treeValueWorkAt = val.school
        this.treeValueGender = val.gender
        this.valueBirthday = val.birthday
        this.firstName = val.firstName
        this.address = val.address
        this.phoneNumber = val.phone
        this.lastName = val.lastName
        this.displayName = val.displayName
        this.bio = val.bio
      },
      deep: true,
    },
  },
  methods: {
    deleteContent() {
      this.firstName = ''
      this.lastName = ''
      this.bio = ''
      this.treeValueWorkAt = ''
      this.phoneNumber = ''
      this.address = ''
      this.displayName = ''
      this.valueBirthday = ''
      this.treeValueGender = ''
    },
    loadOptions({ action, searchQuery, callback }) {
      if (action === ASYNC_SEARCH) {
        this.searchAsync(callback, searchQuery)
      } else if (action === LOAD_CHILDREN_OPTIONS) {
        // eslint-disable-next-line
      } else if (action === LOAD_ROOT_OPTIONS) {
        console.log('load root')
      }
    },
    async onSubmit() {
      const user = {
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
      // console.log(data)
      try {
        const { data } = await userAPI.updateAccount(user)
        this.$handleError(data)
        this.isDisabled = true
        this.isShow = true
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
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
