<template>
  <b-card header="Đánh giá" header-tag="header" class="mb-3">
    <Overview></Overview>
    <hr />
    <ListReviews></ListReviews>
    <div class="text-center mb-3">
      <b-btn class="loadmore" variant="primary"> Xem thêm </b-btn>
    </div>
  </b-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Overview from '@/components/Quiz/TabInfoQuiz/Reviews/Overview.vue'
import ListReviews from '@/components/Quiz/TabInfoQuiz/Reviews/ListReviews.vue'

export default defineComponent({
  name: 'Reviews',
  components: {
    Overview,
    ListReviews,
  },
  setup() {},
})
</script>
