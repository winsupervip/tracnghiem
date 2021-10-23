<template>
  <div class="rightCardForAddQuestion">
    <p class="border_title"><strong>Cài đặt SEO*</strong></p>
    <!-- <ValidationProvider v-slot="{ errors }" rules="required">
      <b-form-input
        v-model="seoTitle"
        name="Tiêu dề SEO"
        placeholder="Tiêu đề SEO *"
        :class="[$style.container, $style.inputF]"
      ></b-form-input>
      <b-alert v-if="errors[0]" id="error" show variant="warning"
        >Tiêu đề SEO là bắt buộc</b-alert
      >
    </ValidationProvider> -->
    <b-form-input
      v-model="seoTitle"
      placeholder="Tiêu đề SEO *"
      :class="[$style.container, $style.inputF]"
    ></b-form-input>

    <b-alert v-if="errors[4]" id="error" show variant="warning">{{
      errors[4]
    }}</b-alert>
    <b-form-textarea
      id="textarea-default"
      v-model="seoDescription"
      placeholder="Default textarea"
      :class="$style.inputF"
    ></b-form-textarea>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    getSeo: {
      type: Function,
      required: true,
    },
    errors: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      seoTitle: '',
      seoDescription: '',
    }
  },
  watch: {
    seoTitle() {
      this.getSeo({
        seoTitle: this.seoTitle,
        seoDescription: this.seoDescription,
      })
    },
    seoDescription() {
      this.getSeo({
        seoTitle: this.seoTitle,
        seoDescription: this.seoDescription,
      })
    },
  },
})
</script>
<style lang="scss" module>
.container {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.inputF {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
