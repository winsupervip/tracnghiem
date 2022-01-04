<template>
  <b-card header="Tài liệu tham khảo" header-tag="header" class="mb-3">
    <p>
      Học Tiếng Anh:
      <a href="https://vi.duolingo.com/">https://vi.duolingo.com/</a>
    </p>
    <p>
      Tài liệu ôn thi Tiếng Anh:
      <a href="https://www.google.com.vn/">https://www.google.com.vn/</a>
    </p>
    <p>
      Học Tiếng Anh:
      <a href="https://vi.duolingo.com/">https://vi.duolingo.com/</a>
    </p>
    <p>
      Tài liệu ôn thi Tiếng Anh:
      <a href="https://www.google.com.vn/">https://www.google.com.vn/</a>
    </p>
    <p v-if="listExamDocument.length == 0">Chưa có tài liệu tham khảo</p>
  </b-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Reference',
  props: {
    listExamDocument: {
      type: Array,
      default: () => [],
    },
  },
  setup() {},
})
</script>
