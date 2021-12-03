<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên gói</th>
          <th scope="col">Thời hạn(ngày)</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Số câu hỏi</th>
          <th scope="col">Số đề thi</th>
          <th scope="col">Giá tiền</th>
          <th scope="col">Ngày tạo</th>
          <th scope="col">Chức năng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{ index + 1 + (urlQuery.page - 1) * 10 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.exp }}</td>
          <td>{{ item.isActive ? 'Hoạt động' : 'Không hoạt động' }}</td>
          <td>{{ item.limitQuestion }}</td>
          <td>{{ item.limitExam }}</td>
          <td>{{ formatMoney(item.price) }}</td>
          <td>{{ formatDate(item.createDate) }}</td>
          <td>
            <b-dropdown class="m-md-2" no-caret size="sm">
              <template #button-content>
                <b-icon-three-dots></b-icon-three-dots>
              </template>
              <b-dropdown-item>Chi tiết</b-dropdown-item>
              <b-dropdown-item>Cập nhật</b-dropdown-item>
              <b-dropdown-item>Kích hoạt / Hủy</b-dropdown-item>
              <b-dropdown-item>Kích hoạt</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="handleDelete(item.hashId)"
                >Xóa</b-dropdown-item
              >
            </b-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  auth: true,
  layout: 'dashboard',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    urlQuery: {
      type: Object,
      default: () => {},
    },
  },
  setup() {},
  methods: {
    handleDelete(id) {
      this.$emit('deleteService', id)
    },
    formatMoney(value) {
      const money = value.toLocaleString('vn-VN', {
        style: 'currency',
        currency: 'VND',
      })
      console.log('list ', this.list)
      return money
    },
    formatDate(value) {
      return value.slice(0, 10).split('-').reverse().join('/')
    },
  },
})
</script>
