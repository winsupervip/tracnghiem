<template>
  <div class="card card-exam">
    <div class="card-exam-thumb">
      <img :src="data.thumbnail" :alt="data.name" />
    </div>
    <span
      :class="
        data.level === 1 ? 'level font-sm base' : 'level font-sm advanced'
      "
      >{{ data.level === 1 ? 'Cơ bản' : 'Nâng cao' }}</span
    >
    <b-btn class="btn-transparent btn-favorite">
      <i class="icon-heart"></i>
    </b-btn>
    <div class="card-exam-teacher">
      <nuxt-link :to="`teacher/${data.teacherId}`">
        <img
          class="avatar avatar-lg"
          :src="data.teacherAvatar"
          :alt="data.teacherName"
        />
        <span>{{ data.teacherName }}</span>
      </nuxt-link>
    </div>
    <div class="card-body">
      <nuxt-link :to="`exam/${data.id}`" class="exam-title">
        <h4 class="font-md font-bold">
          {{ data.name }}
        </h4>
      </nuxt-link>
      <div class="exam-tag">
        <nuxt-link v-for="tag in data.tags" :to="`tag/${tag.id}`" :key="tag.id">
          #{{ tag.name }}
        </nuxt-link>
      </div>
      <div class="d-flex justify-content-between">
        <span class="exam-category text-gray font-sm">
          {{ data.category }}
        </span>
        <div class="exam-rating">
          <i class="icon-star-fill text-yellow mr-1"></i>
          <strong class="font-sm mr-1">{{ data.rating }}</strong>
          <span class="font-sm text-gray">({{ data.ratingCount }})</span>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-footer-item">
        <i class="icon-clock text-primary"></i>
        <span class="font-sm">{{ data.time }} phút</span>
      </div>
      <div class="card-footer-item">
        <i class="icon-exam text-primary"></i>
        <span class="font-sm">{{ data.examCount }}+ lượt thi</span>
      </div>
      <div class="card-footer-item">
        <i class="icon-question text-primary"></i>
        <span class="font-sm">{{ data.questionCount }} câu hỏi</span>
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
      default: () => {},
    },
  },
}
</script>
