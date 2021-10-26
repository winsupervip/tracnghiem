<template>
  <div class="page-container">
    <div class="page-header">
      <a href="#">Ngân hàng câu hỏi</a>
      <button id="show-btn" @click="$bvModal.show('bv-modal-example')">
        Thêm mới
      </button>

      <b-modal id="bv-modal-example" hide-footer title="Câu hỏi:">
        <div class="d-block">
          <ul>
            <li type="none">
              <a href="#" class="d-block"><strong>Một lựa chọn</strong></a>
              <a href="#" class="d-block"><strong>Nhiều lựa chọn</strong></a>
              <a href="#" class="d-block"><strong>Đúng sai</strong></a>
              <a href="#" class="d-block"><strong>Ghép đôi</strong></a>
              <a href="#" class="d-block"
                ><strong> Điền vào chỗ trống</strong></a
              >
              <a href="#" class="d-block"
                ><strong>Câu hỏi trả lời ngắn</strong></a
              >
              <a href="#" class="d-block"><strong>Sắp thứ tự</strong></a>
            </li>
          </ul>
          <div class="dropdown-divider"></div>
          <a href="#" :style="{ fontWeight: 'bold' }">Câu chùm</a>
        </div>
        <b-button
          class="text-center mt-3"
          block
          @click="$bvModal.hide('bv-modal-example')"
          >Đóng</b-button
        >
      </b-modal>
    </div>

    <div class="type-question">
      <div class="input-group">
        <b-form-group class="mb-0">
          <b-form-input
            id="tag-search-input"
            v-model="search"
            type="search"
            placeholder="tìm kiếm câu hỏi"
            :style="{ width: '22vw' }"
          ></b-form-input>
          <b-dropdown-item
            v-for="(option, index) in availableOptions"
            :key="index"
            @click="inputSearch(option.label)"
          >
            {{ option.label }}
          </b-dropdown-item>
        </b-form-group>
      </div>

      <b-button
        v-b-toggle.collapse-1
        :style="{ margin: ' 0 30%', height: '50px' }"
        block
        >tìm kiếm</b-button
      >

      <b-button :style="{ margin: ' 0 30%', height: '50px' }">add</b-button>
    </div>
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <treeselect
          v-model="urlQuery.categories"
          :multiple="true"
          :options="category"
          :load-options="loadOptions"
          placeholder="Danh mục"
        />
        <treeselect
          v-model="urlQuery.questionTypeId"
          :multiple="true"
          :options="treeQuestionTypes"
          :load-options="loadOptions"
          placeholder="Loại câu hỏi"
        />
        <treeselect
          v-model="urlQuery.statusId"
          :options="listStatus"
          :load-options="loadOptions"
          placeholder="Trạng thái"
        />
        <treeselect
          v-model="urlQuery.levelId"
          :options="level"
          :load-options="loadOptions"
          placeholder="Mức độ"
        />
        <treeselect
          :options="options"
          :load-options="loadOptions"
          placeholder="Sắp xếp"
        />
        <b-button
          v-b-toggle.collapse-1-inner
          class="mx-auto"
          :style="{ width: ' 10vw' }"
          @click="handleSearch"
          >áp dụng</b-button
        >
      </b-card>
    </b-collapse>
    <div v-show="showSingleQuestion">
      <SingleQuestion
        v-for="question in questionList.items"
        :key="question.id"
        :questions="question"
      />
      <b-pagination
        v-model="currentPage"
        class="pagination"
        first-number
        align="center"
        size="lg"
        :link-gen="linkGen"
        :number-of-pages="10"
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
  auth: false,
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
      autoCompleteTag: [],
      text: [],
      search: '',
      options: [],
      questionList: [],
      urlQuery: {
        pageSize: 1,
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

      $logger.info('ok')
      $loader().close()
    })
    const linkGen = (pageNumber) => {
      return { path: route.path, query: { page: pageNumber } }
    }
    const handleSearch = async () => {
      $logger.info(data.urlQuery)
      const result = await QuestionApi.getUserItemList(data.urlQuery)
      data.questionList = result.data.object
      $logger.info(result.data.object)
    }

    watch(
      () => data.currentPage,
      () => {
        fetch()
      }
    )
    const inputSearch = (e) => {
      data.search = e
      data.urlQuery.keyword = e
      console.log('abc', data.urlQuery.categories)
    }
    return {
      ...toRefs(data),
      inputSearch,
      handleSearch,
      linkGen,
    }
  },
  data: () => ({}),

  computed: {
    criteria() {
      return this.search.trim()
    },
    availableOptions() {
      return this.options
    },

    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    },
  },
  watch: {
    search() {
      if (this.search.length >= 2) {
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

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.page-container {
  font-family: OpenSans, sans-serif;
  font-style: normal;
  margin-left: 20px;
  margin: 0 auto;
  .page-header {
    display: flex;
    justify-content: space-between;

    a {
      font-family: Open Sans;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 16px;

      color: #000000;
    }
    button {
      width: 119px;
      height: 27px;
      left: 1116px;
      top: 12px;

      background: #ffffff;
      border: 1px solid #051e40;
      box-sizing: border-box;
      border-radius: 20px;
      font-weight: bold;
      font-size: 13px;
      color: #051e40;
    }
  }

  .type-question {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 26px;
    .input-group {
      width: 100%;
      li {
        list-style-type: none;
      }
    }
  }
  #collapse-1 {
    .card-body {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 10px;
    }
  }
  .form-single-question {
    margin-top: 19px;

    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    .form-headline {
      display: flex;
      padding: 22px 17px 11px 17px;
      justify-content: space-between;
      align-items: center;
      .headline-left {
        display: grid;
        grid-template-columns: auto auto auto auto;
        grid-gap: 15px;
        label {
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 30px;

          color: #212529;
        }
        span {
          display: flex;
          align-items: center;
          text-align: center;
          background: #e7fff9;
          border-radius: 20px;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          padding: 4px 7px 3px 7px;
          color: #27ae60;
        }
      }
      .headline-right {
        > a {
          background: #ffffff;
          border: 1px solid #051e40;
          box-sizing: border-box;
          border-radius: 20px;
          padding: 6px 10px 5px 11px;
          font-style: normal;
          font-weight: bold;
          font-size: 13px;
          line-height: 16px;
          color: #051e40;
        }
        button {
          margin-left: 24px;
          background: #ffffff;
          border: 1px solid #000000;
          box-sizing: border-box;
        }
      }
    }

    .line {
      width: 100%;
      height: 0px;
      background-color: #dddddd;
      border: 1px solid #dddddd;
    }
    .question {
      padding: 22px 17px 11px 17px;
      .question-hashtag {
        display: flex;
        a {
          padding: 10px;
          color: #0d6efd;
        }
      }
    }
    .answer {
      margin: 13px 0;
      ul {
        li {
          padding: 12px 0;
          display: flex;
        }
      }
    }
  }

  .form-multiple-question {
    margin-top: 19px;

    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    .form-headline {
      display: flex;
      padding: 22px 17px 11px 17px;
      justify-content: space-between;
      align-items: center;
      .headline-left {
        display: grid;
        grid-template-columns: auto auto auto auto;
        grid-gap: 15px;
        label {
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 30px;

          color: #212529;
        }
        span {
          display: flex;
          align-items: center;
          text-align: center;
          background: #e7fff9;
          border-radius: 20px;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          padding: 4px 7px 3px 7px;
          color: #27ae60;
        }
      }
      .headline-right {
        > a {
          background: #ffffff;
          border: 1px solid #051e40;
          box-sizing: border-box;
          border-radius: 20px;
          padding: 6px 10px 5px 11px;
          font-style: normal;
          font-weight: bold;
          font-size: 13px;
          line-height: 16px;
          color: #051e40;
        }
        button {
          margin-left: 24px;
          background: #ffffff;
          border: 1px solid #000000;
          box-sizing: border-box;
        }
      }
    }

    .line {
      width: 100%;
      height: 0px;
      background-color: #dddddd;
      border: 1px solid #dddddd;
    }
    .question {
      padding: 22px 17px 11px 17px;

      .question-hashtag {
        display: flex;
        a {
          color: #0d6efd;
        }
      }
    }
    .answer {
      margin: 13px 0;
      ul {
        li {
          padding: 12px 0;

          button {
            float: right;
            border: none;
            background: transparent;
          }
        }
      }
    }
  }
  .pagination {
    position: relative;
    margin-top: 10px;
    background: #ffffff;
  }
}
</style>
