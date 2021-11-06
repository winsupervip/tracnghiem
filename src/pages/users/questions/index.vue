<template>
  <div class="page-container">
    <div class="heading-page">
      <h1 class="heading-title">{{ $t('questionBank') }}</h1>
      <b-btn
        pill
        variant="primary"
        size="sm"
        class="btn-rounded"
        @click="$bvModal.show('bv-modal-add-question')"
      >
        {{ $t('add') }}
      </b-btn>
    </div>
    <b-modal id="bv-modal-add-question" hide-footer title="Câu hỏi:">
      <div class="d-block">
        <ul>
          <li v-for="item in items" :key="item.message" type="1">
            <a :href="item.url" :style="{ fontWeight: 'bold' }">{{
              item.title
            }}</a>
          </li>
        </ul>
        <div class="dropdown-divider"></div>
        <a href="#" :style="{ fontWeight: 'bold' }">Câu chùm</a>
      </div>
      <div class="d-flex justify-content-center mt-3">
        <b-button
          variant="primary"
          class="text-center"
          block
          @click="$bvModal.hide('bv-modal-add-question')"
          >{{ $t('close') }}</b-button
        >
      </div>
    </b-modal>

    <div class="filter-bar">
      <div class="row">
        <div class="col-6 col-md-4 col-lg-3 mb-3">
          <treeselect
            v-model="urlQuery.categories"
            :multiple="true"
            :options="category"
            :load-options="loadOptions"
            :placeholder="$t('category')"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3 mb-3">
          <treeselect
            v-model="urlQuery.questionTypeId"
            :options="treeQuestionTypes"
            :load-options="loadOptions"
            :placeholder="$t('questionType')"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3 mb-3">
          <treeselect
            v-model="urlQuery.statusId"
            :options="listStatus"
            :load-options="loadOptions"
            :placeholder="$t('status')"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3 mb-3">
          <treeselect
            v-model="urlQuery.levelId"
            :options="level"
            :load-options="loadOptions"
            :placeholder="$t('level')"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3 mb-3">
          <treeselect
            :options="options"
            :load-options="loadOptions"
            :placeholder="$t('sort')"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3 mb-3">
          <b-form-group class="mb-0 form-group">
            <b-form-input
              id="tag-search-input"
              v-model="search"
              type="search"
              :placeholder="$t('search')"
              autocomplete="off"
            >
            </b-form-input>

            <ul>
              <b-dropdown-item
                v-for="(option, index) in availableOptions"
                :key="index"
                class="abc"
                @click="inputSearch(option.label)"
              >
                {{ option.label }}
              </b-dropdown-item>
            </ul>
          </b-form-group>
        </div>
        <div class="col-6 col-md-4 col-lg-3 mb-3">
          <b-button class="btn btn-primary" block @click="handleSearch">{{
            $t('apply')
          }}</b-button>
        </div>
      </div>
    </div>

    <SingleQuestion
      v-for="question in questionList"
      :key="question.id"
      :questions="question"
    />

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
  useFetch,
  reactive,
  toRefs,
  watch,
} from '@nuxtjs/composition-api'
import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
import _ from 'lodash'
import QuestionApi from '@/api/question-list-page'
import SingleListPage from '@/components/Question/SingleListPage.vue'
import '../../../assets/scss/single-question.scss'
const simulateAsyncOperation = (fn) => {
  setTimeout(fn, 2000)
}
export default defineComponent({
  components: {
    SingleQuestion: SingleListPage,
  },
  layout: 'dashboard',
  auth: true,
  setup() {
    const { $loader, $logger } = useContext()
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1

    const data = reactive({
      currentPage: queryPage,
      showSingleQuestion: true,
      showMultipleQuestion: false,
      total: 1,
      category: [],
      treeQuestionTypes: [],
      listStatus: [],
      level: [],
      autoCompleteTag: [],
      text: [],
      search: '',
      options: [],
      questionList: [],
      isCallApiGetTag: false,
      urlQuery: {
        pageSize: 2,
        keyword: '',
        categories: [],
        page: 1,
        statusId: null,
        levelId: null,
        questionTypeId: null,
        orderby: 1,
        questionGroupId: null,
      },
    })
    const handleSearch = async () => {
      const result = await QuestionApi.getUserItemList(data.urlQuery)
      data.total = result.data?.object?.total

      data.questionList = result.data?.object?.items

      $logger.info('123', result.data?.object)
    }
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result1 } = await QuestionApi.getCategory()
      const { data: result2 } = await QuestionApi.getTreeQuestionTypes()
      const { data: result3 } = await QuestionApi.getListStatus()
      const { data: result4 } = await QuestionApi.getLevel()
      handleSearch()

      data.category = result1.object.items
      data.treeQuestionTypes = result2.object.items
      data.listStatus = result3.object.items
      data.level = result4.object.items
      console.log('category', result1.object.items)
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
      console.log('abc', data.search)
      data.options = []
    }

    return {
      ...toRefs(data),
      inputSearch,
      handleSearch,
    }
  },
  data: () => ({
    items: [
      { url: 'single-choice/create', title: 'Một lựa chọn' },
      { url: 'multiple-choice/create', title: 'Nhiều lựa chọn' },
      { url: 'right-wrong/create', title: 'Đúng sai' },
      { url: 'pairing/create', title: 'Ghép đôi' },
      { url: 'fill-blank/create', title: 'Điền vào chỗ trống' },
      { url: 'short-answer/create', title: 'Câu hỏi trả lời ngắn' },
      { url: 'draggable-fill-blank/create', title: 'Sắp thứ tự' },
    ],
  }),

  computed: {
    availableOptions() {
      console.log(this.options)
      return this.options
    },
  },
  watch: {
    search() {
      const that = this
      this.checkSearch(that)
    },
  },
  methods: {
    checkSearch: _.debounce((that) => {
      if (that.search.length < 3 || !that.isCallApiGetTag) {
        that.isCallApiGetTag = true
        return
      }
      QuestionApi.getTagByKey(that.search, (response) => {
        that.options = response
        console.log('response', response)
      })
    }, 1000),

    loadOptions({ action, parentNode, callback }) {
      // Typically, do the AJAX stuff here.
      // Once the server has responded,
      // assign children options to the parent node & call the callback.

      if (action === LOAD_CHILDREN_OPTIONS) {
        switch (parentNode.id) {
          case 'success': {
            simulateAsyncOperation(() => {
              parentNode.children = [
                {
                  id: 'child',
                  label: 'Child option',
                },
              ]
              callback()
            })
            break
          }
          case 'no-children': {
            simulateAsyncOperation(() => {
              parentNode.children = []
              callback()
            })
            break
          }
          case 'failure': {
            simulateAsyncOperation(() => {
              callback(new Error('Failed to load options: network error.'))
            })
            break
          }
          default: /* empty */
        }
      }
    },
  },
})
</script>
