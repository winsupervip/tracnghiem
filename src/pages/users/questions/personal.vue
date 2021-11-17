<template>
  <div>
    <h3 class="p-headerQuestion">{{ $t('PersonalInfo.personal') }}</h3>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4">
          <b-card sub-title="Thông tin người dùng">
            <Info :type="true" />
          </b-card>
        </div>
        <div class="col-12 col-md-8">
          <b-card sub-title="Cập nhật thông tin cá nhân">
            <FormInfo />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Info from '@/components/User/Info.vue'
import FormInfo from '@/components/User/FormInfo.vue'
export default defineComponent({
  auth: true,
  components: { Info, FormInfo },
  layout: 'dashboard',
  setup() {},
  methods: {},
})
</script>
