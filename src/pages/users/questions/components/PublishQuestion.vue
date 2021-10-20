<template>
  <section class="rightCardForAddQuestion">
    <!-- <treeselect
      v-model="value"
      :class="$style.display"
      :multiple="true"
      :options="options"
      :value-consists-of="valueConsistsOf"
    /> -->
    <p class="border_title"><strong>Xuất bản câu hỏi (*)</strong></p>
    <ul class="container">
      Hiện thị:
      <li v-for="option in listStatus" :key="option.id">
        <label
          ><input v-model="status" type="radio" :value="option.id" />{{
            option.label
          }}</label
        >
      </li>
    </ul>
    <p>Chỉ bạn mới thấy được câu hỏi này.</p>
    <b-button variant="outline-primary ">Lưu Như bản nháp</b-button>
    <b-button variant="outline-primary " @click="saveQuestion"
      >Lưu Câu Hỏi</b-button
    >
  </section>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  useFetch,
} from '@nuxtjs/composition-api'
import CauHoiApi from '../../../../api/cauHoi'
export default defineComponent({
  name: 'CategoryForm',
  props: {
    getPublishQuestion: {
      type: Function,
      required: true,
    },
    saveQuestion: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      listStatus: [],
      status: -1,
    })
    const { fetch } = useFetch(async () => {
      const { data: result } = await CauHoiApi.getListStatus()
      data.listStatus = result.object?.items
    })
    fetch()
    watch(
      () => data.status,
      () => {
        props.getPublishQuestion(data.status)
      }
    )
    return {
      ...toRefs(data),
    }
  },
})
</script>
