<template>
  <div class="d-flex">
    <div class="question-hashtag">
      <div class="d-flex align-items-center flex-wrap">
        <p v-for="tag in questiontags.tagItems" :key="tag.tagId" class="me-3">
          <a href="">#{{ tag.tagName }}</a>
        </p>
      </div>
      <div class="list-status-question">
        <div v-if="questiontags.itemType === 'question'">
          <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
            questiontags.levelName
          }}</span>
          <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
            questiontags.questionTypeName
          }}</span>
          <span
            :class="
              questiontags.statusName === 'Công khai'
                ? 'btn btn-xs rounded-pill btn-green-light me-2'
                : questiontags.statusName === 'Không công khai'
                ? 'btn btn-xs rounded-pill btn-blue-light me-2'
                : 'btn btn-xs rounded-pill btn-yellow-light me-2'
            "
          >
            {{ questiontags.statusName }}</span
          >
        </div>
        <div v-if="questiontags.itemType === 'group'">
          <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
            questiontags.levelName
          }}</span>

          <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
            questiontags.statusName
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'QuestionTags',
  auth: false,
  props: {
    questiontags: {
      type: Object,
      required: true,
    },
  },
})
</script>
