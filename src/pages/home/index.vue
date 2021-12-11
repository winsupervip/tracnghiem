<template>
  <div class="home-container">
    <SectionSearch
      :is-loading="isCallSearch"
      :data-categories="dataCategories"
      @onSubmitSearch="onSubmitSearch"
    />
    <section class="section bg-gray">
      <b-container>
        <Heading
          title="Những chủ đề nổi bật nhất"
          sub-title="Bạn muốn làm chủ đề trắc nghiệm online nào?"
        ></Heading>
        <div class="feature-topic">
          <div class="view-more">
            <div class="divider"><span></span></div>
            <nuxt-link to="/topic" class="view-all">
              <b-btn size="lg" variant="outline-primary">Xem tất cả</b-btn>
            </nuxt-link>
          </div>
          <VueSlickCarousel
            v-if="dataFeatureTopic && dataFeatureTopic.length > 0"
            class="feature-topic-slider"
            v-bind="configFeatureTopic"
          >
            <div
              v-for="item in dataFeatureTopic"
              :key="item.id"
              class="slider-item"
            >
              <CardTopic :data="item"></CardTopic>
            </div>
          </VueSlickCarousel>
        </div>
      </b-container>
    </section>
    <section class="section bg-white">
      <b-container>
        <Heading title="Đề thi trắc nghiệm online phổ biến nhất"></Heading>
        <div class="feature-exam">
          <b-row>
            <b-col
              v-for="item in dataFeatureExam"
              :key="item.id"
              cols="12"
              sm="6"
              md="6"
              lg="4"
            >
              <CardExam :data="item"></CardExam>
            </b-col>
          </b-row>
          <pre>
            {{ dataFeatureExam }}
          </pre>
        </div>
      </b-container>
    </section>
    <section class="section bg-gray">
      <b-container>
        <Heading title="Chủ đề nổi bật theo danh mục"></Heading>
        <div class="list-category">
          <b-row>
            <b-col
              v-for="category in dataConfigCategories"
              :key="category.id"
              cols="12"
              sm="6"
              md="6"
              lg="3"
            >
              <div class="category-item">
                <nuxt-link
                  :to="category.slug ? category.slug : '#'"
                  class="category-title"
                >
                  <h3 class="font-lg font-bold">{{ category.categoryName }}</h3>
                </nuxt-link>
                <ul class="list-unstyled category-item-list">
                  <li v-for="child in category.children" :key="child.id">
                    <nuxt-link
                      :to="child.slug ? category.slug : '#'"
                      class="text-black"
                    >
                      <h4 class="font-lmd font-bold">
                        {{ child.categoryName }}
                      </h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm"
                        >{{ child.numberQuiz }}+ lượt thi</span
                      >
                    </div>
                  </li>
                </ul>
              </div>
            </b-col>
            <!-- <b-col cols="12" sm="6" md="6" lg="3">
              <div class="category-item">
                <nuxt-link to="#" class="category-title">
                  <h3 class="font-lg font-bold">Tốt nghiệp THPT</h3>
                </nuxt-link>
                <ul class="list-unstyled category-item-list">
                  <li>
                    <nuxt-link to="#" class="text-black">
                      <h4 class="font-lmd font-bold">Toán học</h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm">100+ lượt thi</span>
                    </div>
                  </li>
                  <li>
                    <nuxt-link to="#" class="text-black">
                      <h4 class="font-lmd font-bold">Toán học</h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm">100+ lượt thi</span>
                    </div>
                  </li>
                  <li>
                    <nuxt-link to="#" class="text-black">
                      <h4 class="font-lmd font-bold">Toán học</h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm">100+ lượt thi</span>
                    </div>
                  </li>
                  <li>
                    <nuxt-link to="#" class="text-black">
                      <h4 class="font-lmd font-bold">Toán học</h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm">100+ lượt thi</span>
                    </div>
                  </li>
                </ul>
              </div>
            </b-col>
            <b-col cols="12" sm="6" md="6" lg="3">
              <div class="category-item">
                <nuxt-link to="#" class="category-title">
                  <h3 class="font-lg font-bold">Tốt nghiệp THPT</h3>
                </nuxt-link>
                <ul class="list-unstyled category-item-list">
                  <li>
                    <nuxt-link to="#" class="text-black">
                      <h4 class="font-lmd font-bold">Toán học</h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm">100+ lượt thi</span>
                    </div>
                  </li>
                  <li>
                    <nuxt-link to="#" class="text-black">
                      <h4 class="font-lmd font-bold">Toán học</h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm">100+ lượt thi</span>
                    </div>
                  </li>
                  <li>
                    <nuxt-link to="#" class="text-black">
                      <h4 class="font-lmd font-bold">Toán học</h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm">100+ lượt thi</span>
                    </div>
                  </li>
                  <li>
                    <nuxt-link to="#" class="text-black">
                      <h4 class="font-lmd font-bold">Toán học</h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm">100+ lượt thi</span>
                    </div>
                  </li>
                </ul>
              </div>
            </b-col>
            <b-col cols="12" sm="6" md="6" lg="3">
              <div class="category-item">
                <nuxt-link to="#" class="category-title">
                  <h3 class="font-lg font-bold">Tốt nghiệp THPT</h3>
                </nuxt-link>
                <ul class="list-unstyled category-item-list">
                  <li>
                    <nuxt-link to="#" class="text-black">
                      <h4 class="font-lmd font-bold">Toán học</h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm">100+ lượt thi</span>
                    </div>
                  </li>
                  <li>
                    <nuxt-link to="#" class="text-black">
                      <h4 class="font-lmd font-bold">Toán học</h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm">100+ lượt thi</span>
                    </div>
                  </li>
                  <li>
                    <nuxt-link to="#" class="text-black">
                      <h4 class="font-lmd font-bold">Toán học</h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm">100+ lượt thi</span>
                    </div>
                  </li>
                  <li>
                    <nuxt-link to="#" class="text-black">
                      <h4 class="font-lmd font-bold">Toán học</h4>
                    </nuxt-link>
                    <div class="exam-count d-flex align-items-center">
                      <i class="icon-exam me-1 font-lg text-primary"></i>
                      <span class="font-sm">100+ lượt thi</span>
                    </div>
                  </li>
                </ul>
              </div>
            </b-col> -->
          </b-row>
          <div class="text-center my-3">
            <nuxt-link to="/chuyen-muc" class="btn btn-outline-primary">
              Xem tất cả
            </nuxt-link>
          </div>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import {
  defineComponent,
  reactive,
  toRefs,
  useFetch,
  useContext,
} from '@nuxtjs/composition-api'
import VueSlickCarousel from 'vue-slick-carousel'
// eslint-disable-next-line import/no-unresolved
import SectionSearch from '@/components/SectionSearch'
// eslint-disable-next-line import/no-unresolved
import Heading from '@/components/Heading'
// eslint-disable-next-line import/no-unresolved
import CardTopic from '@/components/CardTopic'
// eslint-disable-next-line import/no-unresolved
import CardExam from '@/components/CardExam'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import apiHome from '@/api/apiHome'
export default defineComponent({
  components: {
    SectionSearch,
    Heading,
    CardTopic,
    CardExam,
    VueSlickCarousel,
  },
  layout: 'default',
  auth: false,
  setup() {
    const { $logger, $loader } = useContext()
    const data = reactive({
      dataFeatureTopic: [],
      dataFeatureExam: [],
      dataConfigCategories: [],
      dataCategories: [],
      configFeatureTopic: {
        arrows: true,
        dots: false,
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: '30px',
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      },
    })
    const { fetch } = useFetch(async () => {
      try {
        $loader()
        const { data: result } = await apiHome.getCategories()
        const { data: exam } = await apiHome.getExam({
          type: 'highlight',
          pageSize: 6,
        })
        const { data: configCategories } = await apiHome.getConfigCategories({
          type: 'highlight',
          pageSize: 4,
          pageSizeChild: 4,
        })
        const { data: resultCategories } = await apiHome.categoriesAtHomePage({
          parent: 0,
          recursive: 0,
        })
        data.dataFeatureExam = exam.object?.items
        data.dataFeatureTopic = result.object?.items
        data.dataConfigCategories = configCategories.object.items
        data.dataCategories = resultCategories.object.items
        $logger.info('trung log nek hehe 1', result)
        $loader().close()
      } catch (err) {
        console.log(err)
        $loader().close()
        // this.$handleError(err, () => {
        //   console.log(err)
        // })
      }
    })
    $logger.info('trung log nek hehe 1')
    fetch()
    return {
      ...toRefs(data),
    }
  },
  data() {
    return {
      isCallSearch: false,
      dataSearch: {
        keyword: this.$route.query.keyword || '',
        exam: this.$route.query.exam || '',
        category: this.$route.query.category || '',
        per_page: 10,
        page: this.$route.query.page || 1,
      },
      // dataFeatureExam: [
      //   {
      //     id: 1,
      //     name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
      //     thumbnail: '/images/exam-1.jpg',
      //     category: 'Thi tốt nghiệp THPT',
      //     time: '45',
      //     examCount: '100',
      //     questionCount: '90',
      //     teacherId: 1,
      //     teacherAvatar: '/images/teacher.png',
      //     teacherName: 'Cô giáo Minh Thu',
      //     rating: '4.5',
      //     ratingCount: 20,
      //     level: 1,
      //     tags: [
      //       {
      //         id: 1,
      //         name: 'Vật lý 12',
      //       },
      //       {
      //         id: 2,
      //         name: 'Luyện thi đại học',
      //       },
      //       {
      //         id: 3,
      //         name: 'Vật lý nâng cao',
      //       },
      //     ],
      //   },
      //   {
      //     id: 2,
      //     name: '69 câu hỏi trắc nghiệm vật lý của cô Thu Minh',
      //     thumbnail: '/images/exam-1.jpg',
      //     category: 'Thi tốt nghiệp THPT',
      //     time: '45',
      //     examCount: '100',
      //     questionCount: '90',
      //     teacherId: 1,
      //     teacherAvatar: '/images/teacher.png',
      //     teacherName: 'Cô giáo Minh Thu',
      //     rating: '4.5',
      //     ratingCount: 20,
      //     level: 1,
      //     tags: [
      //       {
      //         id: 1,
      //         name: 'Vật lý 12',
      //       },
      //       {
      //         id: 2,
      //         name: 'Luyện thi đại học',
      //       },
      //       {
      //         id: 3,
      //         name: 'Vật lý nâng cao',
      //       },
      //     ],
      //   },
      //   {
      //     id: 3,
      //     name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
      //     thumbnail: '/images/exam-1.jpg',
      //     category: 'Thi tốt nghiệp THPT',
      //     time: '45',
      //     examCount: '100',
      //     questionCount: '90',
      //     teacherId: 1,
      //     teacherAvatar: '/images/teacher.png',
      //     teacherName: 'Cô giáo Minh Thu',
      //     rating: '4.5',
      //     ratingCount: 20,
      //     level: 1,
      //     tags: [
      //       {
      //         id: 1,
      //         name: 'Vật lý 12',
      //       },
      //       {
      //         id: 2,
      //         name: 'Luyện thi đại học',
      //       },
      //       {
      //         id: 3,
      //         name: 'Vật lý nâng cao',
      //       },
      //     ],
      //   },
      //   {
      //     id: 4,
      //     name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
      //     thumbnail: '/images/exam-1.jpg',
      //     category: 'Thi tốt nghiệp THPT',
      //     time: '45',
      //     examCount: '100',
      //     questionCount: '90',
      //     teacherId: 1,
      //     teacherAvatar: '/images/teacher.png',
      //     teacherName: 'Cô giáo Minh Thu',
      //     rating: '4.5',
      //     ratingCount: 20,
      //     level: 2,
      //     tags: [
      //       {
      //         id: 1,
      //         name: 'Vật lý 12',
      //       },
      //       {
      //         id: 2,
      //         name: 'Luyện thi đại học',
      //       },
      //       {
      //         id: 3,
      //         name: 'Vật lý nâng cao',
      //       },
      //     ],
      //   },
      //   {
      //     id: 5,
      //     name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
      //     thumbnail: '/images/exam-1.jpg',
      //     category: 'Thi tốt nghiệp THPT',
      //     time: '45',
      //     examCount: '100',
      //     questionCount: '90',
      //     teacherId: 1,
      //     teacherAvatar: '/images/teacher.png',
      //     teacherName: 'Cô giáo Minh Thu',
      //     rating: '4.5',
      //     ratingCount: 20,
      //     level: 2,
      //     tags: [
      //       {
      //         id: 1,
      //         name: 'Vật lý 12',
      //       },
      //       {
      //         id: 2,
      //         name: 'Luyện thi đại học',
      //       },
      //       {
      //         id: 3,
      //         name: 'Vật lý nâng cao',
      //       },
      //     ],
      //   },
      //   {
      //     id: 6,
      //     name: '69 câu hỏi trắc nghiệm vật lý của cô Minh Thu',
      //     thumbnail: '/images/exam-1.jpg',
      //     category: 'Thi tốt nghiệp THPT',
      //     time: '45',
      //     examCount: '100',
      //     questionCount: '90',
      //     teacherId: 1,
      //     teacherAvatar: '/images/teacher.png',
      //     teacherName: 'Cô giáo Minh Thu',
      //     rating: '4.5',
      //     ratingCount: 20,
      //     level: 1,
      //     tags: [
      //       {
      //         id: 1,
      //         name: 'Vật lý 12',
      //       },
      //       {
      //         id: 2,
      //         name: 'Luyện thi đại học',
      //       },
      //       {
      //         id: 3,
      //         name: 'Vật lý nâng cao',
      //       },
      //     ],
      //   },
      // ],
    }
  },
  methods: {
    onSubmitSearch(value) {
      console.log(value)
      let url = 'de-thi?'
      if (value.keyword !== '') {
        url += `keyword=${value.keyword}&`
      }

      if (value.category !== '') {
        url += `category=${value.category}`
      }
      this.$router.push(url)
    },
  },
})
</script>
