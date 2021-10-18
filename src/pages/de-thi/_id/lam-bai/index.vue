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
          <b-col md="12" lg="3" class="do-exam-wrapper">
            <div class="card do-exam-box">
              <div class="text-green do-exam-timer">
                <i class="icon-timer" />
                <strong>01:30:00</strong>
              </div>
            </div>
          </b-col>
          <b-col md="12" lg="9" class="exam-main-content">
            <div class="card"></div>
          </b-col>
        </b-row>
      </b-container>
    </section>
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
})
</script>
