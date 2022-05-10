<template>
  <div>
    <swiper class="detail-swiper" ref="detailSwiper">
      <swiper-item v-for="(item, index) in topImgs"
                   :key="index">
        <img :src="item" alt="" @load="swiperImgLoad">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper"
export default {
  name: "DetailSwiper",
  props: {
    topImgs: Array,
    default() {
      return []
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperImgLoad() {
      this.$emit("swiperImgLoad")
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 250px;
  overflow: hidden;
}
</style>
