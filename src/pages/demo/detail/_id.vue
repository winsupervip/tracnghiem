<template>
  <div>
    <tr>
      <td>ID:</td>
      <td>{{ detailProduct.productId }}</td>
    </tr>
    <tr>
      <td>Name:</td>
      <td>{{ detailProduct.productName }}</td>
    </tr>
    <tr>
      <td>Description:</td>
      <td>{{ detailProduct.description }}</td>
    </tr>
    <tr>
      <td>Category Name:</td>
      <td>{{ detailProduct.categoryName }}</td>
    </tr>

    <nuxt-link :to="{ path: '/demo' }"> Back to main </nuxt-link>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useFetch,
  useRoute,
  useMeta,
} from '@nuxtjs/composition-api'
import productAPI from '../../../api/demo'

export default defineComponent({
  auth: false,
  setup() {
    const route = useRoute()
    const data = reactive({
      productId: route.value?.params?.id,
      detailProduct: {},
    })
    // use set data for Meta web
    const { title } = useMeta()

    useFetch(async () => {
      const { data: result } = await productAPI.detailProduct(data.productId)

      data.detailProduct = result.object
      title.value = data.detailProduct.productName
    })

    return {
      ...toRefs(data),
    }
  },
  head: {},
})
</script>
