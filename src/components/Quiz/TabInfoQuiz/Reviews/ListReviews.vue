<template>
  <div class="list-review">
    <div v-for="(review, index) in reviews" :key="index" class="review-item">
      <ReviewsItem :review="review" @openReportModal="openReportModal" />
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
    <Report
      :hash-id="hashId"
      report-type-id="4"
      :is-open="isOpen"
      modal-id="reportReview"
      @isClose="isClose"
    />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ReviewsItem from './ReviewsItem.vue'
import Report from '@/components/Report.vue'
export default defineComponent({
  name: 'ListReviews',
  components: {
    ReviewsItem,
    Report,
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
      isOpen: false,
      hashId: '',
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
    openReportModal(value) {
      this.hashId = value
      this.isOpen = true
    },
    isClose() {
      console.log('close')
      this.isOpen = false
    },
  },
})
</script>
