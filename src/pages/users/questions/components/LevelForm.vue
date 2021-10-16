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
  },
  setup(props) {
    const data = reactive({
      levelForm: [],
      listLevelRadio: [
        {
          id: 0,
          value: false,
          name: 'Cơ bản',
        },
        {
          id: 1,
          value: false,
          name: 'Trung bình',
        },
        {
          id: 2,
          value: false,
          name: 'Nâng cao',
        },
        {
          id: 3,
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
