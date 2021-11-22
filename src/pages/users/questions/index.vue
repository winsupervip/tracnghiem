<template>
  <div class="page-container">
    <div class="heading-page">
      <h1 class="heading-title">{{ $t('questionBank') }}</h1>
    </div>

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
            v-model="urlQuery.orderBy"
            :options="orderBy"
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
        <!-- <div class="col-6 col-md-4 col-lg-3 mb-3">
          <b-button variant="outline-primary btn-sm" @click="handleSearch"
            ><b-icon-filter></b-icon-filter>{{ $t('apply') }}</b-button
          >

          <b-btn
            pill
            variant="outline-primary btn-sm"
            size="sm"
            @click="$bvModal.show('bv-modal-add-question')"
          >
            <b-icon-plus></b-icon-plus> {{ $t('add') }}
          </b-btn> -->

        <div
          class="
            col-12 col-md-3
            mb-3
            d-flex
            justify-content-around
            align-items-end
          "
        >
          <b-button variant="outline-primary btn-sm" @click="handleSearch">
            <b-icon-filter></b-icon-filter> {{ $t('apply') }}
          </b-button>
          <b-button
            variant="primary"
            class="btn btn-sm btn-primary"
            @click="$bvModal.show('bv-modal-add-question')"
          >
            <b-icon-plus></b-icon-plus> {{ $t('add') }}
          </b-button>
          <b-modal id="bv-modal-add-question" hide-footer title="Câu hỏi:">
            <div class="d-block">
              <ul>
                <li v-for="item in items" :key="item.message" type="1">
                  <nuxt-link :to="item.url" :style="{ fontWeight: 'bold' }">{{
                    item.title
                  }}</nuxt-link>
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
        </div>
      </div>
    </div>

    <SingleQuestion
      v-for="question in questionList"
      :key="question.id"
      :questions="question"
      :delete-question="deleteQuestion"
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

import _ from 'lodash'
import QuestionApi from '@/api/question-list-page'
import catalogApi from '@/api/catalogApi'
import SingleListPage from '@/components/Question/SingleListPage.vue'
import '../../../assets/scss/single-question.scss'

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
      orderBy: [],
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
        orderBy: 1,
        questionGroupId: null,
      },
    })
    const handleSearch = async () => {
      const result = await QuestionApi.getUserItemList(data.urlQuery)
      data.total = result.data?.object?.total

      data.questionList = result.data?.object?.items

      // $logger.info('123', result.data?.object)
    }
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result1 } = await QuestionApi.getCategory()
      const { data: result2 } = await QuestionApi.getTreeQuestionTypes()
      const { data: result3 } = await QuestionApi.getListStatus()
      const { data: result4 } = await QuestionApi.getLevel()
      const { data: result5 } = await catalogApi.getItemSortTypeInExam()

      handleSearch()

      data.category = result1.object.items
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
  data: () => ({
    items: [
      { url: '/users/questions/single-choice/create', title: 'Một lựa chọn' },
      {
        url: '/users/questions/multiple-choice/create',
        title: 'Nhiều lựa chọn',
      },
      { url: '/users/questions/right-wrong/create', title: 'Đúng sai' },
      { url: '/users/questions/matching/create', title: 'Ghép đôi' },
      {
        url: '/users/questions/fill-blank/create',
        title: 'Điền vào chỗ trống',
      },
      {
        url: '/users/questions/short-answer/create',
        title: 'Câu hỏi trả lời ngắn',
      },
      {
        url: '/users/questions/draggable-fill-blank/create',
        title: 'Sắp thứ tự',
      },
    ],
  }),

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
