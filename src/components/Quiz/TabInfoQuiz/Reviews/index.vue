<template>
  <b-card header="Đánh giá" header-tag="header" class="mb-3">
    <Overview :rates="rates"></Overview>
    <hr />
    <ListReviews :reviews="reviews"></ListReviews>
    <div class="text-center mb-3">
      <b-btn class="loadmore" variant="primary"> Xem thêm </b-btn>
    </div>
  </b-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Overview from '@/components/Quiz/TabInfoQuiz/Reviews/Overview.vue'
import ListReviews from '@/components/Quiz/TabInfoQuiz/Reviews/ListReviews.vue'
import ApiHome from '@/api/apiHome.js'
export default defineComponent({
  name: 'Reviews',
  components: {
    Overview,
    ListReviews,
  },
  data() {
    return {
      reviews: [],
      rates: {},
    }
  },
  mounted() {
    this.fetchReviews()
  },
  methods: {
    async fetchReviews() {
      const idSlug = this.$route.params.id
      const arr = idSlug.split('-')
      const examHashId = arr[arr.length - 1]
      const { data: result } = await ApiHome.getReviews({
        typeId: 3,
        hashId: examHashId,
      })
      const { data: resultRate } = await ApiHome.getTotalRate({
        typeId: 3,
        hashId: examHashId,
      })
      this.reviews = result?.object?.items
      this.rates = resultRate?.object
      console.log('review', this.reviews)
    },
  },
})
</script>
