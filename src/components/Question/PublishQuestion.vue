<template>
  <section class="rightCardForAddQuestion">
    <p class="border_title"><strong>Xuất bản câu hỏi (*)</strong></p>
    <!-- <ValidationProvider v-slot="{ errors }" rules="required" name="choice"> -->
    <ul class="container">
      <b>Hiển thị:</b>
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
    <div>
      <b-button variant="outline-primary">Lưu bản nháp</b-button><br />
      <b-button
        variant="outline-primary"
        class="btn-save"
        value="Lưu Câu Hỏi"
        @click="onSubmit"
        >Lưu Câu Hỏi</b-button
      >
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
} from '@nuxtjs/composition-api'
import CauHoiApi from '@/api/cauHoi'
export default defineComponent({
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
ul {
  li {
    margin: 0 0.5em 0.5em;

    &:nth-of-type(1) {
      margin-top: 10px;
    }

    label {
      input {
        margin-right: 10px;
      }
    }
  }
}

button {
  min-width: 160px;
}

.btn-save {
  margin-top: 10px;
}
</style>
