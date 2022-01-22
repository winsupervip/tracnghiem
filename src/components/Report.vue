<template>
  <div>
    <b-modal
      :id="modalId != '' ? modalId : hashId"
      title="Thông báo"
      :hide-footer="true"
      @hide="isHide"
    >
      <div class="form-review-exam">
        <div class="form-group mb-4">
          <label for="rating-input" class="font-bold mb-2">Nhận xét</label>
          <b-form-textarea
            id="rating-input"
            v-model="comment"
            rows="5"
            max-rows="10"
          ></b-form-textarea>
        </div>
        <div
          class="d-flex flex-wrap align-items-center justify-content-between"
        >
          <b-btn
            :disabled="allow"
            variant="primary"
            class="button-submit-rating mb-3"
            @click="sendReport"
            >Gửi</b-btn
          >
        </div>
      </div>
    </b-modal>
    <b-modal id="mustLogin" title="Thông báo" ok-only>
      <p class="d-flex justify-content-center">Bạn cần đăng nhập</p>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiHome from '@/api/apiHome'
export default {
  name: 'Report',
  props: {
    reportTypeId: {
      type: [Number, String],
      default: () => 3,
    },
    hashId: {
      type: [Number, String],
      required: true,
    },
    isOpen: {
      type: [Boolean],
      default: () => false,
    },
    modalId: {
      type: [String],
      default: () => '',
    },
  },
  data() {
    return {
      comment: '',
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'user/isLogin',
    }),
    getModalId() {
      if (this.modalId !== '') return this.modalId
      return this.hashId
    },
    checkLogin() {
      if (!this.isLogin) {
        this.$bvModal.show('mustLogin')
        return false
      }
      return true
    },
    allow() {
      if (this.comment !== '') return false
      return true
    },
  },
  watch: {
    isOpen() {
      console.log('show')
      if (this.isOpen) {
        this.$bvModal.show(this.getModalId)
      }
    },
  },
  methods: {
    isHide() {
      this.comment = ''
      console.log('close nè')
      this.$emit('isClose')
    },

    async sendReport() {
      if (!this.checkLogin) return
      const value = {
        hashIdItem: this.hashId,
        reportTypeId: this.reportTypeId, // or reportTypeId : this.reportTypeId
        comment: this.comment,
        statusId: 1,
      }
      try {
        const { data } = await ApiHome.sendReport(value)
        this.$handleError(data)
        this.$bvModal.hide(this.getModalId)
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
