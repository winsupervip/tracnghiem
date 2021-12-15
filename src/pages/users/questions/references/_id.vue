<template>
  <div class="page-container">
    <div
      class="d-flex align-items-center justify-content-between references-header"
    >
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <b-button
        variant="outline-primary btn-sm rounded-pill"
        @click="$bvModal.show('bv-modal-add-references')"
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
                xóa
              </b-dropdown-item>
            </b-dropdown>
          </template>
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
        </b-table>
      </b-card>
    </div>
    <b-modal
      id="modal-edit"
      ref="modal"
      :title="$t('editDocument')"
      hide-footer
      size="lg"
      @shown="showModal"
      @hide="hideModal"
    >
      <ValidationObserver ref="form">
        <b-form>
          <ValidationProvider
            rules="required"
            :name="$t('pleaseFillInTheDocumentType')"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('typeOfDocument') + ' (*)'"
              class="mb-3"
            >
              <treeselect
                v-model="updateQuestionDocument.documentTypeId"
                :options="documentType"
                size="xl"
                :load-options="loadOptions"
                :placeholder="$t('typeOfDocument')"
              />
              <b-form-invalid-feedback :state="valid">
                {{ errors ? errors[0] : '' }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider name="Tên tài liệu" rules="required|max:255">
            <b-form-group
              slot-scope="{ valid, errors }"
              label="Tên tài liệu (*)"
              class="mb-3"
            >
              <b-form-input
                v-model="updateQuestionDocument.documentName"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider rules="max:1000" name="Nội dung">
            <b-form-group
              v-if="updateQuestionDocument.documentTypeId === 1"
              slot-scope="{ valid, errors }"
              label="Nội dung (*)"
            >
              <TinyEditor
                v-model="updateQuestionDocument.documentContent"
                :state="errors[0] ? false : valid ? true : null"
              ></TinyEditor>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider rules="max:1000" name="Nội dung">
            <b-form-group
              v-if="updateQuestionDocument.documentTypeId === 2"
              slot-scope="{ valid, errors }"
              label="Nội dung (*)"
            >
              <b-form-input
                v-model="updateQuestionDocument.documentContent"
                trim
                type="text"
                :placeholder="$t('search')"
                autocomplete="off"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider rules="max:1000" name="Nội dung">
            <b-form-group
              v-if="updateQuestionDocument.documentTypeId === 3"
              slot-scope="{ valid, errors }"
              label="Nội dung (*)"
            >
              <b-form-textarea
                id="note"
                v-model="updateQuestionDocument.documentContent"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-textarea>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <footer class="modal-footer">
            <button type="button" class="btn btn-secondary">Hủy Bỏ</button>
            <button type="button" class="btn btn-primary">Lưu</button>
          </footer>
        </b-form>
      </ValidationObserver>
    </b-modal>
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
import DocumentByUser from '@/components/Document/DocumentByUser.vue'
export default defineComponent({
  components: { DocumentByUser },
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

    async addDocument(documentValue) {
      try {
        const { data } = await DocumentApi.addDocument(documentValue)
        this.getDocumentByUser()
        this.hideModal('bv-modal-add-user-references')
        this.documentValue = {
          document: {
            hashId: '',
            documentName: '',
            documentContent: '',
            documentTypeId: 2,
          },
        }
        this.$handleError(data)
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },

    deleteQuestionDocument(documentId) {
      console.log(
        '🚀 ~ file: _id.vue ~ line 278 ~ deleteQuestionDocument ~ documentId',
        documentId
      )
      // const questionDocument = {
      //   hashIdQuestion: this.hashIdQuestion,
      //   hashIdDocument: documentId,
      //   typeId: this.typeId,
      // }
      // console.log(this.questionDocument)
      // try {
      //   const { data } = await DocumentApi.deleteQuestionDocument(
      //     questionDocument
      //   )
      //   this.getQuestionDocument()
      //   this.$handleError(data)
      // } catch (err) {
      //   this.$handleError(err, () => {
      //     console.log(err)
      //   })
      // }
    },
  },
})
</script>
