<template>
  <div>
    <div class="info">
      <div class="info-image">
        <img
          :src="user.avatar ? user.avatar : '/images/logo.svg'"
          class="card"
        />
        <!-- <Uploader :accept="'*/*'" :disabled="false"></Uploader> -->
        <p v-if="show" class="text-image">{{ $t('userInfo.change') }}</p>
      </div>

      <div class="info-content">
        <p>
          <b>{{
            user.displayName
              ? user.displayName
              : user.firstName + ' ' + user.lastName
          }}</b>
        </p>
        <p>{{ user.email }}</p>
        <p>{{ user.school }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
// import Uploader from '@/components/Uploader.vue'
export default defineComponent({
  name: 'UserlInfo',
  auth: true,
  components: {},
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  setup() {},
  computed: {},
  methods: {},
})
</script>
<style lang="scss" scoped>
.card {
  width: 125px;
  height: 125px;
  border-radius: 50%;
  border: 1px solid transparent;
}
.text-image {
  text-decoration: underline;
  padding: 5px 0;
}
p {
  word-break: break-word;
  font-size: 14px;
}
.info {
  display: flex;
  gap: 1rem;
}
.info-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  flex-shrink: 0;
}
.info-content {
  flex-shrink: 1;
}
</style>
