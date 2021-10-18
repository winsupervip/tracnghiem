<template>
  <div class="page-container">
    <HeadingPage title="Danh sách đề thi" :breadcrumbs="breadcrumbs" />
    <div class="exam-page-container">
      <b-container>
        <b-row>
          <b-col cols="12" sm="12" md="4" lg="3" class="filter-sidebar">
            <SidebarExam />
          </b-col>
          <b-col
            cols="12"
            sm="12"
            md="8"
            lg="9"
            class="exam-page-main-container"
          >
            <b-tabs class="custom-tabs" content-class="mt-3">
              <b-tab title="Tất cả đề thi" active>
                <div class="count-result mb-4">
                  <div class="count-result-left">
                    <strong>1909</strong>
                    <span>kết quả</span>
                  </div>
                  <div class="count-result-right">
                    <span>Sắp xếp:</span>
                    <b-form-select
                      v-model="selectedSort"
                      :options="optionsSort"
                      class="form-control"
                    ></b-form-select>
                  </div>
                </div>
                <div class="list-exam">
                  <b-row>
                    <b-col
                      v-for="item in dataExam"
                      :key="item.id"
                      cols="12"
                      sm="6"
                      md="12"
                      lg="6"
                    >
                      <CardExam :data="item"></CardExam>
                    </b-col>
                  </b-row>
                </div>
              </b-tab>
              <b-tab title="Gợi ý cho bạn">
                <div class="count-result mb-4">
                  <div class="count-result-left">
                    <strong>19</strong>
                    <span>kết quả</span>
                  </div>
                  <div class="count-result-right">
                    <span>Sắp xếp:</span>
                    <b-form-select
                      v-model="selectedSort"
                      :options="optionsSort"
                      class="form-control"
                    ></b-form-select>
                  </div>
                </div>
                <div class="list-exam">
                  <b-row>
                    <b-col
                      v-for="item in dataExam"
                      :key="item.id"
                      cols="12"
                      sm="6"
                      md="12"
                      lg="6"
                    >
                      <CardExam :data="item"></CardExam>
                    </b-col>
                  </b-row>
                </div>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import { defineComponent } from '@vue/composition-api'
// eslint-disable-next-line import/no-unresolved
import HeadingPage from '@/components/HeadingPage'
// eslint-disable-next-line import/no-unresolved
import SidebarExam from '@/components/SidebarExam'
// eslint-disable-next-line import/no-unresolved
import CardExam from '@/components/CardExam'

export default defineComponent({
  components: {
    HeadingPage,
    SidebarExam,
    CardExam,
  },
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
          text: 'Danh sách đề thi',
          active: true,
        },
      ],
      selectedSort: 'latest',
      optionsSort: [
        { value: 'latest', text: 'Mới nhất' },
        { value: 'rating', text: 'Đánh giá cao nhất' },
      ],
      dataExam: [
        {
          id: 1,
          name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
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
        {
          id: 2,
          name: '69 câu hỏi trắc nghiệm vật lý của cô Thu Minh',
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
        {
          id: 3,
          name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
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
        {
          id: 4,
          name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
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
          level: 2,
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
        {
          id: 5,
          name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
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
          level: 2,
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
        {
          id: 6,
          name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
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
        {
          id: 7,
          name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
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
          level: 2,
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
        {
          id: 8,
          name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
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
          level: 2,
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
        {
          id: 9,
          name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
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
          level: 2,
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
        {
          id: 10,
          name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
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
      ],
    }
  },
})
</script>
