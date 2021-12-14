<template>
  <div class="tab-content-container">
    <Thematic></Thematic>
    <Reference></Reference>
    <Author></Author>
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
  setup() {},
})
</script>
