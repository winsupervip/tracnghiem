<template>
  <div>
    <div class="info">
      <div class="info-image">
        <img :src="image" class="card" />

        <button
          v-if="show"
          v-b-modal.modal-1
          class="btn text-decoration-underline"
        >
          {{ $t('userInfo.change') }}
        </button>
      </div>

      <b-modal id="modal-1" title="Thay đổi ảnh" size="ms" @ok="handleSubmit">
        <Uploader
          v-model="image"
          :accept="'*/*'"
          :disabled="true"
          class="uploader"
        ></Uploader>
      </b-modal>
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
import EventBus from '@/plugins/eventBus'

import Uploader from '@/components/Uploader.vue'
export default defineComponent({
  name: 'UserInformation',
  auth: true,
  components: { Uploader },
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
  data() {
    return {
      isShow: false,
      image: '',
    }
  },
  watch: {
    user: {
      handler(val) {
        this.image = val.avatar
      },
      deep: true,
    },
  },
  mounted() {
    this.image = this.user.avatar
  },
  methods: {
    handleSubmit() {
      EventBus.$emit('image', this.image)
    },
  },
})
</script>
<style lang="scss" scoped>
.card {
  width: 125px;
  height: 125px;
  border-radius: 50%;
  border: 1px solid transparent;
  object-fit: cover;
}
p {
  word-break: break-word;
  font-size: 14px;
  margin-bottom: 10px;
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
