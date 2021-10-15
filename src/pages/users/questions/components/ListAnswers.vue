<template>
  <div>
    <b-form-group
      v-if="typeQuestion === 'single-choice'"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-radio
        v-for="(answer, index) in listAnswers"
        :key="index"
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="some-radios"
        :value="answer"
        ><div :class="$style.choose">
          <h6>{{ String.fromCharCode(65 + index) + '. ' }}</h6>
          <p v-html="answer.answerContent"></p>
          <img
            src="~/assets/img/dashboard/icon_plus.png"
            alt="icon_plus"
          /></div
      ></b-form-radio>
    </b-form-group>

    <b-form-group
      v-if="typeQuestion === 'multiple-choice'"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox-group
        id="checkbox-group-2"
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="flavour-2"
      >
        <b-form-checkbox
          v-for="(answer, index) in listAnswers"
          :key="index"
          :class="$style.choose"
          :value="answer"
          ><div :class="$style.choose1">
            <h6>{{ String.fromCharCode(65 + index) + '. ' }}</h6>
            <p v-html="answer.answerContent"></p>
            <div :class="$style.choose_right">
              <img
                src="~/assets/img/dashboard/icon_shuffle.png"
                alt="icon_shuffle"
              />
              <img src="~/assets/img/dashboard/icon_edit.png" alt="icon_edit" />
              <img
                src="~/assets/img/dashboard/icon_delete.png"
                alt="icon_delete"
              />
            </div>
          </div>
        </b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  useContext,
} from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    listAnswers: {
      type: Array,
      required: true,
    },
    typeQuestion: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { $logger } = useContext()
    const data = reactive({
      selected: [],
    })
    watch(
      () => data.selected,
      () => {
        $logger.info(data.selected)
      }
    )
    return {
      ...toRefs(data),
    }
  },
  methods: {},
})
</script>
<style module>
.choose1 {
  display: flex;
  position: relative;
}
.choose_right {
}
</style>
