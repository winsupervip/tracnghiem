<template>
  <section class="page-heading bg-gradient-blue">
    <div class="page-heading-inner">
      <b-container>
        <h1 class="page-title">{{ title }}</h1>
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      </b-container>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeadingPage',
  props: {
    title: {
      type: String,
      default: '',
    },
    breadcrumbs: {
      type: Array,
      default: null,
    },
  },
}
</script>
