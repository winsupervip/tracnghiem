<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
    <b-card-group>
      <b-card sub-title="Thông tin gói dịch vụ" class="me-2">
        <p>Tên Gói: {{ listDetail.name }}</p>
        <p>Ngày kích hoạt: {{ listDetail.activeDate | formatDurationDay }}</p>
        <p>Ngày hết hạn: {{ listDetail.expriDate | formatDurationDay }}</p>
        <p>Số ngày sử dụng: {{ listDetail.exp }}</p>
        <p>Số lượng câu hỏi: {{ listDetail.limitQuestion }}</p>
        <p>Số lượng đề thi: {{ listDetail.limitExam }}</p>
        <b-button variant="outline-primary">Yêu cầu gia hạn gói</b-button>
        <b-button variant="outline-primary">Tạm dừng kích hoạt user</b-button>
      </b-card>

      <b-card sub-title="Thông tin mã kích hoạt" class="ms-2">
        <p>
          Đã kích hoạt /tổng được cấp {{ listDetail.numberActived }}/{{
            listDetail.limitActive
          }}
        </p>
        <p>Số lượng mã đã tạo: {{ listDetail.numberActiveCode }}</p>
        <p>
          User kích hoạt gần nhất:
          <!-- {{ listDetail.lastUserActive.firstName }}

          {{ listDetail.lastUserActive.lastName }}
          -
          {{ listDetail.lastUserActive.activeDate | formatDurationDay }} -->
        </p>
        <footer>
          <b-button variant="outline-primary">
            <nuxt-link
              :to="{
                path: `/agency/service/${agencyHashId}`,
              }"
            >
              Danh sách mã kích hoạt
            </nuxt-link>
          </b-button>
          <b-button
            v-b-modal.modal-edit
            variant="outline-primary"
            @click="getData()"
            >Thêm mã kích hoạt</b-button
          >
        </footer>
      </b-card>
    </b-card-group>
    <b-modal
      id="modal-edit"
      ref="modal"
      :title="$t('admin.service.infoPackage')"
      hide-footer
      @shown="shown"
      @hide="hide"
      @oke="onSubmit"
    >
      <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            :name="$t('admin.service.agencies.limitActive')"
            rules="required|max:255|integer"
          >
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.agencies.limitActive') + ' (*)'"
              label-for="limitActive"
              class="mb-3"
            >
              <b-form-input
                id="limitActive"
                v-model="limitActive"
                type="number"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider rules="max:1000" :name="$t('admin.service.note')">
            <b-form-group
              slot-scope="{ valid, errors }"
              :label="$t('admin.service.note')"
              label-for="note"
            >
              <b-form-textarea
                id="note"
                v-model="note"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-textarea>
              <b-form-invalid-feedback id="inputLiveFeedback">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <footer class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hide()">
              Hủy Bỏ
            </button>
            <button type="submit" class="btn btn-primary">Lưu</button>
          </footer>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>
<script>
import {
  defineComponent,
  useContext,
  reactive,
  useFetch,
  computed,
  toRefs,
  useRoute,
  // watch,
} from '@nuxtjs/composition-api'
import userAPI from '@/api/agency'
export default defineComponent({
  auth: true,
  components: {},
  layout: 'dashboard',
  middleware: ['isAgency'],
  setup() {
    const { $loader } = useContext()

    const route = useRoute()
    const data = reactive({
      breadcrumbs: [
        {
          text: 'Danh sách gói dịch vụ',
          href: '/agency/service/',
        },
        {
          text: 'abc',
        },
      ],

      limitActive: '',
      note: '',
      listDetail: {},
      agencyHashId: '',
    })
    const id = computed(() => route.value.params.id)
    data.agencyHashId = id
    const { fetch } = useFetch(async () => {
      $loader()
      const { data: result } = await userAPI.getAgencyDetail(data.agencyHashId)
      data.listDetail = result?.object
      $loader().close()
    })
    fetch()
    return {
      ...toRefs(data),
    }
  },
  methods: {
    loadOptions({ action, searchQuery, callback }) {},
    showModal(id) {
      this.$bvModal.show(id)
    },
    hideModal(id) {
      this.$bvModal.hide(id)
    },
    shown() {
      this.doShow = true
    },
    hide() {
      this.doShow = false
    },
    getData() {},
    async onSubmit() {
      const activeCode = {
        serviceAgencyHashId: this.agencyHashId,
        limitActive: this.limitActive,
        note: this.note,
      }
      console.log(activeCode)
      try {
        const { data } = await userAPI.createCodeServiceAgencies(activeCode)
        this.$handleError(data)
      } catch (err) {
        this.$handleError(err, () => {
          console.log(err)
        })
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.btn-search {
  top: 0;
  right: 10%;
  height: 100%;
}
</style>
