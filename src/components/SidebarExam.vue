<template>
  <div class="card-filter-wrapper">
    <b-btn class="sp btn-filter-mb" variant="primary" @click="openFilter">
      <i class="icon-filter"></i>
      Bộ lọc
    </b-btn>
    <div :class="visibleFilter ? 'card-filter open' : 'card-filter'">
      <div class="card-filter-header d-flex justify-content-between">
        <strong>Tìm kiếm</strong>
        <b-btn class="button-link font-sm" @click="clearFilter">
          Xóa bộ lọc
        </b-btn>
      </div>
      <div class="card-filter-body">
        <div class="filter-input">
          <b-input
            v-model="inputKeyword"
            placeholder="Nhập từ khóa cần tìm"
            @focus="visibleSuggestions = true"
            @blur="visibleSuggestions = false"
          ></b-input>
          <div :class="visibleSuggestions ? 'suggestions open' : 'suggestions'">
            <div class="list-suggestions">
              <span
                v-for="item in listSuggestions"
                :key="item.value"
                class="suggestion-item"
                @click="selectSuggestion(item.text)"
              >
                {{ item.text }}
                <i class="icon-close"></i>
              </span>
            </div>
          </div>
        </div>
        <hr class="line-divide" />
        <div class="filter-group">
          <strong
            :class="
              showFilterGroup1
                ? 'filter-group-header'
                : 'filter-group-header collapsed'
            "
            @click="showFilterGroup1 = !showFilterGroup1"
          >
            Danh mục
            <i class="icon-caret-down"></i>
          </strong>
          <b-collapse v-model="showFilterGroup1" class="filter-group-body">
            <b-form-checkbox-group
              id="checkbox-group-2"
              v-model="selectCategories"
              @change="changeOptionSeach"
            >
              <p v-if="currentCategoryLabel !== ''">
                <b-icon
                  icon="chevron-left"
                  @click="backToOldCategories()"
                ></b-icon>
                <strong>{{ currentCategoryLabel }}</strong>
              </p>
              <div
                v-for="category in categories"
                :key="category.id"
                class="d-flex justify-content-between"
                :value="category.id"
              >
                <b-form-checkbox :value="category.id">{{
                  category.label
                }}</b-form-checkbox>
                <b-icon
                  icon="chevron-right"
                  @click="nextToOtherCategory(category)"
                ></b-icon>
              </div>
            </b-form-checkbox-group>
            <b-alert v-if="categories.length === 0" show variant="warning"
              >Chưa có danh mục con</b-alert
            >
          </b-collapse>
        </div>
        <hr class="line-divide" />
        <div class="filter-group">
          <strong
            :class="
              showFilterGroup2
                ? 'filter-group-header'
                : 'filter-group-header collapsed'
            "
            @click="showFilterGroup2 = !showFilterGroup2"
          >
            Mức độ
            <i class="icon-caret-down"></i>
          </strong>
          <b-collapse v-model="showFilterGroup2" class="filter-group-body">
            <b-form-checkbox-group
              v-model="selectLevels"
              :options="options2"
              value-field="value"
              text-field="text"
              @change="changeOptionSeach"
            ></b-form-checkbox-group>
          </b-collapse>
        </div>
        <hr class="line-divide" />
        <div class="filter-group">
          <strong
            :class="
              showFilterGroup3
                ? 'filter-group-header'
                : 'filter-group-header collapsed'
            "
            @click="showFilterGroup3 = !showFilterGroup3"
          >
            Đánh giá
            <i class="icon-caret-down"></i>
          </strong>
          <b-collapse v-model="showFilterGroup3" class="filter-group-body">
            <b-form-checkbox-group
              v-model="selecTratings"
              @change="changeOptionSeach"
            >
              <b-form-checkbox
                v-for="item in options3"
                :key="item.value"
                :value="item.value"
              >
                <span class="text-yellow font-md" v-html="item.text"></span>
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-collapse>
        </div>
        <hr class="line-divide" />
        <div class="filter-group">
          <strong
            :class="
              showFilterGroup4
                ? 'filter-group-header'
                : 'filter-group-header collapsed'
            "
            @click="showFilterGroup4 = !showFilterGroup4"
          >
            Số lượng câu hỏi
            <i class="icon-caret-down"></i>
          </strong>
          <b-collapse v-model="showFilterGroup4" class="filter-group-body">
            <!-- <b-form-checkbox-group
              v-model="selectedOptions4"
              :options="options4"
              value-field="value"
              text-field="text"
            ></b-form-checkbox-group> -->
            <div class="custom-ranger px-1 my-3">
              <div
                class="
                  ranger-selected-value
                  d-flex
                  justify-content-center
                  font-smd
                "
              >
                <span>{{ valueNumberQuestion[0] }} câu</span>
                <span class="mx-2">~</span>
                <span>{{ valueNumberQuestion[1] }} câu</span>
              </div>
              <VueSlider
                ref="slider"
                v-model="valueNumberQuestion"
                v-bind="optionsNumberQuestion"
              />
            </div>
          </b-collapse>
        </div>
        <hr class="line-divide" />
        <div class="filter-group">
          <strong
            :class="
              showFilterGroup5
                ? 'filter-group-header'
                : 'filter-group-header collapsed'
            "
            @click="showFilterGroup5 = !showFilterGroup5"
          >
            Thời gian làm bài
            <i class="icon-caret-down"></i>
          </strong>
          <b-collapse v-model="showFilterGroup5" class="filter-group-body">
            <!-- <b-form-checkbox-group
              v-model="selectedOptions5"
              :options="options5"
              value-field="value"
              text-field="text"
            ></b-form-checkbox-group> -->
            <div class="custom-ranger px-1 my-3">
              <div
                class="
                  ranger-selected-value
                  d-flex
                  justify-content-center
                  font-smd
                "
              >
                <span>{{ valueTimeExam[0] }} phút</span>
                <span class="mx-2">~</span>
                <span>{{ valueTimeExam[1] }} phút</span>
              </div>
              <VueSlider
                ref="slider"
                v-model="valueTimeExam"
                v-bind="optionsTimeExam"
                @drag-end="changeOptionSeach"
              />
            </div>
          </b-collapse>
        </div>
      </div>
      <div class="text-center sp mt-5 mb-4">
        <b-btn variant="primary" @click="closeFilter">Áp dụng bộ lọc</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
