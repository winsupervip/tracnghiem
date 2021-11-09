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
          @change="isChange(answer.id)"
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
          <b-form-checkbox :value="answer.id" @change="isChange(answer.id)"
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
          <Pairing :answer="answer" />
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
      <div v-for="(answer, index) in answers" :key="index" class="p-answerItem">
        <Pairing :answer="answer" />
        <div class="p-answerItem__func">
          <b-icon
            v-b-modal.modal-1
            icon="pencil-square"
            @click="updateAnswer(answer.id)"
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

    <b-form-invalid-feedback id="error" :state="false">{{
      errors
    }}</b-form-invalid-feedback>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { mapGetters, mapActions } from 'vuex'
import EventBus from '../../plugins/eventBus'
import SelectForFillBlank from './SelectForFillBlank.vue'
import Draggable from './Draggable.vue'
import Pairing from './Pairing.vue'
export default defineComponent({
  components: {
    SelectForFillBlank,
    Pairing,
    Draggable,
  },
  props: {
    typeQuestion: {
      type: String,
      required: true,
    },
    errors: {
      type: String,
      required: true,
    },
  },
  setup() {
    const data = reactive({
      isSelected: [],
      answers: [],
    })
    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters({
      getListAnswer: 'questions/getListAnswer',
      getSelected: 'questions/getSelected',
    }),
  },
  watch: {
    getSelected() {
      this.$logger.debug('chạy')
      this.isSelected = this.getSelected
    },
    // isSelected(newValue, oldValue) {
    //   for (let i = 0; i < newValue.length; i++) {
    //     if (newValue[i] && oldValue[i] && newValue[i] === oldValue[i]) {
    //       console.log('khong thay doi')
    //     } else {
    //       console.log('có thay đổi')
    //     }
    //   }
    //   console.log(newValue, oldValue)
    //   // this.handleUserChooseRightAnswer(this.isSelected)
    // },
    getListAnswer() {
      this.$logger.debug(this.getListAnswer)
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
      this.$logger.debug('item', item)
      this.$logger.debug('an', that.answers)
      const answer = that.answers[item.index]
      answer.answerContent = item.answerContent
      answer.random = item.isRandom
      answer.plainText = item.answerContent
      answer.rightAnswer = item.isRightAnswer
    })
  },
  methods: {
    ...mapActions({
      addValueUpdateAnswer: 'questions/addValueUpdateAnswer',
      deleteAnswer: 'questions/deleteAnswer',
      handleUserChooseRightAnswer: 'questions/handleUserChooseRightAnswer',
    }),
    isChange(id) {
      this.$logger.debug(id)
      if (this.typeQuestion === 'multiple-choice') {
        if (this.isSelected.length > this.getSelected.length) {
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
