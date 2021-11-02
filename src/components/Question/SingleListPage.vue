<template>
  <div class="form-single-question">
    <div class="form-headline">
      <div class="headline-left">
        <label for="">{{ $t('highSchoolGraduationExam') }}</label>
        <span>{{ $t('basic') }}</span>
        <span>{{ $t('anOption') }}</span>
        <span>{{ $t('draft') }}}</span>
      </div>
      <div class="headline-right">
        <a href="">{{ $t('WatchOnWeb') }}</a>

        <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
          <template #button-content>
            <i class="fas fa-ellipsis-v"></i>
          </template>
          <b-dropdown-item href="#">{{ $t('update') }}</b-dropdown-item>
          <b-dropdown-item href="#">{{ $t('copy') }}</b-dropdown-item>
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
        III In terms of the read and write speed of a USB memory, the speed of a
        PC with a 64-bit CPU is twice as fast as that of a PC with a 32-bit CPU.
      </div>
      <div class="answer">
        <ul>
          <li v-for="(answer, index) in 4" :key="index" type="A">
            Deciding one’s own strategy in a game according to the strategy of
            the opponent
          </li>
        </ul>
      </div>
    </div>
    <b-pagination
      class="pagination"
      first-number
      align="center"
      size="lg"
    ></b-pagination>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SingleListPage',
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },

  setup: () => {},
})
</script>
