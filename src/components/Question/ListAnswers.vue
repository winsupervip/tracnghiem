<template>
  <div class="answersList">
    <b-form-group
      v-if="typeQuestion === 'single-choice' || 'right-wrong'"
      v-slot="{ ariaDescribedby }"
    >
      <div
        v-for="(answer, index) in listAnswers"
        :key="index"
        class="p-answerItem"
      >
        <b-form-radio
          v-model="isSelected"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          :value="answer"
          :aria-checked="true"
          ><div class="p-answerItem">
            <b>{{ String.fromCharCode(65 + index) + '. ' }}</b>
            <div
              class="p-answerItem__content"
              v-html="answer.answerContent"
            ></div>
          </div>
        </b-form-radio>
        <div class="p-answerItem__func">
          <b-icon icon="shuffle"></b-icon>
          <b-icon
            v-b-modal.modal-1
            icon="pencil-square"
            @click="updateAnswer(index)"
          ></b-icon>
          <b-icon icon="trash" @click="handleDelete(index)"></b-icon>
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
          class="p-answerItem"
        >
          <b-form-checkbox class="choose" :value="answer"
            ><div class="p-answerItem">
              <b>{{ String.fromCharCode(65 + index) + '. ' }}</b>
              <div
                class="p-answerItem__content"
                v-html="answer.answerContent"
              ></div>
            </div>
          </b-form-checkbox>
          <div class="p-answerItem__func">
            <b-icon icon="shuffle"></b-icon>
            <b-icon icon="pencil-square" @click="updateAnswer(index)"></b-icon>
            <b-icon icon="trash" @click="handleDelete(index)"></b-icon>
          </div>
        </div>
      </b-form-checkbox-group>
    </b-form-group>
    <b-alert v-if="errors[5]" id="error" show variant="warning">{{
      errors[5]
    }}</b-alert>
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
    updateRightAnswer: {
      type: Function,
      required: true,
    },
    updateAnswer: {
      type: Function,
      required: true,
    },
    errors: {
      type: Array,
      required: true,
    },
    // handleDelete: {
    //   type: Function,
    //   required: true,
    // },
  },
  setup(props) {
    const { $logger } = useContext()
    const data = reactive({
      isSelected: props.selected,
    })
    const getRightAnswer = () => {
      const index = props.listAnswers.findIndex(
        (item) => item.rightAnswer === 1
      )
      data.isSelected = props.listAnswers[index]
    }
    getRightAnswer()
    watch(
      () => data.isSelected,
      () => {
        const answers = props.listAnswers.map((item) => {
          if (data.isSelected.answerContent === item.answerContent) {
            item.isRightAnswer = 1
          } else {
            item.rightAnswer = 0
          }
          return item
        })
        $logger.info(answers)
        props.updateRightAnswer(answers)
      }
    )
    return {
      ...toRefs(data),
    }
  },
  watch: {
    listAnswers() {
      console.log(this.listAnswers)
    },
  },
  methods: {
    hideModal() {
      this.$refs['my-modal'].hide()
    },
  },
})
</script>
<style lang="scss" scoped>
p {
  margin-bottom: 0;
}

.action {
  display: flex;
  padding: 5px;
}
.answersList {
  margin: 1rem;
}

.p-answerItem {
  display: flex;
  justify-content: space-between;

  b {
    min-width: 20px;
  }

  &__content {
    padding: 0 10px;
  }

  &__func {
    svg {
      cursor: pointer;

      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
}
</style>
