<template>
  <b-modal id="bv-modal-add-question" hide-footer hide-header title="Câu hỏi:">
    <div class="d-block">
      <ul class="list-group">
        <li
          v-for="item in items"
          :key="item.message"
          type="1"
          class="list-group-item"
        >
          <nuxt-link
            :to="item.url"
            class="d-flex justify-content-between align-items-start text-dark"
          >
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                {{ item.title }}
              </div>
              <small>
                {{ item.description }}
              </small>
            </div>
            <span class="">
              <b-icon-chevron-right></b-icon-chevron-right>
            </span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <b-button
        variant="primary"
        class="text-center"
        block
        @click="$bvModal.hide('bv-modal-add-question')"
        >{{ $t('close') }}</b-button
      >
    </div>
  </b-modal>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          url: '/users/questions/single-choice/create',
          title: 'Một lựa chọn',
          description: 'Thí sinh chọn một phương án duy nhất',
        },
        {
          url: '/users/questions/multiple-choice/create',
          title: 'Nhiều lựa chọn',
          description: 'Thí sinh chọn một hoặc nhiều phương án',
        },
        {
          url: '/users/questions/right-wrong/create',
          title: 'Đúng sai',
          description: 'Thí sinh chọn một trong 2 phương án',
        },
        {
          url: '/users/questions/matching/create',
          title: 'Ghép đôi',
          description:
            'Thí sinh phải ghép đúng từng cặp nhóm từ ở 2 cột với nhau',
        },
        {
          url: '/users/questions/fill-blank/create',
          title: 'Điền vào chỗ trống',
          description:
            'Nêu một mệnh đề có khuyết một hoặc nhiều bộ phận, thí sinh phải nghĩ ra nội dung thích hợp để điền vào ô trống.',
        },
        {
          url: '/users/questions/short-answer/create',
          title: 'Câu hỏi trả lời ngắn',
          description: 'Thí sinh trả lời bằng cách điền vào câu rất ngắn.',
        },
        {
          url: '/users/questions/draggable-fill-blank/create',
          title: 'Sắp thứ tự',
          description:
            'Thí sinh trả lời bằng cách sắp xếp thứ tự các phương án sau cho đúng.',
        },
        {
          url: '/users/questions/question-group/create',
          title: 'Câu chùm',
          description:
            'Thí sinh dùng chung 1 dữ kiện để trả lời nhiều câu hỏi khác nhau.',
        },
      ],
    }
  },
}
</script>
