<template>
  <b-card header="Đánh giá" header-tag="header" class="mb-3">
    <Overview :rates="rates"></Overview>
    <hr />
    <ListReviews
      :reviews="reviews"
      @sendComment="beforeSendComment"
    ></ListReviews>
    <div class="text-center mb-3">
      <b-btn
        class="loadmore"
        variant="primary"
        :disabled="isDisabled"
        @click="fetchReviews"
      >
        Xem thêm
      </b-btn>
    </div>
    <div>
      <b-modal id="sendComment" title="Thông Báo">
        <p class="my-4">{{ mess }}</p>
      </b-modal>
    </div>
  </b-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapGetters } from 'vuex'
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
      mess: '',
      page: 0,
      isDisabled: false,
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'user/isLogin',
    }),
  },
  mounted() {
    this.fetchReviews()
  },
  methods: {
    async fetchReviews() {
      this.page = this.page + 1
      const idSlug = this.$route.params.id
      const arr = idSlug.split('-')
      const examHashId = arr[arr.length - 1]
      const { data: result } = await ApiHome.getReviews({
        typeId: 3,
        hashId: examHashId,
        Page: this.page,
        PageSize: 10,
      })
      const { data: resultRate } = await ApiHome.getTotalRate({
        typeId: 3,
        hashId: examHashId,
      })
      if (result.object.items.length === 0) {
        this.isDisabled = true
        this.mess = 'Tất cả các bình luận đả được hiển thị'
        this.$bvModal.show('sendComment')
        return
      }
      this.reviews = [...this.reviews, ...result?.object?.items]
      this.rates = resultRate?.object
    },
    beforeSendComment(data) {
      if (this.isLogin) {
        const idSlug = this.$route.params.id
        const arr = idSlug.split('-')
        const examHashId = arr[arr.length - 1]
        data.itemId = examHashId
        this.sendComment(data)
      } else {
        this.mess = 'Bạn Cần đăng nhập trước khi bình luận'
        this.$bvModal.show('sendComment')
      }
    },
    async sendComment(data) {
      try {
        await ApiHome.sendComment(data)
        this.mess = 'Bình luận của bạn đã được gửi đi và đang chờ duyệt'
        this.$bvModal.show('sendComment')
      } catch (error) {
        //
      }
    },
  },
})
</script>
