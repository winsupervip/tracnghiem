<template>
  <div class="answersList">
    <b-form-group
      v-if="typeQuestion === 'single-choice' || typeQuestion === 'right-wrong'"
      v-slot="{ ariaDescribedby }"
    >
      <div v-for="(answer, index) in answers" :key="index" class="p-answerItem">
        <b-form-radio
          v-model="isSelected"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          :value="answer.id"
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
            @click="updateAnswer(answer.id)"
          ></b-icon>
          <b-icon icon="trash" @click="deleteAnswer(answer.id)"></b-icon>
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
          class="p-answerItem"
        >
          <b-form-checkbox :value="answer.id"
            ><div class="p-answerItem">
              <h6>{{ String.fromCharCode(65 + index) + '. ' }}</h6>
              <p v-html="answer.answerContent"></p>
            </div>
          </b-form-checkbox>
          <div class="p-answerItem__func">
            <b-icon icon="shuffle"></b-icon>
            <b-icon
              v-b-modal.modal-1
              icon="pencil-square"
              @click="updateAnswer(answer.id)"
            ></b-icon>
            <!-- <b-icon icon="trash" @click="handleDelete(index)"></b-icon> -->
            <b-icon icon="trash"></b-icon>
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
    deleteAnswer: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { $logger } = useContext()
    const data = reactive({
      isSelected: [],
      answers: props.listAnswers,
    })
    // hàm ni chạy cho câu hỏi đúng sai chỉ chạy 1 lần
    const getRightAnswer = () => {
      $logger.info('get')
      const index = props.listAnswers.findIndex(
        (item) => item.rightAnswer === 1
      )
      if (index !== -1) {
        $logger.info('watch', props.listAnswers[index].id)
        data.isSelected = props.listAnswers[index].id
      }
    }
    getRightAnswer()
    const handleRightAnswerSingleChoice = () => {
      const answers = props.listAnswers.map((item) => {
        if (data.isSelected === item.id) {
          item.rightAnswer = 1
        } else {
          item.rightAnswer = 0
        }
        return item
      })
      return answers
    }
    const handleRightAnswerMulipleChoice = () => {
      const answers = props.listAnswers.map((item) => {
        const index = data.isSelected.findIndex((select) => select === item.id)
        if (index !== -1) {
          item.rightAnswer = 1
        }
        return item
      })
      return answers
    }
    watch(
      () => data.isSelected,
      () => {
        const typeQuestion = props.typeQuestion
        let answers = []
        if (
          typeQuestion === 'single-choice' ||
          typeQuestion === 'right-wrong'
        ) {
          answers = handleRightAnswerSingleChoice()
        } else if (typeQuestion === 'multiple-choice') {
          answers = handleRightAnswerMulipleChoice()
        }

        props.updateRightAnswer(answers)
      }
    )
    return {
      ...toRefs(data),
    }
  },
  watch: {
    listAnswers() {
      console.log('listAnswer')
      const typeQuestion = this.typeQuestion
      if (typeQuestion === 'single-choice' || typeQuestion === 'right-wrong') {
        this.activeSingleRightAnswer()
      } else if (typeQuestion === 'multiple-choice') {
        this.activeMultipleAnswer()
      }
      this.answers = this.listAnswers
    },
  },
  created() {
    // eslint-disable-next-line no-undef
    const that = this
    EventBus.$on('updateListAnswer', function (item) {
      console.log(1)
      that.$emit('updateListAnswer', item)
      console.log(2)
    })
  },
  methods: {
    activeSingleRightAnswer() {
      const index = this.listAnswers.findIndex((item) => item.rightAnswer === 1)
      if (index !== -1) {
        console.log('listAnswer 2')
        this.isSelected = this.listAnswers[index].id
      }
    },
    activeMultipleAnswer() {
      this.listAnswers.forEach((element) => {
        if (element.rightAnswer === 1) {
          this.isSelected.push(element.id)
        }
      })
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
