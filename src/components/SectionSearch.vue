<template>
  <section class="section section-search">
    <b-container>
      <div class="search-box">
        <div class="search-box-text">
          <h2 class="search-title">
            Tìm kiếm đề thi,<br />câu hỏi trắc nghiệm online
          </h2>
          <p class="search-subtitle">
            Hàng vạn đề thi từ mức độ dễ, trung bình đến khó và cực khó trên
            nhiều nhiều lĩnh vực
          </p>
        </div>
        <div class="form-search">
          <b-form @submit.prevent="onSubmitSearch">
            <div role="group" class="input-group input-keyword">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <i class="icon-search-bold"></i>
                </div>
              </div>
              <b-input
                id="input_keyword"
                v-model="dataSearch.keyword"
                name="keyword"
                placeholder="Từ khóa"
              ></b-input>
            </div>
            <div class="input-select">
              <b-select
                v-model="dataSearch.exam"
                class="form-control"
                :options="optionsExam"
              ></b-select>
            </div>
            <div class="input-select">
              <b-select
                v-model="dataSearch.category"
                class="form-control"
                :options="optionsCategory"
              ></b-select>
            </div>
            <div class="search-button">
              <b-btn type="submit" variant="primary" :disabled="isLoading">
                <span v-if="isLoading" class="d-flex align-items-center">
                  <b-spinner
                    type="grow"
                    style="width: 20px; height: 20px"
                  ></b-spinner>
                  <span class="ml-2">Tìm</span>
                </span>
                <span v-else>
                  <i class="icon-search"></i>
                  <span class="ml-2">Tìm</span>
                </span>
              </b-btn>
            </div>
          </b-form>
        </div>
      </div>
      <div class="search-img-right">
        <img class="dots-bg" src="images/dots-bg.png" alt="dots image" />
        <img
          class="search-img"
          src="images/search-img.png"
          alt="search image"
        />
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'SectionSearch',
  props: {
    dataProp: {
      type: Object,
      default: () => {},
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dataSearch: Object.assign({}, this.dataProp),
    }
  },
  computed: {
    optionsExam() {
      return [
        {
          value: '',
          text: 'Đề thi',
        },
        {
          value: 'thpt',
          text: 'Đề thi Tốt nghiệp THPT',
        },
        {
          value: 'toeic',
          text: 'Đề thi Toeic',
        },
        {
          value: 'ielts',
          text: 'Đề thi Ielts',
        },
      ]
    },
    optionsCategory() {
      return [
        {
          value: '',
          text: 'Danh mục',
        },
        {
          value: 'thpt',
          text: 'Đề thi Tốt nghiệp THPT',
        },
        {
          value: 'toeic',
          text: 'Đề thi Toeic',
        },
        {
          value: 'ielts',
          text: 'Đề thi Ielts',
        },
      ]
    },
  },
  watch: {
    dataProp(newValue) {
      this.dataSearch = { ...newValue }
    },
  },
  methods: {
    onSubmitSearch() {
      this.$emit('onSubmitSearch', this.dataSearch)
    },
  },
}
</script>
