<template>
  <section class="p-question__box">
    <p class="p-question__box__heading">
      <strong>{{ $t('publishQuestion') }}</strong>
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
        <p>{{ statusMessage }}</p>
        <b-button type="submit" variant="primary">{{
          isEdit ? $t('editQuestion') : buttonTitle
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
import { mapActions, mapGetters } from 'vuex'
import CauHoiApi from '@/api/cauHoi'
export default defineComponent({
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    isCopy: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const data = reactive({
      listStatus: [],
      status: 3,
      buttonTitle: '',
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
    ...mapGetters({
      getStatus: 'questions/getStatus',
    }),
    statusMessage() {
      this.changeButtonMess()
      let mess = ''
      if (this.status === 1) {
        mess = this.$i18n.t('everyBodyCanSee')
      } else {
        mess = this.$i18n.t('onlyYouCanSeeThisQuestion')
      }
      return mess
    },
  },
  watch: {
    status() {
      this.addStatus(this.status)
    },
  },
  mounted() {
    this.status = this.getStatus
  },
  methods: {
    changeButtonMess() {
      if (this.status === 1) {
        this.buttonTitle = 'Lưu công khai'
      } else if (this.status === 2) {
        this.buttonTitle = 'Lưu không công khai'
      } else {
        this.buttonTitle = 'Lưu bản nháp'
      }
    },
    ...mapActions({ addStatus: 'questions/addStatus' }),
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
