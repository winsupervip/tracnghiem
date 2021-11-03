<template>
  <div class="list-multiple-question">
    <div class="list-questions-user">
      <b-card
        class="card-question mb-3"
        header-tag="header"
        footer-tag="footer"
      >
        <template #header>
          <div
            class="
              d-flex
              align-items-center
              justify-content-between
              card-question-header
            "
          >
            <div class="d-flex">
              <div class="font-bold me-3">Thi tốt nghiệp THPT</div>
              <div class="list-status-question">
                <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                  $t('Cơ bản')
                }}</span>
                <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                  $t('Một lựa chọn')
                }}</span>
                <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                  $t('Bản nháp')
                }}</span>
              </div>
            </div>
            <div class="d-flex">
              <a
                href="#"
                target="_blank"
                class="btn btn-sm btn-outline-primary rounded-pill me-3"
                >{{ $t('Xem trên web') }}</a
              >
              <b-dropdown
                class="dropdown-button-circle"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template #button-content>
                  <b-icon icon="three-dots-vertical" />
                </template>
                <b-dropdown-item href="#">{{ $t('Cập nhật') }}</b-dropdown-item>
                <b-dropdown-item href="#">{{
                  $t('Tạo bản sao')
                }}</b-dropdown-item>
                <b-dropdown-item href="#">{{ $t('Xuất bản') }}</b-dropdown-item>
                <b-dropdown-item href="#">{{ $t('Chia sẻ') }}</b-dropdown-item>
                <b-dropdown-item href="#">{{
                  $t('Tài liệu tham khảo')
                }}</b-dropdown-item>

                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item href="#">{{ $t('Thống kê') }}</b-dropdown-item>
                <b-dropdown-item href="#">{{ $t('Xóa') }}</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </template>
        <div class="list-question">
          <div class="question-item">
            <div class="question-content text-smd">
              <p>
                <a href="#" class="me-2">#Vật lý 12</a
                ><a href="#" class="me-2">#Vật lý</a>
              </p>
              Which of the following lists all and only the appropriate
              descriptions about a 32-bit CPU and a 64-bit CPU? I When a 32-bit
              CPU and a 64-bit CPU are compared, a 64-bit CPU has a larger
              theoretical maximum memory space.. II There is no 32-bit OS that
              runs on a PC with a 64-bit CPU. III In terms of the read and write
              speed of a USB memory, the speed of a PC with a 64-bit CPU is
              twice as fast as that of a PC with a 32-bit CPU.
            </div>
            <div class="question-item-answer">
              <div class="answer-head">
                <span class="font-sm text-gray">câu trả lời</span>
              </div>
              <div class="list-answer">
                <ul class="list-unstyled p-0 m-0">
                  <li v-for="answer in answers" :key="answer.id">
                    <div class="d-flex justify-content-between">
                      <div>
                        <strong>Câu {{ answer.id }} :</strong>
                        {{ answer.label }}
                      </div>
                      <div class="d-flex">
                        <b-button-group>
                          <b-button variant="info" size="sm" class="px-2">
                            <b-icon icon="pencil-square" />
                          </b-button>
                          <b-button variant="danger" size="sm" class="px-2">
                            <b-icon icon="trash" />
                          </b-button>
                        </b-button-group>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </b-card>
      <b-card
        class="card-question mb-3"
        header-tag="header"
        footer-tag="footer"
      >
        <template #header>
          <div
            class="
              d-flex
              align-items-center
              justify-content-between
              card-question-header
            "
          >
            <div class="d-flex">
              <div class="font-bold me-3">Thi tốt nghiệp THPT</div>
              <div class="list-status-question">
                <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                  $t('Cơ bản')
                }}</span>
                <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                  $t('Một lựa chọn')
                }}</span>
                <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                  $t('Bản nháp')
                }}</span>
              </div>
            </div>
            <div class="d-flex">
              <a
                href="#"
                target="_blank"
                class="btn btn-sm btn-outline-primary rounded-pill me-3"
                >{{ $t('Xem trên web') }}</a
              >
              <b-dropdown
                class="dropdown-button-circle"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template #button-content>
                  <b-icon icon="three-dots-vertical" />
                </template>
                <b-dropdown-item href="#">{{ $t('Cập nhật') }}</b-dropdown-item>
                <b-dropdown-item href="#">{{
                  $t('Tạo bản sao')
                }}</b-dropdown-item>
                <b-dropdown-item href="#">{{ $t('Xuất bản') }}</b-dropdown-item>
                <b-dropdown-item href="#">{{ $t('Chia sẻ') }}</b-dropdown-item>
                <b-dropdown-item href="#">{{
                  $t('Tài liệu tham khảo')
                }}</b-dropdown-item>

                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item href="#">{{ $t('Thống kê') }}</b-dropdown-item>
                <b-dropdown-item href="#">{{ $t('Xóa') }}</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </template>
        <div class="list-question">
          <div class="question-item">
            <div class="question-content text-smd">
              <p>
                <a href="#" class="me-2">#Vật lý 12</a
                ><a href="#" class="me-2">#Vật lý</a>
              </p>
              Which of the following lists all and only the appropriate
              descriptions about a 32-bit CPU and a 64-bit CPU? I When a 32-bit
              CPU and a 64-bit CPU are compared, a 64-bit CPU has a larger
              theoretical maximum memory space.. II There is no 32-bit OS that
              runs on a PC with a 64-bit CPU. III In terms of the read and write
              speed of a USB memory, the speed of a PC with a 64-bit CPU is
              twice as fast as that of a PC with a 32-bit CPU.
            </div>
            <div class="question-item-answer">
              <div class="answer-head">
                <span class="font-sm text-gray">câu trả lời</span>
              </div>
              <div class="list-answer">
                <ul class="list-unstyled p-0 m-0">
                  <li v-for="answer in answers" :key="answer.id">
                    <div class="d-flex justify-content-between">
                      <div>
                        <strong>Câu {{ answer.id }} :</strong>
                        {{ answer.label }}
                      </div>
                      <div class="d-flex">
                        <b-button-group>
                          <b-button variant="info" size="sm" class="px-2">
                            <b-icon icon="pencil-square" />
                          </b-button>
                          <b-button variant="danger" size="sm" class="px-2">
                            <b-icon icon="trash" />
                          </b-button>
                        </b-button-group>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </b-card>
      <b-card
        class="card-question mb-3"
        header-tag="header"
        footer-tag="footer"
      >
        <template #header>
          <div
            class="
              d-flex
              align-items-center
              justify-content-between
              card-question-header
            "
          >
            <div class="d-flex">
              <div class="font-bold me-3">Thi tốt nghiệp THPT</div>
              <div class="list-status-question">
                <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                  $t('Cơ bản')
                }}</span>
                <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                  $t('Một lựa chọn')
                }}</span>
                <span class="btn btn-xs rounded-pill btn-green-light me-2">{{
                  $t('Bản nháp')
                }}</span>
              </div>
            </div>
            <div class="d-flex">
              <a
                href="#"
                target="_blank"
                class="btn btn-sm btn-outline-primary rounded-pill me-3"
                >{{ $t('Xem trên web') }}</a
              >
              <b-dropdown
                class="dropdown-button-circle"
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template #button-content>
                  <b-icon icon="three-dots-vertical" />
                </template>
                <b-dropdown-item href="#">{{ $t('Cập nhật') }}</b-dropdown-item>
                <b-dropdown-item href="#">{{
                  $t('Tạo bản sao')
                }}</b-dropdown-item>
                <b-dropdown-item href="#">{{ $t('Xuất bản') }}</b-dropdown-item>
                <b-dropdown-item href="#">{{ $t('Chia sẻ') }}</b-dropdown-item>
                <b-dropdown-item href="#">{{
                  $t('Tài liệu tham khảo')
                }}</b-dropdown-item>

                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item href="#">{{ $t('Thống kê') }}</b-dropdown-item>
                <b-dropdown-item href="#">{{ $t('Xóa') }}</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </template>
        <div class="list-question">
          <div class="question-item">
            <div class="question-content text-smd">
              <p>
                <a href="#" class="me-2">#Vật lý 12</a
                ><a href="#" class="me-2">#Vật lý</a>
              </p>
              Which of the following lists all and only the appropriate
              descriptions about a 32-bit CPU and a 64-bit CPU? I When a 32-bit
              CPU and a 64-bit CPU are compared, a 64-bit CPU has a larger
              theoretical maximum memory space.. II There is no 32-bit OS that
              runs on a PC with a 64-bit CPU. III In terms of the read and write
              speed of a USB memory, the speed of a PC with a 64-bit CPU is
              twice as fast as that of a PC with a 32-bit CPU.
            </div>
            <div class="question-item-answer">
              <div class="answer-head">
                <span class="font-sm text-gray">câu trả lời</span>
              </div>
              <div class="list-answer">
                <ul class="list-unstyled p-0 m-0">
                  <li v-for="answer in answers" :key="answer.id">
                    <div class="d-flex justify-content-between">
                      <div>
                        <strong>Câu {{ answer.id }} :</strong>
                        {{ answer.label }}
                      </div>
                      <div class="d-flex">
                        <b-button-group>
                          <b-button variant="info" size="sm" class="px-2">
                            <b-icon icon="pencil-square" />
                          </b-button>
                          <b-button variant="danger" size="sm" class="px-2">
                            <b-icon icon="trash" />
                          </b-button>
                        </b-button-group>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </b-card>
    </div>
    <b-pagination total-rows="50" align="right" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MultiListPage',
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },

  setup: () => {},
  data: () => ({
    answers: [
      {
        id: '1',
        label: 'chọn đáp án đúng',
      },
      {
        id: '2',
        label: 'chọn đáp án đúng',
      },
      {
        id: '3',
        label: 'chọn đáp án đúng',
      },
      {
        id: '4',
        label: 'chọn đáp án đúng',
      },
      {
        id: '5',
        label: 'chọn đáp án đúng',
      },
    ],
  }),
})
</script>
