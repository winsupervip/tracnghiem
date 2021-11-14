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
                        <b-button
                          variant="info"
                          size="sm"
                          class="px-2"
                          @click="
                            $bvModal.show('bv-modal-update-child-question')
                          "
                        >
                          <b-icon
                            icon="pencil-square"
                            @click="updateQuestion(question)"
                          />
                        </b-button>
                        <b-button
                          variant="danger"
                          size="sm"
                          class="px-2"
                          @click="deletedQuestion(question)"
                        >
                          <b-icon icon="trash" />
                        </b-button>
                      </b-button-group>
                    </div>
                  </div>
                </li>
                <b-modal
                  id="bv-modal-update-child-question"
                  ref="modal-question"
                  size="xl"
                  :title="$t('addMoreAnswers')"
                  hide-footer
                  @shown="shown"
                  @hide="hide"
                >
                  <TinyEditor
                    v-model="questionContent"
                    :options="optionsText"
                  />
                  <b-button class="btnQuestion" variant="outline-primary">{{
                    $t('Cập nhập câu trả lời')
                  }}</b-button>
                  <b-button
                    class="btnQuestion btnQuestion--close"
                    variant="outline-primary"
                    @click="hideModal"
                    >{{ $t('close') }}</b-button
                  >
                </b-modal>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  reactive,
  toRefs,
} from '@nuxtjs/composition-api'
import QuestionApi from '@/api/question-list-page'
export default defineComponent({
  name: 'MultiListPage',

  props: {
    questionlist: {
      type: Object,
      required: true,
    },
  },

  setup: (props) => {
    const { $logger } = useContext()
    const deletedQuestion = async (question) => {
      const result = await QuestionApi.deletedQuestion(question.hashId)
      $logger.info('deleted', result)
    }
    const data = reactive({
      questionContent: '',
      optionsText: {
        convert_urls: false,
        entity_encoding: 'raw',
      },
      doShow: false,
      okOnly: true,
    })
    const updateQuestion = (question) => {
      // const questionTitle = props.questionlist.questions.filter(
      //   (question) => question.hashId === hashId
      // )
      // console.log(questionTitle)
      // data.questionContent = questionTitle[0].questionContent
      $logger.info('update', question)
    }

    return {
      ...toRefs(data),
      deletedQuestion,
      updateQuestion,
    }
  },
  methods: {
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
      // this.updateAnswer('remove_data')
    },
    hideModal() {
      this.$refs['modal-question'].hide()
    },
  },
})
</script>
