<template>
  <div class="page-container">
    <div class="heading-page">
      <h1 class="heading-title">Ngân hàng câu hỏi</h1>
      <b-btn
        pill
        variant="primary"
        size="sm"
        class="btn-rounded"
        @click="$bvModal.show('bv-modal-add-question')"
      >
        Thêm mới
      </b-btn>
    </div>
    <b-modal id="bv-modal-add-question" hide-footer title="Câu hỏi:">
      <div class="d-block">
        <ul>
          <li v-for="item in items" :key="item.message" type="1">
            <a href="#" :style="{ fontWeight: 'bold' }">{{ item }}</a>
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
          >Đóng</b-button
        >
      </div>
    </b-modal>

    <b-tabs class="custom-tabs" content-class="mt-3">
      <div class="filter-bar">
        <div class="row">
          <div class="col-6 col-md-4 col-lg-2 mb-3">
            <b-form-input placeholder="Tìm kiếm câu hỏi"></b-form-input>
          </div>
          <div class="col-6 col-md-4 col-lg-2 mb-3">
            <treeselect
              :options="category"
              :load-options="loadOptions"
              placeholder="Danh mục"
            />
          </div>
          <div class="col-6 col-md-4 col-lg-2 mb-3">
            <treeselect
              :multiple="true"
              :options="treeQuestionTypes"
              :load-options="loadOptions"
              placeholder="Loại câu hỏi"
            />
          </div>
          <div class="col-6 col-md-4 col-lg-2 mb-3">
            <treeselect
              :options="listStatus"
              :load-options="loadOptions"
              placeholder="Trạng thái"
            />
          </div>
          <div class="col-6 col-md-4 col-lg-2 mb-3">
            <treeselect
              :options="level"
              :load-options="loadOptions"
              placeholder="Mức độ"
            />
          </div>
          <div class="col-6 col-md-4 col-lg-2 mb-3">
            <treeselect
              :options="options"
              :load-options="loadOptions"
              placeholder="Sắp xếp"
            />
          </div>
        </div>
      </div>
      <b-tab title="Danh sách câu đơn" active>
        <SingleQuestion />
      </b-tab>
      <b-tab title="Danh sách câu chùm">
        <MultipleQuestion />
      </b-tab>
    </b-tabs>
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
} from '@nuxtjs/composition-api'
import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
import QuestionApi from '@/api/question-list-page'
import SingleListPage from '@/components/Question/SingleListPage.vue'
import MultipleListPage from '@/components/Question/MultipleListPage.vue'
const simulateAsyncOperation = (fn) => {
  setTimeout(fn, 2000)
}
export default defineComponent({
  components: {
    SingleQuestion: SingleListPage,
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
      total: 0,
      category: [],
      treeQuestionTypes: [],
      listStatus: [],
      level: [],
    })

    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result1 } = await QuestionApi.getCategory()
      const { data: result2 } = await QuestionApi.getTreeQuestionTypes()
      const { data: result3 } = await QuestionApi.getListStatus()
      const { data: result4 } = await QuestionApi.getLevel()
      data.category = result1.object.items
      data.treeQuestionTypes = result2.object.items
      data.listStatus = result3.object.items
      data.level = result4.object.items
      $logger.info(result4.object.items)
      $loader().close()
    })

    fetch()
    return {
      ...toRefs(data),
    }
  },
  data: () => ({
    options: [
      {
        id: '1',
        label: '1',
      },
      {
        id: '2',
        label: '2',
      },
    ],
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
