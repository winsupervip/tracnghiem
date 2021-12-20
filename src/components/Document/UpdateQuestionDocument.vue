<template>
  <b-modal id="modal-edit" :title="$t('editDocument')" hide-footer size="lg">
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
              v-model="document.documentTypeId"
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
              v-model="document.documentName"
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
            v-if="updateQuestionDocument.documentTypeId === 1"
            slot-scope="{ valid, errors }"
            :label="$t('content') + ' (*)'"
          >
            <TinyEditor
              v-model="document.documentContent"
              :state="errors[0] ? false : valid ? true : null"
            ></TinyEditor>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider rules="required|max:1000" name="Nội dung">
          <b-form-group
            v-if="updateQuestionDocument.documentTypeId === 2"
            slot-scope="{ valid, errors }"
            :label="$t('link') + ' (*)'"
          >
            <b-form-input
              v-model="document.documentContent"
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
            v-if="updateQuestionDocument.documentTypeId === 3"
            slot-scope="{ valid, errors }"
            :label="$t('iframeCode') + ' (*)'"
          >
            <b-form-textarea
              id="note"
              v-model="document.documentContent"
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
            @click="$bvModal.hide('modal-edit')"
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
    getQuestionDocument: {
      type: Function,
      required: true,
    },
    updateQuestionDocument: { type: Object, required: true },
  },
  setup() {
    const { $loader } = useContext()
    const data = reactive({
      documentType: [],
      document: {},
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
    updateQuestionDocument(val) {
      this.document = val
    },
  },
  methods: {
    loadOptions({ callback }) {
      callback()
    },
    async updateDocument() {
      const documentUpdateValue = {
        document: {
          hashId: this.document.hashIdDocument,
          documentName: this.document.documentName,
          documentContent: this.document.documentContent,
          documentTypeId: this.document.documentTypeId,
        },
      }
      try {
        const { data } = await DocumentApi.updateDocument(documentUpdateValue)
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
