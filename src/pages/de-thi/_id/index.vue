<template>
  <div class="page-container position-relative">
    <section class="page-heading exam-page-heading bg-gradient-blue">
      <div class="page-heading-inner">
        <b-container>
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
            <b-col md="12" lg="4">
              <div class="do-exam-sidebar text-black">
                <div class="card-do-exam card-filter mb-3">
                  <b-btn
                    variant="success"
                    block
                    class="font-lmd mb-3 button-do-exam"
                  >
                    BẮT ĐẦU LÀM BÀI
                  </b-btn>
                  <div class="card-filter-body">
                    <div class="filter-group">
                      <strong
                        :class="
                          showFilterGroup1
                            ? 'filter-group-header'
                            : 'filter-group-header collapsed'
                        "
                        @click="showFilterGroup1 = !showFilterGroup1"
                      >
                        Cài đặt đề thi
                        <i class="icon-caret-down"></i>
                      </strong>
                      <b-collapse
                        v-model="showFilterGroup1"
                        class="filter-group-body"
                      >
                        <b-form-checkbox-group v-model="selectedOptions1">
                          <b-form-checkbox
                            v-for="item in options1"
                            :key="item.value"
                            :value="item.value"
                          >
                            <div class="d-flex justify-content-between">
                              <span>{{ item.text }}</span>
                              <div class="group-input-xs">
                                <input class="form-control" type="text" />
                                <strong>/ 100</strong>
                              </div>
                            </div>
                          </b-form-checkbox>
                        </b-form-checkbox-group>
                      </b-collapse>
                    </div>
                    <hr class="line-divide" />
                    <div class="filter-group">
                      <strong
                        :class="
                          showFilterGroup2
                            ? 'filter-group-header'
                            : 'filter-group-header collapsed'
                        "
                        @click="showFilterGroup2 = !showFilterGroup2"
                      >
                        Thời gian làm bài
                        <i class="icon-caret-down"></i>
                      </strong>
                      <b-collapse
                        v-model="showFilterGroup2"
                        class="filter-group-body"
                      >
                        <b-form-group>
                          <b-form-radio
                            v-model="selectedOptions2"
                            name="time-radios"
                            value="0"
                          >
                            Không tính giờ
                          </b-form-radio>
                          <b-form-radio
                            v-model="selectedOptions2"
                            name="time-radios"
                            value="1"
                          >
                            <div class="d-flex justify-content-between">
                              <span>Tính giờ</span>
                              <div class="group-input-xs">
                                <input class="form-control" type="text" />
                                <strong>phút</strong>
                              </div>
                            </div>
                          </b-form-radio>
                        </b-form-group>
                      </b-collapse>
                    </div>
                    <hr class="line-divide" />
                    <div class="filter-group">
                      <strong
                        :class="
                          showFilterGroup3
                            ? 'filter-group-header'
                            : 'filter-group-header collapsed'
                        "
                        @click="showFilterGroup3 = !showFilterGroup3"
                      >
                        Cài đặt khác
                        <i class="icon-caret-down"></i>
                      </strong>
                      <b-collapse
                        v-model="showFilterGroup3"
                        class="filter-group-body"
                      >
                        <b-form-checkbox-group
                          v-model="selectedOptions3"
                          :options="options3"
                          value-field="value"
                          text-field="text"
                        ></b-form-checkbox-group>
                      </b-collapse>
                    </div>
                  </div>
                </div>
                <div class="card-ranking card-filter mb-3">
                  <div class="mb-3 font-bold">Bảng xếp hạng</div>
                  <div class="list-ranking-user">
                    <div class="ranking-item text-smd">
                      <div class="d-flex align-items-center">
                        <img
                          class="avatar avatar-md"
                          src="/images/teacher.png"
                          alt=""
                        />
                        <span class="ms-2">Phùng Việt</span>
                      </div>
                      <span class="text-gray">98 điểm</span>
                    </div>
                    <div class="ranking-item text-smd">
                      <div class="d-flex align-items-center">
                        <img
                          class="avatar avatar-md"
                          src="/images/teacher.png"
                          alt=""
                        />
                        <span class="ms-2">Phùng Việt</span>
                      </div>
                      <span class="text-gray">98 điểm</span>
                    </div>
                    <div class="ranking-item text-smd">
                      <div class="d-flex align-items-center">
                        <img
                          class="avatar avatar-md"
                          src="/images/teacher.png"
                          alt=""
                        />
                        <span class="ms-2">Phùng Việt</span>
                      </div>
                      <span class="text-gray">98 điểm</span>
                    </div>
                    <div class="ranking-item text-smd">
                      <div class="d-flex align-items-center">
                        <img
                          class="avatar avatar-md"
                          src="/images/teacher.png"
                          alt=""
                        />
                        <span class="ms-2">Phùng Việt</span>
                      </div>
                      <span class="text-gray">98 điểm</span>
                    </div>
                    <div class="ranking-item text-smd">
                      <div class="d-flex align-items-center">
                        <img
                          class="avatar avatar-md"
                          src="/images/teacher.png"
                          alt=""
                        />
                        <span class="ms-2">Phùng Việt</span>
                      </div>
                      <span class="text-gray">98 điểm</span>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
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
      selectedBookmark: [],
      optionsBookmark: [
        { text: 'Yêu thích', value: 1 },
        { text: 'Đề vật lý', value: 2 },
      ],
      selectedSort: 'latest',
      optionsSort: [
        { value: 'latest', text: 'Mới nhất' },
        { value: 'rating', text: 'Đánh giá cao nhất' },
      ],
      visibleFilter: false,
      showFilterGroup1: true,
      selectedOptions1: [],
      options1: [
        { text: 'Reading', value: 1 },
        { text: 'Listening', value: 2 },
        { text: 'Writing', value: 3 },
        { text: 'Speaking', value: 4 },
      ],
      showFilterGroup2: true,
      selectedOptions2: [],
      showFilterGroup3: true,
      selectedOptions3: [],
      options3: [
        { text: 'Xáo trộn câu hỏi', value: 1 },
        { text: 'Xáo trộn đáp án', value: 2 },
        { text: 'Xem kết quả sau khi trả lời câu hỏi', value: 3 },
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
