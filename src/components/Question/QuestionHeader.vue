<template #header>
  <div
    class="
      d-flex
      align-items-center
      justify-content-between
      card-question-header
    "
  >
    <div class="d-flex">
      <div class="font-bold me-3">
        <abbr :title="questions.title">
          {{ questions.title }}
        </abbr>
      </div>
      <div class="list-status-question">
        <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
          questions.levelName
        }}</span>
        <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
          questions.questionTypeName
        }}</span>
        <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
          questions.statusName
        }}</span>
      </div>
    </div>
    <div class="d-flex">
      <a
        href="#"
        target="_blank"
        class="btn btn-sm btn-outline-primary rounded-pill me-3"
        >{{ $t('WatchOnWeb') }}</a
      >
      <b-dropdown
        class="dropdown-button-circle"
        variant="link"
        toggle-class="text-decoration-none"
        no-caret
      >
        <template #button-content>
          <i class="bi bi-three-dots-vertical"></i>
        </template>
        <b-dropdown-item href="#">{{ $t('update') }}</b-dropdown-item>
        <b-dropdown-item href="#">{{ $t('copy') }}</b-dropdown-item>
        <b-dropdown-item href="#">{{ $t('publish') }}</b-dropdown-item>
        <b-dropdown-item href="#">{{ $t('share') }}</b-dropdown-item>
        <b-dropdown-item href="#">{{ $t('references') }}</b-dropdown-item>

        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="#">{{ $t('statistic') }}</b-dropdown-item>
        <b-dropdown-item href="#">{{ $t('delete') }}</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'QuestionHeader',
  auth: false,
  props: {
    questions: {
      type: Object,
      required: true,
    },
  },
})
</script>
<style lang="scss" scoped>
abbr[title] {
  text-decoration: none;
}
</style>
