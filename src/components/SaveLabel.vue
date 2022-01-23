<template>
  <b-dropdown variant="outline-light" no-caret class="dropdown-save">
    <template #button-content>
      <i
        :class="
          isSaveLabel
            ? 'icon-bookmark    text-danger me-3'
            : 'icon-bookmark me-3'
        "
      ></i>
      {{ $t('profile.save') }}
    </template>
    <b-dropdown-form class="">
      <b-spinner
        v-if="optionsBookmark.length <= 0 && isLogin"
        variant="success"
        label="Spinning"
      ></b-spinner>
      <b-form-checkbox
        v-for="bookmark in optionsBookmark"
        v-else
        :key="bookmark.hashId"
        v-model="bookmark.saved"
        @change="(e) => changeCheckBox(e, bookmark.hashId)"
      >
        {{ bookmark.name }}
      </b-form-checkbox>

      <div class="add-bookmark-input">
        <b-form-input
          v-model="valueAddBookmark"
          trim
          type="text"
          placeholder="Thêm"
        >
        </b-form-input>

        <b-btn variant="primary" class="btn-circle" @click="addBookmark">
          <b-icon icon="plus" class="text-white" />
        </b-btn>
      </div>
    </b-dropdown-form>
  </b-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiHome from '@/api/apiHome.js'
export default {
  props: {
    hashId: {
      type: [String],
      required: true,
    },
    typeLabel: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      valueAddBookmark: '',
      optionsBookmark: [],
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'user/isLogin',
    }),
    checkLogin() {
      if (!this.isLogin) {
        this.$bvModal.show('mustLogin')
        return false
      }
      return true
    },
    isSaveLabel() {
      if (this.optionsBookmark.length === 0) return false
      const index = this.optionsBookmark.findIndex(
        (item) => item.saved === true
      )
      if (index === -1) return false
      return true
    },
  },
  watch: {
    isLogin() {
      if (this.isLogin) this.getLabelProfile()
    },
  },
  mounted() {
    if (this.isLogin) {
      this.getLabelProfile()
    }
  },
  methods: {
    async addBookmark() {
      if (!this.checkLogin) return
      const label = { name: this.valueAddBookmark, color: '#000' }
      try {
        if (
          !this.optionsBookmark.find(
            (val) => val.text === this.valueAddBookmark
          )
        ) {
          const { data } = await ApiHome.addLabel(label)
          this.valueAddBookmark = ''
          this.isAdd = !this.isAdd
          this.$handleError(data)
          this.getLabelProfile()
        } else {
          alert('Đã có bookmark này')
        }
      } catch (error) {}
    },
    async changeCheckBox(status, lableId) {
      const data = {
        hashIdItem: this.hashId,
        hashIdLabel: lableId,
        status: !status,
        itemType: this.typeLabel,
      }
      console.log(data)
      const { data: result } = await ApiHome.addDeleteItemLabel(data)
      console.log(result)
      this.getLabelProfile()
    },
    async getLabelProfile() {
      const { data: result } = await ApiHome.getLabelProfile(
        this.typeLabel,
        this.hashId
      )
      this.optionsBookmark = result.object?.items
    },
  },
}
</script>

<style></style>
