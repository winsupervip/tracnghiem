<template>
  <div class="question">
    <p>
      Which of the following lists all and only the appropriate descriptions
      about a 32-bit CPU and a 64-bit CPU? I When a 32-bit CPU and a 64-bit CPU
      are compared, a 64-bit CPU has a larger theoretical maximum memory space..
      II There is no 32-bit OS that runs on a PC with a 64-bit CPU. III In terms
      of the read and write speed of a USB memory, the speed of a PC with a
      64-bit CPU is twice as fast as that of a PC with a 32-bit CPU.
    </p>

    <div class="answer">
      <div class="row_A">
        <label for="">Cột A</label>
        <ul>
          <li v-for="(answer, index) in 4" :key="index">
            {{ String.fromCharCode(65 + index) + '. ' }}
            <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>

            <treeselect class="choose-answer" value="as" disabled />
          </li>
        </ul>
      </div>
      <div class="row_B">
        <label for="">Cột B</label>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import '../../node_modules/bootstrap/scss/bootstrap.scss'
export default defineComponent({
  name: 'QuestionParingList',
  auth: false,
  props: {
    questionlist: {
      type: Object,
      required: true,
    },
  },
})
</script>
<style lang="scss">
.answer {
  display: flex;
  .row_A {
    width: 50%;

    label {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
    }
    ul {
      li {
        p {
          width: 20%;
        }
        .choose-answer {
          width: 40%;
        }
      }
    }
  }
  .row_B {
    width: 50%;
    text-align: center;
    label {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>
