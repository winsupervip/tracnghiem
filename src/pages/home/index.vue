<template>
  <div class="home-container">
    <SectionSearch
      :data-prop="dataSearch"
      :is-loading="isCallSearch"
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
            class="feature-topic-slider"
            v-bind="configFeatureTopic"
          >
            <div
              v-for="item in dataFeatureopic"
              :key="item.id"
              class="slider-item"
            >
              <CardTopic :data="item"></CardTopic>
            </div>
          </VueSlickCarousel>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import { defineComponent } from '@vue/composition-api'
import VueSlickCarousel from 'vue-slick-carousel'
// eslint-disable-next-line import/no-unresolved
import SectionSearch from '@/components/SectionSearch'
// eslint-disable-next-line import/no-unresolved
import Heading from '@/components/Heading'
// eslint-disable-next-line import/no-unresolved
import CardTopic from '@/components/CardTopic'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default defineComponent({
  components: {
    SectionSearch,
    Heading,
    CardTopic,
    VueSlickCarousel,
  },
  layout: 'default',
  auth: false,
  setup() {},
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
      dataFeatureopic: [
        {
          id: 1,
          name: 'Đề thi  Tốt nghiệp THPT',
          categoryCount: '20',
          examCount: '1.000',
          thumbnail: '/images/topic-1.jpg',
        },
        {
          id: 2,
          name: 'Tính cách - MBTI',
          categoryCount: '10',
          examCount: '500',
          thumbnail: '/images/topic-2.jpg',
        },
        {
          id: 3,
          name: 'Đại học',
          categoryCount: '200',
          examCount: '100',
          thumbnail: '/images/topic-3.jpg',
        },
        {
          id: 4,
          name: 'Đề thi  Tốt nghiệp THPT',
          categoryCount: '20',
          examCount: '1.000',
          thumbnail: '/images/topic-1.jpg',
        },
        {
          id: 5,
          name: 'Tính cách - MBTI',
          categoryCount: '10',
          examCount: '500',
          thumbnail: '/images/topic-2.jpg',
        },
        {
          id: 6,
          name: 'Đại học',
          categoryCount: '200',
          examCount: '50',
          thumbnail: '/images/topic-3.jpg',
        },
      ],
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
    }
  },
  methods: {
    onSubmitSearch() {
      this.isCallSearch = true
    },
  },
})
</script>
