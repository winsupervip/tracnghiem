<template>
  <b-modal
    id="modal-edit-exam-document"
    :title="$t('editDocument')"
    hide-footer
    size="lg"
    @shown="shown"
    @hide="hide"
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
              v-model="documentTypeId"
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
            :label="$t('nameOfDocument') + ' (*)'"
            class="mb-3"
          >
            <b-form-input
              v-model="documentName"
              type="text"
              :state="errors[0] ? false : valid ? true : null"
            ></b-form-input>
            <b-form-invalid-feedback>
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider rules="required|max:1000" name="Nội dung">
          <b-form-group
            v-if="updateExamDocument.documentTypeId === 1"
            slot-scope="{ valid, errors }"
            :label="$t('content') + ' (*)'"
          >
            <TinyEditor
              v-if="doShow"
              v-model="documentContent"
              :state="errors[0] ? false : valid ? true : null"
            ></TinyEditor>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider rules="required|max:1000" name="Nội dung">
          <b-form-group
            v-if="updateExamDocument.documentTypeId === 2"
            slot-scope="{ valid, errors }"
            :label="$t('link') + ' (*)'"
          >
            <b-form-input
              v-model="documentContent"
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
        <ValidationProvider rules="required|max:1000" :name="$t('content')">
          <b-form-group
            v-if="updateExamDocument.documentTypeId === 3"
            slot-scope="{ valid, errors }"
            :label="$t('iframeCode') + ' (*)'"
          >
            <b-form-textarea
              id="note"
              v-model="documentContent"
              :state="errors[0] ? false : valid ? true : null"
            ></b-form-textarea>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <div class="d-flex justify-content-around mt-3">
          <b-button
            variant="outline-primary btn-md"
            block
            @click="updateDocument()"
            >{{ $t('save') }}</b-button
          >
          <b-button
            variant="outline-primary btn-md "
            block
            @click="$bvModal.hide('modal-edit-exam-document')"
            >{{ $t('close') }}</b-button
          >
        </div>
      </b-form>
    </ValidationObserver>
  </b-modal>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useFetch,
  useContext,
} from '@nuxtjs/composition-api'
import DocumentApi from '../../api/documentApi'

export default defineComponent({
  props: {
    getExamDocument: {
      type: Function,
      required: true,
    },
    updateExamDocument: { type: Object, required: true },
  },
  setup() {
    const { $loader } = useContext()
    const data = reactive({
      doShow: false,
      documentType: [],
      document: {},
      documentTypeId: null,
      documentName: '',
      documentContent: '',
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await DocumentApi.getAllDocumentType()
      data.documentType = result?.object
    })
    fetch()
    return {
      ...toRefs(data),
    }
  },
  watch: {
    updateExamDocument(val) {
      this.documentTypeId = val.documentTypeId
      this.documentName = val.documentName
      this.documentContent = val.documentContent
    },
  },
  methods: {
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
    },
    loadOptions({ callback }) {
      callback()
    },
    async updateDocument() {
      const documentUpdateValue = {
        document: {
          hashId: this.updateExamDocument.hashIdDocument,
          documentName: this.documentName,
          documentContent: this.documentContent,
          documentTypeId: this.documentTypeId,
        },
      }
      try {
        const { data } = await DocumentApi.updateDocument(documentUpdateValue)
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
