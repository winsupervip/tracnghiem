<template>
  <b-row class="card-review">
    <b-col sm="12" md="3">
      <div class="card-review-left">
        <span class="number">5</span>
        <b-form-rating value="5" class="custom-rating mb-1" readonly />
        <span>26 đánh giá</span>
      </div>
    </b-col>
    <b-col sm="12" md="9">
      <div class="card-review-right">
        <div class="rate-row">
          <div class="rate-progress">
            <b-progress variant="success" value="75" max="100" />
          </div>
          <div class="rate-star text-yellow">
            <i class="icon-star-fill" />
            <i class="icon-star-fill" />
            <i class="icon-star-fill" />
            <i class="icon-star-fill" />
            <i class="icon-star-fill" />
          </div>
          <div class="rate-num">75%</div>
        </div>
        <div class="rate-row">
          <div class="rate-progress">
            <b-progress variant="success" value="10" max="100" />
          </div>
          <div class="rate-star text-yellow">
            <i class="icon-star-fill" />
            <i class="icon-star-fill" />
            <i class="icon-star-fill" />
            <i class="icon-star-fill" />
            <i class="icon-star" />
          </div>
          <div class="rate-num">10%</div>
        </div>
        <div class="rate-row">
          <div class="rate-progress">
            <b-progress variant="success" value="5" max="100" />
          </div>
          <div class="rate-star text-yellow">
            <i class="icon-star-fill" />
            <i class="icon-star-fill" />
            <i class="icon-star-fill" />
            <i class="icon-star" />
            <i class="icon-star" />
          </div>
          <div class="rate-num">5%</div>
        </div>
        <div class="rate-row">
          <div class="rate-progress">
            <b-progress variant="success" value="5" max="100" />
          </div>
          <div class="rate-star text-yellow">
            <i class="icon-star-fill" />
            <i class="icon-star-fill" />
            <i class="icon-star" />
            <i class="icon-star" />
            <i class="icon-star" />
          </div>
          <div class="rate-num">5%</div>
        </div>
        <div class="rate-row">
          <div class="rate-progress">
            <b-progress variant="success" value="5" max="100" />
          </div>
          <div class="rate-star text-yellow">
            <i class="icon-star" />
            <i class="icon-star" />
            <i class="icon-star" />
            <i class="icon-star" />
            <i class="icon-star" />
          </div>
          <div class="rate-num">5%</div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Overview',
  setup() {},
})
</script>
