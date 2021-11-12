<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-form class="exam-form">
      <ExamForm :exam="examModel" />
    </b-form>
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  useAsync,
  reactive,
  toRefs,
} from '@nuxtjs/composition-api'

import { mapGetters } from 'vuex'
import ExamForm from '@/components/Exams/ExamForm.vue'

import QuestionApi from '@/api/question-list-page'
import catalogApi from '@/api/catalogApi'
// import examApi from '@/api/examApi'
export default defineComponent({
  components: { ExamForm },
  layout: 'sidebar',
  auth: true,
  setup() {
    const { app, $loader, $logger } = useContext()
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
      categories: [],
      paymentTypes: [],
      status: [],
      levels: [],
      sortBy: [],
    })

    useAsync(async () => {
      $loader()
      $logger.info('load data')
      const [
        { data: categories },
        { data: paymentTypes },
        { data: listStatus },
        { data: levels },
        { data: sortBy },
      ] = await Promise.all([
        QuestionApi.getCategory(),
        catalogApi.getPaymentType(),
        QuestionApi.getListStatus(),
        QuestionApi.getLevel(),
        catalogApi.getExamSortBy(),
      ])
      data.categories = categories.object.items
      data.paymentTypes = paymentTypes.object.items
      data.status = listStatus.object.items
      data.levels = levels.object.items
      data.sortBy = sortBy.object.items
      $loader().close()
    })

    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({
      examModel: 'exams/getExam',
    }),
  },
})
</script>
