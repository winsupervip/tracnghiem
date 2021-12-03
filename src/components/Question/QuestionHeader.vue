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
          <b-icon icon="three-dots-vertical"></b-icon>
        </template>
        <b-dropdown-item
          :to="`/users/questions/edit/${question.hashId}?type=${question.itemType}`"
        >
          {{ $t('update') }}
        </b-dropdown-item>
        <b-dropdown-item
          :to="`/users/questions/copy/${question.itemType}/${question.hashId}`"
          >{{ $t('copy') }}</b-dropdown-item
        >
        <b-dropdown-item href="#" @click="updateState(question)">{{
          $t('publish')
        }}</b-dropdown-item>
        <b-dropdown-item href="#">{{ $t('share') }}</b-dropdown-item>
        <b-dropdown-item
          :to="`/users/questions/references/${question.hashId}?type=${question.itemType}`"
          >{{ $t('documentation') }}</b-dropdown-item
        >

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
import EventBus from '../../plugins/eventBus'
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
      EventBus.$emit('update-page')
    }

    const DeletedQuestion = async (question) => {
      if (question.itemType === 'group') {
        const result = await QuestionApi.deletedQuestionGroup(question.hashId)

        $logger.info('deleted group', result)
      } else if (question.itemType === 'question') {
        const result2 = await QuestionApi.deletedQuestion(question.hashId)

        $logger.info('deleted question', result2)
      }
      props.isDeleteQuestion(question.hashId)
      EventBus.$emit('update-page')
    }
    return { updateState, DeletedQuestion }
  },
})
</script>
<style lang="scss" scoped>
abbr[title] {
  text-decoration: none;
}
</style>
