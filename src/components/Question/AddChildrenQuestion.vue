<template>
  <div>
    <div :class="$style.addQuestionTitle">
      <p style="font-weight: bold">{{ $t('Câu trả lời (*)') }}</p>
      <b-button class="btn btnQuestion btn-outline-primary">
        <b-dropdown :text="$t('addChildrenQuestion')" class="m-md-2">
          <b-dropdown-item
            v-for="(questions, index) in questionType"
            :key="index"
            v-b-modal.modal-add-child-question
            @click="handleAddQuestion(questions)"
          >
            {{ $t(questions.name) }}
          </b-dropdown-item>
        </b-dropdown>
      </b-button>
    </div>
    <QuestionChild
      :question-child="question"
      modal-id="modal-add-child-question"
    />
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { uuid } from 'vue-uuid'
import { mapActions } from 'vuex'
import QuestionChild from '@/components/Question/QuestionChild'
// import EventBus from '@/plugins/eventBus'
export default defineComponent({
  components: {
    QuestionChild,
  },
  setup() {
    const data = reactive({
      question: {},
      questionType: [
        {
          name: 'Thêm câu hỏi 1 lựa chọn',
          typeQuestion: 'single-choice',
          questionTypeId: 1,
        },
        {
          name: 'Thêm câu hỏi nhiều lựa chọn',
          typeQuestion: 'multiple-choice',
          questionTypeId: 2,
        },
        {
          name: 'Thêm câu hỏi đúng sai',
          typeQuestion: 'right-wrong',
          questionTypeId: 3,
        },
        {
          name: 'Thêm câu hỏi ghép đôi',
          typeQuestion: 'pairing',
          questionTypeId: 4,
        },
        {
          name: 'Thêm câu hỏi điền vào chổ trống',
          typeQuestion: 'fill-blank',
          questionTypeId: 5,
        },
        {
          name: 'Thêm câu hỏi trả lời ngắn',
          typeQuestion: 'short-answer',
          questionTypeId: 6,
        },

        {
          name: 'Thêm câu hỏi Sắp xếp thứ tự',
          typeQuestion: 'draggable',
          questionTypeId: 7,
        },
      ],
    })

    return {
      ...toRefs(data),
    }
  },
  methods: {
    ...mapActions({
      addChildQuestion: 'questions/addChildQuestion',
    }),
    handleAddQuestion(value) {
      const data = {
        id: uuid.v4(),
        typeQuestion: value.typeQuestion,
        name: value.name,
        question: {
          hashId: '',
          questionTypeId: value.questionTypeId,
          questionContent: '',
          levelId: 1,
          plainText: '',
          seoAvatar: 'https://placeimg.com/640/480/any',
          groupOrder: 1,
        },
        answers: [],
      }
      this.question = data
      this.addChildQuestion(data)
    },
  },
})
</script>
<style lang="scss" module>
.addQuestionTitle {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  z-index: 100;
  position: relative;
}
</style>

<style lang="scss" scoped>
::v-deep .modal-body {
  padding-bottom: 50px;
}

.btnQuestion--close {
  margin-left: 20px;
  width: auto;
}
</style>
