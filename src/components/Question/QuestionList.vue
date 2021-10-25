<template>
  <div class="question">
    <p v-html="questionlist.description"></p>

    <div class="answer">
      <ul>
        <li
          v-for="(answer, index) in questionlist.answers"
          :key="index"
          type="A"
        >
          {{ String.fromCharCode(65 + index) + '. ' }}
          <p v-html="answer.answerContent"></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'QuestionTags',
  auth: false,
  props: {
    questionlist: {
      type: Object,
      required: true,
    },
  },
})
</script>
