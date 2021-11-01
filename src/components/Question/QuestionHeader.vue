<template>
  <div class="form-headline">
    <div class="headline-left">
      <label for="">{{ questions.categoryItems[0].categoryName }}</label>

      <span>{{ questions.levelName }}</span>
      <span>{{ questions.questionTypeName }}</span>
      <span>{{ questions.statusId }}</span>
    </div>
    <div class="headline-right">
      <a href="">{{ $t('XEM TRÊN WEB') }}</a>

      <b-dropdown variant="light" toggle-class="text-decoration-none" no-caret>
        <template #button-content>
          <i class="bi bi-three-dots-vertical"></i>
        </template>
        <b-dropdown-item href="#">{{ $t('Cập nhật') }}</b-dropdown-item>
        <b-dropdown-item href="#">{{ $t('Tạo bản sao') }}</b-dropdown-item>
        <b-dropdown-item href="#">{{ $t('Xuất bản') }}</b-dropdown-item>
        <b-dropdown-item href="#">{{ $t('Chia sẻ') }}</b-dropdown-item>
        <b-dropdown-item href="#">{{
          $t('Tài liệu tham khảo')
        }}</b-dropdown-item>

        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="#">{{ $t('Thống kê') }}</b-dropdown-item>
        <b-dropdown-item href="#">{{ $t('Xóa') }}</b-dropdown-item>
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
