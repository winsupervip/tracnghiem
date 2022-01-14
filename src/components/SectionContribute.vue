<template>
  <section class="section section-contribute">
    <b-container>
      <b-row>
        <b-col cols="12" sm="12" md="8" lg="7">
          <div class="contribute-left">
            <Heading
              white
              title="Bạn có ngân hàng đề thi trắc nghiệm?"
              sub-title="Hàng ngàn người dùng đã tham gia xây dựng ngân hàng đề thi trắc nghiệm online tại tracnghiem.vn. Chúng tôi cung cấp công cụ và môi trường để bạn chia sẻ với hàng ngàn người khác."
              class="mb-4"
            ></Heading>
            <nuxt-link
              to="/dong-gop-cau-hoi"
              class="btn btn-secondary font-smd"
            >
              ĐÓNG GÓP NGAY
            </nuxt-link>
          </div>
        </b-col>
        <b-col cols="12" sm="12" md="4" lg="5">
          <div class="contribute-right">
            <img
              class="animate__animated"
              src="https://storage.tracnghiem.vn/public/images/contribute-girl.png"
              alt="Đóng góp câu hỏi ngay"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'SectionContribute',
}
</script>
