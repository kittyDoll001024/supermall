<template>
  <!-- <swiper ref="swiper" :loaded="counter!==0&&counter===banners.length"> -->
  <swiper ref="swiperInfo">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt=""  @load="imgLoad">
        <!-- <img :src="item.image" @load="counter++" alt=""> -->
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper"
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imgLoad() {
      // 性能优化,当 isLoad 为 flase 就执行,执行完成后把 isLoad 修改为 true 
      if(!this.isLoad) {
        this.$emit('swiperImgLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style>

</style>
