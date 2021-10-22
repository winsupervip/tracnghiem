<template>
  <div class="form-single-question">
    <div class="form-headline">
      <div class="headline-left">
        <label for="">Thi tốt nghiệp THPT</label>
        <span>Cơ bản</span>
        <span>Một lựa chọn</span>
        <span>Bản nháp</span>
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
        <p v-html="question.questionContent"></p>
      </div>
      <div class="answer">
        <ul>
          <li v-for="(answer, index) in question.answers" :key="index" type="A">
            {{ String.fromCharCode(65 + index) + '. ' }}
            <p v-html="answer.answerContent"></p>
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
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SingleListPage',
  props: {
    question: {
      type: Object,
      required: true,
    },
  },

  setup: () => {},
})
</script>
