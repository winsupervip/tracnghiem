<template>
  <div>
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
      <div class="col question-container">
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
              <b-button variant="outline-primary" @click="searchHandler()">
                <b-icon-filter></b-icon-filter> {{ $t('exam.filter') }}
              </b-button>
              <b-button variant="outline-primary" @click="onSelectQuestions()">
                <b-icon-clipboard-plus></b-icon-clipboard-plus>
                {{ $t('modalQToExam.addToExam') }}
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
            <SingleListPage
              v-for="question in items"
              :key="question.id"
              :questions="question"
            >
              <template #header>
                <div class="d-flex justify-content-between">
                  <div class="mt-3">
                    <b-form-checkbox
                      v-model="selectedItems"
                      :value="question"
                      name="question"
                    >
                      {{ $t('modalQToExam.select') }}
                    </b-form-checkbox>
                  </div>
                  <button
                    class="btn btn-sm btn-primary"
                    @click="onSelectQuestion(question)"
                  >
                    <b-icon-clipboard-plus></b-icon-clipboard-plus>
                    {{ $t('modalQToExam.addToExam') }}
                  </button>
                </div>
              </template>
            </SingleListPage>
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
        <div class="btn-hide-menu" @click="showHide()">
          <b-icon-arrow-left-circle v-if="isShow"></b-icon-arrow-left-circle>
          <b-icon-arrow-right-circle v-if="!isShow"></b-icon-arrow-right-circle>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-selected"
      hide-footer
      :title="$t('modalQToExam.setting')"
    >
      <ModalSelectedQuestion
        :exam-hash-id="examHashId"
        :questions="selectedQuestions"
        :item-type="itemType"
        @add-questions="onAddQuestions"
      />
    </b-modal>
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  reactive,
  toRefs,
  useAsync,
  useFetch,
  watch,
} from '@nuxtjs/composition-api'
import QuestionApi from '@/api/question-list-page'
import catalogApi from '@/api/catalogApi'
import examApi from '@/api/examApi'
import EmptyData from '@/components/EmptyData.vue'
import SingleListPage from '@/components/Question/SingleListPage.vue'
import ModalSelectedQuestion from '@/components/Exams/components/ModalSelectedQuestion.vue'
export default defineComponent({
  components: {
    EmptyData,
    SingleListPage,
    ModalSelectedQuestion,
  },
  auth: true,
  props: {
    examHashId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { app, $loader, $logger } = useContext()
    const data = reactive({
      levels: [],
      sortBy: [],
      filterBy: [],
      questionTypes: [],
      categories: [],
      isShow: true,
      windowWidth: window.innerWidth,
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
      questionHashId: '',
      itemType: '',
      selectedQuestions: [],
      selectedItems: [],
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

    const { fetch } = useFetch(async () => {
      $loader()
      const { data: response } = await examApi.getItemsAddExam(
        data.urlQuery,
        props.examHashId
      )
      data.items = response.object.items
      data.total = response.object.total
      $loader().close()
    })

    fetch()

    watch(
      () => data.urlQuery.page,
      () => {
        fetch()
      }
    )

    const searchHandler = () => {
      data.urlQuery.page = 1
      fetch()
    }

    return {
      ...toRefs(data),
      searchHandler,
    }
  },
  watch: {
    windowWidth() {
      if (this.windowWidth < 755) {
        this.isShow = false
      }
    },
  },
  methods: {
    loadOptions({ action, parentNode, callback }) {},
    showHide() {
      this.isShow = !this.isShow
    },
    onSelectQuestion(question) {
      this.selectedQuestions = []
      this.selectedQuestions.push(question)
      this.$bvModal.show('modal-selected')
    },
    onSelectQuestions() {
      this.selectedQuestions = this.selectedItems
      this.$bvModal.show('modal-selected')
    },
    onAddQuestions() {
      this.$bvModal.hide('modal-selected')
      this.selectedQuestions = []
      this.selectedItems = []
      this.searchHandler()
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
.question-container {
  position: relative;
}
.btn-hide-menu {
  position: absolute;
  left: -10px;
  top: -27px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #0747a6;
  text-align: center;
  line-height: 25px;
  color: #ffffff;
}
</style>
