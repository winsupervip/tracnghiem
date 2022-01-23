<template>
  <div>
    <b-breadcrumb :items="breadcrumbs" class="mb-2"></b-breadcrumb>
    <div class="page-heading-title mb-2">
      <h1 class="page-title">
        {{ dataExam.exam ? dataExam.exam.title : 'tracnghiem.vn' }}
      </h1>
      <span class="badge rounded-full bg-green exam-level"
        >{{ dataExam.exam.levelId | formatLevel }}
      </span>
    </div>
    <div class="page-heading-description mb-3">
      <p v-html="dataExam.exam.description"></p>
    </div>
    <div class="exam-teacher-row row align-items-center mb-3">
      <b-col cols="12" sm="12" md="4">
        <div class="card-exam-teacher">
          <nuxt-link to="#" class="text-white">
            <img
              class="avatar avatar-md border-2 border-white border-solid"
              :src="dataExam.exam.image"
              :alt="
                dataExam.exam.authorName
                  ? dataExam.exam.authorName
                  : 'Trắc Nghiệm.vn'
              "
            />
            <span class="ms-2">{{
              dataExam.exam.authorName
                ? dataExam.exam.authorName
                : 'tracnghiem.vn'
            }}</span>
          </nuxt-link>
        </div>
      </b-col>
      <b-col cols="12" sm="12" md="4">
        <div class="d-flex">
          <b-form-rating
            :value="dataExam.exam.rating"
            class="custom-rating"
            readonly
          />
          <div class="mx-2">
            <strong>{{ dataExam.exam.rating }}</strong>
            <span>({{ dataExam.exam.totalRating }})</span>
          </div>
        </div>
      </b-col>
      <b-col cols="12" sm="12" md="4">
        <div v-if="dataExam.exam.category" class="exam-category">
          <nuxt-link :to="dataExam.exam.category.slug" class="text-white">
            {{ dataExam.exam.category.categoryName }}
          </nuxt-link>
        </div>
      </b-col>
    </div>
    <div class="toolbar-action-exam">
      <div class="action-exam">
        <WishList
          :hash-id="hashId"
          :is-wishlist="dataExam.exam.wishlist"
          :type-wishlist="3"
        />
        <SaveLable :hash-id="hashId" :type-wishlist="3" :type-label="3" />
        <b-btn
          variant="outline-light"
          class="btn-outline-white font-smd btn-action"
        >
          <i class="icon-share me-3"></i>
          Chia sẻ
        </b-btn>
      </div>
      <div class="exam-report">
        <b-btn
          class="btn-transparent font-smd btn-text"
          @click="openReportModal"
        >
          <i class="icon-flag"></i> Báo cáo
        </b-btn>
      </div>
    </div>

    <Report
      :hash-id="hashId"
      report-type-id="3"
      :is-open="isOpen"
      @isClose="isClose"
    /><b-modal id="mustLogin" title="Thông báo" ok-only>
      <p class="d-flex justify-content-center">Bạn cần đăng nhập</p>
    </b-modal>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  useRoute,
} from '@nuxtjs/composition-api'
import SaveLable from '@/components/SaveLabel.vue'
import Report from '@/components/Report.vue'
import WishList from '@/components/WishList.vue'
export default defineComponent({
  name: 'Heading',
  components: {
    Report,
    WishList,
    SaveLable,
  },
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
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute()
    const idSlug = computed(() => route.value.params.id)
    const arr = idSlug.value.split('-')
    const id = arr[arr.length - 1]
    const data = reactive({
      hashId: id || null,
      optionsBookmark: [
        { text: 'Yêu thích', value: 1 },
        { text: 'Đề vật lý', value: 2 },
      ],
      optionSave: props.dataExam,
      isOpen: false,
    })
    return {
      ...toRefs(data),
    }
  },
  watch: {
    dataExam() {
      console.log('adasww', this.dataExam)
    },
  },
  mounted() {
    console.log('adas', this.dataExam)
  },
  methods: {
    openReportModal() {
      this.isOpen = true
    },
    isClose() {
      this.isOpen = false
    },
  },
})
</script>
