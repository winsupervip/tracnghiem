<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card :sub-title="$t('exam.questions.search')">
      <b-form>
        <b-form-row class="row">
          <b-form-group
            :label="$t('keyword')"
            label-for="keyword"
            class="col-12 col-md-6 mb-3"
          >
            <b-form-input
              id="keyword"
              v-model="urlQuery.keyword"
              trim
              type="search"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            :label="$t('exam.questionType')"
            label-for="questionType"
            class="col-12 col-md-3 mb-3"
          >
            <treeselect
              id="questionType"
              v-model="urlQuery.questionTypeId"
              :multiple="false"
              :options="questionTypes"
              :load-options="loadOptions"
              :placeholder="$t('exam.questionType')"
            />
          </b-form-group>
          <b-form-group
            :label="$t('exam.levels')"
            label-for="levels"
            class="col-12 col-md-3 mb-3"
          >
            <treeselect
              id="levels"
              v-model="urlQuery.levelId"
              :multiple="false"
              :options="levels"
              :load-options="loadOptions"
              :placeholder="$t('exam.levels')"
            />
          </b-form-group>
        </b-form-row>
        <b-form-row class="row">
          <b-form-group
            :label="$t('exam.sortby')"
            label-for="sortby"
            class="col-12 col-md-3 mb-3"
          >
            <treeselect
              id="sortby"
              v-model="urlQuery.orderBy"
              :multiple="false"
              :options="sortBy"
              :load-options="loadOptions"
              :placeholder="$t('exam.sortby')"
            />
          </b-form-group>
          <div
            class="
              col-12 col-md-4
              mb-3
              d-flex
              justify-content-around
              align-items-end
            "
          >
            <b-button variant="outline-primary" @click="fetch()">
              <b-icon-filter></b-icon-filter> {{ $t('exam.filter') }}
            </b-button>
            <b-button v-b-modal.modal-1 variant="primary">
              <b-icon-plus></b-icon-plus> {{ $t('exam.add') }}
            </b-button>
          </div>
        </b-form-row>
      </b-form>
    </b-card>
    <b-card :sub-title="$t('exam.questions.title')" class="mt-3">
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <div class="mt-2">
          <b-pagination
            v-if="total > urlQuery.pageSize"
            v-model="urlQuery.page"
            class="pagination"
            :total-rows="total"
            :per-page="urlQuery.pageSize"
            align="center"
          ></b-pagination>
        </div>
      </div>
    </b-card>
    <b-modal
      id="modal-1"
      size="xl"
      hide-footer
      :title="$t('exam.questions.search')"
    >
      <ModalQuestionForAdd :exam-hash-id="examHashId" />
    </b-modal>
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  reactive,
  toRefs,
  useRoute,
  computed,
  useAsync,
} from '@nuxtjs/composition-api'
import { mapActions, mapGetters } from 'vuex'
import examApi from '@/api/examApi'
import QuestionApi from '@/api/question-list-page'
import catalogApi from '@/api/catalogApi'
import EmptyData from '@/components/EmptyData.vue'
import ModalQuestionForAdd from '@/components/Exams/ModalQuestionForAdd.vue'
export default defineComponent({
  components: { EmptyData, ModalQuestionForAdd },
  layout: 'dashboard',
  auth: true,
  setup() {
    const { app, $loader, $logger } = useContext()
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
          text: app.i18n.t('exam.questions.title'),
          active: true,
        },
      ],
      levels: [],
      sortBy: [],
      questionTypes: [],
      examInfo: {},
      urlQuery: {
        page: 1,
        pageSize: 10,
        keyword: '',
        levelId: null,
        questionTypeId: null,
        orderBy: 1,
      },
      items: [],
      total: 0,
      examHashId: '',
    })

    const route = useRoute()
    const id = computed(() => route.value.params.id)
    data.examHashId = id.value
    useAsync(async () => {
      $loader()
      try {
        const [
          { data: levels },
          { data: sortBy },
          { data: qTypes },
          { data: examData },
        ] = await Promise.all([
          QuestionApi.getLevel(),
          catalogApi.getExamSortBy(),
          QuestionApi.getTreeQuestionTypes(),
          examApi.getUserExamById(data.examHashId),
        ])
        data.levels = levels.object.items
        data.sortBy = sortBy.object.items
        data.questionTypes = qTypes.object.items

        data.examInfo = examData.object
        data.breadcrumbs.splice(2, 0, {
          text: data.examInfo.title,
          href: '/users/exams/' + data.examHashId,
        })
      } catch (err) {
        app.$handleError(err, () => {
          $logger.info(err)
        })
      }
      $loader().close()
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
    loadOptions({ action, parentNode, callback }) {},
    ...mapActions({
      resetExam: 'exams/resetExam',
    }),
    async onSubmit() {
      try {
        const { data } = await examApi.editExam({ exam: this.examData })
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
