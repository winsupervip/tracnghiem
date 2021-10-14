<template>
  <section>
    <!-- <treeselect
      v-model="value"
      :class="$style.display"
      :multiple="true"
      :options="options"
      :value-consists-of="valueConsistsOf"
    /> -->
    <p class="border_title"><strong>Xuất bản câu hỏi (*)</strong></p>
    <ul class="container">
      Hiện thị:
      <li v-for="option in listCategoryRadio" :key="option.id">
        <label
          ><input
            v-model="categoryForm"
            type="radio"
            :value="listCategoryRadio[option.id - 1]"
          />{{ option.name }}</label
        >
      </li>
    </ul>
    <p>Chỉ bạn mới thấy được câu hỏi này.</p>
    <b-button variant="outline-primary ">Lưu bản nháp</b-button>
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
  name: 'CategoryForm',
  props: {
    getCategoryForm: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      categoryForm: [],
      listCategoryRadio: [
        {
          id: 1,
          value: false,
          name: 'Công khai',
        },
        {
          id: 2,
          value: false,
          name: 'Không công khai',
        },
        {
          id: 3,
          value: false,
          name: 'Bản nháp',
        },
      ],
    })
    watch(
      () => data.categoryForm,
      () => {
        props.getCategoryForm(data.categoryForm)
      }
    )
    return {
      ...toRefs(data),
    }
  },
})
</script>
