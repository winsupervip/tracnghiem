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
      <DocumentByUser :get-question-document="getQuestionDocument" />
    </div>

    <div class="filter-bar">
      <b-card class="mt-3">
        <b-table striped hover :items="questionDocument" :fields="fields">
          <template #cell(actions)="data">
            <b-dropdown class="m-md-2" no-caret size="sm">
              <template #button-content>
                <b-icon-three-dots></b-icon-three-dots>
              </template>
              <b-dropdown-item
                v-b-modal.modal-edit
                @click="updateDocument(data.item)"
                ><b-icon-file-text></b-icon-file-text>
                Chỉnh sửa
              </b-dropdown-item>
              <b-dropdown-item @click="deleteQuestionDocument(data.item.hashId)"
                ><b-icon-trash></b-icon-trash>
                {{ $t('delete') }}
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
        </b-table>
        <UpdateQuestionDocument
          :update-question-document="updateQuestionDocument"
          :get-question-document="getQuestionDocument"
        />
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  useRoute,
  reactive,
  toRefs,
  useFetch,
} from '@nuxtjs/composition-api'
import DocumentApi from '../../../../api/documentApi'

import QuestionApi from '@/api/question-list-page'
import UpdateQuestionDocument from '@/components/Document/UpdateQuestionDocument.vue'
import DocumentByUser from '@/components/Document/DocumentByUser.vue'
import EventBus from '@/plugins/eventBus'
export default defineComponent({
  components: { DocumentByUser, UpdateQuestionDocument },
  layout: 'dashboard',
  auth: true,
  setup() {
    const { app, $logger, $loader } = useContext()
    const route = useRoute()
    const typeQuestion = route?.value?.query?.type === 'question' ? 0 : 1
    const hashId = route?.value?.params?.id
    $logger.info('🚀 ~ file: _id.vue ~ line 309 ~ setup ~ hashId', hashId)

    const data = reactive({
      breadcrumbs: [],
      titleQuestion: '',

      hashIdQuestion: hashId,

      selected: '2',

      documentByUser: [],
      questionDocument: [],
      fields: [
        { key: 'index', label: 'STT' },
        { key: 'documentName', label: 'Tên tài liệu' },
        { key: 'documentTypeName', label: 'Loại tài liệu' },
        { key: 'actions', label: 'Chức năng' },
      ],
      updateQuestionDocument: {
        hashId: '',
        documentName: '',
        documentContent: '',
        documentTypeId: 2,
      },
    })

    const getQuestionDocument = async () => {
      const { data: result2 } = await DocumentApi.getQuestionDocument(hashId)
      data.questionDocument = result2?.object
      console.log(
        '🚀 ~ file: _id.vue ~ line 408 ~ getQuestionDocument ~ data.questionDocument',
        data.questionDocument
      )
    }

    const { fetch } = useFetch(async () => {
      $loader()

      const { data: result2 } = await DocumentApi.getQuestionDocument(hashId)
      if (typeQuestion === 0) {
        const { data: result4 } = await QuestionApi.getUserQuestionDetails(
          hashId
        )
        data.titleQuestion = result4?.object?.question?.title
      } else {
        const { data: result4 } = await QuestionApi.getUserQuestionGroupDetails(
          hashId
        )
        data.titleQuestion = result4?.object?.questionGroup?.title
      }

      getQuestionDocument()

      data.breadcrumbs = [
        {
          text: app.i18n.t('questionBank'),
          href: '/users/questions',
        },
        {
          text: app.i18n.t(`${data.titleQuestion}`),
          active: true,
        },
        {
          text: app.i18n.t(`Tài liệu tham khảo`),
          active: true,
        },
      ]

      data.questionDocument = result2?.object

      $loader().close()
    })

    fetch()
    return {
      ...toRefs(data),
      getQuestionDocument,
    }
  },
  created() {
    EventBus.$on('update-page-document', this.getQuestionDocument)
  },
  methods: {
    showModal(id) {
      this.$bvModal.show(id)
    },
    hideModal(id) {
      this.$bvModal.hide(id)
    },

    loadOptions({ callback }) {
      callback()
    },
    updateDocument(val) {
      this.updateQuestionDocument = val
    },
    async deleteQuestionDocument(documentId) {
      try {
        const { data } = await DocumentApi.deleteQuestionDocument(documentId)
        this.getQuestionDocument()

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
