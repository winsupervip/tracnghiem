<template>
  <div>
    <draggable
      v-model="list"
      class="list-group"
      tag="ul"
      v-bind="dragOptions"
      :move="onMove"
    >
      <transition-group type="transition" :name="'flip-list'">
        <div
          v-for="(answer, index) in list"
          :key="answer.id"
          class="p-answerItem list-group-item"
        >
          <div class="p-answerItem">
            <i
              :class="
                answer.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
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
              @click="addValueUpdateAnswer(answer.id)"
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
  data() {
    return {
      list: [],
    }
  },
  computed: {
    ...mapGetters(['getListAnswer', 'getUpdateValueAnswer']),

    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        ghostClass: 'ghost',
      }
    },
  },
  watch: {
    getListAnswer() {
      // console.log('answer', this.answers)
      // const l = this.answers.length
      // if (l > this.list.length) {
      //   const answer = this.answers[l - 1]
      //   answer.fixed = false
      //   // this.list.push(answer)
      // }
      this.list = this.getListAnswer
    },
  },
  created() {
    const data = this.getListAnswer.map((item) => {
      item.fixed = false
      return item
    })
    console.log(data)
    this.list = data
  },
  methods: {
    ...mapActions(['addValueUpdateAnswer', 'deleteAnswer']),
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order
      })
    },
    onMove({ relatedContext, draggedContext }) {
      console.log(relatedContext, draggedContext)
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
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
  box-shadow: 0 4px 15px rgba(#4764c3, 0.1);
  transition: all 0.2s;

  transition: all 0.2s;
  border-radius: 0.5rem;
  border-radius: 0.5rem;
  &:hover {
    box-shadow: 0 4px 20px rgba(#4764c3, 0.2);
  }
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
