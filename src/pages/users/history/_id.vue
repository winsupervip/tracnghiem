<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card :sub-title="$t('history.title')" class="mt-3">
      <div v-if="total === 0">
        <EmptyData />
      </div>
      <div v-else>
        <b-table striped hover :items="items" :fields="fields">
          <template #cell(id)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(actions)="data">
            <a :href="'/de-thi/' + data.item.id + '/ket-qua'"></a>
          </template>
        </b-table>
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
  watch,
  useRoute,
  computed,
} from '@nuxtjs/composition-api'

import examApi from '@/api/examApi'
import EmptyData from '@/components/EmptyData.vue'
export default defineComponent({
  components: { EmptyData },
  layout: 'dashboard',
  auth: true,
  setup() {
    const route = useRoute()
    const id = computed(() => route.value.params.id)
    const { app, $loader, $logger } = useContext()
    const data = reactive({
      breadcrumbs: [
        {
          text: app.i18n.t('exam.dashboard'),
          href: '/users/dashboard',
        },
        {
          text: app.i18n.t('history.title'),
          href: '/users/history/',
        },
        {
          text: app.i18n.t('history.detail'),
          active: true,
        },
      ],
      urlQuery: {
        examId: id,
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
      fields: [
        {
          key: 'id',
        },
        {
          key: 'quizCreateDate',
          label: 'Ngày bắt đầu',
          sortable: true,
        },
        {
          key: 'time',
          label: 'Thời gian làm bài',
          sortable: true,
        },
        {
          key: 'quizSubmitDate',
          label: 'Thời gian kết thúc',
          sortable: true,
        },
        {
          key: 'score',
          label: 'Điểm',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Chức năng',
        },
      ],
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: exams } = await examApi.getUserHistoryExamDetails(
        data.urlQuery
      )
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
