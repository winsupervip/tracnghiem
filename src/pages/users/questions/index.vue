<template>
  <div class="page-container">
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>

    <div class="filter-bar">
      <b-card :sub-title="$t('exam.questions.search')">
        <b-form>
          <b-form-row class="row">
            <b-form-group
              :label="$t('keyword')"
              label-for="keyword"
              class="col-12 col-md-6 mb-3"
            >
              <b-form-input
                id="tag-search-input"
                v-model="search"
                trim
                type="search"
                :placeholder="$t('search')"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              :label="$t('exam.questions.categories')"
              label-for="categories"
              class="col-12 col-md-3 mb-3"
            >
              <treeselect
                id="categories"
                :multiple="true"
                :options="category"
                :load-options="loadOptions"
                :placeholder="$t('category')"
              />
            </b-form-group>
            <b-form-group
              :label="$t('exam.questions.paymentTypes')"
              label-for="paymentTypes"
              class="col-12 col-md-3 mb-3"
            >
              <treeselect
                id="paymentTypes"
                v-model="urlQuery.questionTypeId"
                :options="treeQuestionTypes"
                :load-options="loadOptions"
                :placeholder="$t('questionType')"
              />
            </b-form-group>
          </b-form-row>
          <b-form-row class="row">
            <b-form-group
              :label="$t('exam.status')"
              label-for="status"
              class="col-12 col-md-3 mb-3"
            >
              <treeselect
                id="status"
                v-model="urlQuery.statusId"
                :options="listStatus"
                :load-options="loadOptions"
                :placeholder="$t('status')"
              />
            </b-form-group>
            <b-form-group
              :label="$t('exam.levels')"
              label-for="levels"
              class="col-12 col-md-3 mb-3"
            >
              <treeselect
                id="levels"
                v-model="urlQuery.levelId"
                :options="level"
                :load-options="loadOptions"
                :placeholder="$t('level')"
              />
            </b-form-group>
            <b-form-group
              :label="$t('exam.sortby')"
              label-for="sortby"
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
              <b-button variant="outline-primary" @click="handleSearch">
                <b-icon-filter></b-icon-filter> {{ $t('apply') }}
              </b-button>
              <b-button
                variant="primary"
                @click="$bvModal.show('bv-modal-add-question')"
              >
                <b-icon-plus></b-icon-plus> {{ $t('add') }}
              </b-button>
            </div>
          </b-form-row>
        </b-form>
      </b-card>

      <SingleListPage
        v-for="question in questionList"
        :key="question.id"
        :questions="question"
        :delete-question="deleteQuestion"
        :handle-search="handleSearch"
      />

      <b-pagination
        v-model="urlQuery.page"
        class="pagination"
        :total-rows="total"
        :per-page="urlQuery.pageSize"
      ></b-pagination>
    </div>
    <SelectQuestionForAddModal />
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  useRoute,
  useFetch,
  reactive,
  toRefs,
  watch,
} from '@nuxtjs/composition-api'
import _ from 'lodash'
import EventBus from '../../../plugins/eventBus'
import QuestionApi from '@/api/question-list-page'
import catalogApi from '@/api/catalogApi'
import SingleListPage from '@/components/Question/SingleListPage.vue'
import SelectQuestionForAddModal from '@/components/Question/SelectQuestionForAddModal.vue'
export default defineComponent({
  components: {
    SingleListPage,
    SelectQuestionForAddModal,
  },
  layout: 'dashboard',
  auth: true,
  setup() {
    const { $loader, $logger, app } = useContext()
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1

    const data = reactive({
      breadcrumbs: [
        {
          text: app.i18n.t('exam.dashboard'),
          href: '/users/dashboard',
        },
        {
          text: app.i18n.t('questionBank'),
          active: true,
        },
      ],
      currentPage: queryPage,
      showSingleQuestion: true,
      showMultipleQuestion: false,
      total: 1,
      category: [],
      treeQuestionTypes: [],
      listStatus: [],
      level: [],
      orderBy: [],
      autoCompleteTag: [],
      text: [],
      search: '',
      options: [],
      questionList: [],
      isCallApiGetTag: false,
      urlQuery: {
        pageSize: 10,
        keyword: '',
        categories: [],
        page: 1,
        statusId: null,
        levelId: null,
        questionTypeId: null,
        orderBy: 1,
        questionGroupId: null,
      },
    })
    const handleSearch = async () => {
      const result = await QuestionApi.getUserItemList(data.urlQuery)
      data.total = result.data?.object?.total

      data.questionList = result.data?.object?.items
    }
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result1 } = await QuestionApi.getCategory()
      const { data: result2 } = await QuestionApi.getTreeQuestionTypes()
      const { data: result3 } = await QuestionApi.getListStatus()
      const { data: result4 } = await QuestionApi.getLevel()
      const { data: result5 } = await catalogApi.getExamSortBy()
      $logger.info('sort nè', result5)

      handleSearch()

      data.category = result1.object.items
      console.log(
        '🚀 ~ file: index.vue ~ line 243 ~ const{fetch}=useFetch ~ data.category',
        result1
      )
      data.treeQuestionTypes = result2.object.items
      data.listStatus = result3.object.items
      data.level = result4.object.items
      data.orderBy = result5.object.items
      $loader().close()
    })

    fetch()

    watch(
      () => data.urlQuery.page,

      () => {
        handleSearch()
      }
    )
    const inputSearch = (value) => {
      data.isCallApiGetTag = false
      data.search = value
      data.urlQuery.keyword = value
      $logger.debug('abc', data.search)
      data.options = []
    }

    return {
      ...toRefs(data),
      inputSearch,
      handleSearch,
    }
  },
  computed: {
    availableOptions() {
      this.$logger.debug('computed', this.options)
      return this.options
    },
  },
  watch: {
    search() {
      const that = this
      this.checkSearch(that)
    },
  },
  created() {
    EventBus.$on('update-page', this.handleSearch)
  },
  methods: {
    checkSearch: _.debounce((that) => {
      if (that.search.length < 3 || !that.isCallApiGetTag) {
        that.isCallApiGetTag = true
        return
      }
      QuestionApi.getTagByKey(that.search, (response) => {
        that.options = response
        that.$logger.debug('response', response)
      })
    }, 1000),
    deleteQuestion(value) {
      const index = this.questionList.findIndex(
        (item) => item.hashId === value.hashId
      )
      this.questionList.splice(index, 1)
    },

    loadOptions({ callback }) {
      callback()
    },
  },
})
</script>
