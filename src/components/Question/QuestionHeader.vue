<template>
  <div class="form-headline">
    <div class="headline-left">
      <label
        ><abbr :title="questions.title">
          {{ questions.title }}
        </abbr></label
      >

      <span>{{ questions.levelName }}</span>
      <span>{{ questions.questionTypeName }}</span>
      <span>{{ questions.statusName }}</span>
    </div>
    <div class="headline-right">
      <a href="">{{ $t('WatchOnWeb') }}</a>

      <b-dropdown variant="light" toggle-class="text-decoration-none" no-caret>
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
