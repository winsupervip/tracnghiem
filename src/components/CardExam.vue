<template>
  <div class="card card-exam">
    <div class="card-exam-thumb">
      <img
        :src="
          data.image && data.image.startsWith('http')
            ? data.image
            : '/images/exam-1.jpg'
        "
        :alt="data.title"
      />
    </div>
    <span
      :class="
        data.level.id === 1 ? 'level font-sm base' : 'level font-sm advanced'
      "
      >{{ data.level.name }}</span
    >
    <b-btn class="btn-transparent btn-favorite">
      <i v-if="!data.isLiked" class="icon-heart"></i>
      <b-icon
        v-else
        icon="heart-fill"
        variant="danger"
        aria-hidden="true"
      ></b-icon>
    </b-btn>
    <div class="card-exam-teacher">
      <nuxt-link :to="`/giao-vien/${data.teacher ? data.teacher.userId : ''}`">
        <img
          class="avatar avatar-lg"
          :src="
            data.teacher && data.teacher.avatar
              ? data.teacher.avatar
              : 'https://dev.tracnghiem.vn/images/teacher.png'
          "
          :alt="
            data.teacher
              ? data.teacher.displayName
                ? data.displayName
                : data.teacher.firstName + data.teacher.lastName
              : ''
          "
        />
        <span>{{
          data.teacher
            ? data.teacher.displayName
              ? data.displayName
              : data.teacher.firstName + data.teacher.lastName
            : ''
        }}</span>
      </nuxt-link>
    </div>
    <div class="card-body">
      <nuxt-link :to="`/de-thi/${data.hashId}`" class="exam-title">
        <h4 class="font-md font-bold">
          {{ data.title }}
        </h4>
      </nuxt-link>
      <div class="exam-tag">
        <nuxt-link
          v-for="tag in data.tags"
          :key="tag.id"
          :to="`tag/${tag.tagId}`"
        >
          #{{ tag.tagName }}
        </nuxt-link>
      </div>
      <div class="d-flex justify-content-between">
        <span class="exam-category text-gray font-sm">
          {{ data.categories.categoryName }}
        </span>
        <div class="exam-rating">
          <i class="icon-star-fill text-yellow mr-1"></i>
          <strong class="font-sm mr-1">{{ data.rating }}</strong>
          <span class="font-sm text-gray">({{ data.totalRating }})</span>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-footer-item">
        <i class="icon-clock text-primary"></i>
        <span v-if="!data.nonExamTime" class="font-sm"
          >{{ data.examTime }} phút</span
        >
      </div>
      <div class="card-footer-item">
        <i class="icon-exam text-primary"></i>
        <span class="font-sm">{{ data.numberQuiz }}+ lượt thi</span>
      </div>
      <div class="card-footer-item">
        <i class="icon-question text-primary"></i>
        <span class="font-sm">{{ data.numberQuestionsTest }} câu hỏi</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardExam',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>
