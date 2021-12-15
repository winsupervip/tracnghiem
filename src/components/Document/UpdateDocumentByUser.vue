<template>
  <b-modal id="modal-update-document-by-user" hide-footer size="lg">
    <ValidationObserver>
      <b-form>
        <ValidationProvider rules="required" :name="$t('typeOfDocument')">
          <b-form-group
            slot-scope="{ valid, errors }"
            class="mb-1"
            :label="$t('typeOfDocument') + ' (*)'"
          >
            <treeselect
              v-model="documentUserUpdate.documentTypeId"
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
              v-model="documentUserUpdate.documentName"
              trim
              type="text"
              :placeholder="$t('nameOfDocument')"
              autocomplete="off"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <div v-if="documentUserUpdate.documentTypeId == 1" class="d-block">
          <ValidationProvider rules="required" :name="$t('content')">
            <b-form-group
              slot-scope="{ valid, errors }"
              class="mb-1"
              :label="$t('content') + ' (*)'"
            >
              <TinyEditor
                v-model="documentUserUpdate.documentContent"
              ></TinyEditor>
              <b-form-invalid-feedback :state="valid">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </div>
        <div v-if="documentUserUpdate.documentTypeId == 2">
          <ValidationProvider rules="required" :name="$t('content')">
            <b-form-group
              slot-scope="{ valid, errors }"
              class="mb-1"
              :label="$t('content') + ' (*)'"
            >
              <b-form-input
                v-model="documentUserUpdate.documentContent"
                trim
                type="text"
                :placeholder="$t('search')"
                autocomplete="off"
              ></b-form-input>
              <b-form-invalid-feedback :state="valid">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </div>
        <div v-if="documentUserUpdate.documentTypeId == 3" class="d-flex">
          <ValidationProvider rules="required" :name="$t('content')">
            <b-form-group
              slot-scope="{ valid, errors }"
              class="mb-1"
              :label="$t('content') + ' (*)'"
            >
              <textarea
                id="embed-code"
                v-model="documentUserUpdate.documentContent"
                rows="6"
                cols="89"
              >
              </textarea>

              <b-form-invalid-feedback :state="valid">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </div>
        <div class="d-flex justify-content-around mt-3">
          <b-button variant="outline-primary btn-md" block @click="test()">{{
            $t('save')
          }}</b-button>
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
export default defineComponent({
  props: {
    documentUserUpdateValue: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { $loader } = useContext()
    const data = reactive({
      documentUserUpdate: props.documentUserUpdateValue,
      documentType: [],
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
  methods: {
    loadOptions({ callback }) {
      callback()
    },
    test() {
      console.log('123456789', this.documentUserUpdateValue)
      console.log('000000000', this.documentUserUpdate)
    },
  },
})
</script>
