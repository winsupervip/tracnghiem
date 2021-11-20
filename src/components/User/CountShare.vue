<template>
  <div class="flex flex-column">
    <span>{{ totalShare }}</span>
    <div class="d-flex justify-content-center gap-3">
      <b-icon icon="people" aria-hidden="true"></b-icon>
      <p>
        <b>{{ $t('countShare.user') }}</b>
      </p>
    </div>
    <nuxt-link to="#" class="btn btn-outline-primary d-block">
      <b-icon icon="share" aria-hidden="true"></b-icon>
      {{ $t('countShare.share') }}
    </nuxt-link>
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
    totalShare: {
      type: Number,
      default: 0,
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
