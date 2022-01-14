<template>
  <div class="page-container position-relative">
    <section class="page-heading exam-page-heading bg-gradient-blue">
      <div class="page-heading-inner">
        <b-container class="position-relative">
          <b-row>
            <b-col md="12" lg="12">
              <b-breadcrumb :items="breadcrumbs" class="mb-2"></b-breadcrumb>
              <div class="page-heading-title my-4">
                <div class="user-heading">
                  <img
                    class="avatar border-2 border-white border-solid"
                    :src="dataUser.userAvatar"
                    :alt="dataUser.name"
                  />
                  <div class="user-heading-name">
                    <h1 class="page-title">
                      {{ dataUser.name }}
                    </h1>
                    <div class="user-heading-username">
                      @{{ dataUser.username }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="page-heading-description mb-5">
                {{ dataUser.description }}
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
          <b-col md="12" lg="12" class="exam-main-content">
            <b-tabs class="common-tabs">
              <b-tab title="Đề thi đã thực hiện" active>
                <div class="tab-content-container">
                  <div class="list-exam">
                    <b-row v-if="dataExamDone.length > 0">
                      <b-col
                        v-for="item in dataExamDone"
                        :key="item.id"
                        cols="12"
                        sm="6"
                        md="6"
                        lg="4"
                      >
                        <CardExam :data="item"></CardExam>
                      </b-col>
                    </b-row>
                    <NoData v-else title="Chưa có đề thi" />
                  </div>
                </div>
              </b-tab>
              <b-tab title="Đề thi đã tạo">
                <div class="tab-content-container">
                  <div class="list-exam">
                    <b-row v-if="dataExamCreated.length > 0">
                      <b-col
                        v-for="item in dataExamCreated"
                        :key="item.id"
                        cols="12"
                        sm="6"
                        md="6"
                        lg="4"
                      >
                        <CardExam :data="item"></CardExam>
                      </b-col>
                    </b-row>
                    <NoData
                      v-else
                      img="https://storage.tracnghiem.vn/public/images/empty.svg"
                      title="Người dùng chưa tạo đề thi nào."
                    />
                  </div>
                </div>
              </b-tab>
            </b-tabs>
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
      idUser: this.$route.params.id || null,
      breadcrumbs: [
        {
          text: 'Trang chủ',
          href: '/',
        },
        {
          text: 'Người dùng',
          href: '/nguoi-dung',
        },
        {
          text: 'Vương David',
          active: true,
        },
      ],
      selectedBookmark: [],
      optionsBookmark: [
        { text: 'Yêu thích', value: 1 },
        { text: 'Đề vật lý', value: 2 },
      ],
      dataUser: {
        id: 1,
        name: 'Vương David',
        username: 'vuongdavid',
        description:
          ' I’m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can’t handle me at my worst, then you sure as hell don’t deserve me at my best',
        userAvatar: 'https://storage.tracnghiem.vn/public/images/teacher.png',
      },
      dataExamCreated: [],
      dataExamDone: [
        {
          hashId: 'klcrudrx',
          teacher: {
            userId: '83119c5d-bbfc-4412-94ca-9779069e785c',
            firstName: 'Ngoc Khue',
            lastName: 'Dao',
            displayName: null,
            avatar: 'https://storage.tracnghiem.vn/tracnghiem-dev/avatar.jpg',
            email: 'ngockhuentca2k@gmail.com',
          },
          title: 'string',
          image: 'string',
          nonExamTime: true,
          examTime: 0,
          numberQuestionsTest: 10,
          numberQuiz: 0,
          rating: 0,
          totalRating: 0,
          level: {
            name: 'Cơ bản',
            id: 1,
            domainEvents: null,
          },
          isLiked: false,
          slug: null,
          tags: [
            {
              tagId: 22,
              tagName: 'ban',
            },
          ],
          categories: {
            categoryId: 1,
            categoryName: 'Tốt nghiệp thpt',
          },
        },
        {
          hashId: 'omukujrx',
          teacher: {
            userId: '83119c5d-bbfc-4412-94ca-9779069e785c',
            firstName: 'Ngoc Khue',
            lastName: 'Dao',
            displayName: null,
            avatar: 'https://storage.tracnghiem.vn/tracnghiem-dev/avatar.jpg',
            email: 'ngockhuentca2k@gmail.com',
          },
          title: 'string',
          image: 'string',
          nonExamTime: true,
          examTime: 0,
          numberQuestionsTest: 10,
          numberQuiz: 0,
          rating: 0,
          totalRating: 0,
          level: {
            name: 'Cơ bản',
            id: 1,
            domainEvents: null,
          },
          isLiked: false,
          slug: null,
          tags: [
            {
              tagId: 21,
              tagName: 'bannhatb',
            },
          ],
          categories: {
            categoryId: 2,
            categoryName: 'Giáo dục K12',
          },
        },
        {
          hashId: 'qaswujxb',
          teacher: {
            userId: '83119c5d-bbfc-4412-94ca-9779069e785c',
            firstName: 'Ngoc Khue',
            lastName: 'Dao',
            displayName: null,
            avatar: 'https://storage.tracnghiem.vn/tracnghiem-dev/avatar.jpg',
            email: 'ngockhuentca2k@gmail.com',
          },
          title: 'Cách làm người tử tế 1',
          image: 'Không có ảnh',
          nonExamTime: true,
          examTime: 0,
          numberQuestionsTest: 100,
          numberQuiz: 6,
          rating: 0,
          totalRating: 0,
          level: {
            name: 'Trung bình',
            id: 2,
            domainEvents: null,
          },
          isLiked: false,
          slug: null,
          tags: [
            {
              tagId: 18,
              tagName: 'đạo đức 12',
            },
            {
              tagId: 19,
              tagName: 'Cách làm ng',
            },
            {
              tagId: 20,
              tagName: 'ALO',
            },
          ],
          categories: {
            categoryId: 7,
            categoryName: 'Tốt nghiệp Môn Toán',
          },
        },
        {
          hashId: 'eeiauxop',
          teacher: {
            userId: '83119c5d-bbfc-4412-94ca-9779069e785c',
            firstName: 'Ngoc Khue',
            lastName: 'Dao',
            displayName: null,
            avatar: 'https://storage.tracnghiem.vn/tracnghiem-dev/avatar.jpg',
            email: 'ngockhuentca2k@gmail.com',
          },
          title: 'test_update_state',
          image: 'image_2',
          nonExamTime: true,
          examTime: 0,
          numberQuestionsTest: 5,
          numberQuiz: 0,
          rating: 0,
          totalRating: 0,
          level: {
            name: 'Trung bình',
            id: 2,
            domainEvents: null,
          },
          isLiked: false,
          slug: null,
          tags: [
            {
              tagId: 12,
              tagName: 'string',
            },
          ],
          categories: {
            categoryId: 2,
            categoryName: 'Giáo dục K12',
          },
        },
        {
          hashId: 'mjhjuaxd',
          teacher: {
            userId: '83119c5d-bbfc-4412-94ca-9779069e785c',
            firstName: 'Ngoc Khue',
            lastName: 'Dao',
            displayName: null,
            avatar: 'https://storage.tracnghiem.vn/tracnghiem-dev/avatar.jpg',
            email: 'ngockhuentca2k@gmail.com',
          },
          title: 'Test',
          image: 'image-1',
          nonExamTime: true,
          examTime: 0,
          numberQuestionsTest: 20,
          numberQuiz: 0,
          rating: 0,
          totalRating: 0,
          level: {
            name: 'Cơ bản',
            id: 1,
            domainEvents: null,
          },
          isLiked: false,
          slug: null,
          tags: [
            {
              tagId: 12,
              tagName: 'string',
            },
          ],
          categories: {
            categoryId: 2,
            categoryName: 'Giáo dục K12',
          },
        },
        {
          hashId: 'dmtmukxn',
          teacher: {
            userId: '83119c5d-bbfc-4412-94ca-9779069e785c',
            firstName: 'Ngoc Khue',
            lastName: 'Dao',
            displayName: null,
            avatar: 'https://storage.tracnghiem.vn/tracnghiem-dev/avatar.jpg',
            email: 'ngockhuentca2k@gmail.com',
          },
          title: 'test_update',
          image: 'string',
          nonExamTime: true,
          examTime: 3,
          numberQuestionsTest: 10,
          numberQuiz: 0,
          rating: 0,
          totalRating: 0,
          level: {
            name: 'Cơ bản',
            id: 1,
            domainEvents: null,
          },
          isLiked: false,
          slug: 'a',
          tags: [
            {
              tagId: 12,
              tagName: 'string',
            },
          ],
          categories: {
            categoryId: 2,
            categoryName: 'Giáo dục K12',
          },
        },
      ],
    }
  },
  methods: {},
})
</script>
