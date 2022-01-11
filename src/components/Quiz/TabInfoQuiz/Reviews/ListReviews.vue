<template>
  <div class="list-review">
    <div v-for="(review, index) in reviews" :key="index" class="review-item">
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
          <b-btn variant="link" class="btn-link">
            <i :class="review.like ? 'icon-like-fill' : 'icon-like'"></i>
            Thích
          </b-btn>
          <b-btn variant="link" class="btn-link">
            <i
              :class="review.dislike ? 'icon-dislike-fill' : 'icon-dislike'"
            ></i>
            Không thích
          </b-btn>
          <b-btn variant="link" class="btn-link">
            <i class="icon-flag"></i>
            Báo cáo sai phạm
          </b-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ListReviews',
  props: {
    reviews: {
      type: [Array],
      default: () => [],
    },
  },
})
</script>
