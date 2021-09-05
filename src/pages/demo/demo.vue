<template>
  <div>
    <span>Demo NuxtJS</span>
    <products-component :products="listProducts" />

    <b-pagination-nav
      v-model="currentPage"
      :link-gen="linkGen"
      :number-of-pages="10"
    />

    <vue2-tinymce-editor
      v-model="content"
      :options="options"
    ></vue2-tinymce-editor>

    <treeselect
      v-model="treeValue"
      :multiple="true"
      :options="treeData"
      placeholder="Select your favourite(s)..."
    />
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useFetch,
  useMeta,
  useRoute,
  watch,
  useContext,
} from '@nuxtjs/composition-api'

import productAPI from '../../api/demo'
import ListProductComponent from './component/products.vue'

export default defineComponent({
  auth: false, // use ignore authentication (access page without login) - Default = true
  components: {
    'products-component': ListProductComponent,
  },
  setup() {
    const { $logger, $loader } = useContext()
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1
    const data = reactive({
      pageSize: 10,
      listProducts: [],
      total: 0,
      currentPage: queryPage,
      options: {
        convert_urls: false,
        entity_encoding: 'raw',
      },
      content: '',
      treeData: [
        {
          id: 'fruits',
          label: 'Fruits',
          children: [
            {
              id: 'apple',
              label: 'Apple 🍎',
              isNew: true,
            },
            {
              id: 'grapes',
              label: 'Grapes 🍇',
            },
            {
              id: 'pear',
              label: 'Pear 🍐',
            },
            {
              id: 'strawberry',
              label: 'Strawberry 🍓',
            },
            {
              id: 'watermelon',
              label: 'Watermelon 🍉',
            },
          ],
        },
        {
          id: 'vegetables',
          label: 'Vegetables',
          children: [
            {
              id: 'corn',
              label: 'Corn 🌽',
            },
            {
              id: 'carrot',
              label: 'Carrot 🥕',
            },
            {
              id: 'eggplant',
              label: 'Eggplant 🍆',
            },
            {
              id: 'tomato',
              label: 'Tomato 🍅',
            },
          ],
        },
      ],
      treeValue: [],
    })

    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await productAPI.products({
        page: data.currentPage,
        pageSize: data.pageSize,
      })
      data.listProducts = result.object?.items
      data.total = result.object?.total
      $logger.info('trung log nek hehe 1')
      $loader().close()
    })

    // const listProductsAsyncData = useAsync(async () => {
    //   const { data: result } = await productAPI.products($axios, {
    //     page: 1,
    //     pageSize: 10,
    //   })
    //   data.listProducts = result.object?.items

    //   return result.object?.items
    // })

    const linkGen = (pageNumber) => {
      return { path: route.path, query: { page: pageNumber } }
    }

    // use set data for Meta web
    const { title } = useMeta()
    title.value = 'My title'

    watch(
      () => data.currentPage,
      () => {
        fetch()
      }
    )

    return {
      ...toRefs(data),
      // listProductsAsyncData, // return for use asyncData
      title,
      linkGen,
    }
  },
  head: {},
})
</script>

<style lang="scss" module>
.paging {
  .item {
    span {
      cursor: pointer;
    }
    padding-left: 10px;
  }
  display: flex;
}
</style>
