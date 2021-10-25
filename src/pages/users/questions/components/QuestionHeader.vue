<template>
  <div class="form-headline">
    <div class="headline-left">
      <label for="">{{ questions.categoryItems[0].categoryName }}</label>

      <span>{{ questions.levelName }}</span>
      <span>{{ questions.questionTypeName }}</span>
      <span>{{ questions.statusName }}</span>
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
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'QuestionHeader',
  auth: false,
  props: {
    questions: {
      type: Object,
      required: true,
    },
  },
})
</script>
