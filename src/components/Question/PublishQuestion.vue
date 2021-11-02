<template>
  <section class="p-question__box">
    <p class="p-question__box__heading">
      <strong>{{ $t('publishQuestion') }}</strong>
    </p>
    <!-- <ValidationProvider v-slot="{ errors }" rules="required" name="choice"> -->
    <div class="p-question__box__body">
      <div class="p-question__box__body__item">
        <ul>
          <b>{{ $t('show') }}</b>
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
      </div>
      <div class="p-question__box__body__item">
        <p>
          <b>{{ $t('onlyYouCanSeeThisQuestion') }}</b>
        </p>
        <div>
          <b-button variant="outline-primary" class="btnQuestion">{{
            $t('saveDraft')
          }}</b-button
          ><br />
          <b-button
            variant="outline-primary"
            class="btnQuestion btn-save"
            @click="onSubmit"
            >{{ $t('saveQuestion') }}</b-button
          >
        </div>
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
    return {
      ...toRefs(data),
    }
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
