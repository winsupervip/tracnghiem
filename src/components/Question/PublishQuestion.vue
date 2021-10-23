<template>
  <section class="rightCardForAddQuestion">
    <p class="border_title"><strong>Xuất bản câu hỏi (*)</strong></p>
    <!-- <ValidationProvider v-slot="{ errors }" rules="required" name="choice"> -->
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
    <b-alert v-if="errors[6]" id="error" show variant="warning">{{
      errors[6]
    }}</b-alert>
    <!-- </ValidationProvider> -->
    <p>Chỉ bạn mới thấy được câu hỏi này.</p>
    <b-button variant="outline-primary ">Lưu Như bản nháp</b-button>
    <b-button variant="outline-primary " value="Lưu Câu Hỏi" @click="onSubmit"
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
import CauHoiApi from '@/api/cauHoi'
export default defineComponent({
  name: 'CategoryForm',
  props: {
    getPublishQuestion: {
      type: Function,
      required: true,
    },
    errors: {
      type: Array,
      required: true,
    },
    onSubmit: {
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
<style lang="scss" scoped>
.border_title {
  border-bottom: 1px solid #aaa;
  padding: 0.5em;
  color: #1c3988;
}
.container {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #aaa;
}
ul,
li {
  padding: 0;
  margin: 0.5em;
  list-style: none;
}
</style>
