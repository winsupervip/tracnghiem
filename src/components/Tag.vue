<template>
  <vue-tags-input
    v-model="tag"
    :tags="tags"
    :autocomplete-items="autocompleteItems"
    :placeholder="$t('exam.form.tagHolder')"
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
    }
  },
  watch: {
    tag() {
      this.initItems()
    },
  },
  created() {
    this.tags = this.value
  },
  methods: {
    update(newTags) {
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
