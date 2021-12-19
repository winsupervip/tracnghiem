<template>
  <div class="page-container position-relative">
    <section class="page-heading exam-page-heading bg-gradient-blue">
      <div class="page-heading-inner">
        <Heading :data-exam="dataExam" :selected-bookmark="selectedBookmark" />
      </div>
    </section>
    <section class="exam-main-container">
      <b-container>
        <b-row>
          <b-col md="12" lg="8" class="exam-main-content">
            <b-tabs class="common-tabs">
              <b-tab title="Thông tin đề thi" active>
                <TabInfoQuiz
                  :list-exam-section="listExamSection"
                  :list-exam-document="getListExamDocument"
                  :author-infomation="userInformation"
                />
              </b-tab>
              <b-tab title="danh sách câu hỏi">
                <div class="tab-content-container">
                  <b-card
                    header="Danh sách câu hỏi"
                    header-tag="header"
                    class="mb-3"
                  >
                    <div class="list-question mb-4">
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-center mb-3">
                      <b-btn variant="primary"> Xem thêm </b-btn>
                    </div>
                    <b-pagination total-rows="50" align="right" />
                  </b-card>
                </div>
              </b-tab>
            </b-tabs>
          </b-col>
          <b-col md="12" lg="4" class="do-exam-sidebar-wrapper">
            <div class="do-exam-sidebar text-black">
              <ConfigQuiz
                :config-quiz="configQuiz"
                :config-quiz-data="examSettings"
                @showModalStartExam="$bvModal.show('modal-start-exam')"
                @setShowFilterGroup1="
                  configQuiz.showFilterGroup1 = !configQuiz.showFilterGroup1
                "
                @setShowFilterGroup2="
                  configQuiz.showFilterGroup2 = !configQuiz.showFilterGroup2
                "
                @setShowFilterGroup3="
                  configQuiz.showFilterGroup3 = !configQuiz.showFilterGroup3
                "
              />
              <Ranks />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <b-modal
      id="modal-start-exam"
      class="modal-common"
      hide-footer
      title="Thông tin thí sinh"
    >
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form class="exam-form" @submit.prevent="handleSubmit(StartExam)">
          <div class="mb-4">
            <ValidationProvider
              name="Họ và tên"
              rules="required|fullName|max:255"
            >
              <b-form-group slot-scope="{ valid, errors }" class="mb-2">
                <b-form-input
                  v-model="userInformation.fullName"
                  placeholder="Họ và tên (*)"
                  trim
                  :state="errors[0] ? false : valid ? true : null"
                ></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider name="Email" rules="email|max:255">
              <b-form-group slot-scope="{ valid, errors }" class="mb-2">
                <b-form-input
                  v-model="userInformation.email"
                  placeholder="Email"
                  trim
                  :state="errors[0] ? false : valid ? true : null"
                ></b-form-input>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider name="Thông tin khác" rules="max:1000">
              <b-form-group slot-scope="{ errors }" class="mb-2">
                <b-form-textarea
                  v-model="userInformation.description"
                  trim
                  rows="3"
                  max-rows="6"
                  placeholder="Thông tin khác"
                ></b-form-textarea>
                <b-form-invalid-feedback>
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <recaptcha />
          </div>
          <div class="modal-footer-common d-flex justify-content-center">
            <b-btn variant="outline" class="me-3" type="button" @click="hide()">
              Hủy bỏ
            </b-btn>
            <b-btn variant="primary" type="submit">Bắt đầu</b-btn>
          </div>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
// import { defineComponent } from '@nuxtjs/composition-api'
import {
  defineComponent,
  useContext,
  reactive,
  toRefs,
  useRoute,
  computed,
  useAsync,
  useStore,
} from '@nuxtjs/composition-api'
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
import { mapGetters } from 'vuex'
// eslint-disable-next-line import/no-unresolved
import ConfigQuiz from '@/components/Quiz/ConfigQuiz.vue'
// eslint-disable-next-line import/no-unresolved
import Ranks from '@/components/Quiz/Ranks.vue'
// eslint-disable-next-line import/no-unresolved
import TabInfoQuiz from '@/components/Quiz/TabInfoQuiz/TabInfoQuiz.vue'
// eslint-disable-next-line import/no-unresolved
import Heading from '@/components/Quiz/Heading.vue'
// eslint-disable-next-line import/no-unresolved
import ExamApi from '@/api/examApi'
import QuizApi from '@/api/quizApi'
import ApiHome from '@/api/apiHome'

