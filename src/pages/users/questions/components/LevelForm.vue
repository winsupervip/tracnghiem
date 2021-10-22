<template>
  <section class="rightCardForAddQuestion">
    <!-- <treeselect
      v-model="value"
      :class="$style.display"
      :multiple="true"
      :options="options"
      :value-consists-of="valueConsistsOf"
    /> -->
    <p class="border_title"><strong>Mức độ (*)</strong></p>
    <div class="container">
      <label v-for="option in listLevelRadio" :key="option.id"
        ><input v-model="levelForm" type="radio" :value="option.id" />{{
          option.name
        }}</label
      >
    </div>
    <b-alert v-if="errors[3]" id="error" show variant="warning">{{
      errors[3]
    }}</b-alert>
  </section>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
} from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'LevelForm',
  props: {
    getLevelForm: {
      type: Function,
      required: true,
    },
    errors: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      levelForm: [],
      listLevelRadio: [
        {
          id: 1,
          value: false,
          name: 'Cơ bản',
        },
        {
          id: 2,
          value: false,
          name: 'Trung bình',
        },
        {
          id: 3,
          value: false,
          name: 'Nâng cao',
        },
        {
          id: 4,
          value: false,
          name: 'Khó',
        },
      ],
    })
    watch(
      () => data.levelForm,
      () => {
        props.getLevelForm(data.levelForm)
      }
    )
    return {
      ...toRefs(data),
    }
  },
})
</script>
<style lang="scss" module></style>
