<template>
  <div class="loading-login">
    <!-- <button @click="$auth.loginWith('keycloak')">login</button> -->
    <div class="loading-img">
      <img
        src="https://storage.tracnghiem.vn/public/images/login-loading.png"
        alt="Vui lòng đợi trong giây lát"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  auth: false,
  setup() {},
})
</script>

<style lang="scss" scoped>
.loading-login {
  padding: 60px 0 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .loading-img {
    img {
      max-width: 500px;
      position: relative;
      animation-name: rocketLaunch;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
    }
  }
}

@keyframes rocketLaunch {
  0% {
    top: 0px;
  }
  50% {
    top: 50px;
  }
  100% {
    top: 0px;
  }
}
</style>
