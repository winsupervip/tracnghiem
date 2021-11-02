<template>
  <section class="p-question__box">
    <!-- <treeselect
      v-model="value"
      :class="$style.display"
      :multiple="true"
      :options="options"
      :value-consists-of="valueConsistsOf"
    /> -->
    <p class="p-question__box__heading">
      <strong>{{ $t('level') }}</strong>
    </p>
    <div class="p-question__box__body">
      <div class="p-question__box__body__item box--level">
        <label v-for="option in listLevelRadio" :key="option.id"
          ><input v-model="levelForm" type="radio" :value="option.id" />{{
            option.name
          }}</label
        >
        <b-alert v-if="errors[3]" id="error" show variant="warning">{{
          errors[3]
        }}</b-alert>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import { mapActions } from 'vuex'
export default defineComponent({
  name: 'LevelForm',
  props: {
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

    return {
      ...toRefs(data),
    }
  },
  watch: {
    levelForm() {
      this.addlevel(this.levelForm)
    },
  },
  methods: {
    ...mapActions(['addlevel']),
  },
})
</script>
