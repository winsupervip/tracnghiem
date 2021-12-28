<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card :sub-title="$t('exam.searchTitle')">
      <b-form>
        <b-form-row class="row">
          <b-form-group
            :label="$t('keyword')"
            label-for="keyword"
            class="col-12 col-md-6 col-lg-4 cpl-xl-3 mb-3"
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
            class="col-12 col-md-6 col-lg-4 cpl-xl-3 mb-3"
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
        </b-form-row>
        <b-form-row class="row">
          <b-form-group
            :label="$t('exam.status')"
            label-for="status"
            class="col-12 col-md-6 col-lg-4 cpl-xl-3 mb-3"
          >
            <treeselect
              id="status"
              v-model="urlQuery.statusId"
              :multiple="false"
              :options="status"
              :load-options="loadOptions"
              :placeholder="$t('exam.status')"
            />
          </b-form-group>
          <b-form-group
            :label="$t('exam.sortby')"
            label-for="sortby"
            class="col-12 col-md-6 col-lg-4 cpl-xl-3 mb-3"
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
          <div class="form-search-action col-12">
            <b-button variant="outline-primary" @click="fetch()">
              <b-icon-filter></b-icon-filter> {{ $t('exam.filter') }}
            </b-button>
            <nuxt-link class="btn btn-primary" to="/users/exams/add">
              <b-icon-plus></b-icon-plus> {{ $t('exam.add') }}
            </nuxt-link>
          </div>
        </b-form-row>
      </b-form>
    </b-card>
    <b-card :sub-title="$t('history.title')" class="mt-3">
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <ExamHistoryItem
          v-for="(item, index) in items"
          :key="index"
          :exam="item"
        />
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
    </b-card>
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useContext,
  useFetch,
  useAsync,
  watch,
} from '@nuxtjs/composition-api'

import QuestionApi from '@/api/question-list-page'
import catalogApi from '@/api/catalogApi'
import examApi from '@/api/examApi'
import EmptyData from '@/components/EmptyData.vue'
import ExamHistoryItem from '@/components/History/ExamHistoryItem.vue'
export default defineComponent({
  components: { EmptyData, ExamHistoryItem },
  layout: 'dashboard',
  auth: true,
  setup() {
    const { app, $loader, $logger } = useContext()
    const data = reactive({
      breadcrumbs: [
        {
          text: app.i18n.t('exam.dashboard'),
          href: '/users/dashboard',
        },
        {
          text: app.i18n.t('history.title'),
          active: true,
        },
      ],
      categories: [],
      sortBy: [],
      status: [],
      urlQuery: {
        page: 1,
        pageSize: 10,
        keyword: '',
        categories: null,
        tags: null,
        statusId: null,
        levelId: null,
        orderBy: 1,
      },
      items: [],
      total: 0,
    })
    useAsync(async () => {
      $loader()
      $logger.info('load data')
      const [
        { data: categories },
        { data: listStatus },
        { data: levels },
        { data: sortBy },
      ] = await Promise.all([
        QuestionApi.getCategory(),
        catalogApi.getHistoryExamStatus(),
        QuestionApi.getLevel(),
        catalogApi.getExamSortBy(),
      ])
      data.categories = categories.object.items
      data.status = listStatus.object.items
      data.levels = levels.object.items
      data.sortBy = sortBy.object.items
      $loader().close()
    })

    const { fetch } = useFetch(async () => {
      $loader()
      const { data: exams } = await examApi.getUserHistoryExams(data.urlQuery)
      data.items = exams.object.items
      data.total = exams.object.total
      $logger.info(data.items)
      $loader().close()
    })

    fetch()

    watch(
      () => data.urlQuery.page,
      () => {
        fetch()
      }
    )

    return {
      ...toRefs(data),
      fetch,
    }
  },
  methods: {
    loadOptions({ action, parentNode, callback }) {},
  },
})
</script>
