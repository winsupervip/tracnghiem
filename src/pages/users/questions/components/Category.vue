<template>
  <section class="rightCardForAddQuestion">
    <p class="border_title"><strong>Chuyên mục(*)</strong></p>
    <div v-if="treeData.length > 0" class="container">
      <treeselect
        v-model="treeValue"
        :multiple="true"
        :always-open="alwaysOpen"
        :options="treeData"
        placeholder="Chuyên mục cho câu hỏi"
        :load-options="loadOptions"
      />
    </div>
    <b-alert v-if="errors[4]" id="error" show variant="warning">{{
      errors[4]
    }}</b-alert>
  </section>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  useFetch,
  useContext,
} from '@nuxtjs/composition-api'
import CauHoiApi from '../../../../api/cauHoi'
export default defineComponent({
  props: {
    getCategories: {
      type: Function,
      required: true,
    },
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
      errors: 'avc',
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await CauHoiApi.getCategory()
      data.treeData = result.object?.items
      $loader().close()
    })
    fetch()
    watch(
      () => data.treeValue,
      () => {
        props.getCategories(data.treeValue)
      }
    )
    return {
      ...toRefs(data),
    }
  },
  methods: {
    loadOptions({ action, callback, instanceId }) {
      callback()
    },
  },
})
</script>
<style lang="scss" scoped>
section {
  border: 1px solid #aaa;
}
.container {
  min-height: 3rem;
}
.display {
  display: none;
}
</style>
