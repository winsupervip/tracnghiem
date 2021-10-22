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
            ><b-icon icon="shuffle"></b-icon
          ></b-button>
          <b-button
            v-b-modal.modal-prevent-closing
            variant="outline-warning"
            @click="handleUpdate(index)"
            ><b-icon icon="pencil-square"></b-icon
          ></b-button>
          <b-button variant="outline-danger" @click="handleDelete(index)"
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
          <div>
            <b-button variant="outline-warning"
              ><b-icon icon="shuffle"></b-icon
            ></b-button>
            <!-- <b-button
              v-b-modal.modal-prevent-closing
              variant="outline-warning"
              @click="getAnswerItem(index)"
              ><b-icon icon="pencil-square"></b-icon
            ></b-button> -->
            <b-button variant="outline-warning"
              ><b-icon icon="pencil-square"></b-icon
            ></b-button>
            <b-button variant="outline-danger" @click="handleDelete(index)"
              ><b-icon icon="trash"></b-icon
            ></b-button>
          </div>
        </div>
      </b-form-checkbox-group>
    </b-form-group>
    <!-- <b-modal id="modal-prevent-closing" ref="modal" title="Chỉnh sửa câu hỏi">
      <form ref="form">
        <b-form-group
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="dataUpdate"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal> -->
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
    handleDelete: {
      type: Function,
      required: true,
    },
    answerItem: {
      type: Object,
      required: true,
    },
    getAnswerItem: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { $logger } = useContext()
    const data = reactive({
      isSelected: props.selected,
      dataUpdate: props.getAnswerItem.answerContent,
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
