<template>
  <vue-tags-input
    v-model="tag"
    :tags="compareTags"
    :autocomplete-items="autocompleteItems"
    :placeholder="$t('exam.form.tagHolder')"
    :max-tags="5"
    :autocomplete-min-length="2"
    :validation="validation"
    @tags-changed="update"
  />
</template>

<script>
import _ from 'lodash'
import CauHoiApi from '@/api/cauHoi'
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tags: [],
      tag: '',
      autocompleteItems: [],
      validation: [
        {
          classes: 'class' /* css class */,
          rule: /^.{2,255}$/,
          disableAdd: true,
        },
      ],
    }
  },
  computed: {
    compareTags() {
      const handleTags = []
      this.value.forEach((item) => {
        handleTags.push({
          text: item,
          tiClasses: ['ti-valid'],
        })
      })
      return handleTags
    },
  },
  watch: {
    tag() {
      if (this.tags.length === 5) {
        this.resetTag()
        this.$toast.show('Tối đa là 5 thẻ').goAway(1000)
        return
      }
      this.initItems()
    },
  },
  methods: {
    beforeSave() {
      if (this.tag.length < 2) return false
    },
    resetTag() {
      console.log('ádasd')
      this.tag = ''
    },
    update(newTags) {
      console.log('ok')
      this.autocompleteItems = []
      this.tags = newTags
      const getT = newTags.map((x) => x.text)
      this.$emit('input', getT)
    },
    initItems() {
      if (this.tag.length < 2) return
      this.searchTag(this.tag)
    },
    searchTag: _.debounce(async function (term) {
      try {
        const { data } = await CauHoiApi.getTagByKey(term)
        this.autocompleteItems = data.object.items.map((a) => {
          return { text: a.label }
        })
        console.log(this.autocompleteItems)
      } catch (err) {
        this.$logger.debug(err)
      }
    }, 200),
  },
}
</script>

<style></style>
