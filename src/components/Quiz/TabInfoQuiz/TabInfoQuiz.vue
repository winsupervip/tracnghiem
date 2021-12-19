<template>
  <div class="tab-content-container">
    <Thematic :list-exam-section="listExamSection"></Thematic>
    <Reference :list-exam-document="listExamDocument"></Reference>
    <Author :author-infomation="authorInfomation"></Author>
    <Reviews></Reviews>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Thematic from '@/components/Quiz/TabInfoQuiz/Thematic.vue'
import Reference from '@/components/Quiz/TabInfoQuiz/Reference.vue'
import Author from '@/components/Quiz/TabInfoQuiz/Author.vue'
import Reviews from '@/components/Quiz/TabInfoQuiz/Reviews/index.vue'

export default defineComponent({
  name: 'TabInfoQuiz',
  components: {
    Thematic,
    Reference,
    Author,
    Reviews,
  },
  props: {
    listExamSection: {
      type: Array,
      default: () => [],
    },
    listExamDocument: {
      type: Array,
      default: () => [],
    },
    authorInfomation: {
      type: Object,
      default: () => {},
    },
  },
  setup() {},
})
</script>
