<template>
  <section class="p-question__box">
    <p class="p-question__box__heading">
      <strong>{{ $t('categories') }}</strong>
    </p>
    <div class="p-question__box__body">
      <div class="p-question__box__body__item">
        <ValidationProvider
          v-slot="{ valid, errors }"
          name="Danh mục câu hỏi"
          rules="required"
        >
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
          <b-form-invalid-feedback :state="valid">{{
            errors[0]
          }}</b-form-invalid-feedback>
        </ValidationProvider>
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
import { mapActions, mapGetters } from 'vuex'
import CauHoiApi from '@/api/cauHoi'
export default defineComponent({
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
  computed: {
    ...mapGetters({
      getQuestion: 'questions/getQuestion',
    }),
  },
  watch: {
    treeValue() {
      this.addCategory(this.treeValue)
    },
  },
  mounted() {
    this.treeValue = this.getQuestion?.question?.categories
  },
  methods: {
    ...mapActions({ addCategory: 'questions/addCategory' }),
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
