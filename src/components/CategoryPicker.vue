<template>
  <treeselect
    v-model="categoryId"
    :multiple="false"
    :async="false"
    :load-options="loadOptions"
    :options="defaultOptions"
    :auto-load-root-options="true"
  />
</template>
<script>
import {
  ASYNC_SEARCH,
  LOAD_CHILDREN_OPTIONS,
  LOAD_ROOT_OPTIONS,
} from '@riophae/vue-treeselect'
// import _ from 'lodash'
import catalogApi from '@/api/catalogApi'
export default {
  data() {
    return {
      categoryId: null,
      defaultOptions: [],
    }
  },
  created() {
    this.getDefaultOptions()
  },
  methods: {
    async loadOptions({ action, callback, parentNode, searchQuery }) {
      console.log(action)
      await this.searchAsync(action, callback, parentNode, searchQuery)
    },
    async searchAsync(action, callback, parentNode, searchQuery) {
      try {
        // console.log(searchQuery)
        searchQuery = searchQuery ?? ''
        if (action === ASYNC_SEARCH) {
          const { data } = await catalogApi.getCategoriesByParent(0, 0)
          const options = data.object.items
          callback(null, options)
        } else if (action === LOAD_CHILDREN_OPTIONS) {
          const parentId = parentNode?.id
          const { data } = await catalogApi.getCategoriesByParent(parentId, 0)
          parentNode.children = data.object.items
          console.log(parentNode)
          callback()
        } else if (action === LOAD_ROOT_OPTIONS) {
          const { data } = await catalogApi.getCategoriesByParent(0, 0)
          const options = data.object.items
          this.defaultOptions = options
          callback()
        }
      } catch (err) {
        callback(null, [])
      }
    },
    async getDefaultOptions() {
      try {
        const { data } = await catalogApi.getCategoriesByParent(0, 0)
        this.defaultOptions = data.object.items
        console.log(this.defaultOptions)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
