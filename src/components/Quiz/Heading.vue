<template>
  <b-container class="position-relative">
    <b-row>
      <b-col md="12" lg="8">
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
            <b-dropdown variant="outline-light" no-caret class="dropdown-save">
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
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Heading',
  props: {
    dataExam: {
      type: Object,
      default: () => {},
    },
    selectedBookmark: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
  },
  data() {
    return {
      optionsBookmark: [
        { text: 'Yêu thích', value: 1 },
        { text: 'Đề vật lý', value: 2 },
      ],
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
    }
  },
  computed: {},
})
</script>
