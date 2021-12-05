<template>
  <div v-if="itemData.item.questions.length > 0" class="section-container">
    <div>
      <div class="d-flex justify-content-between">
        <h4>
          <b> Chuyên mục: {{ name }}</b>
        </h4>
        <div>
          <b-icon-pencil-square @click="openModal"></b-icon-pencil-square>
          <b-icon-trash @click="openModalDelete"></b-icon-trash>
        </div>
      </div>

      <hr />
    </div>
    <div v-for="(question, index) in itemData.item.questions" :key="index">
      <component
        :is="dynamicComponent(question.itemType)"
        ref="questionInSection"
        :item-data="question"
        :section-order="itemData.sortOrder"
      />
    </div>
    <b-modal
      :id="`edit-section${itemData.sortOrder}`"
      title="Cập Nhập tên chuyên mục"
      ok-title="Cập nhập"
      cancel-title="Đóng"
      @ok="updateSectionName"
    >
      <b-form-input
        v-model="section.title"
        class="mb-3"
        placeholder="Tên chuyên mục"
      ></b-form-input>
      <b-form-input
        v-model="section.description"
        class="mb-3"
        placeholder="Mô tả"
      ></b-form-input>
      <b-form-input
        v-model="section.numberQuestionsTest"
        type="number"
        class="mb-3"
        placeholder="số câu hỏi"
      ></b-form-input>
      <b-form-input
        v-model="section.position"
        type="number"
        class="mb-3"
        placeholder="Vị trí xuất hiện"
      ></b-form-input>
    </b-modal>
    <b-modal
      :id="`delete-section${itemData.sortOrder}`"
      title="Xóa chuyên mục"
      ok-title="Xóa"
      cancel-title="Đóng"
      @ok="deleteSection"
    >
      <p class="my-4">Bạn có chắn chắn muốn xóa ?</p>
    </b-modal>
  </div>
</template>
<script>
import ExamQuestionSingle from './ExamQuestionSingle.vue'
import ExamQuestionGroup from './ExamQuestionGroup.vue'
import examApi from '@/api/examApi'
export default {
  components: {
    'exam-question-single': ExamQuestionSingle,
    'exam-question-group': ExamQuestionGroup,
  },
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.itemData.item.section.title,
      section: {
        hashIdExamSection: this.itemData.item.section.hashId,
        hashIdExam: this.$route.params.id,
        title: this.itemData.item.section.title,
        description: this.itemData.item.section.description,
        numberQuestionsTest: this.itemData.item.section.numberQuestionsTest,
        position: this.itemData.sortOrder,
      },
    }
  },
  computed: {
    dynamicComponent() {
      return (itemType) => {
        if (itemType === 'questionGroup') {
          return 'exam-question-group'
        }
        return 'exam-question-single'
      }
    },
  },
  mounted() {
    console.log('router', this.$route.params.id)
  },
  methods: {
    async updateSectionName() {
      const value = {
        examSection: this.section,
      }
      await examApi.updateSectionName(value)
      window.location.reload()
    },
    async deleteSection() {
      const value = {
        hashExamId: this.$route.params.id,
        hashExamSectionId: this.itemData.item.section.hashId,
      }
      await examApi.deleteSection(value)
      window.location.reload()
    },
    openModal() {
      this.$bvModal.show(`edit-section${this.itemData.sortOrder}`)
    },
    openModalDelete() {
      this.$bvModal.show(`delete-section${this.itemData.sortOrder}`)
    },
  },
}
</script>
