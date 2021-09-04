<template>
  <div>
    <table id="my-table" class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Product name</th>
          <th scope="col">Description</th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.productId">
          <td>{{ product.productId }}</td>
          <td>{{ product.productName }}</td>
          <td>{{ product.description }}</td>
          <td>
            <nuxt-link :to="{ path: 'demo/detail/' + product.productId }">
              Detail
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ListProductComponent',
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
  setup() {},
})
</script>