export default defineComponent({
  components: {
    ConfigQuiz,
    Ranks,
    TabInfoQuiz,
    Heading,
  },
  layout: 'default',
  auth: false,
  setup() {
    const { $loader, $logger } = useContext()

    const store = useStore()
    const route = useRoute()
    const idSlug = computed(() => route.value.params.id)
    const arr = idSlug.value.split('-')
    const id = arr[arr.length - 1]
    const data = reactive({
      idExam: idSlug || null,
      selectedBookmark: [],
      userInformation: {
        fullName: '',
        email: '',
        description: '',
      },
      configQuiz: {
        showFilterGroup1: true,
        sectionConfigIdsChecked: [],
        showFilterGroup2: true,
        showFilterGroup3: true,
        selectedOptions3: [],
        checkboxQuestionTypeAnother: false,
      },
      dataExam: {
        exam: {},
        tagItems: [],
        categoryTree: [],
      },
      configQuizData: null,
      listExamSection: [],
      getListExamDocument: [],
    })
    useAsync(async () => {
      $loader()
      try {
        const [
          { data: getExamDetail },
          { data: getAuthorOfExam },
          { data: getListExamSection },
          { data: getListExamDocument },
          { data: examData },
        ] = await Promise.all([
          ApiHome.getExamDetail(data.idExam),
          ApiHome.getAuthorOfExam(data.idExam),
          ApiHome.getListExamSection(data.idExam),
          ApiHome.getListExamDocument(data.idExam),
          ExamApi.getExamConfig(id),
        ])
        store.dispatch('exams/setExam', examData.object)
        data.dataExam = getExamDetail.object
        data.userInformation = getAuthorOfExam.object
        data.listExamSection = getListExamSection.object.items
        data.getListExamDocument = getListExamDocument.object.items
        $logger.info('getExamDetail', data.dataExam)
      } catch (err) {
        // app.$handleError(err, () => {
        //
        // })
        $logger.info(err)
      }
      $loader().close()
    })

    return {
      ...toRefs(data),
    }
  },

  computed: {
    ...mapGetters({
      getQuestion: 'questions/getQuestion',
      examSettings: 'exams/getExamSettings',
    }),
  },
  watch: {
    examSettings() {
      this.configQuizData = this.examSettings
      console.log('configQuizData', this.configQuizData)
    },
  },
  created() {
    if (this.$auth.loggedIn) {
      this.userInformation.fullName = this.$auth.user.name
      this.userInformation.email = this.$auth.user.email
    }
  },
  methods: {
    hide() {
      this.$bvModal.hide('modal-start-exam')
    },
    async StartExam() {
      const token = await this.$recaptcha.getResponse()
      this.$logger.info('ReCaptcha token:', token)

      // send token to server alongside your form data

      const idSlug = this.idExam
      const arr = idSlug.split('-')
      const examHashId = arr[arr.length - 1]

      const settings = this.configQuiz.sectionConfigIdsChecked.map((x) => {
        return this.examSettings.sectionConfig.find(
          (item) => item.sectionHashId === x
        )
      })

      // eslint-disable-next-line array-callback-return
      // eslint-disable-next-line prefer-const
      let settingsData = settings.map(function (x) {
        return {
          sectionHashId: x.sectionHashId,
          numQuestions: x.numberQuestionsTest,
        }
      })

      if (this.configQuiz.checkboxQuestionTypeAnother) {
        settingsData.push({
          sectionHashId: '',
          numQuestions: this.examSettings.numberQuestionsTest,
        })
      }

      const dataInitExam = {
        quiz: {
          examHashId,
          timeInSeconds: this.examSettings.examTimeSecond,
          shuffleQuestion: this.examSettings.suffleQuestions,
          shuffleAnswer: this.examSettings.suffleAnswers,
          showRightAnswer: this.examSettings.checkAnswersWhileTest,
          showRightAnswerAfterSubmit: this.examSettings.checkAnswersAfterTest,
        },
        settings: settingsData,
        userInformation: this.userInformation,
        googleToken: token,
      }

      try {
        const { data } = await QuizApi.addQuiz(dataInitExam)
        this.$handleError(data)
        console.log('data addquiz', data)
        this.$router.push({
          path: `/de-thi/${this.idExam}/lam-bai?quizId=${data.object.data}`,
        })
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
      // at the end you need to reset recaptcha
      await this.$recaptcha.reset()
    },
  },
})
</script>
