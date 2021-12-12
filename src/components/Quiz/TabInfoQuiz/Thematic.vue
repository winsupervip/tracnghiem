<template>
  <b-card header="Danh sách chuyên đề" header-tag="header" class="mb-3">
    <table class="table table-hover mb-0">
      <thead>
        <tr>
          <th>Chuyên đề</th>
          <th>Số lượng câu hỏi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Reading</td>
          <td>100</td>
        </tr>
        <tr>
          <td>Listening</td>
          <td>100</td>
        </tr>
        <tr>
          <td>Writing</td>
          <td>100</td>
        </tr>
        <tr>
          <td>Speaking</td>
          <td>100</td>
        </tr>
      </tbody>
    </table>
  </b-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Thematic',
  setup() {},
})
</script>
