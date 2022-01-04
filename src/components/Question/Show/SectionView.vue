<template>
  <div>
    <div v-for="(q, index) in question.item.questions" :key="index">
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
        return ''
      }
    },
  },
})
</script>

<style></style>
