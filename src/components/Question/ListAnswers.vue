<template>
  <div class="answersList">
    <b-form-group
      v-if="typeQuestion === 'single-choice'"
      v-slot="{ ariaDescribedby }"
    >
      <div
        v-for="(answer, index) in compareListAnswer"
        :key="index"
        class="p-answerItem"
      >
        <b-form-radio
          v-model="isSelected"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          :value="answer.id"
          :aria-checked="true"
          @change="isChange(answer.id, $event)"
          ><div class="p-answerItem">
            <b>{{ String.fromCharCode(65 + index) + '. ' }}</b>
            <div
              class="p-answerItem__content"
              v-html="mathTypeDisplay(answer.answerContent)"
            ></div>
          </div>
        </b-form-radio>
        <div class="p-answerItem__func">
          <b-icon
            :variant="answer.random ? 'success' : 'dark'"
            icon="shuffle"
            @click="isRandom(answer.id)"
          ></b-icon>
          <b-icon
            v-b-modal.modal-1
            icon="pencil-square"
            @click="addValueUpdateAnswer(answer)"
          ></b-icon>
          <b-icon icon="trash" @click="handleDeleteAnswer(answer.id)"></b-icon>
        </div>
      </div>
    </b-form-group>

    <b-form-group
      v-if="typeQuestion === 'right-wrong'"
      v-slot="{ ariaDescribedby }"
    >
      <div
        v-for="(answer, index) in compareListAnswer"
        :key="index"
        class="p-answerItem"
      >
        <b-form-radio
          v-model="isSelected"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          :value="answer.id"
          :aria-checked="true"
          @click="isChange(answer.id)"
          ><div class="p-answerItem">
            <b>{{ String.fromCharCode(65 + index) + '. ' }}</b>
            <div
              class="p-answerItem__content"
              v-html="answer.answerContent"
            ></div>
          </div>
        </b-form-radio>
        <div class="p-answerItem__func">
          <b-icon
            :variant="answer.random ? 'success' : 'dark'"
            icon="shuffle"
            @click="isRandom(answer.id)"
          ></b-icon>
          <b-icon
            v-b-modal.modal-1
            icon="pencil-square"
            @click="addValueUpdateAnswer(answer)"
          ></b-icon>
          <b-icon
            v-if="index !== 0 && index !== 1"
            icon="trash"
            @click="handleDeleteAnswer(answer.id)"
          ></b-icon>
          <b-icon v-else></b-icon>
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
          v-for="(answer, index) in compareListAnswer"
          :key="index"
          class="p-answerItem"
        >
          <b-form-checkbox :value="answer.id" @change="isChange(answer.id)"
            ><div class="p-answerItem">
              <h6>{{ String.fromCharCode(65 + index) + '. ' }}</h6>
              <p v-html="answer.answerContent"></p>
            </div>
          </b-form-checkbox>
          <div class="p-answerItem__func">
            <b-icon
              :variant="answer.random ? 'success' : 'dark'"
              icon="shuffle"
              @click="isRandom(answer.id)"
            ></b-icon>
            <b-icon
              v-b-modal.modal-1
              icon="pencil-square"
              @click="addValueUpdateAnswer(answer)"
            ></b-icon>

            <b-icon
              icon="trash"
              @click="handleDeleteAnswer(answer.id)"
            ></b-icon>
          </div>
        </div>
      </b-form-checkbox-group>
    </b-form-group>

    <div v-if="typeQuestion === 'short-answer'">
      <b-container>
        <ShortAnswer
          v-for="(answer, index) in compareListAnswer"
          :key="answer.id"
          :type-question="typeQuestion"
          :num-index="index + 1"
          :answer="answer"
          :group-question="groupQuestion"
          :child-question-id="childQuestionId"
        />
      </b-container>
      <ShortAnswerInput
        :type-question="typeQuestion"
        :group-question="groupQuestion"
        :child-question-id="childQuestionId"
      />
    </div>

    <div v-if="typeQuestion === 'pairing'">
      <b-container>
        <b-row
          v-for="(answer, index) in compareListAnswer"
          :key="index"
          class="p-answerItem"
        >
          <b-col
            cols="5"
            class="boderMatching"
            v-html="answer.left.answerContent"
          ></b-col>
          <b-col
            cols="5"
            class="boderMatching"
            v-html="answer.right.answerContent"
          ></b-col>
          <!-- <Pairing :answer="answer" /> -->

          <b-col cols="2" class="matching_style">
            <b-icon
              :variant="answer.left.random ? 'success' : 'dark'"
              icon="shuffle"
              @click="isRandom(answer.id)"
            ></b-icon>
            <b-icon
              v-b-modal.modal-1
              icon="pencil-square"
              @click="addValueUpdateAnswer(answer)"
            ></b-icon>
            <b-icon
              icon="trash"
              @click="handleDeleteAnswer(answer.id)"
            ></b-icon>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div v-if="typeQuestion === 'fill-blank'">
      <div
        v-for="(answer, index) in compareListAnswer"
        :key="index"
        class="p-answerItem"
      >
        <div class="p-answerItem">
          <SelectForFillBlank
            :answer="answer"
            :group-question="groupQuestion"
            :child-question-id="childQuestionId"
            :list-answer="compareListAnswer"
          />
          <div
            class="p-answerItem__content"
            v-html="mathTypeDisplay(answer.answerContent)"
          ></div>
        </div>
        <div class="p-answerItem__func">
          <b-icon
            :variant="answer.random ? 'success' : 'dark'"
            icon="shuffle"
            @click="isRandom(answer.id)"
          ></b-icon>
          <b-icon
            v-b-modal.modal-1
            icon="pencil-square"
            @click="addValueUpdateAnswer(answer)"
          ></b-icon>

          <b-icon icon="trash" @click="handleDeleteAnswer(answer.id)"></b-icon>
        </div>
      </div>
    </div>

    <div v-if="typeQuestion === 'draggable'">
      <Draggable
        :group-question="groupQuestion"
        :child-question-id="childQuestionId"
        :list-answer="compareListAnswer"
      />
    </div>

    <b-form-invalid-feedback id="error" :state="false">{{
      errors
    }}</b-form-invalid-feedback>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { mapGetters, mapActions } from 'vuex'
