<template>
  <div class="page-container">
    <div class="page-header">
      <a href="#">{{ $t('questionBank') }}</a>
      <button id="show-btn" @click="$bvModal.show('bv-modal-example')">
        {{ $t('add') }}
      </button>

      <b-modal id="bv-modal-example" hide-footer title="Câu hỏi:">
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
        <b-button
          class="text-center mt-3"
          block
          @click="$bvModal.hide('bv-modal-example')"
          >{{ $t('close') }}</b-button
        >
      </b-modal>
    </div>

    <div class="type-question">
      <div class="input-group">
        <b-form-group class="mb-0 form-group">
          <b-form-input
            id="tag-search-input"
            v-model="search"
            type="search"
            :placeholder="$t('search')"
          >
          </b-form-input>
          <ul>
            <b-dropdown-item
              v-for="(option, index) in availableOptions"
              :key="index"
              @click="inputSearch(option.label)"
            >
              {{ option.label }}
            </b-dropdown-item>
          </ul>
        </b-form-group>
      </div>

      <b-button
        v-b-toggle.collapse-1
        :style="{ margin: ' 0 30%', height: '50px' }"
        block
        >{{ $t('search') }}</b-button
      >
    </div>
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <treeselect
          v-model="urlQuery.categories"
          :multiple="true"
          :options="category"
          :load-options="loadOptions"
          :placeholder="$t('category')"
        />
        <treeselect
          v-model="urlQuery.questionTypeId"
          :options="treeQuestionTypes"
          :load-options="loadOptions"
          :placeholder="$t('questionType')"
        />
        <treeselect
          v-model="urlQuery.statusId"
          :options="listStatus"
          :load-options="loadOptions"
          :placeholder="$t('status')"
        />
        <treeselect
          v-model="urlQuery.levelId"
          :options="level"
          :load-options="loadOptions"
          :placeholder="$t('level')"
        />
        <treeselect
          :options="options"
          :load-options="loadOptions"
          :placeholder="$t('sort')"
        />
        <b-button
          v-b-toggle.collapse-1-inner
          class="mx-auto"
          :style="{ width: ' 10vw' }"
          @click="handleSearch"
          >{{ $t('apply') }}</b-button
        >
      </b-card>
    </b-collapse>
    <div v-show="showSingleQuestion">
      <QuestionListPage
        v-for="question in questionList"
        :key="question.id"
        :questions="question"
      ></QuestionListPage>
      <b-pagination
        v-model="urlQuery.page"
        class="pagination"
        :total-rows="total"
        :per-page="urlQuery.pageSize"
      ></b-pagination>
    </div>

    <MultipleQuestion v-show="showMultipleQuestion" />
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
import QuestionApi from '@/api/question-list-page'
import QuestionListPage from '@/components/Question/QuestionListPage.vue'
import MultipleListPage from '@/components/Question/MultipleListPage.vue'
import '../../../assets/scss/single-question.scss'
const simulateAsyncOperation = (fn) => {
  setTimeout(fn, 2000)
}
export default defineComponent({
  components: {
    QuestionListPage,
    MultipleQuestion: MultipleListPage,
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

      // data.total = Math.ceil(result.data.object?.total / data.urlQuery.pageSize)
      data.total = result.data.object?.total
      data.questionList = result.data.object.items
      console.log('search', result.data.object)
      $logger.info(data.urlQuery)
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
    const inputSearch = (e) => {
      data.search = e
      data.urlQuery.keyword = e
      console.log('abc', data.search)
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
      if (this.search.length >= 3) {
        QuestionApi.getTagByKey(this.search, (response) => {
          this.options = response
          console.log(response)
        })
      }
    },
  },
  methods: {
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
