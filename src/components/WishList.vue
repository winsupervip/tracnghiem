<template>
  <b-btn
    :variant="!isLike ? 'outline-light' : null"
    :class="[
      isLike ? 'btn-danger' : 'btn-outline-white',
      'font-smd btn-action',
    ]"
    @click="sendWishList"
  >
    <i class="icon-heart me-3"></i>
    Yêu thích
  </b-btn>
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
  watch: {
    isWishlist() {
      this.isLike = this.isWishlist
    },
  },
  mounted() {
    this.isLike = this.isWishlist
  },
  methods: {
    async sendWishList() {
      if (!this.checkLogin) return
      const value = {
        hashIdItem: this.hashId,
        status: this.isLike,
        wishListType: this.typeWishlist,
      }
      try {
        const { data } = await ApiHome.sendWishlist(value)
        this.$handleError(data)
        this.isLike = !this.isLike
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
  },
}
</script>

<style></style>
