<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form class="exam-form" @submit.prevent="handleSubmit(onSubmit)">
        <ExamForm />
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  reactive,
  toRefs,
} from '@nuxtjs/composition-api'
import { mapGetters, mapActions } from 'vuex'
import ExamForm from '@/components/Exams/ExamForm.vue'
import examApi from '@/api/examApi'
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
          href: '/users/dashboard',
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
  computed: {
    ...mapGetters({
      examData: 'exams/getExam',
    }),
  },
  methods: {
    ...mapActions({
      resetExam: 'exams/resetExam',
    }),
    async onSubmit() {
      try {
        const { data } = await examApi.addExam({ exam: this.examData })
        this.$handleError(data)
        await this.resetExam()
        this.$router.push('/users/exams')
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
      console.log(this.examData)
    },
  },
})
</script>
