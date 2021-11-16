<template>
  <div>
    <div>
      <b-button @click="showHide()">
        <b-icon-columns-gap></b-icon-columns-gap>
      </b-button>
    </div>
    <div class="row flex-nowrap">
      <div
        id="left-menu"
        :class="'col-auto col-md-3 ' + (isShow ? 'd-block' : 'd-none')"
      >
        <ul class="list-group list-group-flush">
          <li class="list-group-item active">
            <div class="question-source">
              <span>
                <b-icon-question-square></b-icon-question-square>
                {{ $t('modalQToExam.questionBank') }}
              </span>
              <span>
                <b-icon-chevron-right></b-icon-chevron-right>
              </span>
            </div>
          </li>
          <li class="list-group-item">
            <div class="question-source">
              <span>
                <b-icon-tags></b-icon-tags>
                {{ $t('modalQToExam.questionSaved') }}
              </span>
              <span>
                <b-icon-chevron-right></b-icon-chevron-right>
              </span>
            </div>
          </li>
          <li class="list-group-item">
            <div class="question-source">
              <span>
                <b-icon-heart></b-icon-heart>
                {{ $t('modalQToExam.questionWishlist') }}
              </span>
              <span>
                <b-icon-chevron-right></b-icon-chevron-right>
              </span>
            </div>
          </li>
          <li class="list-group-item">
            <div class="question-source">
              <span>
                <b-icon-plus-circle></b-icon-plus-circle>
                {{ $t('modalQToExam.questionAddNew') }}
              </span>
              <span>
                <b-icon-chevron-right></b-icon-chevron-right>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="col">
        <b-form>
          <b-form-row class="row">
            <b-form-group
              :label="$t('keyword')"
              label-for="keyword"
              class="col-12 col-md-3 mb-3"
            >
              <b-form-input
                id="keyword"
                v-model="urlQuery.keyword"
                trim
                type="search"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              :label="$t('exam.categories')"
              label-for="categories"
              class="col-12 col-md-3 mb-3"
            >
              <treeselect
                id="categories"
                v-model="urlQuery.categories"
                :multiple="true"
                :options="categories"
                :load-options="loadOptions"
                :placeholder="$t('exam.categories')"
              />
            </b-form-group>
            <b-form-group
              :label="$t('exam.questionType')"
              label-for="questionType"
              class="col-12 col-md-3 mb-3"
            >
              <treeselect
                id="questionType"
                v-model="urlQuery.questionTypeId"
                :multiple="false"
                :options="questionTypes"
                :load-options="loadOptions"
                :placeholder="$t('exam.questionType')"
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
                :multiple="false"
                :options="levels"
                :load-options="loadOptions"
                :placeholder="$t('exam.levels')"
              />
            </b-form-group>
          </b-form-row>
          <b-form-row class="row">
            <b-form-group
              :label="$t('exam.filterBy')"
              label-for="filterBy"
              class="col-12 col-md-3 mb-3"
            >
              <treeselect
                id="filterBy"
                v-model="urlQuery.filterBy"
                :multiple="false"
                :options="filterBy"
                :load-options="loadOptions"
                :placeholder="$t('exam.filterBy')"
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
                :multiple="false"
                :options="sortBy"
                :load-options="loadOptions"
                :placeholder="$t('exam.sortby')"
              />
            </b-form-group>
            <div
              class="
                col-12 col-md-6
                mb-3
                d-flex
                justify-content-around
                align-items-end
              "
            >
              <b-button variant="outline-primary" @click="fetch()">
                <b-icon-filter></b-icon-filter> {{ $t('exam.filter') }}
              </b-button>
            </div>
          </b-form-row>
        </b-form>
        <hr class="dropdown-divider" />
        <div class="mt-3">
          <div v-if="total === 0">
            <EmptyData />
          </div>
          <div v-else>
            <div class="mt-2">
              <b-pagination
                v-if="total > urlQuery.pageSize"
                v-model="urlQuery.page"
                class="pagination"
                :total-rows="total"
                :per-page="urlQuery.pageSize"
                align="center"
              ></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  reactive,
  toRefs,
  useAsync,
} from '@nuxtjs/composition-api'
import QuestionApi from '@/api/question-list-page'
import catalogApi from '@/api/catalogApi'
import EmptyData from '@/components/EmptyData.vue'
export default defineComponent({
  components: { EmptyData },
  layout: 'dashboard',
  auth: true,
  setup() {
    const { app, $loader, $logger } = useContext()
    const data = reactive({
      levels: [],
      sortBy: [],
      filterBy: [],
      questionTypes: [],
      categories: [],
      isShow: true,
      urlQuery: {
        page: 1,
        pageSize: 10,
        keyword: '',
        levelId: null,
        questionTypeId: null,
        filterBy: null,
        categories: null,
        orderBy: 1,
      },
      items: [],
      total: 0,
    })
    useAsync(async () => {
      $loader()
      try {
        const [
          { data: levels },
          { data: sortBy },
          { data: qTypes },
          { data: categories },
          { data: filters },
        ] = await Promise.all([
          QuestionApi.getLevel(),
          catalogApi.getExamSortBy(),
          QuestionApi.getTreeQuestionTypes(),
          QuestionApi.getCategory(),
          catalogApi.getQuestionFilterBy(),
        ])
        data.levels = levels.object.items
        data.sortBy = sortBy.object.items
        data.questionTypes = qTypes.object.items
        data.categories = categories.object.items
        data.filterBy = filters.object.items
      } catch (err) {
        app.$handleError(err, () => {
          $logger.info(err)
        })
      }
      $loader().close()
    })
    return {
      ...toRefs(data),
    }
  },
  methods: {
    loadOptions({ action, parentNode, callback }) {},
    showHide() {
      this.isShow = !this.isShow
    },
  },
})
</script>
<style scoped>
.list-group-item {
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}
.question-source {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 5px 10px;
}
.question-source:hover {
  color: rgba(0, 0, 0, 0.85);
  background-color: #f8f9fa;
}
.list-group-item.active {
  color: rgba(0, 0, 0, 0.85);
  background-color: #f8f9fa;
}
#left-menu {
  transition: 2s all;
}
</style>
