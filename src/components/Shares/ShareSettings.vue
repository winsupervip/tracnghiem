<template>
  <div>
    <div class="btn btn-outline-primary" @click="showSetting">
      <div v-if="isSharing">shared</div>
      <div v-else>not share</div>
    </div>
    <ShareForm :item-hash-id="itemHashId" @submit="saveShareSetting" />
    <ShareDetail
      :item-hash-id="itemHashId"
      :shared-data="sharedData"
      @edit="onEdit"
      @revoke="onRevoke"
    />
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ShareForm from './ShareForm.vue'
import ShareDetail from './ShareDetail.vue'
import sharedApi from '@/api/sharedApi'
export default defineComponent({
  components: { ShareForm, ShareDetail },
  props: {
    itemHashId: {
      type: String,
      required: true,
    },
    // Question: 0
    // Group Question: 1
    // Exam: 2
    itemType: {
      type: Number,
      required: true,
    },
    isSharing: {
      type: Boolean,
      required: true,
    },
  },
  setup() {},
  data() {
    return {
      sharedData: {},
    }
  },
  methods: {
    async showSetting() {
      if (this.isSharing) {
        await this.showDetailModel()
      } else {
        this.$bvModal.show('shared-' + this.itemHashId)
      }
    },
    async showDetailModel() {
      this.sharedData = {}
      await this.getShareDetail()
      this.$bvModal.show('shared-detail-' + this.itemHashId)
    },
    async saveShareSetting(evt) {
      const dataSubmit = {
        itemHashId: this.itemHashId,
        itemType: this.itemType,
        password: evt.password,
        expiration: evt.expiration,
      }
      await this.createShared(dataSubmit)
    },
    async createShared(item) {
      try {
        await sharedApi.createShareItem(item)
        this.$toast.show('Tạo liên kết chia sẻ thành công').goAway(1500)
        this.$bvModal.hide('shared-' + this.itemHashId)
        this.$emit('refresh')
        await this.showDetailModel()
      } catch (err) {
        this.$handleError(err, () => {})
      }
    },
    async getShareDetail() {
      try {
        const { data } = await sharedApi.getShareDetail(
          this.itemHashId,
          this.itemType
        )
        this.sharedData = data.object
      } catch (err) {
        this.$handleError(err, () => {})
      }
    },
    async onEdit(evt) {
      const dataSubmit = evt
      dataSubmit.itemType = this.itemType
      try {
        await sharedApi.editShareItem(dataSubmit)
        await this.getShareDetail()
        this.$toast.show('Cập nhật liên kết chia sẻ thành công').goAway(1500)
      } catch (err) {
        this.$handleError(err, () => {})
      }
    },
    async onRevoke() {
      try {
        await sharedApi.deleteShareItem(this.sharedData.token)
        this.$bvModal.hide('shared-detail-' + this.itemHashId)
        this.$toast.show('Hủy liên kết chia sẻ thành công').goAway(1500)
        this.$emit('refresh')
      } catch (err) {
        this.$handleError(err, () => {})
      }
    },
  },
})
</script>
