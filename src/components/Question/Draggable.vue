<template>
  <div>
    <draggable
      v-model="list"
      class="list-group"
      tag="ul"
      v-bind="dragOptions"
      @end="onEndMove"
    >
      <transition-group type="transition" :name="'flip-list'">
        <div
          v-for="(answer, index) in list"
          :key="answer.id ? answer.id : index"
          class="p-answerItem list-group-item"
        >
          <div class="p-answerItem">
            <i
              :class="'glyphicon glyphicon-pushpin'"
              aria-hidden="true"
              @click="answer.fixed = !answer.fixed"
              v-html="answer.answerContent"
            ></i>
            <span class="badge">{{ index }}</span>
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
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
// const message = ['vue.draggable', 'draggable']
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Hello',
  components: {
    draggable,
  },
  props: {
    groupQuestion: {
      type: Boolean,
      default: false,
    },
    childQuestionId: {
      type: String,
      default: '',
    },
    listAnswer: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      list: this.listAnswer,
    }
  },
  computed: {
    ...mapGetters({
      getListAnswer: 'questions/getListAnswer',
      getUpdateValueAnswer: 'questions/getUpdateValueAnswer',
    }),

    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        ghostClass: 'ghost',
      }
    },
  },
  watch: {
    listAnswer() {
      console.log(this.listAnswer)
      if (
        this.listAnswer.length > this.list.length ||
        this.listAnswer.length < this.list.length
      ) {
        this.list = this.listAnswer
      }
    },
  },
  methods: {
    ...mapActions({
      addValueUpdateAnswer: 'questions/addValueUpdateAnswer',
      deleteAnswer: 'questions/deleteAnswer',
      handleUpdateDraggableAnswer: 'questions/handleUpdateDraggableAnswer',
      handleUpdateDraggableAnswerForGroupQuestion:
        'questions/handleUpdateDraggableAnswerForGroupQuestion',
      deleteAnswerOfChildQuestion: 'questions/deleteAnswerOfChildQuestion',
    }),

    // onMove({ relatedContext, draggedContext }) {
    //   const relatedElement = relatedContext.element
    //   const draggedElement = draggedContext.element8
    //   return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    // },
    handleDelate(id) {
      if (this.groupQuestion) {
        this.deleteAnswerOfChildQuestion({
          questionChildId: this.childQuestionId,
          answerId: id,
        })
      } else {
        this.deleteAnswer(id)
      }
    },
    onEndMove({ newDraggableIndex, oldDraggableIndex }) {
      if (newDraggableIndex !== oldDraggableIndex) {
        if (this.groupQuestion) {
          console.log('aa343434')
          this.handleUpdateDraggableAnswerForGroupQuestion({
            questionId: this.childQuestionId,
            answers: this.list,
          })
        } else {
          this.handleUpdateDraggableAnswer(this.list)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
  margin-top: 1rem;
}

.list-group-item i {
  cursor: pointer;
}

.p-answerItem {
  display: flex;
  justify-content: space-between;
  // box-shadow: 0 4px 15px rgba(#4764c3, 0.1);
  transition: all 0.2s;

  transition: all 0.2s;
  border-radius: 0.5rem;
  border-radius: 0.5rem;

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
