<template>
  <div class="form-multiple-question">
    <div class="form-headline">
      <div class="headline-left">
        <label for="">Thi tốt nghiệp THPT</label>
        <span>Cơ bản</span>

        <span>Công khai</span>
      </div>
      <div class="headline-right">
        <a href="">XEM TRÊN WEB</a>
        <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
          <template #button-content>
            <i class="fas fa-ellipsis-v"></i>
          </template>
          <b-dropdown-item href="#">Cập nhật</b-dropdown-item>
          <b-dropdown-item href="#">Tạo bản sao</b-dropdown-item>
          <b-dropdown-item href="#">Xuất bản</b-dropdown-item>
          <b-dropdown-item href="#">Chia sẻ</b-dropdown-item>
          <b-dropdown-item href="#">tài liệu tham khảo</b-dropdown-item>

          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="#">Thống kê</b-dropdown-item>
          <b-dropdown-item href="#">Xóa</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="line"></div>
    <div class="question">
      <div class="question-hashtag">
        <a href="">#vật lý 12</a>
        <a href="">#Luyện thi đại học</a>
        <a href="">#Vật Lý</a>
      </div>
      <div class="question">
        Which of the following lists all and only the appropriate descriptions
        about a 32-bit CPU and a 64-bit CPU? I When a 32-bit CPU and a 64-bit
        CPU are compared, a 64-bit CPU has a larger theoretical maximum memory
        space.. II There is no 32-bit OS that runs on a PC with a 64-bit CPU.
        III In terms of the read and write speed of a USB memory, the speed of a
        PC with a 64-bit CPU is twice as fast as that of a PC with a 32-bit CPU.
      </div>
      <div class="answer">
        <ul>
          <li v-for="answer in answers" :key="answer.id">
            <strong>câu {{ answer.id }} :</strong> {{ answer.label }}
            <button><i class="far fa-trash-alt"></i></button
            ><button><i class="far fa-edit"></i></button>
          </li>
        </ul>
      </div>
    </div>
    <b-pagination
      class="pagination"
      first-number
      align="center"
      size="lg"
    ></b-pagination>
  </div>
</template>

<script>
import { defineComponent, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MultiListPage',
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },

  setup: () => {},
  data: () => ({
    answers: [
      {
        id: '1',
        label: 'chọn đáp án đúng',
      },
      {
        id: '2',
        label: 'chọn đáp án đúng',
      },
      {
        id: '3',
        label: 'chọn đáp án đúng',
      },
      {
        id: '4',
        label: 'chọn đáp án đúng',
      },
      {
        id: '5',
        label: 'chọn đáp án đúng',
      },
    ],
  }),
})
</script>
