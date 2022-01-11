<template>
  <div class="page-container position-relative">
    <section
      :class="`
        page-heading
        exam-page-heading
        bg-gradient-blue
        position-relative
        ${expandHeading ? 'expand' : ''}
      `"
    >
      <b-btn
        variant="primary"
        size="sm"
        class="button-expand-heading"
        @click="expandHeading = !expandHeading"
      >
        <i
          :class="`
            me-2
            ${expandHeading ? 'icon-expand' : 'icon-minimize'}
          `"
        />
        {{ expandHeading ? 'Mở rộng' : 'Thu gọn' }}
      </b-btn>
      <div class="page-heading-inner">
        <b-container class="position-relative">
          <b-row>
            <b-col md="12">
              <Heading
                :data-exam="dataExam"
                :selected-bookmark="selectedBookmark"
                :breadcrumbs="breadcrumbs"
              />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </section>
    <section class="exam-main-container">
      <b-container>
        <b-row>
          <b-col md="12" lg="4" xl="4" class="do-exam-wrapper">
            <div class="card do-exam-box">
              <div class="text-green do-exam-timer mb-4">
                <i class="icon-clock" />
                <strong>{{ timeRemaining }}</strong>
              </div>
              <div class="list-type-question">
                <ul class="list-unstyled">
                  <li>
                    <div class="type"></div>
                    <span>Chưa xem</span>
                  </li>
                  <li>
                    <div class="type tick"></div>
                    <span>Đánh dấu</span>
                  </li>
                  <li>
                    <div class="type answered"></div>
                    <span>Đã trả lời</span>
                  </li>
                  <li>
                    <div class="type not-answered"></div>
                    <span>Chưa trả lời</span>
                  </li>
                </ul>
              </div>
              <div class="text-gray font-sm my-2">
                <b-icon icon="exclamation-circle" />
                Bấm vào ô số để xem câu hỏi
              </div>
              <hr />
              <div class="filter-group mb-2">
                <strong
                  :class="
                    showListQuestionMenu
                      ? 'filter-group-header'
                      : 'filter-group-header collapsed'
                  "
                  @click="showListQuestionMenu = !showListQuestionMenu"
                >
                  Danh sách câu hỏi
                  <i class="icon-caret-down"></i>
                </strong>
                <b-collapse
                  v-model="showListQuestionMenu"
                  class="filter-group-body"
                >
                  <div class="list-question-menu">
                    <template v-for="(item, index) in itemQuestions">
                      <b-btn
                        :key="`question${item.id}`"
                        v-model="indexQuestionChoose"
                        :class="getColorOfQuestion(item)"
                        @click="chooseQuestion(item.id, index)"
                        >{{ index + 1 }}</b-btn
                      >
                    </template>
                  </div>
                </b-collapse>
              </div>
              <div class="submit-exam d-grid">
                <b-btn
                  variant="primary"
                  block
                  @click="$bvModal.show('modal-submit-exam')"
                  >Nộp bài</b-btn
                >
              </div>
            </div>
          </b-col>
          <b-col md="12" lg="8" xl="8" class="exam-main-content">
            <b-card
              class="card-question"
              header-tag="header"
              footer-tag="footer"
            >
              <template #header>
                <div
                  class="d-flex justify-content-between card-question-header"
                >
                  <div class="font-bold">Câu {{ indexQuestionChoose }}</div>
                  <b-form-checkbox
                    id="checkbox-bookmark"
                    v-model="questionItem.flag"
                    name="checkbox-bookmark"
                    @change="setFlag()"
                  >
                    Đánh dấu
                  </b-form-checkbox>
                </div>
              </template>
              <div class="list-question mb-4">
                <ViewQuestion
                  :question="questionItem"
                  :user-answer="userAnswer"
                />
              </div>
              <template #footer>
                <b-overlay
                  :show="busy"
                  rounded
                  opacity="0.6"
                  spinner-small
                  spinner-variant="primary"
                  class="d-inline-block"
                >
                  <b-btn
                    v-if="examSettings.showRightAnswerAfterSubmit"
                    variant="outline"
                    @click="getRightAnswer(questionItem.id)"
                  >
                    Xem đáp án
                  </b-btn>
                </b-overlay>
                <b-overlay
                  :show="busy"
                  rounded
                  opacity="0.6"
                  spinner-small
                  spinner-variant="primary"
                  class="d-inline-block"
                >
                  <b-btn variant="outline" @click="prevQuestion()">
                    <i class="icon-arrow-left me-2"></i>
                    Câu trước
                  </b-btn>
                </b-overlay>
                <b-overlay
                  :show="busy"
                  rounded
                  opacity="0.6"
                  spinner-small
                  spinner-variant="primary"
                  class="d-inline-block"
                >
                  <b-btn variant="primary" @click="nextQuestion()">
                    Câu sau
                    <i class="icon-arrow-right ms-2"></i>
                  </b-btn>
                </b-overlay>
              </template>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <b-modal id="modal-submit-exam" class="modal-common" hide-footer centered>
      <div class="text-center mb-4">
        <img class="mb-3" src="/images/document.svg" alt="bot" />
        <div class="font-bold text-lmd mb-3">Xác nhận nộp bài</div>
        <p>Bạn đã hoàn thành hết bài thi và muốn nộp bài</p>
      </div>
      <div class="modal-footer-common d-flex justify-content-center">
        <b-btn variant="outline" class="me-3" @click="hide()">Quay lại</b-btn>
        <b-overlay
          :show="busy"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
          class="d-inline-block"
        >
          <b-btn variant="primary" @click="SubmitExam()">Nộp bài</b-btn>
        </b-overlay>
      </div>
    </b-modal>
    <b-modal id="modal-show-answer" class="modal-common" hide-footer size="lg">
      <ResultQuestion
        v-if="questionRightAns"
        :question="questionRightAns"
        :settings="examSettings"
        :hide-button="true"
      />
    </b-modal>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  reactive,
  toRefs,
  useRoute,
  useRouter,
  computed,
  useAsync,
  useMeta,
} from '@nuxtjs/composition-api'
// import ExamApi from '@/api/examApi'
import QuizApi from '@/api/quizApi'
import ViewQuestion from '@/components/Question/Display/ViewQuestion.vue'
import ResultQuestion from '@/components/Quiz/Result/ResultQuestion.vue'
import ApiHome from '@/api/apiHome'
import Heading from '@/components/Quiz/Heading.vue'
export default defineComponent({
  components: {
    ViewQuestion,
    ResultQuestion,
    Heading,
  },
  layout: 'default',
  auth: false,
  setup() {
    const { $loader, error } = useContext()
    const { title, meta } = useMeta()
    const route = useRoute()
    const router = useRouter()
    const quizId = computed(() => route.value.query.quizId)
    const idExam = computed(() => route.value.query.id)
    const data = reactive({
      idExam: '',
      breadcrumbs: [],
      showListQuestionMenu: true,
      bookmarkQuestion: false,
      listAnswer: [],
      expandHeading: true,
      selectedBookmark: [],
      optionsBookmark: [
        { text: 'Yêu thích', value: 1 },
        { text: 'Đề vật lý', value: 2 },
      ],
      dataExam: {
        exam: {},
        tagItems: [],
        categoryTree: [],
      },
      itemQuestions: [],
      questionItem: {},
      userAnswer: {
        questionId: null,
        userChoices: [],
      },
      indexQuestionChoose: null,
      quizId: null,
      examSettings: {},
      timeRemaining: '00:00:00',
      timer: null,
      questionRightAns: null,
      busy: false,
    })

    data.idExam = idExam.value
    data.quizId = quizId.value

    const clearClock = () => {
      if (data.timer) {
        console.log('clear Clock')
        clearInterval(data.timer)
        data.timer = null
      }
    }
    const SubmitExam = async () => {
      data.busy = true
      await QuizApi.submitQuiz(data.quizId)
      router.push({
        path: `/ket-qua/${data.dataExam.exam.slug}-${data.idExam}?quizId=${data.quizId}`,
      })
      data.busy = false
    }
    const createClock = (time) => {
      clearClock()
      const countDownDate = new Date().getTime() + Number(time * 1000)
      data.timer = setInterval(function () {
        // Get today's date and time
        const now = new Date().getTime()

        // Find the distance between now and the count down date
        const distance = countDownDate - now

        // Time calculations for days, hours, minutes and seconds
        // const days =
        //   Math.floor(distance / (1000 * 60 * 60 * 24)) > 10
        //     ? Math.floor(distance / (1000 * 60 * 60 * 24))
        //     : '0' + Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours =
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) > 9
            ? Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            : '0' +
              Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes =
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) > 9
            ? Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            : '0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds =
          Math.floor((distance % (1000 * 60)) / 1000) > 9
            ? Math.floor((distance % (1000 * 60)) / 1000)
            : '0' + Math.floor((distance % (1000 * 60)) / 1000)

        // Output the result in an element with id="demo"
        data.timeRemaining = hours + ':' + minutes + ':' + seconds
        // If the count down is over, write some text
        if (distance < 0) {
          clearClock()
          data.timeRemaining = 'HẾT GIỜ'
          SubmitExam()
        }
      }, 1000)
    }

    useAsync(async () => {
      $loader()
      try {
        // check exam
        const { data: getExamDetail } = await ApiHome.getExamDetail(data.idExam)
        data.dataExam = getExamDetail.object
        console.log(data.dataExam)
        // seo
        title.value = 'Đang thực hiện ' + data.dataExam.exam.seoTitle
        meta.value.push({
          hid: 'description',
          name: 'description',
          content: 'Đang thực hiện ' + data.dataExam.exam.seoDescription,
        })
        // get slug
        const slugCate = data.dataExam.exam.category.slug
        // breadcrumbs
        const { data: breadcrumdItems } = await ApiHome.getCategoryBreadcrumd(
          slugCate
        )
        data.breadcrumbs = []
        data.breadcrumbs.push({
          text: 'Trang chủ',
          href: '/',
        })
        breadcrumdItems.object.items.forEach((element) => {
          data.breadcrumbs.push({
            text: element.categoryName,
            href: element.slug,
          })
        })
        data.breadcrumbs.push({
          text: data.dataExam.exam.title,
          href: '/' + data.dataExam.exam.slug + '-' + data.dataExam.exam.hashId,
        })
        data.breadcrumbs.push({
          text: 'Thực hiện',
          href: `/thuc-hien/?id=${data.idExam}&quizId=${data.quizId}`,
          active: true,
        })

        // get quiz data
        const [{ data: response }, { data: quizSettingRes }] =
          await Promise.all([
            QuizApi.getQuestionsBeforeSubmit(quizId.value),
            QuizApi.getQuizInfo(quizId.value),
          ])
        data.examSettings = quizSettingRes.object
        data.itemQuestions = response.object.items
        if (data.itemQuestions.length > 0) {
          data.indexQuestionChoose = 1
          const { data: questionItem } = await QuizApi.getQuestionById(
            data.itemQuestions[0].id
          )
          data.itemQuestions[0].status = 1
          data.questionItem = questionItem.object
          data.userAnswer.questionId = data.questionItem.id
        }

        createClock(data.examSettings.timeRemainingInSeconds)
      } catch (err) {
        console.log(err)
        // exam không tồn tại
        error({ statusCode: 404, message: 'Post not found' })
      }
      $loader().close()
    })
    return {
      ...toRefs(data),
      clearClock,
      SubmitExam,
    }
  },
  head: {},
  created() {},
  mounted() {},
  beforeDestroy() {
    this.clearClock()
  },
  methods: {
    hide() {
      this.$bvModal.hide('modal-submit-exam')
    },
    async chooseQuestion(id, index) {
      this.busy = true
      await this.submitQuestion(this.questionItem.id)
      this.userAnswer = {
        questionId: null,
        userChoices: [],
      }
      await this.getQuestionById(id, index)
      this.busy = false
    },
    async getQuestionById(id, index) {
      this.indexQuestionChoose = index + 1
      const { data: questionItem } = await QuizApi.getQuestionById(id)
      this.questionItem = questionItem.object
      // update status question
      if (this.questionItem.status === 0) {
        this.itemQuestions[index].status = 1
      }
    },
    async submitQuestion(questionId) {
      if (this.userAnswer.userChoices.length > 0) {
        this.userAnswer.questionId = questionId
        try {
          await QuizApi.submitQuestion(this.userAnswer)
          // update status question
          const question = this.itemQuestions.filter((x) => x.id === questionId)
          if (question) {
            question[0].status = 2
          }
        } catch (err) {
          this.$handleError(err, () => {
            console.log(err)
          })
        }
      }
    },
    nextQuestion() {
      let currentIndex = this.indexQuestionChoose - 1
      const total = this.itemQuestions.length
      if (currentIndex < total - 1) {
        currentIndex++
      } else {
        currentIndex = 0
      }
      this.chooseQuestion(this.itemQuestions[currentIndex].id, currentIndex)
    },
    prevQuestion() {
      let currentIndex = this.indexQuestionChoose - 1
      const total = this.itemQuestions.length
      if (currentIndex > 0) {
        currentIndex--
      } else {
        currentIndex = total - 1
      }
      this.chooseQuestion(this.itemQuestions[currentIndex].id, currentIndex)
    },
    async setFlag() {
      const currentIndex = this.indexQuestionChoose - 1
      const questionId = this.itemQuestions[currentIndex].id
      try {
        await QuizApi.flagQuestion(questionId)
        this.itemQuestions[currentIndex].flag =
          !this.itemQuestions[currentIndex].flag
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    getColorOfQuestion(questionItem) {
      if (questionItem.flag) {
        return 'tick'
      }
      if (questionItem.status === 2) {
        return 'answered'
      }
      if (questionItem.status === 0) {
        return ''
      }
      return 'not-answered'
    },
    async getRightAnswer(questionId) {
      this.busy = true
      try {
        const { data } = await QuizApi.showRightAnswer(questionId)
        this.questionRightAns = data.object
        await this.$bvModal.show('modal-show-answer')
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
      this.busy = false
    },
  },
})
</script>
