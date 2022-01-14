<template>
  <b-card header="Danh sách chuyên đề" header-tag="header" class="mb-3">
    <table v-if="listExamSection.length > 0" class="table table-hover mb-0">
      <thead>
        <tr>
          <th>Chuyên đề</th>
          <th>Số lượng câu hỏi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listExamSection" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.totalQuestion }}</td>
        </tr>
      </tbody>
    </table>
    <strong v-else>Không có chuyên đề</strong>
  </b-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Thematic',
  props: {
    listExamSection: {
      type: Array,
      default: () => [],
    },
  },
  setup() {},
})
</script>
