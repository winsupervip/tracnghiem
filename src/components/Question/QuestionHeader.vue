<template #header>
  <div
    class="
      d-flex
      align-items-center
      justify-content-between
      card-question-header
    "
  >
    <div class="d-flex">
      <div class="font-bold me-3">
        <abbr :title="question.title">
          {{ question.title }}
        </abbr>
      </div>
      <div class="list-status-question">
        <div v-if="question.itemType === 'question'">
          <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
            question.levelName
          }}</span>
          <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
            question.questionTypeName
          }}</span>
          <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
            question.statusName
          }}</span>
        </div>
        <div v-if="question.itemType === 'group'">
          <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
            question.levelName
          }}</span>

          <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
            question.statusName
          }}</span>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <a
        href="/home"
        target="_blank"
        class="btn btn-sm btn-outline-primary rounded-pill me-3"
        >{{ $t('WatchOnWeb') }}</a
      >
      <b-dropdown
        class="dropdown-button-circle"
        variant="link"
        toggle-class="text-decoration-none"
        no-caret
      >
        <template #button-content>
          <i class="icon-caret-down"></i>
        </template>
        <b-dropdown-item :to="'/users/questions/edit/' + question.hashId">
          {{ $t('update') }}
        </b-dropdown-item>
        <b-dropdown-item @click="copyQuestion(question)">{{
          $t('copy')
        }}</b-dropdown-item>
        <b-dropdown-item href="#" @click="updateState(question)">{{
          $t('publish')
        }}</b-dropdown-item>
        <b-dropdown-item href="#">{{ $t('share') }}</b-dropdown-item>
        <b-dropdown-item href="#">{{ $t('references') }}</b-dropdown-item>

        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="#">{{ $t('statistic') }}</b-dropdown-item>
        <b-dropdown-item @click="DeletedQuestion(question)">{{
          $t('delete')
        }}</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

import QuestionApi from '@/api/question-list-page'
export default defineComponent({
  auth: false,
  props: {
    question: {
      type: Object,
      required: true,
    },
    isDeleteQuestion: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { $logger } = useContext()
    const updateState = async (question) => {
      await QuestionApi.updateStateQuestion(question.hashId)
    }
    const copyQuestion = async (question) => {
      if (question.itemType === 'question') {
        const result = await QuestionApi.getUserQuestionDetails(question.hashId)
        const questionData = result.data.object

        const singleQuestion = {
          question: {
            hashId: '',
            title: questionData.question.title,
            questionTypeId: questionData.question.questionTypeId,
            questionContent: questionData.question.questionContent,
            explainationIfCorrect: questionData.question.explainationIfCorrect,
            explainationIfIncorrect:
              questionData.question.explainationIfIncorrect,
            statusId: questionData.question.statusId,
            levelId: questionData.question.levelId,
            plainText: questionData.question.plainText,
            seoTitle: questionData.question.seoTitle,
            seoDescription: questionData.question.seoDescription,
            tags: questionData.question.tags,
            categories: questionData.categoryItems.map((x) => {
              return x.categoryId
            }),
            questionGroupId: questionData.question.questionGroupId,
            groupOrder: questionData.question.groupOrder,
          },
          answers: question.answers,
        }

        $logger.info(singleQuestion)
        // const result2 = await QuestionApi.createQuestion(singleQuestion)
        // $logger.info('copied question', result2)
      }
      if (question.itemType === 'group') {
        const result = await QuestionApi.getUserQuestionGroupDetails(
          question.hashId
        )
        $logger.info('create group', result)
        const questionData = result.data.object
        questionData.questionGroup.hashId = ''
        questionData.questions.map((question) => {
          question.hashId = ''
          question.answers.map((x) => (x.hashId = ''))
          delete question.categoryItems
          return question
        })

        const GroupQuestion = {
          ...questionData,
        }
        $logger.info('create group', GroupQuestion)
        // const result2 = await QuestionApi.createQuestion(GroupQuestion)
        // $logger.info('copied GroupQuestion', result2)
      }
    }

    const DeletedQuestion = async (question) => {
      if (question.itemType === 'group') {
        const result = await QuestionApi.deletedQuestionGroup(question.hashId)
        props.isDeleteQuestion(question.hashId)
        $logger.info('deleted group', result)
      } else if (question.itemType === 'question') {
        const result2 = await QuestionApi.deletedQuestion(question.hashId)
        $logger.info('deleted question', result2)
      }
      props.isDeleteQuestion(question.hashId)
    }
    return { updateState, copyQuestion, DeletedQuestion }
  },
})
</script>
<style lang="scss" scoped>
abbr[title] {
  text-decoration: none;
}
</style>
