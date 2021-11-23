<template>
  <div class="mb-4">
    <b-card>
      <p>
        <b-icon icon="share" aria-hidden="true"></b-icon>
        {{ $t('info.codeIntroduce') }}: <b>{{ refCode }}</b>
      </p>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          :value="`https://tracnghiem.vn/affiliate?ref=${refCode}`"
          readonly
        />
        <button class="btn btn-outline-primary">
          <b-icon icon="file-code" aria-hidden="true"></b-icon>
        </button>
      </div>
    </b-card>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'RefCodeLink',
  auth: true,
  components: {},
  props: {
    refCode: {
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
p {
  font-size: 14px;
}
span {
  font-size: 80px;
  font-weight: 700;
  display: block;
  text-align: center;
}
</style>
