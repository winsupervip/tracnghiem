<template>
  <div>
    <div v-for="(q, index) in question.item.questions" :key="index">
      <div class="question-title d-flex justify-content-between">
        <div class="question-name font-bold">Câu hỏi {{ q.sortOrder }}</div>
        <div class="question-category text-gray">
          <i class="icon-tag" />
          <span class="font-sm">{{ title }}</span>
        </div>
      </div>
      <!-- <component :is="dynamicComponent(q)" ref="questionInExam" :question="q" /> -->
      <Item :question="q" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Item from './Item.vue'
export default defineComponent({
  components: {
    Item,
  },
  props: {
    question: {
      type: [Array, Object],
      required: true,
    },
  },
  computed: {
    title() {
      if (this.question?.item?.section?.title) {
        return this.question?.item?.section?.title
      } else {
        return 'Fails'
      }
    },
  },
})
</script>

<style></style>
