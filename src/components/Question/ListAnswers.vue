<template>
  <div :class="$style.answersList">
    <b-form-group
      v-if="typeQuestion === 'single-choice' || 'right-wrong'"
      v-slot="{ ariaDescribedby }"
    >
      <div
        v-for="(answer, index) in answers"
        :key="index"
        :class="$style.answerItem"
      >
        <b-form-radio
          v-model="isSelected"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          :value="answer.id"
          :aria-checked="true"
          ><div :class="$style.answerItem">
            <h6>{{ String.fromCharCode(65 + index) + '. ' }}</h6>
            <p v-html="answer.answerContent"></p>
          </div>
        </b-form-radio>
        <div>
          <b-button
            v-b-modal.modal-1
            variant="outline-warning"
            @click="updateAnswer(index)"
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
          v-for="(answer, index) in answers"
          :key="index"
          :class="$style.answerItem"
        >
          <b-form-checkbox :class="$style.choose" :value="answer.id"
            ><div :class="$style.answerItem">
              <h6>{{ String.fromCharCode(65 + index) + '. ' }}</h6>
              <p v-html="answer.answerContent"></p>
            </div>
          </b-form-checkbox>
          <div>
            <b-button variant="outline-warning" @click="updateAnswer(index)"
              ><b-icon icon="pencil-square"></b-icon
            ></b-button>
            <b-button variant="outline-danger"
              ><b-icon icon="trash"></b-icon
            ></b-button>
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
import EventBus from '../../plugins/eventBus'
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
  },
  setup(props) {
    const { $logger } = useContext()
    const data = reactive({
      isSelected: '',
      answers: props.listAnswers,
    })
    const getRightAnswer = () => {
      const index = props.listAnswers.findIndex(
        (item) => item.rightAnswer === 1
      )
      if (index !== -1) {
        $logger.info(props.listAnswers[index].id)
        data.isSelected = props.listAnswers[index].id
      }
    }
    getRightAnswer()
    watch(
      () => data.isSelected,
      () => {
        $logger.info('data.isSelected', data.isSelected)
        const answers = props.listAnswers.map((item) => {
          if (data.isSelected === item.id) {
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
    // watch(
    //   () => props.listAnswers,
    //   () => {
    //     const index = props.listAnswers.findIndex(
    //       (item) => item.rightAnswer === 1
    //     )
    //     data.isSelected = props.listAnswers[index]
    //   }
    // )
    return {
      ...toRefs(data),
    }
  },
  watch: {
    listAnswers() {
      console.log(this.listAnswers)
    },
  },
  created() {
    // eslint-disable-next-line no-undef
    const that = this
    EventBus.$on('updateListAnswer', function (item) {
      that.$emit('updateListAnswer', item)
    })
  },
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
