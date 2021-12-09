<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <b-form class="exam-form" @submit.prevent="handleSubmit(onSubmit)">
      <ValidationProvider :name="$t('section.title')">
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('section.title')"
          label-for="title"
          class="mt-3"
        >
          <b-form-input
            id="title"
            v-model="dataSubmit.title"
            trim
          ></b-form-input>
          <b-form-invalid-feedback :state="valid">{{
            errors[0]
          }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider :name="$t('section.position')" rules="required">
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('section.position')"
          label-for="position"
          class="mt-3"
        >
          <treeselect
            id="position"
            v-model="dataSubmit.position"
            :multiple="false"
            :options="positionItems"
            :load-options="loadOptions"
            :placeholder="$t('section.position')"
            :clearable="false"
          >
          </treeselect>
          <b-form-invalid-feedback :state="valid">{{
            errors[0]
          }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider
        :name="$t('section.numberQuestionsTest')"
        rules="required|min_value:1"
      >
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('section.numberQuestionsTest')"
          label-for="numberQuestionsTest"
          class="mt-3"
        >
          <b-form-input
            id="numberQuestionsTest"
            v-model="dataSubmit.numberQuestionsTest"
            trim
          ></b-form-input>
          <b-form-invalid-feedback :state="valid">{{
            errors[0]
          }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider :name="$t('section.description')" rules="max:1000">
        <b-form-group
          slot-scope="{ valid, errors }"
          :label="$t('section.description')"
          label-for="description"
          class="mt-3"
        >
          <b-form-textarea
            id="description"
            v-model="dataSubmit.description"
            rows="3"
            max-rows="6"
            trim
          ></b-form-textarea>
          <b-form-invalid-feedback :state="valid">{{
            errors[0]
          }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <div class="mt-3">
        <button type="submit" class="btn btn-primary">
          {{ $t('modalQToExam.save') }}
        </button>
        <span class="btn btn-outline-secondary" @click="closseModal">
          {{ $t('modalQToExam.close') }}
        </span>
      </div>
    </b-form>
  </ValidationObserver>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useContext,
  useAsync,
} from '@nuxtjs/composition-api'
import examApi from '@/api/examApi'
import catalogApi from '@/api/catalogApi'
export default defineComponent({
  auth: true,
  props: {
    examHashId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { $loader, $logger } = useContext()
    const data = reactive({
      positionItems: [],
      dataSubmit: {
        hashIdExamSection: null,
        hashIdExam: null,
        title: '',
        description: '',
        numberQuestionsTest: 1,
        position: 2,
      },
    })

    useAsync(async () => {
      $loader()
      $logger.info('load data')
      const [{ data: positionItems }] = await Promise.all([
        catalogApi.getItemSortTypeInExam(),
      ])
      data.positionItems = positionItems.object.items
      $loader().close()
    })
    return {
      ...toRefs(data),
    }
  },
  methods: {
    loadOptions({ action, parentNode, callback }) {},
    async onSubmit() {
      try {
        this.dataSubmit.hashIdExam = this.examHashId

        const { data } = await examApi.addExamSection({
          examSection: this.dataSubmit,
        })
        this.$handleError(data)
        this.$emit('on-add-section', data.object.data)
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    closseModal() {
      this.$bvModal.hide('modal-section')
    },
  },
})
</script>
