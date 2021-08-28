<template>
  <button @click="$auth.loginWith('keycloak')">login</button>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  auth: false,
  setup() {},
})
</script>
