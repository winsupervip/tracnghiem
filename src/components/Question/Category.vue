<template>
  <section class="p-question__box">
    <p class="p-question__box__heading">
      <strong>{{ $t('categories') }}</strong>
    </p>
    <div class="p-question__box__body">
      <div class="p-question__box__body__item">
        <div v-if="treeData.length > 0">
          <treeselect
            v-model="treeValue"
            :multiple="true"
            :always-open="alwaysOpen"
            :options="treeData"
            :placeholder="$t('categoryForQuestions')"
            :load-options="loadOptions"
          />
        </div>
        <b-alert v-if="errors[4]" id="error" show variant="warning">{{
          errors[4]
        }}</b-alert>
      </div>
    </div>
  </section>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  // watch,
  useFetch,
  useContext,
} from '@nuxtjs/composition-api'
import { mapActions } from 'vuex'
import CauHoiApi from '@/api/cauHoi'
export default defineComponent({
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { $loader } = useContext()
    const data = reactive({
      listFormCheck: [],
      treeValue: [],
      treeData: [],
      alwaysOpen: false,
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await CauHoiApi.getCategory()
      data.treeData = result.object?.items
      $loader().close()
    })
    fetch()

    return {
      ...toRefs(data),
    }
  },
  watch: {
    treeValue() {
      this.addCategory(this.treeValue)
    },
  },
  methods: {
    ...mapActions(['addCategory']),
    loadOptions({ action, callback, instanceId }) {
      callback()
    },
  },
})
</script>
<style lang="scss" scoped>
.container {
  min-height: 3rem;
}
.display {
  display: none;
}
</style>
