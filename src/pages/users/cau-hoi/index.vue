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
              <a href="#" :style="{ fontWeight: 'bold' }">{{ item }}</a>
            </li>
          </ul>
          <div class="line"></div>
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
      <button @click="showSingleQuestion">Danh sách câu đơn</button>
      <span></span>
      <button @click="showMultipleQuestion = !showMultipleQuestion">
        Danh sách câu chùm
      </button>
    </div>
    <div class="type-question">
      <div class="input-group">
        <input type="search" placeholder="Tìm kiếm câu hỏi" />

        <span id="search-addon" class="input-group-text">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <treeselect :multiple="true" :options="options" placeholder="Danh mục" />
      <treeselect
        :multiple="true"
        :options="options"
        placeholder="Loại câu hỏi"
      />
      <treeselect
        :multiple="true"
        :options="options"
        placeholder="Trạng thái"
      />
      <treeselect :multiple="true" :options="options" placeholder="Mức độ" />
      <treeselect :multiple="true" :options="options" placeholder="Sắp xếp" />
    </div>
    <SingleQuestion v-show="showSingleQuestion" />
    <MultipleQuestion v-show="showMultipleQuestion" />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import SingleListPage from './components/SingleListPage.vue'
import MultipleListPage from './components/MultipleListPage.vue'
export default defineComponent({
  components: {
    SingleQuestion: SingleListPage,
    MultipleQuestion: MultipleListPage,
  },
  layout: 'dashboard',
  auth: false,
  data: () => ({
    showSingleQuestion: true,
    showMultipleQuestion: false,
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
      'Một lựa chọn',
      'Nhiều lựa chọn',
      'Đúng sai',
      'Ghép đôi',
      'Điền vào chỗ trống',
      'Câu hỏi trả lời ngắn',
      'Sắp thứ tự',
    ],
  }),
})
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
.line {
  width: 100%;
  height: 0px;
  background-color: #dddddd;
  border: 1px solid #dddddd;
}
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
      &:visited {
        background: red;
      }
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
    .input-group {
      input {
        width: 164px;
        height: 33px;
        font-style: normal;
        font-weight: 600;
        background: #ffffff;
        border: 1px solid #000000;
        border-radius: 4px;
        box-sizing: border-box;
        border-right: none;
        outline: none;
        padding: 0 0 0 5px;
      }

      span {
        height: 33px;
        background: #ffffff;
        border: 1px solid #000000;
        border-left: none;
      }
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
        a {
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
        a {
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
