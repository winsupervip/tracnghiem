<template>
  <b-card header="Tài liệu tham khảo" header-tag="header" class="mb-3">
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
