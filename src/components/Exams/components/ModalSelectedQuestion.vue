<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form class="exam-form" @submit.prevent="handleSubmit(onSubmit)">
        <div class="mb-3 row">
          <label for="staticEmail" class="col-sm-3 col-form-label">
            {{ $t('modalQToExam.totalQuestion') }}
          </label>
          <div class="col-sm-9">
            <!-- <input

              type="text"
              readonly

              :value="questions.length"
            /> -->
            <span id="staticEmail" class="form-control-plaintext">{{
              questions.length
            }}</span>
          </div>
        </div>
        <ValidationProvider :name="$t('section.title')">
          <div class="form-rows row">
            <b-form-group
              :label="$t('section.title')"
              :description="$t('section.addDesc')"
              label-for="sections"
              class="col-12 col-md-9"
            >
              <treeselect
                id="sections"
                v-model="dataSubmit.sectionHashId"
                :multiple="false"
                :options="sections"
                :load-options="loadOptions"
                :normalizer="normalizer"
                :placeholder="$t('section.title')"
              >
              </treeselect>
            </b-form-group>
            <div class="col-12 col-md-3 align-self-center">
              <b-button v-b-modal.modal-section variant="btn btn-primary">
                <b-icon-plus></b-icon-plus>
              </b-button>
            </div>
          </div>
        </ValidationProvider>
        <ValidationProvider
          :name="$t('modalQToExam.position')"
          rules="required"
        >
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('modalQToExam.position')"
            label-for="position"
            class="mt-3"
          >
            <treeselect
              id="position"
              v-model="dataSubmit.position"
              :multiple="false"
              :options="positionItems"
              :load-options="loadOptions"
              :placeholder="$t('modalQToExam.position')"
              :clearable="false"
            >
            </treeselect>
            <b-form-invalid-feedback :state="valid">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider
          :name="$t('modalQToExam.point')"
          rules="required|min_value:1"
        >
          <b-form-group
            slot-scope="{ valid, errors }"
            :label="$t('modalQToExam.point')"
            label-for="point"
            class="mt-3"
          >
            <b-form-input
              id="point"
              v-model="dataSubmit.point"
              trim
            ></b-form-input>
            <b-form-invalid-feedback :state="valid">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <div class="mt-3">
          <button type="submit" class="btn btn-primary">
            {{ $t('modalQToExam.save') }}
          </button>
          <span class="btn btn-outline-secondary" @click="closeFormOnSection()">
            {{ $t('modalQToExam.close') }}
          </span>
        </div>
      </b-form>
    </ValidationObserver>
    <b-modal id="modal-section" hide-footer :title="$t('section.add')">
      <ModalAddSection
        :exam-hash-id="examHashId"
        @on-add-section="onAddSection"
      />
    </b-modal>
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useContext,
  useFetch,
  useAsync,
} from '@nuxtjs/composition-api'
import examApi from '@/api/examApi'
import catalogApi from '@/api/catalogApi'
import ModalAddSection from '@/components/Exams/ModalAddSection.vue'
export default defineComponent({
  auth: true,
  components: { ModalAddSection },
  props: {
    examHashId: {
      type: String,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { $loader, $logger } = useContext()
    const data = reactive({
      sections: [],
      total: 0,
      positionItems: [],
      dataSubmit: {
        sectionHashId: null,
        position: 2,
        point: 1,
      },
      normalizer(node) {
        return {
          id: node.hashId,
          label: node.title,
          children: null,
        }
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

    const { fetch } = useFetch(async () => {
      $loader()
      const { data: exams } = await examApi.getSectionsByExam(props.examHashId)
      data.sections = exams.object.items
      data.total = exams.object.total
      $loader().close()
    })

    fetch()

    return {
      ...toRefs(data),
      fetch,
    }
  },
  methods: {
    loadOptions({ action, parentNode, callback }) {},
    async onSubmit() {
      if (!this.questions || this.questions.length === 0) {
        this.$toast
          .show(this.$i18n.t('modalQToExam.errors.questionEmpty'))
          .goAway(1000)
        return
      }
      if (this.questions.length > 10) {
        this.$toast
          .show(this.$i18n.t('modalQToExam.errors.moreThanTen'))
          .goAway(1000)
        return
      }
      // prepare data
      const questionItems = []
      this.questions.forEach((value) => {
        questionItems.push({
          questionHashId: value.hashId,
          sectionHashId: this.dataSubmit.sectionHashId,
          position: this.dataSubmit.position,
          point: this.dataSubmit.point,
          itemType: value.itemType,
        })
      })
      try {
        const { data } = await examApi.addExamQuestions({
          examHashId: this.examHashId,
          questions: questionItems,
        })
        this.$handleError(data)
        this.$emit('add-questions')
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
    async onAddSection(value) {
      this.$bvModal.hide('modal-section')
      await this.fetch()
      this.dataSubmit.sectionHashId = value.hashId
    },
    closeFormOnSection() {
      this.$bvModal.hide('modal-selected')
    },
  },
})
</script>
