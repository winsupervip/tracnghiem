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
      <b-modal id="bv-modal-add-references" size="lg">
        <div class="d-flex">
          <div class="text-dark fw-bold">{{ $t('typeOfDocument') }} :</div>
          <b-form-group class="col-12 col-md-10 mb-3">
            <treeselect
              v-model="documentType"
              :options="documentType"
              :placeholder="$t('search')"
            ></treeselect>
          </b-form-group>
        </div>
        <div class="d-block">
          <div class="text-dark fw-bold">{{ $t('content') }} :</div>

          <TinyEditor></TinyEditor>
        </div>
      </b-modal>
    </div>

    <div class="filter-bar">
      <!-- <b-pagination
        v-model="urlQuery.page"
        class="pagination"
        :total-rows="total"
        :per-page="urlQuery.pageSize"
      ></b-pagination> -->

      <b-card class="mt-3"
        ><div
          class="
            d-flex
            align-items-center
            justify-content-between
            card-question-header
          "
        >
          <div class="d-flex"></div>
          <div class="d-flex">
            <span class="btn btn-xs rounded-pill btn-green-light me-2">id</span>
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
              <b-dropdown-item href="#">{{ $t('preview') }}</b-dropdown-item>
              <b-dropdown-item href="#">{{ $t('delete') }}</b-dropdown-item>
            </b-dropdown>
          </div>
        </div></b-card
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
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await DocumentApi.getAllDocumentType()
      console.log(
        '🚀 ~ file: _id.vue ~ line 112 ~ const{fetch}=useFetch ~ result',
        result
      )

      data.documentType = result?.object

      $loader().close()
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
  },
})
</script>
