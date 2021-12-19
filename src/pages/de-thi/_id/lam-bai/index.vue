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
            <b-col md="12" lg="12">
              <b-breadcrumb :items="breadcrumbs" class="mb-2"></b-breadcrumb>
              <div class="page-heading-title mb-2">
                <h1 class="page-title">
                  {{ dataExam.name }}
                </h1>
                <span
                  :class="
                    dataExam.level === 1
                      ? 'badge rounded-full bg-green exam-level'
                      : 'badge rounded-full bg-primary exam-level'
                  "
                  >{{ dataExam.level === 1 ? 'Cơ bản' : 'Nâng cao' }}
                </span>
              </div>
              <div class="page-heading-description mb-3">
                {{ dataExam.description }}
              </div>
              <div class="exam-teacher-row row align-items-center mb-3">
                <b-col cols="12" sm="12" md="4">
                  <div class="card-exam-teacher">
                    <nuxt-link
                      :to="`/giao-vien/${dataExam.teacherId}`"
                      class="text-white"
                    >
                      <img
                        class="
                          avatar avatar-md
                          border-2 border-white border-solid
                          me-2
                        "
                        :src="dataExam.teacherAvatar"
                        :alt="dataExam.teacherName"
                      />
                      <span>{{ dataExam.teacherName }}</span>
                    </nuxt-link>
                  </div>
                </b-col>
                <b-col cols="12" sm="12" md="4">
                  <div class="d-flex">
                    <b-form-rating
                      v-model="dataExam.rating"
                      class="custom-rating"
                      readonly
                    />
                    <div class="mx-2">
                      <strong>{{ dataExam.rating }}</strong>
                      <span>({{ dataExam.ratingCount }})</span>
                    </div>
                  </div>
                </b-col>
                <b-col cols="12" sm="12" md="4">
                  <div class="exam-category">
                    {{ dataExam.category }}
                  </div>
                </b-col>
              </div>
              <div class="toolbar-action-exam">
                <div class="action-exam">
                  <b-btn
                    variant="outline-light"
                    class="btn-outline-white font-smd btn-action"
                  >
                    <i class="icon-heart me-3"></i>
                    Yêu thích
                  </b-btn>
                  <b-dropdown
                    variant="outline-light"
                    no-caret
                    class="dropdown-save"
                  >
                    <template #button-content>
                      <i class="icon-bookmark me-3"></i>
                      Lưu
                    </template>
                    <b-dropdown-form class="">
                      <b-form-checkbox-group
                        v-model="selectedBookmark"
                        :options="optionsBookmark"
                        value-field="value"
                        text-field="text"
                      ></b-form-checkbox-group>
                      <div class="add-bookmark-input">
                        <b-input />
                        <b-btn variant="primary" class="btn-circle">
                          <b-icon icon="plus" class="text-white" />
                        </b-btn>
                      </div>
                    </b-dropdown-form>
                  </b-dropdown>
                  <b-btn
                    variant="outline-light"
                    class="btn-outline-white font-smd btn-action"
                  >
                    <i class="icon-share me-3"></i>
                    Chia sẻ
                  </b-btn>
                </div>
                <div class="exam-report">
                  <b-btn class="btn-transparent font-smd btn-text">
                    <i class="icon-flag"></i> Báo cáo
                  </b-btn>
                </div>
              </div>
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
                <b-btn
                  v-if="examSettings.showRightAnswerAfterSubmit"
                  variant="outline"
                  @click="getRightAnswer(questionItem.id)"
                >
                  Xem đáp án
                </b-btn>
                <b-btn variant="outline" @click="prevQuestion()">
                  <i class="icon-arrow-left me-2"></i>
                  Câu trước
                </b-btn>
                <b-btn variant="primary" @click="nextQuestion()">
                  Câu sau
                  <i class="icon-arrow-right ms-2"></i>
                </b-btn>
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
        <b-btn variant="primary" @click="SubmitExam()">Nộp bài</b-btn>
      </div>
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
} from '@nuxtjs/composition-api'
// import ExamApi from '@/api/examApi'
import QuizApi from '@/api/quizApi'
import ViewQuestion from '@/components/Question/Display/ViewQuestion.vue'
export default defineComponent({
  components: {
    ViewQuestion,
  },
  layout: 'default',
  auth: false,
  setup() {
    const { $handleError, $loader, $logger } = useContext()

    const route = useRoute()
    const router = useRouter()
    const quizId = computed(() => route.value.query.quizId)
    console.log('quizId', quizId.value)

    const data = reactive({
      idExam: null,
      breadcrumbs: [
        {
          text: 'Trang chủ',
          href: '/',
        },
        {
          text: 'Đề thi',
          href: '/de-thi',
        },
        {
          text: 'Thi Tốt nghiệp THPT',
          href: '/de-thi/tot-nghiep-thpt',
        },
        {
          text: '400 câu trắc nghiệm Mạo từ trong tiếng Anh có đáp án cực hay',
          active: true,
        },
      ],
      showListQuestionMenu: true,
      bookmarkQuestion: false,
      listAnswer: [],
      expandHeading: false,
      selectedBookmark: [],
      optionsBookmark: [
        { text: 'Yêu thích', value: 1 },
        { text: 'Đề vật lý', value: 2 },
      ],
      dataExam: {
        id: 1,
        name: '400 câu trắc nghiệm Mạo từ trong tiếng Anh có đáp án cực hay',
        description:
          'English speaking course. 77 Hours of English language speaking, English listening practice. 1000 English language words',
        thumbnail: '/images/exam-1.jpg',
        category: 'Thi tốt nghiệp THPT',
        time: '45',
        examCount: '100',
        questionCount: '90',
        teacherId: 1,
        teacherAvatar: '/images/teacher.png',
        teacherName: 'Cô giáo Minh Thu',
        rating: '4.5',
        ratingCount: 20,
        level: 1,
        tags: [
          {
            id: 1,
            name: 'Vật lý 12',
          },
          {
            id: 2,
            name: 'Luyện thi đại học',
          },
          {
            id: 3,
            name: 'Vật lý nâng cao',
          },
        ],
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
    })
    const idExam = computed(() => route.value.params.id)
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
      await QuizApi.submitQuiz(data.quizId)
      router.push({
        path: `/de-thi/${data.idExam}/ket-qua?quizId=${data.quizId}`,
      })
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
        $handleError(err, () => {
          $logger.info(err)
        })
      }
      $loader().close()
    })
    return {
      ...toRefs(data),
      clearClock,
      SubmitExam,
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {
    this.clearClock()
  },
  methods: {
    hide() {
      this.$bvModal.hide('modal-submit-exam')
    },
    chooseQuestion(id, index) {
      this.submitQuestion(this.questionItem.id)
      this.userAnswer = {
        questionId: null,
        userChoices: [],
      }
      this.getQuestionById(id, index)
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
      try {
        const { data } = await QuizApi.showRightAnswer(questionId)
        console.log(data)
        this.questionItem = data.object
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
  },
})
</script>
