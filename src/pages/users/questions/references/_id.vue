<template>
  <div class="page-container">
    <div
      class="
        d-flex
        align-items-center
        justify-content-between
        references-header
      "
    >
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <b-button
        variant="outline-primary btn-sm rounded-pill"
        @click="$bvModal.show('bv-modal-add-references')"
      >
        {{ $t('add') }}
      </b-button>
      <b-modal
        id="bv-modal-add-references"
        hide-footer
        size="xl"
        title="Tìm kiếm tài liệu tham khảo"
      >
        <b-form
          ><b-form-row class="row">
            <b-form-group
              :label="$t('keyword')"
              label-for="keyword"
              class="col-12 col-md-6 mb-3"
            >
              <b-form-input
                id="tag-search-input"
                v-model="urlQuery.keyword"
                trim
                type="search"
                :placeholder="$t('search')"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              :label="$t('keyword')"
              label-for="keyword"
              class="col-12 col-md-3 mb-3"
            >
              <treeselect
                id="sortby"
                v-model="urlQuery.orderBy"
                :options="orderBy"
                :load-options="loadOptions"
                :placeholder="$t('sort')"
              />
            </b-form-group>
            <div
              class="
                col-12 col-md-3
                mb-3
                d-flex
                justify-content-around
                align-items-end
              "
            >
              <b-button variant="outline-primary" @click="getDocumentByUser">
                <b-icon-filter></b-icon-filter> {{ $t('apply') }}
              </b-button>
              <b-button
                variant="primary"
                @click="$bvModal.show('bv-modal-add-user-references')"
              >
                <b-icon-plus></b-icon-plus> {{ $t('add') }}
              </b-button>
            </div>
          </b-form-row>
          <b-form-row class="row">
            <b-form-group
              class="col-12 col-md-10 mb-3"
              :label="$t('nameOfDocument')"
              label-for="nameOfDocument"
            >
              <b-form-select
                v-model="urlQuery.documnentTypeId"
                size="xl"
                :options="documentType"
                value-field="id"
                text-field="typeName"
              ></b-form-select>
            </b-form-group>
          </b-form-row>
        </b-form>

        <hr />
        <b-card
          v-for="document in documentByUser"
          :key="document.id"
          class="mt-3"
          ><div
            class="
              d-flex
              align-items-center
              justify-content-between
              card-question-header
            "
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
              <b-button
                variant="outline-primary btn-sm rounded-pill"
                @click="addToQuestionDocument(document.hashId)"
              >
                {{ $t('addToQuestionDocument') }}
              </b-button>
            </div>
          </div>
        </b-card>

        <b-pagination
          v-model="urlQuery.page"
          class="pagination"
          :total-rows="total"
          align="center"
          :per-page="urlQuery.pageSize"
        ></b-pagination>
      </b-modal>
    </div>
    <b-modal id="bv-modal-add-user-references" hide-footer size="lg">
      <div class="d-flex">
        <b-form-group class="col-12 col-md-6 mb-3">
          <div class="text-dark fw-bold">{{ $t('typeOfDocument') }} :</div>
          <b-form-select
            v-model="documentValue.document.documentTypeId"
            size="xl"
            :options="documentType"
            value-field="id"
            text-field="typeName"
          ></b-form-select>
        </b-form-group>

        <b-form-group class="col-12 col-md-6 mb-3">
          <div class="text-dark fw-bold">{{ $t('nameOfDocument') }} :</div>
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
          @click="$bvModal.hide('bv-modal-add-user-references')"
          >{{ $t('close') }}</b-button
        >
      </div>
    </b-modal>
    <div class="filter-bar">
      <b-card
        v-for="document in questionDocument"
        :key="document.id"
        class="mt-3"
        ><div
          class="
            d-flex
            align-items-center
            justify-content-between
            card-question-header
          "
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

              <b-dropdown-item
                @click="$bvModal.show('bv-modal-update-references')"
                >{{ $t('edit') }}</b-dropdown-item
              >
              <b-dropdown-item
                @click="deleteQuestionDocument(document.hashId)"
                >{{ $t('delete') }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </div>
        <b-modal id="bv-modal-update-references" hide-footer size="lg">
          <div class="d-flex">
            <div class="text-dark fw-bold">{{ $t('typeOfDocument') }} :</div>
            <b-form-group class="col-12 col-md-10 mb-3">
              <b-form-select
                disabled
                size="xl"
                :options="document.documentTypeName"
                value-field="id"
                text-field="typeName"
              ></b-form-select>
            </b-form-group>
          </div>

          <div class="d-flex">
            <div class="text-dark fw-bold">{{ $t('nameOfDocument') }} :</div>
            <b-form-group class="col-12 col-md-10 mb-3">
              <input
                v-model="documentValue.document.documentName"
                type="text"
              />
            </b-form-group>
          </div>
          <div
            v-if="documentValue.document.documentTypeId == 1"
            class="d-block"
          >
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

            <input
              v-model="documentValue.document.documentContent"
              type="text"
            />
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
          </div></b-modal
        ></b-card
      >
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
  watch,
} from '@nuxtjs/composition-api'
import DocumentApi from '../../../../api/documentApi'
import catalogApi from '@/api/catalogApi'
export default defineComponent({
  layout: 'dashboard',
  auth: true,
  setup() {
    const { app, $logger, $loader } = useContext()
    const route = useRoute()
    const typeQuestion = route?.value?.query?.type === 'question' ? 0 : 1
    const hashId = route?.value?.params?.id
    $logger.info('🚀 ~ file: _id.vue ~ line 309 ~ setup ~ hashId', hashId)

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
      typeId: typeQuestion,
      hashIdQuestion: hashId,
      documentType: [],
      selected: '2',
      total: 1,
      orderBy: [],
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
        pageSize: 5,
        keyword: '',
        documnentTypeId: 1,
        orderBy: 1,
      },
      documentByUser: [],
      questionDocument: [],
    })

    const getDocumentByUser = async () => {
      const { data: result } = await DocumentApi.getDocumentByUser(
        data.urlQuery
      )
      data.total = result.object?.total
      console.log(
        '🚀 ~ file: _id.vue ~ line 352 ~ getDocumentByUser ~ data.urlQuery',
        data.urlQuery
      )
      data.documentByUser = result?.object?.items
    }
    const getQuestionDocument = async () => {
      const { data: result2 } = await DocumentApi.getQuestionDocument(hashId)
      data.questionDocument = result2?.object
    }

    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await DocumentApi.getAllDocumentType()

      const { data: result2 } = await DocumentApi.getQuestionDocument(hashId)
      const { data: result3 } = await catalogApi.getExamSortBy()
      getQuestionDocument()
      getDocumentByUser()
      data.orderBy = result3?.object?.items
      data.questionDocument = result2?.object

      data.documentType = result?.object

      $loader().close()
    })
    watch(
      () => data.urlQuery.page,
      () => {
        getDocumentByUser()
      }
    )
    fetch()
    return {
      ...toRefs(data),
      getQuestionDocument,
      getDocumentByUser,
    }
  },

  methods: {
    loadOptions({ callback }) {
      callback()
    },
    async addDocument(documentValue) {
      try {
        const { data } = await DocumentApi.addDocument(documentValue)
        this.getDocumentByUser()

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
    async addToQuestionDocument(documentId) {
      const questionDocument = {
        questionDocument: {
          hashIdQuestion: this.hashIdQuestion,
          hashIdDocument: documentId,
          typeId: this.typeId,
        },
      }
      try {
        const { data } = await DocumentApi.addQuestionDocument(questionDocument)
        this.getQuestionDocument()

        this.$handleError(data)
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    async deleteQuestionDocument(documentId) {
      const questionDocument = {
        hashIdQuestion: this.hashIdQuestion,
        hashIdDocument: documentId,
        typeId: this.typeId,
      }

      try {
        const { data } = await DocumentApi.deleteQuestionDocument(
          questionDocument
        )
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
<style scoped>
abbr {
  text-decoration: none;
}
</style>
