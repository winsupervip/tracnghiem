<template>
  <div class="exam-item border-bottom mb-3 pb-2">
    <div class="exam-header">
      <div class="exam-header-left">
        <h3 class="exam-title">
          {{ exam.title }}
        </h3>
      </div>
      <div class="exam-header-right">
        <nuxt-link
          :to="'/users/history/' + exam.hashId"
          class="btn btn-sm btn-outline-primary"
        >
          Xem kết quả
        </nuxt-link>
        <a
          :href="'/' + exam.slug + '-' + exam.hashId + '.html'"
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
          <ul class="list-inline exam-tags">
            <li class="list-inline-item">
              <b-icon-tags></b-icon-tags>
            </li>
            <li
              v-for="(tag, index) in exam.tags"
              :key="index"
              class="list-inline-item"
            >
              <nuxt-link to="#">
                {{ '#' + tag }}
              </nuxt-link>
            </li>
          </ul>
          <h3>
            <b-icon-journal-bookmark></b-icon-journal-bookmark>
            {{ exam.category.categoryName }}
          </h3>
          <b-badge pill class="rounded-pill bg-success">{{
            exam.level
          }}</b-badge>
          <b-badge pill class="rounded-pill bg-success">{{
            exam.paymentName
          }}</b-badge>
          <b-badge
            pill
            :class="'rounded-pill ' + getStatusColor(exam.lastQuizStatus)"
            >{{ exam.lastQuizStatusName }}</b-badge
          >
        </div>
        <div class="col-12 col-md-5">
          <table class="table table-bordered">
            <tr>
              <td class="fw-bold">Số lượt thi:</td>
              <td>
                {{ exam.numberQuizOfUser }}
              </td>
            </tr>
            <tr>
              <td class="fw-bold">Kết quả sau cùng:</td>
              <td>
                {{ exam.lastScore }}
              </td>
            </tr>
            <tr>
              <td class="fw-bold">Ngày cập nhật:</td>
              <td>
                {{ exam.lastQuizTime | formatDurationDay }}
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
