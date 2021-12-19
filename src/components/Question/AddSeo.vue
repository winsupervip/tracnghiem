<template>
  <div class="p-question__box">
    <p class="p-question__box__heading">
      <strong>{{ $t('SEOsettings*') }}</strong>
    </p>

    <div class="p-question__box__body">
      <div class="p-question__box__body__item">
        <b class="d-block">{{ $t('title') }}</b>
        <ValidationProvider rules="required" name="Tiêu Đề SEO">
          <b-form-group slot-scope="{ valid, errors }" :label-for="$t('title')">
            <b-form-input
              v-model="seoTitle"
              :class="[$style.container, $style.inputF]"
              type="text"
              :state="errors[0] ? false : valid ? true : null"
              placeholder="Tiêu đề SEO *"
            >
            </b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <b class="d-block">{{ $t('SEOdescription (*)') }}</b>
        <ValidationProvider rules="required" name="Mô tả SEO">
          <b-form-group slot-scope="{ valid, errors }">
            <b-form-textarea
              id="textarea-default"
              v-model="seoDescription"
              :placeholder="$t('SEOdescription (*)')"
              :state="errors[0] ? false : valid ? true : null"
              :class="[$style.container, $style.inputF]"
            ></b-form-textarea>
            <b-form-invalid-feedback id="inputLiveFeedback">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { mapActions, mapGetters } from 'vuex'
export default defineComponent({
  data() {
    return {
      seoTitle: '',
      seoDescription: '',
    }
  },
  computed: {
    ...mapGetters({
      getTitle: 'questions/getTitle',
      getSeoTitle: 'questions/getSeoTitle',
      getseoDescription: 'questions/getseoDescription',
      getQuestionPlanText: 'questions/getQuestionPlanText',
    }),
  },
  watch: {
    seoTitle() {
      this.addSeoTitle(this.seoTitle)
    },
    seoDescription() {
      this.addSeoDescription(this.seoDescription)
    },
    getTitle() {
      this.seoTitle = this.getTitle
    },
    getQuestionPlanText() {
      this.seoDescription = this.getQuestionPlanText
    },
  },
  mounted() {
    this.seoTitle = this.getTitle
    this.seoDescription = this.getseoDescription
  },
  methods: {
    ...mapActions({
      addSeoTitle: 'questions/addSeoTitle',
      addSeoDescription: 'questions/addSeoDescription',
    }),
  },
})
</script>
<style lang="scss" module>
.container {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.inputF {
  margin-bottom: 15px;
}
</style>
