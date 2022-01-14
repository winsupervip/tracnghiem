<template>
  <div class="empty-data">
    <div class="text-center">
      <img
        src="https://storage.tracnghiem.vn/public/images/notfound.svg"
        alt="empty"
      />
      <h3 class="h2 text-danger fw-bold">Không tìm thấy</h3>
      <p class="text-gray-dark">Nhấn vào nút thêm bên góc phải để thêm mới</p>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped lang="scss">
.empty-data {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 30px;

  img {
    max-height: 120px;
    margin-bottom: 1rem;
  }
}
</style>
