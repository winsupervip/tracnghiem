<template>
  <div :class="$style.answersList">
    <b-form-group
      v-if="typeQuestion === 'single-choice'"
      v-slot="{ ariaDescribedby }"
    >
      <div
        v-for="(answer, index) in listAnswers"
        :key="index"
        :class="$style.answerItem"
      >
        <b-form-radio
          v-model="isSelected"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          :value="answer"
          :aria-checked="true"
          ><div :class="$style.answerItem">
            <h6>{{ String.fromCharCode(65 + index) + '. ' }}</h6>
            <p v-html="answer.answerContent"></p>
          </div>
        </b-form-radio>
        <div>
          <b-button variant="outline-warning"
            ><b-icon icon="pencil-square"></b-icon
          ></b-button>
          <b-button variant="outline-danger"
            ><b-icon icon="trash"></b-icon
          ></b-button>
        </div>
      </div>
    </b-form-group>

    <b-form-group
      v-if="typeQuestion === 'multiple-choice'"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox-group
        id="checkbox-group-2"
        v-model="isSelected"
        :aria-describedby="ariaDescribedby"
        name="flavour-2"
      >
        <div
          v-for="(answer, index) in listAnswers"
          :key="index"
          :class="$style.answerItem"
        >
          <b-form-checkbox :class="$style.choose" :value="answer"
            ><div :class="$style.answerItem">
              <h6>{{ String.fromCharCode(65 + index) + '. ' }}</h6>
              <p v-html="answer.answerContent"></p>
            </div>
          </b-form-checkbox>
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
    selected: {
      type: [Object, String],
      required: true,
    },
  },
  setup(props) {
    const { $logger } = useContext()
    const data = reactive({
      isSelected: props.selected,
    })
    watch(
      () => data.isSelected,
      () => {
        $logger.info(data.isSelected)
      }
    )
    watch(
      () => props.selected,
      () => {
        data.isSelected = props.selected
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
.action {
  display: flex;
  padding: 5px;
}
.answersList {
  margin: 1rem;
}
.answerItem {
  display: flex;
  padding: 5px;
  justify-content: space-between;
}
</style>
