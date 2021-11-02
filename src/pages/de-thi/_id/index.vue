<template>
  <div class="page-container position-relative">
    <section class="page-heading exam-page-heading bg-gradient-blue">
      <div class="page-heading-inner">
        <b-container class="position-relative">
          <b-row>
            <b-col md="12" lg="8">
              <b-breadcrumb :items="breadcrumbs" class="mb-2"></b-breadcrumb>
              <div class="page-heading-title mb-2">
                <h1 class="page-title">
                  {{ dataExam.name }}
                </h1>
                <span
                  :class="
                    dataExam.level === 1
                      ? 'badge rounded-full bg-green exam-level'
                      : 'badge rounded-full bg-primary exam-level'
                  "
                  >{{ dataExam.level === 1 ? 'Cơ bản' : 'Nâng cao' }}
                </span>
              </div>
              <div class="page-heading-description mb-3">
                {{ dataExam.description }}
              </div>
              <div class="exam-teacher-row row align-items-center mb-3">
                <b-col cols="12" sm="12" md="4">
                  <div class="card-exam-teacher">
                    <nuxt-link
                      :to="`/giao-vien/${dataExam.teacherId}`"
                      class="text-white"
                    >
                      <img
                        class="
                          avatar avatar-md
                          border-2 border-white border-solid
                          me-2
                        "
                        :src="dataExam.teacherAvatar"
                        :alt="dataExam.teacherName"
                      />
                      <span>{{ dataExam.teacherName }}</span>
                    </nuxt-link>
                  </div>
                </b-col>
                <b-col cols="12" sm="12" md="4">
                  <div class="d-flex">
                    <b-form-rating
                      v-model="dataExam.rating"
                      class="custom-rating"
                      readonly
                    />
                    <div class="mx-2">
                      <strong>{{ dataExam.rating }}</strong>
                      <span>({{ dataExam.ratingCount }})</span>
                    </div>
                  </div>
                </b-col>
                <b-col cols="12" sm="12" md="4">
                  <div class="exam-category">
                    {{ dataExam.category }}
                  </div>
                </b-col>
              </div>
              <div class="toolbar-action-exam">
                <div class="action-exam">
                  <b-btn
                    variant="outline-light"
                    class="btn-outline-white font-smd btn-action"
                  >
                    <i class="icon-heart me-3"></i>
                    Yêu thích
                  </b-btn>
                  <b-dropdown
                    variant="outline-light"
                    no-caret
                    class="dropdown-save"
                  >
                    <template #button-content>
                      <i class="icon-bookmark me-3"></i>
                      Lưu
                    </template>
                    <b-dropdown-form class="">
                      <b-form-checkbox-group
                        v-model="selectedBookmark"
                        :options="optionsBookmark"
                        value-field="value"
                        text-field="text"
                      ></b-form-checkbox-group>
                      <div class="add-bookmark-input">
                        <b-input />
                        <b-btn variant="primary" class="btn-circle">
                          <b-icon icon="plus" class="text-white" />
                        </b-btn>
                      </div>
                    </b-dropdown-form>
                  </b-dropdown>
                  <b-btn
                    variant="outline-light"
                    class="btn-outline-white font-smd btn-action"
                  >
                    <i class="icon-share me-3"></i>
                    Chia sẻ
                  </b-btn>
                </div>
                <div class="exam-report">
                  <b-btn class="btn-transparent font-smd btn-text">
                    <i class="icon-flag"></i> Báo cáo
                  </b-btn>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </section>
    <section class="exam-main-container">
      <b-container>
        <b-row>
          <b-col md="12" lg="8" class="exam-main-content">
            <b-tabs class="common-tabs">
              <b-tab title="Thông tin đề thi" active>
                <div class="tab-content-container">
                  <b-card
                    header="Danh sách chuyên đề"
                    header-tag="header"
                    class="mb-3"
                  >
                    <table class="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>Chuyên đề</th>
                          <th>Số lượng câu hỏi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Reading</td>
                          <td>100</td>
                        </tr>
                        <tr>
                          <td>Listening</td>
                          <td>100</td>
                        </tr>
                        <tr>
                          <td>Writing</td>
                          <td>100</td>
                        </tr>
                        <tr>
                          <td>Speaking</td>
                          <td>100</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-card>
                  <b-card
                    header="Tài liệu tham khảo"
                    header-tag="header"
                    class="mb-3"
                  >
                    <p>
                      Học Tiếng Anh:
                      <a href="https://vi.duolingo.com/"
                        >https://vi.duolingo.com/</a
                      >
                    </p>
                    <p>
                      Tài liệu ôn thi Tiếng Anh:
                      <a href="https://www.google.com.vn/"
                        >https://www.google.com.vn/</a
                      >
                    </p>
                    <p>
                      Học Tiếng Anh:
                      <a href="https://vi.duolingo.com/"
                        >https://vi.duolingo.com/</a
                      >
                    </p>
                    <p>
                      Tài liệu ôn thi Tiếng Anh:
                      <a href="https://www.google.com.vn/"
                        >https://www.google.com.vn/</a
                      >
                    </p>
                  </b-card>
                  <b-card header="Tác giả" header-tag="header" class="mb-3">
                    <div class="card-teacher">
                      <b-row>
                        <b-col sm="12" md="3">
                          <div class="mx-auto teacher-info text-center">
                            <div class="teacher-info-avatar">
                              <img
                                class="avatar"
                                src="/images/teacher.png"
                                alt=""
                              />
                            </div>
                            <p class="font-bold mb-1">Mrs Thu Thảo</p>
                            <p>Trung tâm Anh ngữ</p>
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
                                10+ Đề thi
                              </li>
                            </ul>
                            <div>
                              <p><strong>Thành tích</strong></p>
                              <p>
                                - Là hế hệ đầu tiên lớp cử nhân tài năng khoa
                                Tiếng Anh ĐH Hà Nội. <br />
                                - Đạt 8.0 ielts (Speaking) <br />
                                - Nhận học bổng du học Hàn Quốc do tổ chức Kinh
                                tế Quốc tế Hàn Quốc trao tặng khi là sinh
                                viên.<br />
                                - Là thủ lĩnh trong phong trào Đoàn: Bí thư đoàn
                                trường THPT Thăng Long. <br />
                                - Phó chủ tịch hội sinh viên ĐH Hà Nội.
                              </p>
                              <p><strong>Kinh Nghiệm</strong></p>
                              <p>
                                Hơn 10 năm kinh nghiệm trong việc giảng dạy
                                Tiếng Anh
                              </p>
                              <p><strong>Phương châm giảng dạy</strong></p>
                              <p>
                                Luôn đặt mình vào vị trí học sinh yếu, trung
                                bình Tiếng Anh để giúp các em tìm hiểu và giải
                                vấn đề đến tận cùng. Tiếng Anh không cần phải
                                giỏi nhưng lại đòi hỏi sự kiên trì, muốn kiên
                                trì, cô Nguyệt Ca giúp học sinh yêu nó trước khi
                                học nó. Dạy học sinh giỏi trở thành giỏi hơn thì
                                không khó, truyền cảm hứng cho học sinh kém và
                                yêu thích Tiếng Anh mới thực sự là một thử
                                thách.
                              </p>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                    </div>
                  </b-card>
                  <b-card header="Đánh giá" header-tag="header" class="mb-3">
                    <b-row class="card-review">
                      <b-col sm="12" md="3">
                        <div class="card-review-left">
                          <span class="number">5</span>
                          <b-form-rating
                            value="5"
                            class="custom-rating mb-1"
                            readonly
                          />
                          <span>26 đánh giá</span>
                        </div>
                      </b-col>
                      <b-col sm="12" md="9">
                        <div class="card-review-right">
                          <div class="rate-row">
                            <div class="rate-progress">
                              <b-progress
                                variant="success"
                                value="75"
                                max="100"
                              />
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
                              <b-progress
                                variant="success"
                                value="10"
                                max="100"
                              />
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
                              <b-progress
                                variant="success"
                                value="5"
                                max="100"
                              />
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
                              <b-progress
                                variant="success"
                                value="5"
                                max="100"
                              />
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
                              <b-progress
                                variant="success"
                                value="5"
                                max="100"
                              />
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
                    <hr />
                    <div class="list-review">
                      <div class="review-item">
                        <div class="review-item-avatar">
                          <img
                            class="avatar avatar-md"
                            src="/images/teacher.png"
                            alt=""
                          />
                        </div>
                        <div class="review-item-content">
                          <div class="font-bold mb-1">Nguyễn Văn Vương</div>
                          <div class="d-flex align-items-center mb-3">
                            <b-form-rating
                              value="5"
                              class="custom-rating me-2"
                              readonly
                            />
                            <span class="font-sm text-gray">1 tuần trước</span>
                          </div>
                          <div class="font-smd mb-4">
                            It's very nicely explained each and every concept in
                            this test, You provided me very deep knowledge, as a
                            beginner it is very useful for me. Thank you.
                          </div>
                          <div class="review-item-action">
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-like"></i>
                              Thích
                            </b-btn>
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-dislike"></i>
                              Không thích
                            </b-btn>
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-flag"></i>
                              Báo cáo sai phạm
                            </b-btn>
                          </div>
                        </div>
                      </div>
                      <div class="review-item">
                        <div class="review-item-avatar">
                          <img
                            class="avatar avatar-md"
                            src="/images/teacher.png"
                            alt=""
                          />
                        </div>
                        <div class="review-item-content">
                          <div class="font-bold mb-1">Nguyễn Văn Vương</div>
                          <div class="d-flex align-items-center mb-3">
                            <b-form-rating
                              value="5"
                              class="custom-rating me-2"
                              readonly
                            />
                            <span class="font-sm text-gray">1 tuần trước</span>
                          </div>
                          <div class="font-smd mb-4">
                            It's very nicely explained each and every concept in
                            this test, You provided me very deep knowledge, as a
                            beginner it is very useful for me. Thank you.
                          </div>
                          <div class="review-item-action">
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-like"></i>
                              Thích
                            </b-btn>
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-dislike"></i>
                              Không thích
                            </b-btn>
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-flag"></i>
                              Báo cáo sai phạm
                            </b-btn>
                          </div>
                        </div>
                      </div>
                      <div class="review-item">
                        <div class="review-item-avatar">
                          <img
                            class="avatar avatar-md"
                            src="/images/teacher.png"
                            alt=""
                          />
                        </div>
                        <div class="review-item-content">
                          <div class="font-bold mb-1">Nguyễn Văn Vương</div>
                          <div class="d-flex align-items-center mb-3">
                            <b-form-rating
                              value="5"
                              class="custom-rating me-2"
                              readonly
                            />
                            <span class="font-sm text-gray">1 tuần trước</span>
                          </div>
                          <div class="font-smd mb-4">
                            It's very nicely explained each and every concept in
                            this test, You provided me very deep knowledge, as a
                            beginner it is very useful for me. Thank you.
                          </div>
                          <div class="review-item-action">
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-like"></i>
                              Thích
                            </b-btn>
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-dislike"></i>
                              Không thích
                            </b-btn>
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-flag"></i>
                              Báo cáo sai phạm
                            </b-btn>
                          </div>
                        </div>
                      </div>
                      <div class="review-item">
                        <div class="review-item-avatar">
                          <img
                            class="avatar avatar-md"
                            src="/images/teacher.png"
                            alt=""
                          />
                        </div>
                        <div class="review-item-content">
                          <div class="font-bold mb-1">Nguyễn Văn Vương</div>
                          <div class="d-flex align-items-center mb-3">
                            <b-form-rating
                              value="3"
                              class="custom-rating me-2"
                              readonly
                            />
                            <span class="font-sm text-gray">1 tuần trước</span>
                          </div>
                          <div class="font-smd mb-4">
                            It's very nicely explained each and every concept in
                            this test, You provided me very deep knowledge, as a
                            beginner it is very useful for me. Thank you.
                          </div>
                          <div class="review-item-action">
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-like"></i>
                              Thích
                            </b-btn>
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-dislike"></i>
                              Không thích
                            </b-btn>
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-flag"></i>
                              Báo cáo sai phạm
                            </b-btn>
                          </div>
                        </div>
                      </div>
                      <div class="review-item">
                        <div class="review-item-avatar">
                          <img
                            class="avatar avatar-md"
                            src="/images/teacher.png"
                            alt=""
                          />
                        </div>
                        <div class="review-item-content">
                          <div class="font-bold mb-1">Nguyễn Văn Vương</div>
                          <div class="d-flex align-items-center mb-3">
                            <b-form-rating
                              value="5"
                              class="custom-rating me-2"
                              readonly
                            />
                            <span class="font-sm text-gray">1 tuần trước</span>
                          </div>
                          <div class="font-smd mb-4">
                            It's very nicely explained each and every concept in
                            this test, You provided me very deep knowledge, as a
                            beginner it is very useful for me. Thank you.
                          </div>
                          <div class="review-item-action">
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-like"></i>
                              Thích
                            </b-btn>
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-dislike"></i>
                              Không thích
                            </b-btn>
                            <b-btn variant="link" class="btn-link">
                              <i class="icon-flag"></i>
                              Báo cáo sai phạm
                            </b-btn>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-center mb-3">
                      <b-btn class="loadmore" variant="primary">
                        Xem thêm
                      </b-btn>
                    </div>
                  </b-card>
                </div>
              </b-tab>
              <b-tab title="Danh sách câu hỏi">
                <div class="tab-content-container">
                  <b-card
                    header="Danh sách câu hỏi"
                    header-tag="header"
                    class="mb-3"
                  >
                    <div class="list-question mb-4">
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="question-item">
                        <div
                          class="question-title d-flex justify-content-between"
                        >
                          <div class="question-name font-bold">Câu hỏi 1</div>
                          <div class="question-category text-gray">
                            <i class="icon-tag" />
                            <span class="font-sm">Reading, Cơ bản</span>
                          </div>
                        </div>
                        <div class="question-content text-smd">
                          Which of the following lists all and only the
                          appropriate descriptions about a 32-bit CPU and a
                          64-bit CPU? I When a 32-bit CPU and a 64-bit CPU are
                          compared, a 64-bit CPU has a larger theoretical
                          maximum memory space.. II There is no 32-bit OS that
                          runs on a PC with a 64-bit CPU. III In terms of the
                          read and write speed of a USB memory, the speed of a
                          PC with a 64-bit CPU is twice as fast as that of a PC
                          with a 32-bit CPU.
                        </div>
                        <div class="question-item-answer">
                          <div class="answer-head">
                            <span class="font-sm text-gray">câu trả lời</span>
                          </div>
                          <div class="list-answer">
                            <ul class="list-unstyled p-0">
                              <li>
                                <b>A.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>B.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>C.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                              <li>
                                <b>D.</b>
                                Deciding one’s own strategy in a game according
                                to the strategy of the opponent
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-center mb-3">
                      <b-btn variant="primary">Xem thêm</b-btn>
                    </div>
                    <b-pagination total-rows="50" align="right" />
                  </b-card>
                </div>
              </b-tab>
            </b-tabs>
          </b-col>
          <b-col md="12" lg="4" class="do-exam-sidebar-wrapper">
            <div class="do-exam-sidebar text-black">
              <div class="card-do-exam card-filter mb-3">
                <b-btn
                  variant="success"
                  block
                  class="font-lmd mb-3 button-do-exam button-do-exam-sp"
                  @click="$bvModal.show('modal-start-exam')"
                >
                  BẮT ĐẦU LÀM BÀI
                </b-btn>
                <b-btn
                  variant="success"
                  block
                  class="font-lmd mb-3 button-do-exam"
                  @click="$bvModal.show('modal-start-exam')"
                >
                  BẮT ĐẦU LÀM BÀI
                </b-btn>
                <div class="card-filter-body">
                  <div class="filter-group">
                    <strong
                      :class="
                        showFilterGroup1
                          ? 'filter-group-header'
                          : 'filter-group-header collapsed'
                      "
                      @click="showFilterGroup1 = !showFilterGroup1"
                    >
                      Cài đặt đề thi
                      <i class="icon-caret-down"></i>
                    </strong>
                    <b-collapse
                      v-model="showFilterGroup1"
                      class="filter-group-body"
                    >
                      <b-form-checkbox-group v-model="selectedOptions1">
                        <b-form-checkbox
                          v-for="item in options1"
                          :key="item.value"
                          :value="item.value"
                        >
                          <div class="d-flex justify-content-between">
                            <span>{{ item.text }}</span>
                            <div class="group-input-xs">
                              <input class="form-control" type="text" />
                              <strong>/ 100</strong>
                            </div>
                          </div>
                        </b-form-checkbox>
                      </b-form-checkbox-group>
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
                      Thời gian làm bài
                      <i class="icon-caret-down"></i>
                    </strong>
                    <b-collapse
                      v-model="showFilterGroup2"
                      class="filter-group-body"
                    >
                      <b-form-group>
                        <b-form-radio
                          v-model="selectedOptions2"
                          name="time-radios"
                          value="0"
                        >
                          Không tính giờ
                        </b-form-radio>
                        <b-form-radio
                          v-model="selectedOptions2"
                          name="time-radios"
                          value="1"
                        >
                          <div class="d-flex justify-content-between">
                            <span>Tính giờ</span>
                            <div class="group-input-xs">
                              <input class="form-control" type="text" />
                              <strong>phút</strong>
                            </div>
                          </div>
                        </b-form-radio>
                      </b-form-group>
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
                      Cài đặt khác
                      <i class="icon-caret-down"></i>
                    </strong>
                    <b-collapse
                      v-model="showFilterGroup3"
                      class="filter-group-body"
                    >
                      <b-form-checkbox-group
                        v-model="selectedOptions3"
                        :options="options3"
                        value-field="value"
                        text-field="text"
                      ></b-form-checkbox-group>
                    </b-collapse>
                  </div>
                </div>
              </div>
              <div class="card-ranking card-filter mb-3">
                <div class="mb-3 font-bold">Bảng xếp hạng</div>
                <div class="list-ranking-user">
                  <div class="ranking-item text-smd">
                    <div class="d-flex align-items-center">
                      <img
                        class="avatar avatar-md"
                        src="/images/teacher.png"
                        alt=""
                      />
                      <span class="ms-2">Phùng Việt</span>
                    </div>
                    <span class="text-gray">98 điểm</span>
                  </div>
                  <div class="ranking-item text-smd">
                    <div class="d-flex align-items-center">
                      <img
                        class="avatar avatar-md"
                        src="/images/teacher.png"
                        alt=""
                      />
                      <span class="ms-2">Phùng Việt</span>
                    </div>
                    <span class="text-gray">98 điểm</span>
                  </div>
                  <div class="ranking-item text-smd">
                    <div class="d-flex align-items-center">
                      <img
                        class="avatar avatar-md"
                        src="/images/teacher.png"
                        alt=""
                      />
                      <span class="ms-2">Phùng Việt</span>
                    </div>
                    <span class="text-gray">98 điểm</span>
                  </div>
                  <div class="ranking-item text-smd">
                    <div class="d-flex align-items-center">
                      <img
                        class="avatar avatar-md"
                        src="/images/teacher.png"
                        alt=""
                      />
                      <span class="ms-2">Phùng Việt</span>
                    </div>
                    <span class="text-gray">98 điểm</span>
                  </div>
                  <div class="ranking-item text-smd">
                    <div class="d-flex align-items-center">
                      <img
                        class="avatar avatar-md"
                        src="/images/teacher.png"
                        alt=""
                      />
                      <span class="ms-2">Phùng Việt</span>
                    </div>
                    <span class="text-gray">98 điểm</span>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <b-modal id="modal-start-exam" class="modal-common" hide-footer centered>
      <div class="text-center mb-4">
        <img class="mb-3" src="/images/bot-icon.svg" alt="bot" />
        <div class="font-bold text-lmd mb-3">
          Vui lòng xác nhận bạn không phải là robot
        </div>
        <img class="" src="/images/gcaptcha.png" alt="captcha" />
      </div>
      <div class="modal-footer-common">
        <b-btn variant="outline" @click="hide()">Hủy bỏ</b-btn>
        <b-btn variant="primary" @click="StartExam()">Bắt đầu</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},
  layout: 'default',
  auth: false,
  setup() {},
  data() {
    return {
      idExam: this.$route.params.id || null,
      breadcrumbs: [
        {
          text: 'Trang chủ',
          href: '/',
        },
        {
          text: 'Đề thi',
          href: '/de-thi',
        },
        {
          text: 'Thi Tốt nghiệp THPT',
          href: '/de-thi/tot-nghiep-thpt',
        },
        {
          text: '400 câu trắc nghiệm Mạo từ trong tiếng Anh có đáp án cực hay',
          active: true,
        },
      ],
      selectedBookmark: [],
      optionsBookmark: [
        { text: 'Yêu thích', value: 1 },
        { text: 'Đề vật lý', value: 2 },
      ],
      selectedSort: 'latest',
      optionsSort: [
        { value: 'latest', text: 'Mới nhất' },
        { value: 'rating', text: 'Đánh giá cao nhất' },
      ],
      showFilterGroup1: true,
      selectedOptions1: [],
      options1: [
        { text: 'Reading', value: 1 },
        { text: 'Listening', value: 2 },
        { text: 'Writing', value: 3 },
        { text: 'Speaking', value: 4 },
      ],
      showFilterGroup2: true,
      selectedOptions2: [],
      showFilterGroup3: true,
      selectedOptions3: [],
      options3: [
        { text: 'Xáo trộn câu hỏi', value: 1 },
        { text: 'Xáo trộn đáp án', value: 2 },
        { text: 'Xem kết quả sau khi trả lời câu hỏi', value: 3 },
      ],
      dataExam: {
        id: 1,
        name: '400 câu trắc nghiệm Mạo từ trong tiếng Anh có đáp án cực hay',
        description:
          'English speaking course. 77 Hours of English language speaking, English listening practice. 1000 English language words',
        thumbnail: '/images/exam-1.jpg',
        category: 'Thi tốt nghiệp THPT',
        time: '45',
        examCount: '100',
        questionCount: '90',
        teacherId: 1,
        teacherAvatar: '/images/teacher.png',
        teacherName: 'Cô giáo Minh Thu',
        rating: '4.5',
        ratingCount: 20,
        level: 1,
        tags: [
          {
            id: 1,
            name: 'Vật lý 12',
          },
          {
            id: 2,
            name: 'Luyện thi đại học',
          },
          {
            id: 3,
            name: 'Vật lý nâng cao',
          },
        ],
      },
    }
  },
  methods: {
    StartExam() {
      this.$router.push({
        path: `/de-thi/${this.idExam}/lam-bai`,
      })
    },
  },
})
</script>
