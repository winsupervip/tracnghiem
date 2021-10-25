<template>
  <div class="question-hashtag">
    <p v-for="tag in questiontags.tagItems" :key="tag.tagId">
      <a href="">#{{ tag.tagName }}</a>
    </p>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'QuestionTags',
  auth: false,
  props: {
    questiontags: {
      type: Object,
      required: true,
    },
  },
})
</script>
