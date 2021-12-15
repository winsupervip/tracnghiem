<template>
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
          class="col-12 col-md-3 mb-3 d-flex justify-content-around align-items-end"
        >
          <b-button variant="outline-primary" @click="getDocumentByUser">
            <b-icon-filter></b-icon-filter> {{ $t('apply') }}
          </b-button>
          <b-button v-b-modal.bv-modal-add-user-references variant="primary">
            <b-icon-plus></b-icon-plus> {{ $t('add') }}
          </b-button>
          <AddDocumentByUser :get-document-by-user="getDocumentByUser" />
        </div>
      </b-form-row>
      <b-form-row class="row">
        <b-form-group
          class="col-12 col-md-3 mb-3"
          :label="$t('nameOfDocument')"
          label-for="nameOfDocument"
        >
          <treeselect
            v-model="urlQuery.documnentTypeId"
            :options="documentType"
            :load-options="loadOptions"
            :placeholder="$t('typeOfDocument')"
          />
        </b-form-group>
      </b-form-row>
    </b-form>

    <hr />
    <div v-if="documentByUser.total === 0">
      <EmptyData />
    </div>
    <div v-else>
      <b-table striped hover :items="documentByUser" :fields="fields">
        <template #cell(actions)="data">
          <b-dropdown class="m-md-2" no-caret size="sm">
            <template #button-content>
              <b-icon-three-dots></b-icon-three-dots>
            </template>
            <b-dropdown-item @click="addToQuestionDocument(document.hashId)"
              ><b-icon-plus-circle></b-icon-plus-circle>
              {{ $t('addToQuestionDocument') }}
            </b-dropdown-item>
            <b-dropdown-item
              v-b-modal.modal-update-document-by-user
              @click="updateDocumentUserValue(data.item)"
              ><b-icon-pencil-square></b-icon-pencil-square>

              Chỉnh sửa
            </b-dropdown-item>

            <b-dropdown-item @click="deleteDocument(data.item.hashId)"
              ><b-icon-trash></b-icon-trash>
              xóa
            </b-dropdown-item>
          </b-dropdown>
        </template>
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
      </b-table>
      <UpdateDocumentByUser
        :document-user-update-value="documentUserUpdateValue"
      />
      <b-pagination
        v-model="urlQuery.page"
        class="pagination"
        :total-rows="total"
        align="center"
        :per-page="urlQuery.pageSize"
      ></b-pagination>
    </div>
  </b-modal>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  useContext,
  useFetch,
  useRoute,
} from '@nuxtjs/composition-api'
import DocumentApi from '../../api/documentApi'
import AddDocumentByUser from './AddDocumentByUser.vue'
import UpdateDocumentByUser from './UpdateDocumentByUser.vue'
import catalogApi from '@/api/catalogApi'
export default defineComponent({
  auth: true,
  components: { AddDocumentByUser, UpdateDocumentByUser },
  props: {
    getQuestionDocument: {
      type: Function,
      required: true,
    },
  },

  setup() {
    const route = useRoute()
    const hashId = route?.value?.params?.id
    const typeQuestion = route?.value?.query?.type === 'question' ? 0 : 1
    const { $loader } = useContext()
    const data = reactive({
      fields: [
        { key: 'documentName', label: 'Tên tài liệu' },
        { key: 'documentTypeName', label: 'Loại tài liệu' },
        { key: 'actions', label: 'Chức năng' },
      ],
      documentByUser: [],
      urlQuery: {
        page: 1,
        pageSize: 2,
        keyword: '',
        documnentTypeId: 1,
        orderBy: 1,
      },
      hashIdQuestion: hashId,
      typeId: typeQuestion,
      total: 1,
      orderBy: [],
      documentType: [],
      documentUserUpdateValue: {
        hashId: '',
        documentName: '',
        documentContent: '',
        documentTypeId: 2,
      },
    })
    const getDocumentByUser = async () => {
      const { data: result } = await DocumentApi.getDocumentByUser(
        data.urlQuery
      )
      data.total = result.object?.total

      data.documentByUser = result?.object?.items
    }
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await DocumentApi.getAllDocumentType()

      const { data: result2 } = await catalogApi.getExamSortBy()

      getDocumentByUser()

      data.orderBy = result2?.object?.items

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
      getDocumentByUser,
    }
  },
  computed: {},
  methods: {
    loadOptions({ callback }) {
      callback()
    },
    updateDocumentUserValue(item) {
      this.documentUserUpdateValue = { ...item }
      console.log(
        '🚀 ~ file: DocumentByUser.vue ~ line 205 ~ updateDocumentUserValue ~ this.documentUserUpdateValue',
        this.documentUserUpdateValue
      )
    },
    deleteDocument(hashId) {
      console.log(
        '🚀 ~ file: DocumentByUser.vue ~ line 201 ~ deleteDocument ~ hashId',
        hashId
      )
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
  },
})
</script>
<style scoped>
abbr {
  text-decoration: none;
}
</style>
