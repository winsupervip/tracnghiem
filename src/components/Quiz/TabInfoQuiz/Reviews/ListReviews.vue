<template>
  <div class="list-review">
    <div v-for="(review, index) in reviews" :key="index" class="review-item">
      <ReviewsItem :review="review" />
    </div>
    <div class="form-review-exam">
      <div class="form-group mb-4">
        <label for="rating-input" class="font-bold mb-2">Nhận xét</label>
        <b-form-textarea
          id="rating-input"
          v-model="comment"
          placeholder="Nhận xét về đề thi này"
          rows="5"
          max-rows="10"
        ></b-form-textarea>
      </div>
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <div class="d-flex mb-3">
          <strong class="me-3">Đánh giá:</strong>
          <b-form-rating v-model="ratingExam" class="custom-rating" />
        </div>
        <b-btn
          variant="primary"
          class="button-submit-rating mb-3"
          :disabled="allowComment"
          @click="sendComment"
          >Gửi</b-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ReviewsItem from './ReviewsItem.vue'
export default defineComponent({
  name: 'ListReviews',
  components: {
    ReviewsItem,
  },
  props: {
    reviews: {
      type: [Array],
      default: () => [],
    },
  },
  data() {
    return {
      ratingExam: 0,
      comment: '',
    }
  },
  computed: {
    allowComment() {
      if (this.ratingExam !== 0 && this.comment !== '') {
        return false
      }
      return true
    },
  },
  methods: {
    sendComment() {
      const data = {
        typeId: 3,
        comment: this.comment,
        rateId: this.ratingExam,
        itemId: 'string',
      }
      this.$emit('sendComment', data)
    },
  },
})
</script>
