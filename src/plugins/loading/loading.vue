<template>
  <transition>
    <div id="loading-screen" class="text-center" :class="$style.wrapper">
      <b-spinner :class="$style.spinner" variant="primary"></b-spinner>
    </div>
  </transition>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  z-index: 2000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(#ffffff, 0.4);
  position: fixed;
  height: 100%;

  .spinner {
    margin: 0 auto;
  }
}
</style>
