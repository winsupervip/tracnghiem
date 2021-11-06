<template>
  <div class="list-multiple-question">
    <div class="list-questions-user">
      <div class="list-question">
        <div class="question-item">
          <div class="question-content text-smd">
            <p v-html="questionlist.description"></p>
          </div>
          <div class="question-item-answer">
            <div class="answer-head">
              <span class="font-sm text-gray">{{ $t('answer') }}</span>
            </div>
            <div class="list-answer">
              <ul class="list-unstyled p-0 m-0">
                <li
                  v-for="(question, index) in questionlist.questions"
                  :key="question.id"
                >
                  <div class="d-flex justify-content-between">
                    <div>
                      <strong>Câu {{ index + 1 }} :</strong>
                      {{ question.title }}
                    </div>
                    <div class="d-flex">
                      <b-button-group>
                        <b-button variant="info" size="sm" class="px-2">
                          <b-icon icon="pencil-square" />
                        </b-button>
                        <b-button
                          variant="danger"
                          size="sm"
                          class="px-2"
                          @click="deletedGroupQuestion(questionlist)"
                        >
                          <b-icon icon="trash" />
                        </b-button>
                      </b-button-group>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import QuestionApi from '@/api/question-list-page'
export default defineComponent({
  name: 'MultiListPage',

  props: {
    questionlist: {
      type: Object,
      required: true,
    },
  },

  setup: () => {
    const { $logger } = useContext()
    const deletedGroupQuestion = async (value) => {
      const result = await QuestionApi.deletedQuestionGroup(value.hashId)

      $logger.info('123', value)
      $logger.info('1234', result)
    }

    return {
      deletedGroupQuestion,
    }
  },
})
</script>
