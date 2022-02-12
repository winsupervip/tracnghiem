<template>
  <b-modal
    :id="`shared-detail-${itemHashId}`"
    :title="$t('shared.title')"
    hide-footer
    size="lg"
  >
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="mb-3">
          <label for="">{{ $t('shared.link') }}</label>
          <b-input-group>
            <b-form-input v-model="shareUrl" disabled></b-form-input>
            <b-input-group-append>
              <b-button variant="info" @click="copySign">{{
                $t('shared.copied')
              }}</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
        <div class="mb-3">
          <b-form-checkbox v-model="item.isSetPassword">
            {{ $t('shared.password') }}
          </b-form-checkbox>
          <input
            v-model="item.password"
            type="password"
            class="form-control"
            :disabled="!item.isSetPassword"
            :placeholder="$t('shared.passwordEdit')"
          />
        </div>
        <div class="mb-3">
          <b-form-checkbox v-model="item.isSetExpiration">
            {{ $t('shared.expiration') }}
          </b-form-checkbox>
          <input
            v-model="item.expiration"
            type="date"
            class="form-control"
            :disabled="!item.isSetExpiration"
          />
        </div>
        <button
          type="button"
          class="btn btn-outline-primary"
          @click.prevent="update"
        >
          {{ $t('shared.edit') }}
        </button>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click.prevent="unShared"
        >
          {{ $t('shared.revoke') }}
        </button>
      </div>
      <div class="col-12 col-md-6">
        <div class="mb-3">
          <label for="">Mã QR</label>
          <div class="text-center">
            <QrcodeVue :value="shareUrl" :size="size" level="H" />
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import moment from 'moment'
import QrcodeVue from 'qrcode.vue'
export default defineComponent({
  components: { QrcodeVue },
  props: {
    itemHashId: {
      type: String,
      required: true,
    },
    sharedData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { $toast } = useContext()
    const data = reactive({
      item: {},
      shareUrl: 'https://tracnghiem.vn/s/',
      size: 300,
    })

    watch(
      () => props.sharedData,
      () => {
        data.item = props.sharedData
        data.shareUrl = `https://tracnghiem.vn/s/${props.sharedData.token}`
        data.item.expiration = moment(props.sharedData.expiration).format(
          'Y-MM-DD'
        )
        data.item.password = ''
      }
    )

    const copySign = () => {
      // btw writeText() returns a promise so you could utilize that somehow if you want
      navigator.clipboard.writeText(data.shareUrl)
      $toast.show('Đã sao chép thành công').goAway(1500)
    }

    const update = () => {
      const dataEdit = {
        itemHashId: props.itemHashId,
        passwordRequired: data.item.isSetPassword,
        password: data.item.isSetPassword ? data.item.password : null,
        expiration: data.item.isSetExpiration ? data.item.expiration : null,
      }
      emit('edit', dataEdit)
    }

    const unShared = () => {
      emit('revoke')
    }

    return {
      ...toRefs(data),
      copySign,
      update,
      unShared,
    }
  },
})
</script>
