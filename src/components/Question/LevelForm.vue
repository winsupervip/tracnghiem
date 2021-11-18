<template>
  <section class="p-question__box">
    <!-- <treeselect
      v-model="value"
      :class="$style.display"
      :multiple="true"
      :options="options"
      :value-consists-of="valueConsistsOf"
    /> -->
    <p class="p-question__box__heading">
      <strong>{{ $t('level') }}</strong>
    </p>
    <div class="p-question__box__body">
      <div class="p-question__box__body__item box--level">
        <ValidationProvider name="Độ khó câu hỏi" rules="required">
          <b-form-radio-group
            v-model="levelForm"
            slot-scope="{ valid, errors }"
          >
            <b-form-radio
              v-for="level in listLevelRadio"
              :key="level.id"
              :value="level.id"
              >{{ level.label }}</b-form-radio
            >
            <b-form-invalid-feedback :state="valid">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-radio-group>
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
  useFetch,
} from '@nuxtjs/composition-api'
import { mapActions, mapGetters } from 'vuex'
import CauHoiApi from '@/api/cauHoi'
export default defineComponent({
  name: 'LevelForm',

  setup() {
    const data = reactive({
      levelForm: '',
      listLevelRadio: [],
    })
    const { fetch } = useFetch(async () => {
      const { data: result } = await CauHoiApi.getLevel()
      data.listLevelRadio = result.object?.items
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
    levelForm() {
      this.addlevel(this.levelForm)
    },
  },
  mounted() {
    this.levelForm = this.getQuestion.question.levelId
  },
  methods: {
    ...mapActions({ addlevel: 'questions/addlevel' }),
  },
})
</script>
