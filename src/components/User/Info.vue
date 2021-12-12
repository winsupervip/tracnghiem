<template>
  <div>
    <UserlInfo :show="type" :user="bio" />
    <div v-if="type">
      <ul>
        <li>
          <nuxt-link to="#" class="btn btn-outline-primary d-block">
            <b-icon icon="clock" aria-hidden="true"></b-icon>
            {{ $t('info.activityHistory') }}
          </nuxt-link>
        </li>
        <li v-b-modal.modal-edit class="mt-3">
          <nuxt-link to="#" class="btn btn-outline-primary d-block">
            <b-icon icon="key" rotate="135" aria-hidden="true"></b-icon>
            {{ $t('info.changePassword') }}
          </nuxt-link>
        </li>
        <li>
          <b-icon icon="share" aria-hidden="true" class="mt-3"></b-icon>
          {{ $t('info.codeIntroduce') }}:<b>{{
            bio.refCode ? bio.refCode : ' Chưa có'
          }}</b>
        </li>
      </ul>
      <b-modal
        id="modal-edit"
        ref="modal"
        hide-footer
        @shown="showModal"
        @hide="hideModal"
      >
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider
              :name="$t('info.oldPassword')"
              rules="required|max:255"
            >
              <b-form-group
                slot-scope="{ valid, errors }"
                :label="$t('info.oldPassword')"
                label-for="oldPassword"
                class="mb-3"
              >
                <b-form-input
                  id="oldPassword"
                  v-model="oldPassword"
                  type="password"
                  trim
                  size="lg"
                  :state="errors[0] ? false : valid ? true : null"
                ></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              :name="$t('info.newPassword')"
              rules="required|max:255"
            >
              <b-form-group
                slot-scope="{ valid, errors }"
                :label="$t('info.newPassword')"
                label-for="newPassword"
                class="mb-3"
              >
                <b-form-input
                  id="newPassword"
                  v-model="newPassword"
                  type="password"
                  trim
                  size="lg"
                  :state="errors[0] ? false : valid ? true : null"
                ></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              :name="$t('info.confirmPassword')"
              rules="required|max:255"
            >
              <b-form-group
                slot-scope="{ valid, errors }"
                :label="$t('info.confirmPassword')"
                label-for="confirmPassword"
                class="mb-3"
              >
                <b-form-input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  trim
                  size="lg"
                  :state="errors[0] ? false : valid ? true : null"
                ></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </b-form>
        </ValidationObserver>
        <b-button variant="outline-dark mb-3" @click="hide">{{
          $t('delete')
        }}</b-button>
        <b-button variant="outline-dark mb-3" type="submit" @click="onSubmit">{{
          $t('save')
        }}</b-button>
      </b-modal>
      <div class="input-group mb-3">
        <input
          ref="clipboard"
          type="text"
          class="form-control"
          :value="
            bio.refCode
              ? `https://tracnghiem.vn/affiliate?ref=${bio.refCode}`
              : ''
          "
          readonly
        />

        <button class="btn btn-primary" @click="handleCopy">
          <b-icon icon="file-code" aria-hidden="true"></b-icon>
        </button>
      </div>
      <div class="w-100 btn btn-outline-primary" @click="logout()">
        <b-icon-box-arrow-left class="me-auto"></b-icon-box-arrow-left>
        <span class="me-auto">
          {{ $t('info.logOut') }}
        </span>
      </div>
    </div>
    <div v-if="!type">
      <ul>
        <li>
          <b-icon icon="share" aria-hidden="true"></b-icon>
          {{ $t('info.introduce') }}
        </li>
      </ul>
      <input
        v-if="bio.refBy"
        type="text"
        :value="bio.refBy"
        class="form-control text-input"
        :disabled="bio.refBy"
      />
      <input
        v-if="!bio.refBy"
        v-model="inputCode"
        type="text"
        class="form-control text-input"
        :disabled="isDisabled"
        :placeholder="$t('info.referralCode')"
      />
      <button
        v-if="!bio.refBy && !checkRefBy"
        class="btn btn-outline-primary d-block m-auto mt-2 mb-4"
        :disabled="isDisabled"
        @click="handleUpdate"
      >
        {{ $t('info.btnUpdate') }}
      </button>
      <p v-if="!bio.refBy && !checkRefBy">{{ $t('info.note') }}</p>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import UserlInfo from './UserInfo.vue'
import userAPI from '@/api/user'
export default defineComponent({
  name: 'Info',
  auth: true,
  components: { UserlInfo },
  props: {
    checkRefBy: {
      type: String,
      default: () => '',
    },
    type: {
      type: Boolean,
      required: true,
    },
    bio: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const data = reactive({
      inputCode: '',
      isDisabled: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    })

    return {
      ...toRefs(data),
    }
  },
  methods: {
    loadOptions({ action, searchQuery, callback }) {},
    showModal(id) {
      this.$bvModal.show(id)
    },
    hideModal(id) {
      this.$bvModal.hide(id)
    },
    hide() {
      this.reset()
      this.hideModal('modal-edit')
    },
    reset() {
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    },
    async onSubmit() {
      const result = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      }
      try {
        const { data } = await userAPI.updatePassword(result)
        this.reset()
        this.hideModal('modal-edit')
        this.$handleError(data)
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    async handleUpdate() {
      try {
        const { data } = await userAPI.postCode({ refCode: this.inputCode })
        this.$emit('isCreateRefBy', this.inputCode)
        console.log(this.inputCode)
        this.isDisabled = true
        this.$handleError(data)
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    logout() {
      this.$auth.logout()
    },
    handleCopy(e) {
      navigator.clipboard.writeText(
        `https://tracnghiem.vn/affiliate?ref=${this.bio.refCode}`
      )
      this.$toast.success('copy thành công').goAway(1000)
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
