<template>
  <div class="answersList">
    <b-form-group
      v-if="typeQuestion === 'single-choice' || typeQuestion === 'right-wrong'"
      v-slot="{ ariaDescribedby }"
    >
      <div
        v-for="(answer, index) in getListAnswer"
        :key="index"
        class="p-answerItem"
      >
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
            @click="addValueUpdateAnswer(answer)"
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
          v-for="(answer, index) in getListAnswer"
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
              @click="addValueUpdateAnswer(answer)"
            ></b-icon>

            <b-icon icon="trash" @click="deleteAnswer(answer.id)"></b-icon>
          </div>
        </div>
      </b-form-checkbox-group>
    </b-form-group>

    <div v-if="typeQuestion === 'short-answer'">
      <div
        v-for="(answer, index) in getListAnswer"
        :key="index"
        class="p-answerItem"
      >
        <div class="p-answerItem">
          <b>{{ index + 1 + '. ' }}</b>
          <div
            class="p-answerItem__content"
            v-html="answer.answerContent"
          ></div>
        </div>
        <div class="p-answerItem__func">
          <b-icon
            v-b-modal.modal-1
            icon="pencil-square"
            @click="addValueUpdateAnswer(answer)"
          ></b-icon>

          <b-icon icon="trash" @click="deleteAnswer(answer.id)"></b-icon>
        </div>
      </div>
    </div>

    <div v-if="typeQuestion === 'pairing'">
      <div
        v-for="(answer, index) in getListAnswer"
        :key="index"
        class="p-answerItem"
      >
        <div class="p-answerItem">
          <!-- <b-form-select v-model="isSelected" class="mb-3">
            <b-form-select-option :value="null" disabled
              >-- Chọn --</b-form-select-option
            >
            <b-form-select-option
              v-for="i in answers.length"
              :key="i"
              :value="answer.id + 'index' + i"
              >({{ i }})</b-form-select-option
            >
          </b-form-select> -->
          <Pairing :answer="answer" />
          <div
            class="p-answerItem__content"
            v-html="answer.answerContent"
          ></div>
        </div>
        <div class="p-answerItem__func">
          <b-icon
            v-b-modal.modal-1
            icon="pencil-square"
            @click="addValueUpdateAnswer(answer)"
          ></b-icon>

          <b-icon icon="trash" @click="deleteAnswer(answer.id)"></b-icon>
        </div>
      </div>
    </div>

    <div v-if="typeQuestion === 'fill-blank'">
      <div
        v-for="(answer, index) in getListAnswer"
        :key="index"
        class="p-answerItem"
      >
        <div class="p-answerItem">
          <!-- <b-form-select v-model="isSelected" class="mb-3">
            <b-form-select-option :value="null" disabled
              >-- Chọn --</b-form-select-option
            >
            <b-form-select-option
              v-for="i in answers.length"
              :key="i"
              :value="answer.id + 'index' + i"
              >({{ i }})</b-form-select-option
            >
          </b-form-select> -->
          <SelectForFillBlank :answer="answer" />
          <div
            class="p-answerItem__content"
            v-html="answer.answerContent"
          ></div>
        </div>
        <div class="p-answerItem__func">
          <b-icon
            v-b-modal.modal-1
            icon="pencil-square"
            @click="addValueUpdateAnswer(answer)"
          ></b-icon>

          <b-icon icon="trash" @click="deleteAnswer(answer.id)"></b-icon>
        </div>
      </div>
    </div>

    <div v-if="typeQuestion === 'draggable'">
      <Draggable />
    </div>
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
import { mapGetters, mapActions } from 'vuex'
import EventBus from '../../plugins/eventBus'
import SelectForFillBlank from './SelectForFillBlank.vue'
import Draggable from './Draggable.vue'
import Pairing from './Pairing.vue'
export default defineComponent({
  components: {
    SelectForFillBlank,
    Draggable,
    Pairing,
  },
  props: {
    typeQuestion: {
      type: String,
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
      isSelected: [],
      answers: [],
      listAnswersIsChange: false,
    })
    // hàm ni chạy cho câu hỏi đúng sai chỉ chạy 1 lần
    // const getRightAnswer = () => {
    //   $logger.info('get')
    //   const index = props.listAnswers.findIndex(
    //     (item) => item.rightAnswer === 1
    //   )
    //   if (index !== -1) {
    //     $logger.info('watch', props.listAnswers[index].id)
    //     data.isSelected = props.listAnswers[index].id
    //   }
    // }
    // getRightAnswer()
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
    const checkTypeSelected = () => {
      if (props.typeQuestion === 'fill-blank') {
        data.isSelected = null
      }
    }
    checkTypeSelected()
    const handleRightAnswerMulipleChoice = () => {
      const rest = props.listAnswers.map((element) => {
        element.rightAnswer = 0
        return element
      })
      data.isSelected.forEach((e) => {
        const index = rest.findIndex((item) => item.id === e)
        rest[index].rightAnswer = 1
      })
      console.log(rest)
      return rest
    }
    const handleFillBlank = (value) => {
      const listAnswer = props.listAnswers
      const getIndex = parseInt(value.split('index')[1])
      const getId = value.split('index')[0]
      const index = listAnswer.findIndex((item) => item.id === getId)
      listAnswer[index].rightAnswer = getIndex
      console.log(listAnswer)
      props.updateRightAnswer(listAnswer)
    }
    watch(
      () => data.isSelected,
      () => {
        if (!data.listAnswersIsChange) {
          const typeQuestion = props.typeQuestion
          let answers = []
          if (
            typeQuestion === 'single-choice' ||
            typeQuestion === 'right-wrong'
          ) {
            answers = handleRightAnswerSingleChoice()
          } else if (typeQuestion === 'multiple-choice') {
            answers = handleRightAnswerMulipleChoice()
          } else if (typeQuestion === 'fill-blank') {
            // cái này đặt biệt hơn, nên sẻ xử lý ở hàm handleFillBlank
          } else if (typeQuestion === 'draggable') {
            // cái này đặt biệt hơn, nên sẻ xử lý ở hàm handleDraggable
          }

          $logger.info(answers, data.isSelected)
          props.updateRightAnswer(answers)
        }
        data.listAnswersIsChange = false
      }
    )
    return {
      ...toRefs(data),
      handleFillBlank,
    }
  },
  computed: {
    ...mapGetters(['getListAnswer', 'getUpdateValueAnswer']),
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
  onMouted() {
    this.answers = this.getListAnswer
  },
  created() {
    // eslint-disable-next-line no-undef
    const that = this
    EventBus.$on('updateListAnswer', function (item) {
      // that.$emit('updateListAnswer', item)
      console.log('item', item)
      console.log('an', that.answers)
      const answer = that.answers[item.index]
      answer.answerContent = item.answerContent
      answer.random = item.isRandom
      answer.plainText = item.answerContent
      answer.rightAnswer = item.isRightAnswer
    })
  },
  methods: {
    ...mapActions(['addValueUpdateAnswer', 'deleteAnswer']),
    activeSingleRightAnswer() {
      const index = this.listAnswers.findIndex((item) => item.rightAnswer === 1)
      if (index !== -1) {
        this.listAnswersIsChange = true
        this.isSelected = this.listAnswers[index].id
      }
    },
    activeMultipleAnswer() {
      // eslint-disable-next-line prefer-const
      let listRightAnswer = []
      this.listAnswers.forEach((element) => {
        if (element.rightAnswer === 1) {
          listRightAnswer.push(element.id)
        }
      })
      if (listRightAnswer.length > 0) {
        this.listAnswersIsChange = true
        this.isSelected = listRightAnswer
      }
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
