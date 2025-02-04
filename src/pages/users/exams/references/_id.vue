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
      <DocumentByUser is-checked="exam" :get-document="getExamDocument" />
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
                v-b-modal.modal-edit-exam-document
                @click="updateDocument(data.item)"
                ><b-icon-file-text></b-icon-file-text>
                {{ $t('editDocument') }}
              </b-dropdown-item>
              <b-dropdown-item @click="deleteExamDocument(data.item.hashId)"
                ><b-icon-trash></b-icon-trash>
                {{ $t('delete') }}
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
        </b-table>
        <UpdateExamDocument
          :update-exam-document="updateExamDocument"
          :get-exam-document="getExamDocument"
        />
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
import DocumentApi from '../../../../api/documentApi'

import ExamApi from '@/api/examApi'
import UpdateExamDocument from '@/components/Document/UpdateExamDocument.vue'
import DocumentByUser from '@/components/Document/DocumentByUser.vue'

export default defineComponent({
  components: { DocumentByUser, UpdateExamDocument },
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
      updateExamDocument: {
        hashId: '',
        documentName: '',
        documentContent: '',
        documentTypeId: 2,
      },
    })

    const getExamDocument = async () => {
      const { data: result } = await DocumentApi.getExamDocument(hashId)
      data.examDocument = result?.object?.items
      console.log(
        '🚀 ~ file: _id.vue ~ line 89 ~ getExamDocument ~ data.examDocument',
        data.examDocument
      )
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
    updateDocument(val) {
      this.updateExamDocument = val
    },
    async deleteExamDocument(documentId) {
      try {
        const { data } = await DocumentApi.deleteExamDocument(documentId)
        this.getExamDocument()

        this.$handleError(data)
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
  },
})
</script>
