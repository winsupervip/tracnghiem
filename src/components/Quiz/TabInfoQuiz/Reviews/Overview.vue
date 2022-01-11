<template>
  <b-row class="card-review">
    <b-col sm="12" md="3">
      <div class="card-review-left">
        <span class="number">{{ rates.avgRate }}</span>
        <b-form-rating value="5" class="custom-rating mb-1" readonly />
        <span>{{ rates.total }} đánh giá</span>
      </div>
    </b-col>
    <b-col sm="12" md="9">
      <div class="card-review-right">
        <div v-for="(rate, index) in rates.items" :key="index" class="rate-row">
          <div class="rate-progress">
            <b-progress
              variant="success"
              :value="(rate.count * 100) / rates.total"
              max="100"
            />
          </div>
          <div class="rate-star text-yellow">
            <i :class="index >= 0 ? 'icon-star-fill' : 'icon-star'" />
            <i :class="index >= 1 ? 'icon-star-fill' : 'icon-star'" />
            <i :class="index >= 2 ? 'icon-star-fill' : 'icon-star'" />
            <i :class="index >= 3 ? 'icon-star-fill' : 'icon-star'" />
            <i :class="index >= 4 ? 'icon-star-fill' : 'icon-star'" />
          </div>
          <div class="rate-num">
            {{ (rate.count / rates.total).toFixed(2) * 100 }}%
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Overview',
  props: {
    rates: {
      type: [Object],
      default: () => {},
    },
  },
})
</script>
