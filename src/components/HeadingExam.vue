<template>
  <section class="page-heading exam-page-heading bg-gradient-blue">
    <div class="page-heading-inner">
      <b-container>
        <b-row>
          <b-col md="12" lg="8">
            <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
            <h1 class="page-title">{{ title }}</h1>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeadingExam',
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
