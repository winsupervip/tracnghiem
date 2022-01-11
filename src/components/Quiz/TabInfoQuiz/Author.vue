<template>
  <b-card header="Tác giả" header-tag="header" class="mb-3">
    <div class="card-teacher">
      <b-row>
        <b-col sm="12" md="3">
          <div class="mx-auto teacher-info text-center">
            <div class="teacher-info-avatar">
              <img
                class="avatar"
                :src="
                  authorInfomation.avatar
                    ? authorInfomation.avatar
                    : 'https://dev.tracnghiem.vn/images/logo.svg'
                "
                alt="tracnghiem.vn"
              />
            </div>
            <p class="font-bold mb-1">{{ showName }}</p>
            <p>{{ authorInfomation.tenTruong }}</p>
          </div>
        </b-col>
        <b-col sm="12" md="9">
          <div>
            <ul class="list-unstyled teacher-list-info">
              <li>
                <i class="icon-star-fill text-primary me-2"></i>
                4.5 xếp hạng
              </li>
              <li>
                <i class="icon-medal text-primary me-2"></i>
                200 đánh giá
              </li>
              <li>
                <i class="icon-graduater text-primary me-2"></i>
                1000+ Học viên
              </li>
              <li>
                <i class="icon-exam text-primary me-2"></i>
                {{ authorInfomation.totalExam }}+ Đề thi
              </li>
            </ul>
            <div v-html="authorInfomation.bio">
              <!-- <p><strong>Thành tích</strong></p>
              <p>
                - Là hế hệ đầu tiên lớp cử nhân tài năng khoa Tiếng Anh ĐH Hà
                Nội. <br />
                - Đạt 8.0 ielts (Speaking) <br />
                - Nhận học bổng du học Hàn Quốc do tổ chức Kinh tế Quốc tế Hàn
                Quốc trao tặng khi là sinh viên.<br />
                - Là thủ lĩnh trong phong trào Đoàn: Bí thư đoàn trường THPT
                Thăng Long. <br />
                - Phó chủ tịch hội sinh viên ĐH Hà Nội.
              </p>
              <p><strong>Kinh Nghiệm</strong></p>
              <p>Hơn 10 năm kinh nghiệm trong việc giảng dạy Tiếng Anh</p>
              <p><strong>Phương châm giảng dạy</strong></p>
              <p>
                Luôn đặt mình vào vị trí học sinh yếu, trung bình Tiếng Anh để
                giúp các em tìm hiểu và giải vấn đề đến tận cùng. Tiếng Anh
                không cần phải giỏi nhưng lại đòi hỏi sự kiên trì, muốn kiên
                trì, cô Nguyệt Ca giúp học sinh yêu nó trước khi học nó. Dạy học
                sinh giỏi trở thành giỏi hơn thì không khó, truyền cảm hứng cho
                học sinh kém và yêu thích Tiếng Anh mới thực sự là một thử
                thách.
              </p> -->
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Author',
  props: {
    authorInfomation: {
      type: Object,
      default: () => {},
    },
  },
  setup() {},
  computed: {
    showName() {
      if (this.authorInfomation.displayName) {
        return this.authorInfomation.displayName
      } else if (
        this.authorInfomation.firstName &&
        this.authorInfomation.lastName
      ) {
        return (
          this.authorInfomation.firstName + ' ' + this.authorInfomation.lastName
        )
      } else {
        return 'Trắc Nghiệm .VN'
      }
    },
  },
})
</script>
