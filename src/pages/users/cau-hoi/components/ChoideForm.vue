<template>
  <section>
    <p class="border_title"><strong>Chuyên mục(*)</strong></p>
    <!-- <treeselect v-model="value" class="display" />
    <treeselect-value :value="value" /> -->
    <div class="container">
      <label v-for="option in listCheckbox" :key="option.id"
        ><input v-model="listFormCheck" :value="option.id" type="checkbox" />{{
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
  props: {
    getFormCheckbox: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      listFormCheck: [],
      listCheckbox: [
        {
          id: 1,
          value: false,
          name: 'Tốt nghiệp THPT',
        },
        {
          id: 2,
          value: false,
          name: 'Giáo dục K12',
        },
        {
          id: 3,
          value: false,
          name: 'Ngoại ngữ',
        },
        {
          id: 4,
          value: false,
          name: 'Đại học',
        },
      ],
    })
    watch(
      () => data.listFormCheck,
      () => {
        props.getFormCheckbox(data.listFormCheck)
      }
    )
    return {
      ...toRefs(data),
    }
  },
})
</script>
<style lang="scss" scoped>
section {
  border: 1px solid #aaa;
}
.container {
  display: flex;
  flex-direction: column;
}
.display {
  display: none;
}
.border_title {
  border-bottom: 1px solid #aaa;
  padding: 0.5em;
}
</style>
