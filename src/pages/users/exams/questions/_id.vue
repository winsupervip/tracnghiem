<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card :sub-title="$t('exam.questions.search')">
      <b-form>
        <b-form-row class="row">
          <b-form-group
            :label="$t('keyword')"
            label-for="keyword"
            class="col-12 col-md-3 mb-3"
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
        </b-form-row>
        <div>
          <b-button variant="outline-primary" @click="handleSearch()">
            <b-icon-filter></b-icon-filter> {{ $t('exam.filter') }}
          </b-button>
          <b-button v-b-modal.modal-1 variant="primary">
            <b-icon-plus></b-icon-plus> {{ $t('exam.add') }}
          </b-button>
          <b-button
            variant="primary"
            @click="$bvModal.show('bv-modal-import-exam')"
          >
            <b-icon-cloud-upload></b-icon-cloud-upload> {{ $t('import') }}
          </b-button>
        </div>
      </b-form>
    </b-card>
    <div :sub-title="$t('exam.questions.title')" class="mt-3">
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else class="list-question">
        <div v-for="(item, index) in items" :key="index">
          <ExamQuestionItem :item-data="item" :total="total" />
        </div>
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
    </div>
    <b-modal
      id="modal-1"
      size="xl"
      hide-footer
      :title="$t('exam.questions.search')"
    >
      <ModalQuestionForAdd
        :exam-hash-id="examHashId"
        @add-success="onImportSuccess"
      />
    </b-modal>
    <ImportExamModel :exam-id="examHashId" @import-success="onImportSuccess" />
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
  useFetch,
  watch,
} from '@nuxtjs/composition-api'
import examApi from '@/api/examApi'
import QuestionApi from '@/api/question-list-page'
import catalogApi from '@/api/catalogApi'
import EmptyData from '@/components/EmptyData.vue'
import ModalQuestionForAdd from '@/components/Exams/ModalQuestionForAdd.vue'
import ExamQuestionItem from '@/components/Exams/ExamQuestionItem.vue'
import ImportExamModel from '~/components/Question/ImportExamModel.vue'
export default defineComponent({
  components: {
    EmptyData,
    ModalQuestionForAdd,
    ExamQuestionItem,
    ImportExamModel,
  },
  layout: 'dashboard',
  auth: true,
  setup() {
    const { app, $loader, $logger } = useContext()
    const data = reactive({
      breadcrumbs: [],
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
        console.log(data.breadcrumbs)
        data.breadcrumbs = [
          {
            text: app.i18n.t('exam.dashboard'),
            href: '/users/dashboard',
          },
          {
            text: app.i18n.t('exam.exam_title'),
            href: '/users/exams',
          },
          {
            text: data.examInfo.title,
            href: '/users/exams/' + data.examHashId,
          },
          {
            text: app.i18n.t('exam.questions.title'),
            active: true,
          },
        ]
      } catch (err) {
        app.$handleError(err, () => {
          $logger.info(err)
        })
      }
      $loader().close()
    })

    const { fetch } = useFetch(async () => {
      $loader()
      const { data: response } = await examApi.getQuestionsOfExam(
        data.urlQuery,
        data.examHashId
      )
      data.items = response.object.items
      data.total = response.object.total
      $logger.info(data)
      $loader().close()
    })

    fetch()
    watch(
      () => data.urlQuery.page,
      () => {
        fetch()
      }
    )
    return {
      ...toRefs(data),
      fetch,
    }
  },
  methods: {
    loadOptions({ action, parentNode, callback }) {},
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
    handleSearch() {
      this.urlQuery.page = 1
      this.fetch()
    },
    onImportSuccess() {
      this.handleSearch()
    },
  },
})
</script>
<style scoped>
.list-question .question-item {
  border-bottom: unset;
}
</style>
