<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-form class="exam-form">
      <ExamForm />
    </b-form>
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  reactive,
  toRefs,
} from '@nuxtjs/composition-api'

import ExamForm from '@/components/Exams/ExamForm.vue'

export default defineComponent({
  components: { ExamForm },
  layout: 'dashboard',
  auth: true,
  setup() {
    const { app } = useContext()
    const data = reactive({
      breadcrumbs: [
        {
          text: app.i18n.t('exam.dashboard'),
          href: '#',
        },
        {
          text: app.i18n.t('exam.exam_title'),
          href: '/users/exams',
        },
        {
          text: app.i18n.t('exam.add'),
          active: true,
        },
      ],
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>