import apiHome from '@/api/apiHome'
import 'vue-slider-component/theme/antd.css'

export default {
  name: 'SidebarExam',
  data() {
    return {
      valueTimeExam: [0, 120],
      optionsTimeExam: {
        dotSize: 16,
        width: 'auto',
        height: 6,
        min: 0,
        max: 120,
        minRange: 0,
        maxRange: 120,
      },
      valueNumberQuestion: [0, 500],
      optionsNumberQuestion: {
        dotSize: 16,
        width: 'auto',
        height: 6,
        min: 0,
        max: 500,
        minRange: 0,
        maxRange: 500,
      },
      inputKeyword: '',
      visibleSuggestions: false,
      currentHistoryIndex: 0,
      categories: [],
      categoriesHistory: [
        {
          id: 0,
          label: '',
        },
        {
          id: 0,
          label: '',
        },
      ],
      listSuggestions: [
        {
          text: 'Tiếng Anh',
          value: 'Tiếng Anh',
        },
        {
          text: 'Vật Lý 12',
          value: 'Vật Lý 12',
        },
        {
          text: 'Thi tốt nghiệp',
          value: 'Thi tốt nghiệp',
        },
        {
          text: 'Thi Toeic',
          value: 'Thi Toeic',
        },
      ],
      visibleFilter: false,
      showFilterGroup1: true,
      selectCategories: [],
      options1: [
        { text: 'Thi tốt nghiệp THPT', value: 1 },
        { text: 'Trắc nghiệm giáo dục K12', value: 2 },
        { text: 'Trắc nghiệm đại học', value: 3 },
        { text: 'Trắc nghiệm ngoại ngữ', value: 4 },
        { text: 'Trắc nghiệm nghề nghiệp', value: 5 },
        { text: 'Trắc nghiệm tính cách', value: 6 },
      ],
      showFilterGroup2: true,
      selectLevels: [],
      options2: [
        { text: 'Cơ bản', value: 1 },
        { text: 'Trung bình', value: 2 },
        { text: 'Nâng cao', value: 3 },
        { text: 'Khó', value: 4 },
      ],
      showFilterGroup3: true,
      selecTratings: [],
      options3: [
        {
          text: '<i class="icon-star-fill"></i><i class="icon-star-fill"></i><i class="icon-star-fill"></i><i class="icon-star-fill"></i><i class="icon-star-fill"></i>',
          value: 5,
        },
        {
          text: '<i class="icon-star-fill"></i><i class="icon-star-fill"></i><i class="icon-star-fill"></i><i class="icon-star-fill"></i><i class="icon-star"></i>',
          value: 4,
        },
        {
          text: '<i class="icon-star-fill"></i><i class="icon-star-fill"></i><i class="icon-star-fill"></i><i class="icon-star"></i><i class="icon-star"></i>',
          value: 3,
        },
        {
          text: '<i class="icon-star-fill"></i><i class="icon-star-fill"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i>',
          value: 2,
        },
        {
          text: '<i class="icon-star-fill"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i>',
          value: 1,
        },
      ],
      showFilterGroup4: true,
      selectedOptions4: [],
      options4: [
        { text: 'Dưới 10 câu', value: 1 },
        { text: 'Từ 10 đến 20 câu', value: 2 },
        { text: 'Từ 20 đến 40 câu', value: 3 },
        { text: 'Từ 40 đến 60 câu', value: 4 },
        { text: 'Trên 60 câu', value: 5 },
      ],
      showFilterGroup5: true,
      selectedOptions5: [],
      options5: [
        { text: 'Dưới 10 phút', value: 1 },
        { text: 'Từ 10 đến 30 phút', value: 2 },
        { text: 'Từ 30 đến 60 phút', value: 3 },
        { text: 'Từ 60 đến 90 phút', value: 4 },
        { text: 'Trên 90 câu', value: 5 },
      ],
      rangeTimeExam: [0, 120],
      rangeNumberQuestion: [0, 500],
    }
  },
  computed: {
    currentCategoryLabel() {
      const l = this.categoriesHistory.length
      const value = this.categoriesHistory[l - 1]
      return value.label
    },
  },
  mounted() {
    this.fetchCategories(0)
  },
  methods: {
    clearFilter() {
      this.selectCategories = []
      this.selectLevels = []
      this.selecTratings = []
      this.selectedOptions4 = []
      this.selectedOptions5 = []
    },
    openFilter() {
      this.visibleFilter = true
    },
    closeFilter() {
      this.visibleFilter = false
    },
    selectSuggestion(value) {
      this.inputKeyword = value
      this.$logger.debug(value)
    },
    async fetchCategories(id) {
      const { data: result } = await apiHome.getCategoriesExamPage({
        parent: id,
      })
      this.categories = result?.object?.items
    },
    nextToOtherCategory(value) {
      this.categoriesHistory.push(value)
      this.selectCategories = []
      this.fetchCategories(value.id)
    },
    backToOldCategories() {
      this.selectCategories = []
      const removeHistory = this.categoriesHistory.length - 1
      this.categoriesHistory.splice(removeHistory, 1)
      console.log('back', this.categoriesHistory)
      const id = this.categoriesHistory[removeHistory - 2].id
      this.fetchCategories(id)
    },
    changeOptionSeach() {
      const data = {
        categories: this.selectCategories,
        levels: this.selectCategories,
        ratings: this.selecTratings,
        amountExamTimeLeft: this.valueTimeExam[0],
        amountExamTimeRight: this.valueTimeExam[1],
        amountQuestionLeft: this.valueNumberQuestion[0],
        amountQuestionRight: this.valueNumberQuestion[1],
      }
      this.$emit('seachOption', data)
    },
  },
}
</script>
