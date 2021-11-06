<template>
  <section class="p-question__box">
    <p class="p-question__box__heading">
      <strong>{{ $t('Xuất bản câu hỏi (*)') }}</strong>
    </p>

    <div class="p-question__box__body">
      <div class="p-question__box__body__item">
        <!-- <b>{{ $t('Hiển thị:') }}</b> -->
        <ValidationProvider name="Trạng Thái câu hỏi" rules="required">
          <b-form-radio-group v-model="status" slot-scope="{ valid, errors }">
            <b-form-radio
              v-for="status in listStatus"
              :key="status.id"
              :value="status.id"
              >{{ status.label }}</b-form-radio
            >
            <b-form-invalid-feedback :state="valid">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-radio-group>
        </ValidationProvider>
      </div>
      <div class="p-question__box__body__item">
        <p>
          <!-- <b>{{ $t('Chỉ bạn mới thấy được câu hỏi này.') }}</b> -->
        </p>
        <div>
          <!-- <b-button variant="outline-primary" class="btnQuestion">{{
            $t('Lưu bản nháp')
          }}</b-button
          ><br />
          <b-button
            variant="outline-primary"
            class="btnQuestion btn-save"
            @click="onSubmit"
            >{{ $t('Lưu câu hỏi') }}</b-button
          > -->
        </div>
        <b-button type="submit" variant="primary">{{
          $t('Lưu câu hỏi')
        }}</b-button>
      </div>
    </div>
  </section>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useFetch,
} from '@nuxtjs/composition-api'
import { mapActions } from 'vuex'
import CauHoiApi from '@/api/cauHoi'
export default defineComponent({
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      listStatus: [],
      status: '',
      value: null,
      options: [
        { text: 'First radio', value: 'first' },
        { text: 'Second radio', value: 'second' },
        { text: 'Third radio', value: 'third' },
      ],
    })
    const { fetch } = useFetch(async () => {
      const { data: result } = await CauHoiApi.getListStatus()
      data.listStatus = result.object?.items
    })
    fetch()
    return {
      ...toRefs(data),
    }
  },
  computed: {
    state() {
      return Boolean(this.value)
    },
  },
  watch: {
    status() {
      this.addStatus(this.status)
    },
  },
  methods: {
    ...mapActions(['addStatus']),
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

button {
  width: 100%;
  height: auto;
}
</style>
