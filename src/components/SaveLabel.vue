<template>
  <b-dropdown variant="outline-light" no-caret class="dropdown-save">
    <template #button-content>
      <i
        :class="
          dataUser.isSaved === true
            ? 'icon-bookmark    text-danger me-3'
            : 'icon-bookmark me-3'
        "
      ></i>
      {{ $t('profile.save') }}
    </template>
    <b-dropdown-form class="">
      <b-form-checkbox
        v-for="bookmark in optionsBookmark"
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
    isWishlist: {
      type: [Boolean],
      default: () => false,
    },
    hashId: {
      type: [String],
      required: true,
    },
    typeWishlist: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      isLike: false,
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
  },
  mounted() {
    this.isLike = this.isWishlist
  },
  methods: {
    async addBookmark() {
      const label = { name: this.valueAddBookmark, color: '#000' }

      if (
        !this.optionsBookmark.find((val) => val.text === this.valueAddBookmark)
      ) {
        const { data: result } = await ApiHome.addLabel(label)
        console.log(
          '🚀 ~ file: _id.vue ~ line 315 ~ addBookmark ~ result',
          result
        )
        this.getLabelProfile()
      } else {
        alert('Đã có bookmark này')
      }
    },
    async changeCheckBox(status, lableId) {
      const data = {
        hashIdItem: this.hashId,
        hashIdLabel: lableId,
        status: !status,
        itemType: 4,
      }
      console.log(data)
      const { data: result } = await ApiHome.addDeleteItemLabel(data)
      console.log(result)
      this.getLabelProfile()
    },
    async getLabelProfile() {
      const { data: result } = await ApiHome.getLabelProfile(
        this.typeLabel,
        this.userId
      )
      console.log('getLabelProfile', result)
      this.optionsBookmark = result.object?.items
    },
  },
}
</script>

<style></style>
