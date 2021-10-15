<template>
  <section>
    <p class="border_title"><strong>Chuyên mục(*)</strong></p>

    <div v-if="treeData.length > 0" class="container">
      <treeselect
        v-model="treeValue"
        :multiple="true"
        :options="treeData"
        placeholder="Select your favourite(s)..."
      />
    </div>
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
  },
  setup(props) {
    const { $loader, $logger } = useContext()
    const data = reactive({
      listFormCheck: [],
      treeValue: [],
      treeData: [],
    })
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await CauHoiApi.getCategory()
      data.treeData = result.object?.items
      $logger.info(data.treeData)
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
})
</script>
<style lang="scss" scoped>
section {
  border: 1px solid #aaa;
}
.container {
  display: flex;
  flex-direction: column;
}
.display {
  display: none;
}
.border_title {
  border-bottom: 1px solid #aaa;
  padding: 0.5em;
}
</style>
