<template>
  <div class="list-single-question">
    <h3 class="question-number">
      Câu hỏi: {{ getSortNumber(itemData.sortOrder) }}
    </h3>
    <div class="list-questions-user">
      <b-card
        class="card-question mb-3"
        header-tag="header"
        footer-tag="footer"
      >
        <slot name="header"></slot>
        <template #header>
          <QuestionHeader :questions="itemData.item" />
        </template>
        <div class="list-question">
          <div class="question-item">
            <div class="question-content text-smd">
              <QuestionTags :questiontags="itemData.item" />
              <QuestionClusterList :questionlist="itemData.item" />
            </div>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionHeader from '@/components/Question/QuestionHeader.vue'
import QuestionClusterList from '@/components/Question/QuestionClusterList.vue'
import QuestionTags from '@/components/Question/QuestionTags.vue'
export default defineComponent({
  name: 'SingleListPage',
  components: {
    QuestionHeader,
    QuestionTags,
    QuestionClusterList,
  },
  props: {
    itemData: {
      type: Object,
      required: true,
    },
    sectionOrder: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  setup: () => {},
  computed: {
    questions() {
      return this.itemData.item.questions
    },
  },
  methods: {
    getSortNumber(sortNumber) {
      return (this.sectionOrder > 0 ? this.sectionOrder - 1 : 0) + sortNumber
    },
  },
})
</script>
