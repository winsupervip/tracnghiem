<template>
  <b-modal
    id="modal-update-document-by-user"
    ref="modal-update-document-by-user"
    hide-footer
    size="lg"
    :ok-only="okOnly"
    @shown="shown"
    @hide="hide"
  >
    <ValidationObserver>
      <b-form>
        <ValidationProvider rules="required" :name="$t('typeOfDocument')">
          <b-form-group
            slot-scope="{ valid, errors }"
            class="mb-1"
            :label="$t('typeOfDocument') + ' (*)'"
          >
            <treeselect
              v-model="document.documentTypeId"
              :options="documentType"
              size="xl"
              :load-options="loadOptions"
              :placeholder="$t('typeOfDocument')"
            />
            <b-form-invalid-feedback :state="valid">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider
          rules="required|max:255"
          :name="$t('nameOfDocument')"
        >
          <b-form-group
            slot-scope="{ valid, errors }"
            class="mb-1"
            :label="$t('nameOfDocument') + ' (*)'"
          >
            <b-form-input
              v-model="document.documentName"
              trim
              type="text"
              :placeholder="$t('nameOfDocument')"
              autocomplete="off"
              :state="errors[0] ? false : valid ? true : null"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <div v-if="document.documentTypeId == 1" class="d-block">
          <ValidationProvider rules="required|max:1000" :name="$t('content')">
            <b-form-group
              slot-scope="{ valid, errors }"
              class="mb-1"
              :label="$t('content') + ' (*)'"
            >
              <TinyEditor
                v-if="doShow"
                v-model="document.documentContent"
                :options="optionsText"
                :state="errors[0] ? false : valid ? true : null"
              />
              <b-form-invalid-feedback :state="valid">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </div>
        <div v-if="document.documentTypeId == 2">
          <ValidationProvider rules="required|max:1000" :name="$t('content')">
            <b-form-group
              slot-scope="{ valid, errors }"
              class="mb-1"
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
              <b-form-invalid-feedback :state="valid">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </div>
        <div v-if="document.documentTypeId == 3" class="d-flex">
          <ValidationProvider rules="required|max:1000" :name="$t('content')">
            <b-form-group
              slot-scope="{ valid, errors }"
              class="mb-1"
              :label="$t('iframeCode') + ' (*)'"
            >
              <textarea
                id="embed-code"
                v-model="document.documentContent"
                rows="6"
                cols="89"
                :state="errors[0] ? false : valid ? true : null"
              >
              </textarea>

              <b-form-invalid-feedback :state="valid">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </div>
        <div class="d-flex justify-content-around mt-3">
          <b-button
            variant="outline-primary btn-md"
            block
            @click="updateUserDocument()"
            >{{ $t('save') }}</b-button
          >
          <b-button
            variant="outline-primary btn-md "
            block
            @click="$bvModal.hide('modal-update-document-by-user')"
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
import EventBus from '@/plugins/eventBus'

export default defineComponent({
  props: {
    documentUserUpdateValue: {
      type: Object,
      required: true,
    },
    getDocumentByUser: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const { $loader } = useContext()
    const data = reactive({
      doShow: false,
      documentType: [],
      document: {},
      optionsText: {
        convert_urls: false,
        entity_encoding: 'raw',
      },
      okOnly: true,
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
    documentUserUpdateValue(val) {
      this.document = val
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
    async updateUserDocument() {
      const documentUpdateValue = {
        document: {
          hashId: this.document.hashId,
          documentName: this.document.documentName,
          documentContent: this.document.documentContent,
          documentTypeId: this.document.documentTypeId,
        },
      }
      try {
        const { data } = await DocumentApi.updateDocument(documentUpdateValue)
        this.getDocumentByUser()
        EventBus.$emit('update-page-document')
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
