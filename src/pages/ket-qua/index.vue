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
        <b-row class="mb-3">
          <b-col md="12" lg="4" xl="4" class="do-exam-wrapper">
            <div class="card do-exam-box">
              <div class="do-exam-timer mb-3">
                <strong class="text-green">{{ summaryQuiz.quizScore }}</strong>
                <span class="ms-2 text-black font-smd">điểm</span>
              </div>
              <div class="list-type-question">
                <ul class="list-unstyled">
                  <li class="justify-content-center">
                    <div class="type true"></div>
                    <span>Trả lời đúng</span>
                  </li>
                  <li class="justify-content-center">
                    <div class="type false"></div>
                    <span>Trả lời sai</span>
                  </li>
                </ul>
              </div>
              <div class="row mb-2">
                <div class="col col-6 text-center d-flex flex-column">
                  <strong class="text-green font-md">{{
                    summaryQuiz.numCorrectQuestions
                  }}</strong>
                  <span>câu đúng</span>
                </div>
                <div class="col col-6 text-center d-flex flex-column">
                  <strong class="text-red font-md">{{
                    summaryQuiz.numIncorrectQuestions
                  }}</strong>
                  <span>câu sai</span>
                </div>
              </div>
              <div class="text-gray font-sm my-2">
                <b-icon icon="exclamation-circle" />
                Bấm vào ô số để xem câu hỏi
              </div>
              <hr />
              <div class="filter-group">
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
                        :key="index"
                        :class="getColorOfQuestion(item)"
                        @click="getQuestionById(item.id)"
                        >{{ item.sortOrder }}</b-btn
                      >
                    </template>
                  </div>
                </b-collapse>
              </div>
            </div>
          </b-col>
          <b-col md="12" lg="8" xl="8" class="exam-main-content">
            <ResultQuestion
              :question="questionItem"
              :settings="settings"
              @prev="prevQuestion"
              @next="nextQuestion"
            />
          </b-col>
        </b-row>
        <div class="exam-information-detail card p-3">
          <b-row>
            <b-col md="12" lg="4" xl="4" class="exam-userinfo">
              <div class="exam-userinfo-inner">
                <h3 class="font-lmd font-bold mb-3">Thông tin lượt thi</h3>
                <div class="mb-3">
                  <ul class="list-unstyled p-0 m-0">
                    <li class="d-flex justify-content-between mt-2">
                      <span>Thí sinh:</span>
                      <strong>{{ summaryQuiz.user }}</strong>
                    </li>
                    <li class="d-flex justify-content-between mt-2">
                      <span>Thứ hạng lượt thi:</span>
                      <strong>{{ summaryQuiz.rank }}</strong>
                    </li>
                    <li class="d-flex justify-content-between mt-2">
                      <span>Điểm:</span>
                      <strong>{{ summaryQuiz.quizScore }}</strong>
                    </li>
                    <li class="d-flex justify-content-between mt-2">
                      <span>Ngày thi:</span>
                      <strong>{{ summaryQuiz.quizEndTime | date }}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </b-col>
            <b-col md="12" lg="8" xl="8" class="exam-analytic">
              <div class="exam-analytic-inner">
                <h3 class="font-lmd font-bold mb-3">
                  Phân tích kết quả làm bài
                </h3>
                <div>
                  <div class="list-exam-analytic">
                    <div
                      v-for="(item, index) in analysisQuiz"
                      :key="index"
                      class="exam-analytic-item font-smd"
                    >
                      <strong class="item-title">
                        {{ item.sectionTitle || 'Tổng quát' }}
                      </strong>
                      <div class="item-progress">
                        <b-progress
                          variant="success"
                          :value="item.percentage"
                          max="100"
                        />
                      </div>
                      <div class="item-number">{{ item.percentage }}%</div>
                    </div>
                  </div>
                  <hr />
                  <div class="form-review-exam">
                    <div class="form-group mb-4">
                      <label for="rating-input" class="font-bold mb-2"
                        >Nhận xét</label
                      >
                      <b-form-textarea
                        id="rating-input"
                        placeholder="Nhận xét về đề thi này"
                        rows="5"
                        max-rows="10"
                      ></b-form-textarea>
                    </div>
                    <div
                      class="
                        d-flex
                        flex-wrap
                        align-items-center
                        justify-content-between
                      "
                    >
                      <div class="d-flex mb-3">
                        <strong class="me-3">Đánh giá:</strong>
                        <b-form-rating
                          v-model="ratingExam"
                          class="custom-rating"
                        />
                      </div>
                      <b-btn variant="primary" class="button-submit-rating mb-3"
                        >Gửi</b-btn
                      >
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  computed,
  useRoute,
  useAsync,
  reactive,
  toRefs,
} from '@nuxtjs/composition-api'
import QuizApi from '@/api/quizApi'
import ResultQuestion from '@/components/Quiz/Result/ResultQuestion.vue'
export default defineComponent({
  components: { ResultQuestion },
  layout: 'default',
  auth: false,
  setup() {
    const { $handleError, $loader, $logger } = useContext()
    const route = useRoute()
    const quizId = computed(() => route.value.query.quizId)
    console.log('quizId', quizId.value)
    const data = reactive({
      itemQuestions: [],
      analysisQuiz: [],
      summaryQuiz: {},
      questionItem: {},
      userAnswer: {
        questionId: null,
        userChoices: [],
      },
      settings: {},
    })

    const getQuestionById = async (qId) => {
      try {
        const { data: item } = await QuizApi.getQuestionById(qId)
        data.questionItem = item.object
        console.log(data.questionItem)
      } catch (err) {
        $handleError(err, () => {
          console.log(err)
        })
      }
    }

    useAsync(async () => {
      $loader()
      $logger.info('Get Quiz Result Data')
      try {
        const [
          { data: questions },
          { data: analysisResult },
          { data: summaryResult },
          { data: quizSettingRes },
        ] = await Promise.all([
          QuizApi.getQuestionsAfterSubmit(quizId.value),
          QuizApi.analysisResult(quizId.value),
          QuizApi.summarizeResult(quizId.value),
          QuizApi.getQuizInfo(quizId.value),
        ])

        data.itemQuestions = questions.object.items
        data.analysisQuiz = analysisResult.object.items
        data.summaryQuiz = summaryResult.object
        data.settings = quizSettingRes.object
        // $logger.info(data.settings)
        // $logger.info(data.analysisQuiz)
        // $logger.info(data.summaryQuiz)
        const firstQuestion = data.itemQuestions[0]
        await getQuestionById(firstQuestion.id)
      } catch (err) {
        $handleError(err, () => {
          console.log(err)
        })
      }
      $loader().close()
    })

    return {
      ...toRefs(data),
      getQuestionById,
    }
  },
  data() {
    return {
      ratingExam: 5,
      idExam: this.$route.params.id || null,
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
      listAnswer: [
        {
          text: 'A. Deciding one own strategy in a game according to the strategy of the opponent',
          value: 'a',
        },
        {
          text: 'B. Deciding one own strategy in a game according to the strategy of the opponent',
          value: 'b',
        },
        {
          text: 'B. Deciding one own strategy in a game according to the strategy of the opponent',
          value: 'a',
        },
        {
          text: 'A. Deciding one own strategy in a game according to the strategy of the opponent',
          value: 'a',
        },
      ],
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
    }
  },
  methods: {
    getColorOfQuestion(question) {
      if (question.isCorrect) return 'true'
      return 'false'
    },
    async prevQuestion($evt) {
      let currentIndex = $evt
      const total = this.itemQuestions.length
      console.log(total)
      if (currentIndex > 2) {
        currentIndex--
      } else {
        currentIndex = total
      }
      await this.getQuestionBySortOrder(currentIndex)
    },
    async nextQuestion($evt) {
      let currentIndex = $evt
      const total = this.itemQuestions.length
      console.log(total)
      if (currentIndex < total) {
        currentIndex++
      } else {
        currentIndex = 1
      }
      await this.getQuestionBySortOrder(currentIndex)
    },
    async getQuestionBySortOrder(currentIndex) {
      console.log(currentIndex)
      const questions = this.itemQuestions.filter(
        (x) => x.sortOrder === currentIndex
      )
      console.log(questions)
      if (questions) {
        const qId = questions[0].id
        await this.getQuestionById(qId)
      }
    },
  },
})
</script>
