<template>
  <div class="answersList">
    <b-form-group
      v-if="typeQuestion === 'single-choice' || typeQuestion === 'right-wrong'"
      v-slot="{ ariaDescribedby }"
    >
      <div
        v-for="(answer, index) in getListChildrenAnswer"
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
            <div class="p-answerItem__content" v-html="answer.question"></div>
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
          v-for="(answer, index) in getListChildrenAnswer"
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
        v-for="(answer, index) in getListChildrenAnswer"
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
        v-for="(answer, index) in getListChildrenAnswer"
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

    <div v-if="typeQuestion === 'fill-blank'">
      <div
        v-for="(answer, index) in getListChildrenAnswer"
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
    <b-alert v-if="errors[5]" id="error" show variant="warning">{{
      errors[5]
    }}</b-alert>
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
    Draggable,
    Pairing,
  },
  props: {
    typeQuestion: {
      type: String,
      required: true,
    },
  },
  setup() {
    const data = reactive({
      isSelected: [],
      answers: [],
      listAnswersIsChange: false,
    })
    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters(['getListChildrenAnswer', 'getSelected']),
  },
  watch: {
    getSelected() {
      this.isSelected = this.getSelected
    },
  },
  onMouted() {
    this.answers = this.getListChildrenAnswer
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