import SelectForFillBlank from './SelectForFillBlank.vue'
import Draggable from './Draggable.vue'
import ShortAnswer from './ShortAnswer.vue'
import ShortAnswerInput from './ShortAnswerInput.vue'
import mathType from '@/extensions/mathType'
export default defineComponent({
  components: {
    SelectForFillBlank,
    Draggable,
    ShortAnswer,
    ShortAnswerInput,
  },
  mixins: [mathType],
  props: {
    typeQuestion: {
      type: String,
      required: true,
    },
    groupQuestion: {
      type: Boolean,
      default: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    listChildAnswer: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
    },
    errors: {
      type: String,
      required: true,
    },
    childQuestionId: {
      type: String,
      default: '',
    },
  },
  setup() {
    const data = reactive({
      isSelected: [],
      tempSelected: [],
    })
    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({
      getListAnswer: 'questions/getListAnswer',
      getSelected: 'questions/getSelected',
      getGroupSelected: 'questions/getGroupSelected',
    }),
    compareListAnswer() {
      if (this.groupQuestion) {
        if (
          this.typeQuestion === 'single-choice' ||
          this.typeQuestion === 'right-wrong'
        ) {
          const index = this.listChildAnswer.findIndex(
            (item) => item.rightAnswer === 1
          )
          if (index !== -1) {
            this.handleSelected(this.listChildAnswer[index].id)
          } else {
            this.handleSelected('')
          }

          // this.isSelected = this.listChildAnswer[index].id
        } else if (this.typeQuestion === 'multiple-choice') {
          const selected = []
          this.listChildAnswer.forEach((element) => {
            if (element.rightAnswer === 1) {
              selected.push(element.id)
            }
          })
          this.handleSelected(selected)
        }
        return this.listChildAnswer
      }
      if (
        this.typeQuestion === 'single-choice' ||
        this.typeQuestion === 'right-wrong'
      ) {
        const index = this.getListAnswer.findIndex(
          (item) => item.rightAnswer === 1
        )
        if (index !== -1) {
          this.handleSelected(this.getListAnswer[index].id)
        } else {
          this.handleSelected('')
        }

        // this.isSelected = this.listChildAnswer[index].id
      } else if (this.typeQuestion === 'multiple-choice') {
        const selected = []
        this.getListAnswer.forEach((element) => {
          if (element.rightAnswer === 1) {
            selected.push(element.id)
          }
        })
        this.handleSelected(selected)
      }
      return this.getListAnswer
    },
  },
  // s
  methods: {
    ...mapActions({
      addValueUpdateAnswer: 'questions/addValueUpdateAnswer',
      deleteAnswer: 'questions/deleteAnswer',
      handleUserChooseRightAnswer: 'questions/handleUserChooseRightAnswer',
      handleUserChooseRightAnswerOfChildQuestion:
        'questions/handleUserChooseRightAnswerOfChildQuestion',
      isRandom: 'questions/isRandom',
      deleteAnswerOfChildQuestion: 'questions/deleteAnswerOfChildQuestion',
    }),
    isChange(id) {
      // câu hỏi chùm
      if (this.groupQuestion) {
        if (this.typeQuestion === 'multiple-choice') {
          if (this.isSelected.length > this.tempSelected.length) {
            this.handleUserChooseRightAnswerOfChildQuestion({
              action: 'add',
              questionChildId: this.childQuestionId,
              answerId: id,
            })
          } else {
            this.handleUserChooseRightAnswerOfChildQuestion({
              action: 'remove',
              questionChildId: this.childQuestionId,
              answerId: id,
            })
          }
        } else if (
          this.typeQuestion === 'single-choice' ||
          this.typeQuestion === 'right-wrong'
        ) {
          this.handleUserChooseRightAnswerOfChildQuestion({
            action: 'change',
            questionChildId: this.childQuestionId,
            answerId: id,
          })
        }
        return 0
      }
      // câu hỏi đơn
      if (this.typeQuestion === 'multiple-choice') {
        if (this.isSelected.length > this.tempSelected.length) {
          this.handleUserChooseRightAnswer({ action: 'add', id })
        } else {
          this.handleUserChooseRightAnswer({ action: 'remove', id })
        }
      } else if (
        this.typeQuestion === 'single-choice' ||
        this.typeQuestion === 'right-wrong'
      ) {
        this.handleUserChooseRightAnswer({ action: 'change', id })
      }
    },
    handleDeleteAnswer(id) {
      if (this.childQuestionId !== '') {
        this.deleteAnswerOfChildQuestion({
          questionChildId: this.childQuestionId,
          answerId: id,
        })
      } else {
        this.deleteAnswer(id)
      }
    },
    handleSelected(value) {
      this.isSelected = value
      this.tempSelected = value
    },
  },
})
</script>
<style lang="scss" scoped>
p {
  margin-bottom: 0;
}
.boderMatching {
  border: 1px solid;
}
.action {
  display: flex;
  padding: 5px;
}
.answersList {
  margin: 1rem;
}
.p-answerItem-pairing {
  display: flex;
  flex-direction: column;
  &__top {
    align-self: flex-end;
  }
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
.pairing-answerItem {
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
