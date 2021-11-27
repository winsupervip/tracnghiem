<template>
  <div class="card card-topic">
    <div class="card-thumb">
      <nuxt-link :to="`topic/${data.id}`">
        <!-- <img :src="data.thumbnail" :alt="data.name" /> -->
        <img
          src="https://dev.tracnghiem.vn/images/topic-2.jpg"
          :alt="data.name"
        />
      </nuxt-link>
    </div>
    <div class="card-body">
      <nuxt-link :to="`topic/${data.id}`" class="card-title">
        <h4 class="font-md font-bold">{{ data.name }}</h4>
      </nuxt-link>
      <div class="d-flex justify-content-between">
        <strong class="text-primary">
          {{ data.totalChillCategory }} chuyên mục
        </strong>
        <span>+ {{ data.totalExam }} đề thi</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardTopic',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
