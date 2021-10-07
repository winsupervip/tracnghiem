<template>
  <div :class="white ? 'section-heading text-white' : 'section-heading'">
    <h2 v-if="title" class="section-title font-merri">{{ title }}</h2>
    <p v-if="subTitle" class="section-subtitle">{{ subTitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'Heading',
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    white: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
