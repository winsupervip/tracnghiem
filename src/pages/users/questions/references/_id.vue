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
      <b-modal id="bv-modal-add-references" hide-footer size="lg">
        <div class="d-flex">
          <div class="text-dark fw-bold">{{ $t('typeOfDocument') }} :</div>
          <b-form-group class="col-12 col-md-10 mb-3">
            <b-form-select
              v-model="documentValue.document.documentTypeId"
              size="xl"
              :options="documentType"
              value-field="id"
              text-field="typeName"
            ></b-form-select>
          </b-form-group>
        </div>

        <div class="d-flex">
          <div class="text-dark fw-bold">{{ $t('nameOfDocument') }} :</div>
          <b-form-group class="col-12 col-md-10 mb-3">
            <input v-model="documentValue.document.documentName" type="text" />
          </b-form-group>
        </div>
        <div v-if="documentValue.document.documentTypeId == 1" class="d-block">
          <div class="text-dark fw-bold">{{ $t('content') }} :</div>

          <TinyEditor
            v-model="documentValue.document.documentContent"
          ></TinyEditor>
        </div>
        <div
          v-if="documentValue.document.documentTypeId == 2"
          class="col-12 col-md-6 col-mb-2 d-flex"
        >
          <div class="text-dark fw-bold">{{ $t('content') }} :</div>

          <input v-model="documentValue.document.documentContent" type="text" />
        </div>
        <div v-if="documentValue.document.documentTypeId == 3" class="d-flex">
          <div class="text-dark fw-bold">{{ $t('content') }} :</div>

          <textarea
            id="embed-code"
            v-model="documentValue.document.documentContent"
            rows="6"
            cols="75"
          >
          </textarea>
        </div>
        <div class="d-flex justify-content-around mt-3">
          <b-button
            variant="outline-primary btn-md rounded-pill"
            block
            @click="addDocument(documentValue)"
            >{{ $t('save') }}</b-button
          >
          <b-button
            variant="outline-primary btn-md rounded-pill"
            block
            @click="$bvModal.hide('bv-modal-add-references')"
            >{{ $t('close') }}</b-button
          >
        </div>
      </b-modal>
    </div>
    <b-form-group
      :label="$t('keyword')"
      label-for="keyword"
      class="col-12 col-md-6 mb-3"
    >
      <b-form-input
        id="tag-search-input"
        trim
        type="search"
        :placeholder="$t('search')"
        autocomplete="off"
      ></b-form-input>
    </b-form-group>

    <div class="filter-bar">
      <b-card v-for="document in documentByUser" :key="document.id" class="mt-3"
        ><div
          class="d-flex align-items-center justify-content-between card-question-header"
        >
          <div class="d-flex">
            <div class="font-bold me-3">
              <abbr :title="document.documentName">
                {{ document.documentName }}
              </abbr>
            </div>
          </div>
          <div class="d-flex">
            <span class="btn btn-xs rounded-pill btn-green-light me-2">
              {{ document.documentTypeName }}</span
            >
            <b-dropdown
              class="dropdown-button-circle"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                <b-icon icon="three-dots-vertical"></b-icon>
              </template>

              <b-dropdown-item href="#">{{ $t('edit') }}</b-dropdown-item>
              <b-dropdown-item href="#">{{ $t('delete') }}</b-dropdown-item>
            </b-dropdown>
          </div>
        </div></b-card
      >
    </div>
    <b-pagination
      v-model="urlQuery.page"
      class="pagination"
      :total-rows="total"
      :per-page="urlQuery.pageSize"
    ></b-pagination>
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

export default defineComponent({
  layout: 'dashboard',
  auth: true,
  setup() {
    const { app, $logger, $loader } = useContext()
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1
    $logger.info(queryPage)
    const data = reactive({
      breadcrumbs: [
        {
          text: app.i18n.t('questionBank'),
          href: '/users/questions',
        },
        {
          text: app.i18n.t('documentation'),
          active: true,
        },
      ],
      documentType: [],
      selected: '2',
      total: 1,
      documentValue: {
        document: {
          hashId: '',
          documentName: '',
          documentContent: '',
          documentTypeId: 2,
        },
      },
      urlQuery: {
        page: 1,
        pageSize: 10,
        keyword: '',
        categories: [],
        documnentTypeId: null,
        orderBy: 1,
      },
      documentByUser: [],
    })

    const addDocument = async (documentValue) => {
      const { data: result } = await DocumentApi.addDocument(documentValue)
      $logger.info(result)
    }
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await DocumentApi.getAllDocumentType()
      const { data: result2 } = await DocumentApi.getDocumentByUser()
      $logger.info(result2)
      data.documentByUser = result2?.object?.items
      data.documentType = result?.object

      $loader().close()
    })
    fetch()
    return {
      ...toRefs(data),
      addDocument,
    }
  },
  methods: {
    loadOptions({ callback }) {
      callback()
    },
  },
})
</script>
<style scoped>
abbr {
  text-decoration: none;
}
</style>
