<template>
  <div class="exam-item border-bottom mb-3 pb-2">
    <div class="exam-header">
      <div class="exam-header-left">
        <h3 class="exam-title">
          {{ exam.title }}
        </h3>
      </div>
      <div class="exam-header-right">
        <a href="#" target="_blank" class="btn btn-sm btn-outline-primary">
          Xem trên web
        </a>
        <b-dropdown class="m-md-2" no-caret size="sm">
          <template #button-content>
            <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
          </template>
          <b-dropdown-item :href="'/users/exams/' + exam.hashId">
            <b-icon-pencil-square></b-icon-pencil-square> {{ $t('exam.edit') }}
          </b-dropdown-item>
          <b-dropdown-item
            :to="{ path: `/users/exams/questions/${exam.hashId}` }"
          >
            <b-icon-journal-text></b-icon-journal-text>
            {{ $t('exam.questions.title') }}
          </b-dropdown-item>
          <b-dropdown-item>Third Action</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item active>Active action</b-dropdown-item>
          <b-dropdown-item disabled>Disabled action</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="exam-body">
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
        {{ exam.categoryItem.categoryName }}
      </h3>
      <b-badge pill class="rounded-pill bg-success">{{
        exam.levelName
      }}</b-badge>
      <b-badge pill class="rounded-pill bg-success">{{
        exam.paymentName
      }}</b-badge>
      <b-badge pill :class="'rounded-pill ' + getStatusColor(exam.statusId)">{{
        exam.statusName
      }}</b-badge>
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
