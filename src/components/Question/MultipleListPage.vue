<template>
  <div v-if="questions.itemType === 'group'">
    <div class="form-multiple-question">
      <div class="form-headline">
        <div class="headline-left">
          <label for="">{{ $t('highSchoolGraduationExam') }}</label>
          <span>{{ $t('basic') }}</span>

          <span>{{ $t('public') }}</span>
        </div>
        <div class="headline-right">
          <a href="">{{ $t('WatchOnWeb') }}</a>
          <b-dropdown
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content>
              <i class="fas fa-ellipsis-v"></i>
            </template>
            <b-dropdown-item href="#">{{ $t('update') }}</b-dropdown-item>
            <b-dropdown-item href="#">{{ $t('copy') }}}</b-dropdown-item>
            <b-dropdown-item href="#">{{ $t('publish') }}</b-dropdown-item>
            <b-dropdown-item href="#">{{ $t('share') }}</b-dropdown-item>
            <b-dropdown-item href="#">{{ $t('references') }}</b-dropdown-item>

            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#">{{ $t('statistic') }}</b-dropdown-item>
            <b-dropdown-item href="#">{{ $t('delete') }}</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div class="line"></div>
      <div class="question">
        <div class="question-hashtag">
          <a href="">#vật lý 12</a>
          <a href="">#Luyện thi đại học</a>
          <a href="">#Vật Lý</a>
        </div>
        <div class="question">
          Which of the following lists all and only the appropriate descriptions
          about a 32-bit CPU and a 64-bit CPU? I When a 32-bit CPU and a 64-bit
          CPU are compared, a 64-bit CPU has a larger theoretical maximum memory
          space.. II There is no 32-bit OS that runs on a PC with a 64-bit CPU.
          III In terms of the read and write speed of a USB memory, the speed of
          a PC with a 64-bit CPU is twice as fast as that of a PC with a 32-bit
          CPU.
        </div>
        <div class="answer">
          <ul>
            <li v-for="answer in answers" :key="answer.id">
              <strong>câu {{ answer.id }} :</strong> {{ answer.label }}
              <button><i class="far fa-trash-alt"></i></button
              ><button><i class="far fa-edit"></i></button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SingleListPage',

  props: {
    questions: {
      type: Object,
      required: true,
    },
  },

  setup: () => {},
  data: () => ({
    answers: [
      {
        id: '1',
        label: 'chọn đáp án đúng',
      },
      {
        id: '2',
        label: 'chọn đáp án đúng',
      },
      {
        id: '3',
        label: 'chọn đáp án đúng',
      },
      {
        id: '4',
        label: 'chọn đáp án đúng',
      },
      {
        id: '5',
        label: 'chọn đáp án đúng',
      },
    ],
  }),
})
</script>
