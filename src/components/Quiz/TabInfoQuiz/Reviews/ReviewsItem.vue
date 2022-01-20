<template>
  <div class="review-item">
    <div class="review-item-avatar">
      <img class="avatar avatar-md" :src="review.user.avatar" alt="" />
    </div>
    <div class="review-item-content">
      <div class="font-bold mb-1">
        {{
          review.user.dislayName
            ? review.user.dislayName
            : review.user.firstName + review.user.lastName
        }}
      </div>
      <div class="d-flex align-items-center mb-3">
        <b-form-rating
          :value="review.rate"
          class="custom-rating me-2"
          readonly
        />
        <span class="font-sm text-gray">{{
          review.createDate | convertDate
        }}</span>
      </div>
      <div class="font-smd mb-4">
        {{ review.comment }}
      </div>
      <div class="review-item-action">
        <b-btn variant="link" class="btn-link" @click="sendLike(1)">
          <i :class="react === 1 ? 'icon-like-fill' : 'icon-like'"></i>
          ({{ like }}) Thích
        </b-btn>
        <b-btn variant="link" class="btn-link" @click="sendLike(-1)">
          <i :class="react === -1 ? 'icon-dislike-fill' : 'icon-dislike'"></i>
          ({{ disLike }}) Không thích
        </b-btn>
        <b-btn variant="link" class="btn-link" @click="openReportModal">
          <i class="icon-flag"></i>
          Báo cáo sai phạm
        </b-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ApiHome from '@/api/apiHome.js'
export default defineComponent({
  name: 'ReviewsItem',
  props: {
    review: {
      type: [Object],
      default: () => {},
    },
  },
  data() {
    return {
      react: 0,
      like: 0,
      disLike: 0,
    }
  },
  mounted() {
    this.react = this.review.react
    this.like = this.review.like
    this.disLike = this.review.disLike
  },
  methods: {
    async sendLike(id) {
      try {
        await ApiHome.sendReact({
          hashId: this.review.hashId,
          react: id,
        })
        if (id === 1) {
          if (this.react === -1) {
            this.disLike -= 1
          }
          this.like += 1
          this.react = 1
        } else {
          if (this.react === 1) {
            this.like -= 1
          }
          this.disLike += 1
          this.react = -1
        }
      } catch (error) {
        //
      }
    },
    openReportModal() {
      this.$emit('openReportModal', this.review.hashId)
    },
  },
})
</script>
