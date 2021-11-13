<template>
  <div class="row">
    <div class="col-12 col-md-8">
      <b-card sub-title="Thông tin đề thi">
        <ExamInfo />
        <ExamSettings />
      </b-card>
    </div>
    <div class="col-12 col-md-3">
      <ExamExtra />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

// child components
import ExamInfo from './components/ExamInfo.vue'
import ExamSettings from './components/ExamSettings.vue'
import ExamExtra from './components/ExamExtra.vue'

export default defineComponent({
  components: { ExamInfo, ExamSettings, ExamExtra },
  setup() {},
  created() {
    this.dataForm = Object.assign({}, this.exam)
  },
  methods: {},
})
</script>
