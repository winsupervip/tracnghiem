<template>
  <div>
    <p>abc</p>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'CountShare',
  auth: true,
  components: {},
  props: {
    type: {
      type: Boolean,
      required: true,
    },
    checkRefCode: {
      type: String,
      default: '',
    },
  },
  setup() {},
  computed: {},
  methods: {},
})
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}
.text-input {
  text-align: center;
}
p {
  font-size: 14px;
}
</style>
