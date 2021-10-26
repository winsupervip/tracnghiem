<template>
  <b-modal :id="id" hide-footer class="modal-common">
    <div class="text-center mb-4">
      <img class="mb-3" src="/images/bot-icon.svg" alt="bot" />
      <div class="font-bold text-lmd mb-3">
        Vui lòng xác nhận bạn không phải là robot
      </div>
      <img class="" src="/images/gcaptcha.png" alt="captcha" />
    </div>
    <div class="modal-footer-common">
      <b-btn variant="outline">Hủy bỏ</b-btn>
      <b-btn variant="primary" @click="StartExam()">Bắt đầu</b-btn>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalStartDoExam',
  props: {
    id: {
      type: String,
      default: 'modal-id',
    },
  },
}
</script>
