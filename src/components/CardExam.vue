<template>
  <div class="card card-exam">
    <div class="card-exam-thumb">
      <img
        :src="
          data.image
            ? data.image
            : 'https://storage.tracnghiem.vn/public/images/exam-1.jpg'
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
      <nuxt-link :to="`/profile/${data.teacher ? data.teacher.userId : ''}`">
        <img
          class="avatar avatar-lg"
          :src="
            data.teacher && data.teacher.avatar
              ? data.teacher.avatar
              : 'https://storage.tracnghiem.vn/public/images/teacher.png'
          "
          :alt="
            data.teacher
              ? data.teacher.displayName
                ? data.displayName
                : data.teacher.firstName + ' ' + data.teacher.lastName
              : ''
          "
        />
        <span>{{
          data.teacher
            ? data.teacher.displayName
              ? data.displayName
              : data.teacher.firstName + ' ' + data.teacher.lastName
            : ''
        }}</span>
      </nuxt-link>
    </div>
    <div class="card-body">
      <nuxt-link :to="`/${data.slug}-${data.hashId}`" class="exam-title">
        <h4 class="font-md font-bold">
          {{ data.title }}
        </h4>
      </nuxt-link>
      <div class="exam-tag">
        <nuxt-link
          v-for="tag in data.tags"
          :key="tag.id"
          :title="tag.tagName"
          :to="`#${encodeURI(tag.tagName)}`"
        >
          #{{ tag.tagName }}
        </nuxt-link>
        <nuxt-link
          v-if="data.categories"
          :title="data.categories.categoryName"
          :to="data.categories.slug"
        >
          #{{ data.categories.categoryName }}
        </nuxt-link>
      </div>
      <div class="d-flex justify-content-between">
        <span class="exam-category text-gray font-sm"> </span>
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
        <span v-else class="font-sm">Không Tính Giờ</span>
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
