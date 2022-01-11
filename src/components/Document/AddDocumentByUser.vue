<template>
  <b-modal
    id="bv-modal-add-user-references"
    hide-footer
    size="lg"
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
              v-model="documentValue.document.documentTypeId"
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
        <ValidationProvider rules="required" :name="$t('nameOfDocument')">
          <b-form-group
            slot-scope="{ valid, errors }"
            class="mb-1"
            :label="$t('nameOfDocument') + ' (*)'"
          >
            <b-form-input
              v-model="documentValue.document.documentName"
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

        <div v-if="documentValue.document.documentTypeId == 1" class="d-block">
          <ValidationProvider rules="required" :name="$t('content')">
            <b-form-group
              slot-scope="{ valid, errors }"
              class="mb-1"
              :label="$t('content') + ' (*)'"
            >
              <TinyEditor
                v-if="doShow"
                v-model="documentValue.document.documentContent"
                :state="errors[0] ? false : valid ? true : null"
              ></TinyEditor>
              <b-form-invalid-feedback :state="valid">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </div>
        <div v-if="documentValue.document.documentTypeId == 2">
          <ValidationProvider rules="required" :name="$t('content')">
            <b-form-group
              slot-scope="{ valid, errors }"
              class="mb-1"
              :label="$t('link') + ' (*)'"
            >
              <b-form-input
                v-model="documentValue.document.documentContent"
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
        <div v-if="documentValue.document.documentTypeId == 3" class="d-flex">
          <ValidationProvider rules="required" :name="$t('content')">
            <b-form-group
              slot-scope="{ valid, errors }"
              class="mb-1"
              :label="$t('iframeCode') + ' (*)'"
            >
              <textarea
                id="embed-code"
                v-model="documentValue.document.documentContent"
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
            @click="addDocument(documentValue)"
            >{{ $t('save') }}</b-button
          >
          <b-button
            variant="outline-primary btn-md "
            block
            @click="$bvModal.hide('bv-modal-add-user-references')"
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
  components: {},
  props: {
    getDocumentByUser: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { $loader } = useContext()
    const data = reactive({
      doShow: false,
      documentValue: {
        document: {
          hashId: '',
          documentName: '',
          documentContent: '',
          documentTypeId: 2,
        },
      },
      documentType: [],
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await DocumentApi.getAllDocumentType()

      props.getDocumentByUser()

      data.documentType = result?.object

      $loader().close()
    })
    fetch()
    return {
      ...toRefs(data),
    }
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
    resetDocumentValue() {
      this.documentValue = {
        document: {
          hashId: '',
          documentName: '',
          documentContent: '',
          documentTypeId: 2,
        },
      }
    },
    async addDocument(documentValue) {
      try {
        const { data } = await DocumentApi.addDocument(documentValue)
        this.getDocumentByUser()
        this.$bvModal.hide(`bv-modal-add-user-references`)
        this.resetDocumentValue()
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
