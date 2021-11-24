<template>
  <section class="p-question__box">
    <p class="p-question__box__heading">
      <strong>{{ $t('level') }}</strong>
    </p>
    <div class="p-question__box__body">
      <div class="p-question__box__body__item box--level">
        <ValidationProvider
          v-slot="{ errors, valid }"
          name="Độ khó câu hỏi"
          rules="required"
        >
          <b-form-radio-group v-model="levelForm">
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
      levelForm: 1,
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
      getLevel: 'questions/getLevel',
    }),
  },
  watch: {
    getLevel() {
      this.levelForm = this.getLevel
    },
    levelForm() {
      this.addlevel(this.levelForm)
    },
  },
  methods: {
    ...mapActions({ addlevel: 'questions/addlevel' }),
  },
})
</script>
