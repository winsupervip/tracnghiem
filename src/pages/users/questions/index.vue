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
            <li v-for="item in items" :key="item.message" type="1">
              <a :href="item.url" :style="{ fontWeight: 'bold' }">{{
                item.title
              }}</a>
              <!-- <nuxt-link :style="{ fontWeight: 'bold' }" :to="item.url">{{
                item.title
              }}</nuxt-link> -->
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
    <div class="type-list-question">
      <button @click="showSingleQuestion = !showSingleQuestion">
        Danh sách câu đơn
      </button>

      <span></span>
      <button @click="showMultipleQuestion = !showMultipleQuestion">
        Danh sách câu chùm
      </button>
    </div>
    <div class="type-question">
      <div class="input-group">
        <b-form-input
          list="my-list-id"
          placeholder="Tìm kiếm câu hỏi"
          no-caret
        ></b-form-input
        ><datalist id="my-list-id">
          <option v-for="(option, index) in options" :key="index">
            {{ option }}
          </option>
        </datalist>
      </div>
      <treeselect
        :options="category"
        :load-options="loadOptions"
        placeholder="Danh mục"
      />
      <treeselect
        :multiple="true"
        :options="treeQuestionTypes"
        :load-options="loadOptions"
        placeholder="Loại câu hỏi"
      />
      <treeselect
        :options="listStatus"
        :load-options="loadOptions"
        placeholder="Trạng thái"
      />
      <treeselect
        :options="level"
        :load-options="loadOptions"
        placeholder="Mức độ"
      />
      <treeselect
        :options="options"
        :load-options="loadOptions"
        placeholder="Sắp xếp"
      />
    </div>
    <SingleQuestion v-if="showSingleQuestion" />
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
      { url: '', title: 'Ghép đôi' },
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
  .type-list-question {
    button {
      font-weight: 600;
      font-size: 16px;
      margin: 30px 0;
      background: transparent;
      border: none;
      color: #000000;
      &:hover {
        text-decoration: underline;
      }
    }
    span {
      margin: 0 25px;
      background-color: #000000;
      border: 1px solid #000000;
    }
  }
  .type-question {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    grid-gap: 26px;
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
    position: absolute;
    width: 730px;
    height: 66px;
    left: 381px;
    top: 1358px;

    background: #ffffff;
  }
}
</style>
