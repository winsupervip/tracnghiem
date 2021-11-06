<template>
  <div class="p-question p-question--singleChoice">
    <div class="p-question__left">
      <Header :question-title="questionTitle" :errors="errors" />
      <AddAnswer
        :errors="errors"
        :type-question="questionType"
        :have-random-answer="haveRandomAnswer"
        :have-right-answer="haveRightAnswer"
        :is-pairing="isPairing"
      />

      <ListAnswer :type-question="questionType" :errors="errors" />
      <CommentOrNote />
    </div>
    <div class="p-question__right">
      <PublishQuestion :errors="errors" :on-submit="onSubmit" />
      <Category :errors="errors" />
      <LevelForm :errors="errors" />
      <!-- <UploadImage :get-image="getImage" /> -->
      <Uploader :accept="'*/*'" :disabled="false"></Uploader>
      <AddSeo :errors="errors" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { mapGetters, mapActions } from 'vuex'
import PublishQuestion from './PublishQuestion.vue'
import LevelForm from './LevelForm.vue'
import Category from './Category.vue'
import Header from './Header.vue'
import ListAnswer from './ListAnswers.vue'
import UploadImage from './UploadImage.vue'
import AddSeo from './AddSeo.vue'
import CommentOrNote from './CommentOrNote.vue'
import AddAnswer from './AddAnswer.vue'
import CauHoiApi from '@/api/cauHoi'
// eslint-disable-next-line import/no-unresolved
import Uploader from '@/components/Uploader'
export default defineComponent({
  components: {
    Header,
    PublishQuestion,
    LevelForm,
    Category,
    ListAnswer,
    // eslint-disable-next-line vue/no-unused-components
    UploadImage,
    AddSeo,
    CommentOrNote,
    Uploader,
    AddAnswer,
  },

  props: {
    questionType: {
      type: String,
      required: true,
    },
    questionTypeId: {
      type: String,
      required: true,
    },
    questionTitle: {
      type: String,
      required: true,
    },
    haveRightAnswer: {
      type: Boolean,
      default: true,
    },
    haveRandomAnswer: {
      type: Boolean,
      default: true,
    },
    isPairing: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const data = reactive({
      errors: {
        answers: [],
      },
    })

    return {
      ...toRefs(data),
    }
  },
  computed: {
    ...mapGetters(['getQuestion']),
  },
  methods: {
    ...mapActions(['restAnswer']),

    isValid(data) {
      let count = 0
      this.errors = {
        answers: [],
      }
      console.log(data.answers)
      let validdateAnswers = []
      let valid = true
      if (data.question.title === '') {
        this.errors.title = 'Tiêu đề là bắt buộc'
        valid = false
      }
      // 1

      if (data.question.questionContent === '') {
        this.errors.questionContent = 'Bạn phải nhập vào nội dung câu hỏi'
        valid = false
      }
      // 2

      if (data.question.tags.length === 0) {
        this.errors.tags = 'Bạn phải gán ít nhất 1 tag cho câu hỏi'
        valid = false
      }
      // 3

      if (!data.question.levelId) {
        this.errors.level = 'Bạn phải chọn level cho câu hỏi'
        valid = false
      }
      // 4

      if (data.question.categories.length === 0) {
        this.errors.categories = 'Bạn phải chọn 1 danh mục cho câu hỏi'
        valid = false
      }
      // 5

      if (!data.question.statusId) {
        this.errors.statusId = 'Bạn có muốn xuất bản câu hỏi'
        valid = false
      }
      if (data.question.seoTitle === '') {
        this.errors.seoTitle = 'Bạn phải cài đặt Seo'
        // eslint-disable-next-line no-unused-vars
        valid = false
      }
      console.log(this.errors)
      if (data.answers.length < 2) {
        if (this.questionType === 'short-answer') {
          this.errors.answers.push(
            'Loại câu hỏi này phải có ít nhất 1 câu trả lời'
          )
        } else {
          this.errors.answers.push(
            'Loại câu hỏi này phải có từ 2 câu trả lời trở lên'
          )
        }

        valid = false
      }
      if (
        this.questionType === 'single-choice' ||
        this.questionType === 'right-wrong'
      ) {
        validdateAnswers = data.answers.map((item) => {
          delete item.id
          if (item.rightAnswer === 1) {
            count += 1
          }
          return item
        })
        if (count > 1) {
          this.errors.answers.push('Loại câu hoi này chỉ có 1 đáp án đúng')
          valid = false
        } else if (count < 1) {
          this.errors.answers.push('Bạn phỉa chọn 1 câu trả lời đúng')
          valid = false
        }
      } else if (this.questionType === 'multiple-choice') {
        validdateAnswers = data.answers.map((item) => {
          delete item.id
          if (item.rightAnswer === 1) {
            count += 1
          }
          return item
        })
        if (count === 0) {
          this.errors.answers.push('Bạn phỉa chọn 1 câu trả lời')
          valid = false
        }
      } else if (this.questionType === 'short-answer') {
        validdateAnswers = data.answers.map((item) => {
          delete item.id
          return item
        })
      } else if (this.questionType === 'fill-blank') {
        let sumRight = 0
        const checkSum = (data.answers.length + 1) * (data.answers.length / 2)
        validdateAnswers = data.answers.map((item) => {
          delete item.id
          sumRight += item.rightAnswer
          return item
        })
        if (sumRight !== checkSum) {
          this.errors.answers.push('Ví trí điền đang bị trùng')
          valid = false
        }
      } else if (this.questionType === 'draggable') {
        validdateAnswers = data.answers.map((item, index) => {
          delete item.id
          item.rightAnswer = index + 1
          return item
        })
      } else if (this.questionType === 'pairing') {
        data.answers.forEach((element) => {
          console.log(element?.left?.answerContent.length > 0)
          if (element?.id) {
            delete element.id
          }
          if (element?.left?.answerContent.length > 0) {
            const left = element?.left
            delete left.id
            validdateAnswers.push(left)
          }
          if (element?.right?.answerContent.length > 0) {
            const right = element?.right
            delete right.id
            validdateAnswers.push(right)
          }
        })
      }
      console.log('validdateAnswers', validdateAnswers)
      data.answers = validdateAnswers
      return { valid, data }
    },
    onSubmit() {
      console.log(this.getQuestion)
      const getData = this.getQuestion
      const getValid = this.isValid(getData)
      console.log('valid', getValid)
      if (getValid.valid) {
        const data = getValid.data
        console.log('í dâttr', data)
        data.question.questionTypeId = parseInt(this.questionTypeId)
        CauHoiApi.createQuestion(
          data,
          () => {
            this.restAnswer()
            this.$toast.show('Thêm Thành Công').goAway(1500)
          },
          () => {
            this.$toast.show('Có lỗi xảy ra').goAway(1500)
          }
        )
      }
    },
  },
})
</script>
