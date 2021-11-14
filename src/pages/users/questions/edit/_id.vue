<template>
  <div class="container"></div>
</template>

<script>
import {
  computed,
  defineComponent,
  useRoute,
  useAsync,
  reactive,
  toRefs,
  useStore,
} from '@nuxtjs/composition-api'

import QuestionApi from '@/api/question-list-page'
export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const id = computed(() => route.value.params.id)
    const data = reactive({
      questionData: {},
    })
    const questionId = id.value
    console.log(questionId)
    useAsync(async () => {
      const { data } = await QuestionApi.getUserQuestionDetails(questionId)
      data.questionData = data
      store.dispatch('questions/copyQuestion', data.questionData)
    })
    return { ...toRefs(data) }
  },
})
</script>

<style></style>
