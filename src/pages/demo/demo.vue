<template>
  <div>
    <span>Demo NuxtJS</span>
    <products-component :products="listProducts" />

    <b-pagination-nav
      v-model="currentPage"
      :link-gen="linkGen"
      :number-of-pages="10"
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
    const { $logger } = useContext()
    const route = useRoute()
    const queryPage = route?.value?.query?.page || 1
    const data = reactive({
      pageSize: 10,
      listProducts: [],
      total: 0,
      currentPage: queryPage,
    })

    const { fetch } = useFetch(async () => {
      const { data: result } = await productAPI.products({
        page: data.currentPage,
        pageSize: data.pageSize,
      })
      data.listProducts = result.object?.items
      data.total = result.object?.total
      $logger.info('trung log nek hehe 1')
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
