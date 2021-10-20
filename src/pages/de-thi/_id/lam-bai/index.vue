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
                <i class="icon-timer" />
                <strong>01:30:00</strong>
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
                    <b-btn>1</b-btn>
                    <b-btn class="tick">2</b-btn>
                    <b-btn class="answered">3</b-btn>
                    <b-btn>4</b-btn>
                    <b-btn class="not-answered">5</b-btn>
                    <b-btn>6</b-btn>
                    <b-btn>7</b-btn>
                    <b-btn>8</b-btn>
                    <b-btn>9</b-btn>
                    <b-btn>10</b-btn>
                    <b-btn>11</b-btn>
                    <b-btn>12</b-btn>
                    <b-btn>13</b-btn>
                    <b-btn>14</b-btn>
                    <b-btn>15</b-btn>
                    <b-btn>16</b-btn>
                    <b-btn>17</b-btn>
                    <b-btn>18</b-btn>
                    <b-btn>19</b-btn>
                    <b-btn>21</b-btn>
                    <b-btn>21</b-btn>
                    <b-btn>22</b-btn>
                    <b-btn>23</b-btn>
                    <b-btn>24</b-btn>
                    <b-btn>25</b-btn>
                    <b-btn>26</b-btn>
                    <b-btn>27</b-btn>
                    <b-btn>28</b-btn>
                    <b-btn>29</b-btn>
                    <b-btn>30</b-btn>
                    <b-btn>31</b-btn>
                    <b-btn>32</b-btn>
                    <b-btn>33</b-btn>
                    <b-btn>34</b-btn>
                    <b-btn>35</b-btn>
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
                  <div class="font-bold">Câu 1</div>
                  <b-form-checkbox
                    id="checkbox-bookmark"
                    v-model="bookmarkQuestion"
                    name="checkbox-bookmark"
                    :value="true"
                    :unchecked-value="false"
                  >
                    Đánh dấu
                  </b-form-checkbox>
                </div>
              </template>
              <div class="list-question mb-4">
                <div class="question-item">
                  <div class="question-content text-smd">
                    Which of the following lists all and only the appropriate
                    descriptions about a 32-bit CPU and a 64-bit CPU? I When a
                    32-bit CPU and a 64-bit CPU are compared, a 64-bit CPU has a
                    larger theoretical maximum memory space.. II There is no
                    32-bit OS that runs on a PC with a 64-bit CPU. III In terms
                    of the read and write speed of a USB memory, the speed of a
                    PC with a 64-bit CPU is twice as fast as that of a PC with a
                    32-bit CPU.
                  </div>
                  <div class="question-item-answer">
                    <div class="answer-head">
                      <span class="font-sm text-gray">câu trả lời</span>
                    </div>
                    <div class="list-answer">
                      <ul class="list-unstyled p-0">
                        <li>
                          <b-form-radio name="anwser-radios" value="A">
                            <b>A.</b>
                            Deciding one’s own strategy in a game according to
                            the strategy of the opponent
                          </b-form-radio>
                        </li>
                        <li>
                          <b-form-radio name="anwser-radios" value="B">
                            <b>B.</b>
                            Deciding one’s own strategy in a game according to
                            the strategy of the opponent
                          </b-form-radio>
                        </li>
                        <li>
                          <b-form-radio name="anwser-radios" value="C">
                            <b>C.</b>
                            Deciding one’s own strategy in a game according to
                            the strategy of the opponent
                          </b-form-radio>
                        </li>
                        <li>
                          <b-form-radio name="anwser-radios" value="A">
                            <b>D.</b>
                            Deciding one’s own strategy in a game according to
                            the strategy of the opponent
                          </b-form-radio>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <template #footer>
                <b-btn variant="outline">
                  <i class="icon-arrow-left me-2"></i>
                  Câu trước
                </b-btn>
                <b-btn variant="outline">
                  Câu trước
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
      <div class="modal-footer-common">
        <b-btn variant="outline" @click="hide()">Quay lại</b-btn>
        <b-btn variant="primary" @click="SubmitExam()">Nộp bài</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},
  layout: 'default',
  auth: false,
  setup() {},
  data() {
    return {
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
    SubmitExam() {
      this.$router.push({
        path: `/de-thi/${this.idExam}/ket-qua`,
      })
    },
  },
})
</script>
