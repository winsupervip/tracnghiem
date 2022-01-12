<template>
  <div class="page-container position-relative">
    <section class="page-heading exam-page-heading bg-gradient-blue">
      <div class="page-heading-inner">
        <b-container class="position-relative">
          <b-row>
            <b-col md="12" lg="8">
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
          <b-col md="12" lg="8" class="exam-main-content">
            <b-tabs v-model="tabIndex" class="common-tabs">
              <b-tab title="Thông tin đề thi" active>
                <TabInfoQuiz
                  :list-exam-section="listExamSection"
                  :list-exam-document="getListExamDocument"
                  :author-infomation="userInformation"
                />
              </b-tab>
              <b-tab title="Danh sách câu hỏi">
                <div class="tab-content-container">
                  <b-card
                    header="Danh sách câu hỏi"
                    header-tag="header"
                    class="mb-3"
                  >
                    <div class="list-question mb-4">
                      <div v-if="totalQuestion === 0">
                        <EmptyData />
                      </div>
                      <div v-else>
                        <div
                          v-for="(item, index) in listQuestionExam"
                          :key="index"
                          class="question-item"
                        >
                          <ShowQuestionExamDetail :item-data="item" />
                        </div>
                      </div>
                    </div>
                    <b-pagination
                      v-if="isLogin"
                      v-model="currentPage"
                      :total-rows="totalQuestion"
                      per-page="10"
                      align="right"
                    />

                    <div v-else class="text-center mb-3">
                      <b-btn variant="primary" @click="seeMore">
                        Xem thêm
                      </b-btn>
                    </div>
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
    <div>
      <b-modal id="see-more" title="Thông báo" ok-only>
        <p class="d-flex justify-content-center">
          Bạn cần đăng nhập để xem nhiều hơn
        </p>
      </b-modal>
    </div>
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
import {
  defineComponent,
  useContext,
  reactive,
  toRefs,
  useRoute,
  computed,
  useAsync,
  useStore,
  useMeta,
} from '@nuxtjs/composition-api'
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
import { mapGetters } from 'vuex'
import ShowQuestionExamDetail from '@/components/Question/Show/QuestionExamDetail.vue'
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
import EmptyData from '@/components/EmptyData.vue'
export default defineComponent({
  components: {
    ConfigQuiz,
    Ranks,
    TabInfoQuiz,
    Heading,
    ShowQuestionExamDetail,
    EmptyData,
  },
  layout: 'default',
  auth: false,
  setup() {
    const { $loader, $logger, error, redirect } = useContext()
    const { title, meta } = useMeta()
    const store = useStore()
    const route = useRoute()
    const idSlug = computed(() => route.value.params.id)
    const arr = idSlug.value.split('-')
    const id = arr[arr.length - 1]

    const paramsUrl = computed(() => route.value.path)
    const slug = paramsUrl.value

    const data = reactive({
      idExam: id || null,
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
      listQuestionExam: [],
      tabIndex: 0,
      userAnswer: {
        questionId: null,
        userChoices: [],
      },
      currentPage: 1,
      pageSize: 10,
      totalQuestion: 0,
      breadcrumbs: [],
      urlQuery: {
        page: 1,
        pageSize: 10,
        keyword: '',
      },
    })
    const fetchQuestionsOfExam = async () => {
      try {
        const { data: result } = await ApiHome.getQuestionsOfExam(
          data.idExam,
          data.urlQuery
        )
        data.listQuestionExam = result.object.items
        data.totalQuestion = result.object.total
        console.log(data.listQuestionExam, 'data.listQuestionExam')
      } catch {}
    }
    useAsync(async () => {
      $loader()
      try {
        // get exam
        const { data: getExamDetail } = await ApiHome.getExamDetail(data.idExam)
        data.dataExam = getExamDetail.object
        const examSlug = '/' + data.dataExam.exam.slug + '-' + data.idExam
        console.log(slug, examSlug)
        if (slug !== examSlug) {
          redirect(examSlug)
        }
        // seo
        title.value = data.dataExam.exam.seoTitle
        meta.value.push({
          hid: 'description',
          name: 'description',
          content: data.dataExam.exam.seoDescription,
        })
        // facebook
        meta.value.push({
          hid: 'og:title',
          name: 'og:title',
          content: data.dataExam.exam.seoTitle,
        })
        meta.value.push({
          hid: 'og:description',
          name: 'og:description',
          content: data.dataExam.exam.seoDescription,
        })
        meta.value.push({
          hid: 'og:image',
          name: 'og:image',
          content: data.dataExam.exam.image,
        })
        // console.log(data.dataExam)
        const slugCate = data.dataExam.exam.category.slug
        //
        const [
          { data: getAuthorOfExam },
          { data: getListExamSection },
          { data: getListExamDocument },
          { data: examData },
          { data: breadcrumdItems },
        ] = await Promise.all([
          ApiHome.getAuthorOfExam(data.idExam),
          ApiHome.getListExamSection(data.idExam),
          ApiHome.getListExamDocument(data.idExam),
          ExamApi.getExamConfig(id),
          ApiHome.getCategoryBreadcrumd(slugCate),
        ])
        store.dispatch('exams/setExam', examData.object)

        data.userInformation = getAuthorOfExam.object
        data.listExamSection = getListExamSection.object.items
        data.getListExamDocument = getListExamDocument.object.items
        // breadcrumbs
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
          active: true,
        })
        // load question
        await fetchQuestionsOfExam()
      } catch (err) {
        // exam không tồn tại
        error({ statusCode: 404, message: 'Post not found' })
        // app.$handleError(err, () => {
        //
        // })
        $logger.info(err)
      }
      $loader().close()
    })

    return {
      ...toRefs(data),
      fetchQuestionsOfExam,
    }
  },
  head: {},
  computed: {
    ...mapGetters({
      getQuestion: 'questions/getQuestion',
      examSettings: 'exams/getExamSettings',
      isLogin: 'user/isLogin',
    }),
  },
  watch: {
    currentPage() {
      this.fetchQuestionsOfExam()
    },
    examSettings() {
      this.configQuizData = this.examSettings
      // console.log('configQuizData', this.configQuizData)
    },
  },
  created() {
    if (this.$auth.loggedIn) {
      this.userInformation.fullName = this.$auth.user.name
      this.userInformation.email = this.$auth.user.email
    }
  },
  methods: {
    seeMore() {
      if (this.isLogin) {
        //
      } else {
        this.$bvModal.show('see-more')
      }
    },
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
        // console.log('data addquiz', data)
        this.$router.push({
          path: `/thuc-hien/?id=${this.idExam}&quizId=${data.object.data}`,
        })
      } catch (err) {
        this.$handleError(err, () => {
          // console.log(err)
        })
      }
      // at the end you need to reset recaptcha
      await this.$recaptcha.reset()
    },
  },
})
</script>
