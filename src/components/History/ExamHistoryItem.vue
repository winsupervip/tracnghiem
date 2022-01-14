<template>
  <div class="exam-item border-bottom mb-3 pb-2">
    <div class="exam-header">
      <div class="exam-header-left">
        <h3 class="exam-title">
          {{ exam.examTitle }}
        </h3>
      </div>
      <div class="exam-header-right">
        <nuxt-link
          :to="'/users/history/' + exam.examHashId"
          class="btn btn-sm btn-outline-primary"
        >
          Xem kết quả
        </nuxt-link>
        <a
          :href="'/' + exam.slug + '-' + exam.examHashId + '.html'"
          target="_blank"
          class="btn btn-sm btn-primary"
        >
          Thực hiện lại
        </a>
      </div>
    </div>
    <div class="exam-body">
      <div class="row">
        <div class="col-12 col-md-7">
          <div class="card-exam-teacher d-flex align-items-center">
            <a href="/giao-vien/undefined" class="text-white"
              ><img
                alt="Trắc Nghiệm.vn"
                class="avatar avatar-md border-2 border-white border-solid me-2"
                :src="user.avatar"
            /></a>
            <p class="mb-0">
              {{
                user.displayName === null
                  ? user.firstName + ' ' + user.lastName
                  : user.displayName
              }}
            </p>
          </div>

          <ul class="list-inline exam-tags d-flex gap-4">
            <li class="list-inline-item">
              <div class="exam-rating">
                <strong class="font-sm mr-1">{{ exam.rating }}</strong>
                <i class="icon-star-fill text-yellow mr-1"></i>
                <i class="icon-star-fill text-yellow mr-1"></i>
                <i class="icon-star-fill text-yellow mr-1"></i>
                <i class="icon-star-fill text-yellow mr-1"></i>
                <i class="icon-star-fill text-yellow mr-1"></i>
                <span class="font-sm text-gray">({{ exam.totalRating }})</span>
              </div>
            </li>
            <li class="d-flex">
              <p class="font-sm">{{ exam.categoryItem.categoryName }}</p>
            </li>
            <li>
              <p class="font-sm">
                {{ exam.levelName }}
              </p>
            </li>
            <li class="d-flex">
              <b-icon-bookmark-heart></b-icon-bookmark-heart>
              <p class="font-sm">Yêu thích</p>
            </li>
          </ul>
          <div class="d-flex gap-4">
            <h3>
              <i class="icon-clock"></i>
              {{ exam.examTime + ' phút' }}
            </h3>
            <h3>
              <i class="icon-question"></i>
              {{ exam.numberQuiz + ' câu hỏi' }}
            </h3>
            <h3>
              <b-icon-eye></b-icon-eye>
              {{ exam.numberQuestionsTest + '+ lượt thi' }}
            </h3>
          </div>
          <ul class="list-inline exam-tags">
            <div v-if="exam.tagItems">
              <li
                v-for="(tag, index) in exam.tagItems"
                :key="index"
                class="list-inline-item"
              >
                <nuxt-link to="#">
                  {{ '#' + tag.tagName }}
                </nuxt-link>
              </li>
            </div>
            <li v-else class="list-inline-item">
              <nuxt-link to="#">
                {{ '#Toán #Anh văn' }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-5">
          <table class="table table-bordered">
            <tr>
              <td class="fw-bold">Số lượt thi:</td>
              <td>
                {{ exam.examHistory.numQuiz }}
              </td>
            </tr>
            <tr>
              <td class="fw-bold">Kết quả sau cùng:</td>
              <td>
                {{ exam.examHistory.lastScore + ' điểm' }}
              </td>
            </tr>
            <tr>
              <td class="fw-bold">Ngày cập nhật:</td>
              <td>
                {{ exam.examHistory.lastQuizTime | formatDurationDay }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'ExamItem',
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {},
    },
    exam: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  methods: {
    getCategoryName(categories) {
      const names = categories.map((c) => c.categoryName)
      return names.join(', ')
    },
    getStatusColor(statusId) {
      switch (statusId) {
        case 1:
          return 'bg-success'
        case 2:
          return 'bg-info'
        case 3:
          return 'bg-warning'
      }
      return 'bg-primary'
    },
  },
})
</script>
<style scoped lang="scss">
.exam-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.exam-header-left {
  display: flex;
  align-items: center;

  .badge {
    margin-left: 15px;
  }

  h3 {
    font-size: 15px;
    margin-bottom: 0;
    font-weight: bold;
  }
}
.exam-title {
  font-size: 15px;
}
.exam-tags {
  a {
    font-size: 13px;
  }
}
.exam-body {
  h3 {
    font-size: 14px;
  }
}
</style>
