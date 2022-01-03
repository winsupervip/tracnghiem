<template>
  <div class="page-container">
    <div
      class="d-flex align-items-center justify-content-between references-header"
    >
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <b-button
        v-b-modal.bv-modal-user-references
        variant="outline-primary btn-sm rounded-pill"
      >
        {{ $t('add') }}
      </b-button>
      <DocumentByUser :get-exam-document="getExamDocument" />
    </div>
    <div class="filter-bar">
      <b-card class="mt-3">
        <div v-if="examDocument.length === 0"><EmptyData /></div>
        <b-table v-else striped hover :items="examDocument" :fields="fields">
          <template #cell(actions)="data">
            <b-dropdown class="m-md-2" no-caret size="sm" variant="primary">
              <template #button-content>
                <b-icon-three-dots></b-icon-three-dots>
              </template>
              <b-dropdown-item
                v-b-modal.modal-edit
                @click="updateDocument(data.item)"
                ><b-icon-file-text></b-icon-file-text>
                {{ $t('editDocument') }}
              </b-dropdown-item>
              <b-dropdown-item
                ><b-icon-trash></b-icon-trash>
                {{ $t('delete') }}
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
        </b-table>
        <!-- <UpdateQuestionDocument
          :update-question-document="updateQuestionDocument"
          :get-question-document="getQuestionDocument"
        /> -->
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useRoute,
  useFetch,
  useContext,
} from '@nuxtjs/composition-api'
// import DocumentApi from '../../../../api/documentApi'

import ExamApi from '@/api/examApi'
// import UpdateQuestionDocument from '@/components/Document/UpdateQuestionDocument.vue'
import DocumentByUser from '@/components/Document/DocumentByUser.vue'
import EventBus from '@/plugins/eventBus'
export default defineComponent({
  components: { DocumentByUser },
  layout: 'dashboard',
  auth: true,
  setup() {
    const { app, $loader } = useContext()
    const route = useRoute()
    const hashId = route?.value?.params?.id
    console.log('🚀 ~ file: _id.vue ~ line 72 ~ setup ~ route', route)

    const data = reactive({
      breadcrumbs: [],
      titleExam: '',
      examDocument: [],
      fields: [
        { key: 'index', label: 'STT' },
        { key: 'documentName', label: 'Tên tài liệu' },
        { key: 'documentTypeName', label: 'Loại tài liệu' },
        { key: 'actions', label: 'Chức năng' },
      ],
    })

    const getExamDocument = async () => {
      const { data: result } = await ExamApi.getExamDocument(hashId)
      data.examDocument = result?.object
    }
    const { fetch } = useFetch(async () => {
      const { data: result } = await ExamApi.getUserExamById(hashId)
      getExamDocument()
      data.titleExam = result?.object?.title
      data.breadcrumbs = [
        {
          text: app.i18n.t('exam.exam_title'),
          href: '/users/exams',
        },
        {
          text: app.i18n.t(`${data.titleExam}`),
          active: true,
        },
        {
          text: app.i18n.t(`Tài liệu tham khảo`),
          active: true,
        },
      ]
      $loader().close()
    })
    fetch()
    return { ...toRefs(data), getExamDocument }
  },
  methods: {
    created() {
      EventBus.$on('update-page-exam-document', this.getExamDocument)
    },
  },
})
</script>
