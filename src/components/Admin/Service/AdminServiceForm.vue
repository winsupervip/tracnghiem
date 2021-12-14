<template>
  <b-form>
    <ValidationProvider rules="required|max:255" name="Tên gói">
      <b-form-group
        slot-scope="{ valid, errors }"
        label="Tên gói (*)"
        label-for="name"
        class="mb-3"
      >
        <b-form-input
          id="name"
          v-model="name"
          type="text"
          :state="errors[0] ? false : valid ? true : null"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider
      name="Thời hạn (ngày) (*)"
      rules="required|max:255|integer"
    >
      <b-form-group
        slot-scope="{ valid, errors }"
        label="Thời hạn (ngày) (*)"
        label-for="exp"
        class="mb-3"
      >
        <b-form-input
          id="exp"
          v-model="exp"
          type="text"
          :state="errors[0] ? false : valid ? true : null"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider
      name="Số lượng câu hỏi (*)"
      rules="required|max:255|integer"
    >
      <b-form-group
        slot-scope="{ valid, errors }"
        label="Số lượng câu hỏi (*)"
        label-for="limitQuestion"
        class="mb-3"
      >
        <b-form-input
          id="limitQuestion"
          v-model="limitQuestion"
          type="text"
          :state="errors[0] ? false : valid ? true : null"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider
      name="Số lượng đề thi (*)"
      rules="required|max:255|integer"
    >
      <b-form-group
        slot-scope="{ valid, errors }"
        label="Số lượng đề thi (*)"
        label-for="limitExam"
        class="mb-3"
      >
        <b-form-input
          id="limitExam"
          v-model="limitExam"
          type="text"
          :state="errors[0] ? false : valid ? true : null"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <ValidationProvider name="Giá tiền (*)" rules="required|max:255|integer">
      <b-form-group
        slot-scope="{ valid, errors }"
        label="Giá tiền (*)"
        label-for="price"
        class="mb-3"
      >
        <b-form-input
          id="price"
          v-model="price"
          type="text"
          :state="errors[0] ? false : valid ? true : null"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ errors[0] }}
        </b-form-invalid-feedback>
      </b-form-group>
    </ValidationProvider>
    <b-form-group label="Trạng thái" label-for="status" class="mb-3">
      <treeselect
        id="status"
        v-model="isActive"
        :multiple="false"
        :options="status"
        :load-options="loadOptions"
      />
    </b-form-group>
    <b-form-group class="mt-3" label-for="checkbox-1">
      <b-form-checkbox id="checkbox-1" v-model="isPublic">
        User tự động đăng ký?
      </b-form-checkbox>
    </b-form-group>
    <ValidationProvider rules="max:1000">
      <b-form-group label="ghi chú" label-for="note">
        <b-form-textarea id="note" v-model="note"></b-form-textarea>
      </b-form-group>
    </ValidationProvider>
  </b-form>
</template>
<script>
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import _ from 'lodash'
export default defineComponent({
  props: {
    dataForm: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const data = reactive({
      isActive: null,
      name: '',
      exp: null,
      hashId: '',
      limitQuestion: null,
      limitExam: null,
      price: null,
      isPublic: false,
      note: '',
      status: [
        {
          id: '',
          label: 'Khác',
        },
        {
          id: true,
          label: 'Hoạt động',
        },
        {
          id: false,
          label: 'Không hoạt động',
        },
      ],
    })
    return {
      ...toRefs(data),
    }
  },
  watch: {
    name(val) {
      this.commitData()
    },
    exp(val) {
      this.commitData()
    },
    limitQuestion(val) {
      this.commitData()
    },
    limitExam(val) {
      this.commitData()
    },
    isActive(val) {
      this.commitData()
    },
    price(val) {
      this.commitData()
    },
    isPublic(val) {
      this.commitData()
    },
    note(val) {
      this.commitData()
    },
  },
  created() {
    this.name = this.dataForm.name
    this.exp = this.dataForm.exp
    this.limitQuestion = this.dataForm.limitQuestion
    this.limitExam = this.dataForm.limitQuestion
    this.isActive = this.dataForm.isActive
    this.price = this.dataForm.price
    this.isPublic = this.dataForm.isPublic
    this.note = this.dataForm.note
  },
  methods: {
    loadOptions({ action, parentNode, callback }) {},
    commitData: _.debounce(function () {
      this.$emit('input', {
        name: this.dataForm.name,
        exp: this.dataForm.exp,
        limitQuestion: this.dataForm.limitQuestion,
        limitExam: this.dataForm.limitQuestion,
        isActive: this.dataForm.isActive,
        price: this.dataForm.price,
        isPublic: this.dataForm.isPublic,
        note: this.dataForm.note,
      })
    }, 200),
  },
})
</script>
