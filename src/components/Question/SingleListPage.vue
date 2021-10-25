<template>
  <div class="form-single-question">
    <QuestionHeader :questions="questions" />
    <div class="line"></div>
    <div class="question">
      <QuestionTags :questiontags="questions" />
      <QuestionList :questionlist="questions" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionTags from './QuestionTags.vue'
import QuestionHeader from './QuestionHeader.vue'
import QuestionList from './QuestionList.vue'

export default defineComponent({
  name: 'SingleListPage',
  components: { QuestionHeader, QuestionTags, QuestionList },
  props: {
    questions: {
      type: Object,
      required: true,
    },
  },

  setup: () => {},
})
</script>
