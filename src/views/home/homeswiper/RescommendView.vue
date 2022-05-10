<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommend" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="rescommendImg" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RescommendView",
  props: {
    recommend: {
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
    // 性能优化 在手机调试在网络一般的情况下会有干扰
    rescommendImg() {
      if(!this.isLoad) {
        this.$emit("rescommendLoad")
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  font-size: 12px;
  text-align: center;
  width: 100%;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}

.recommend-item img {
  width: 100%;
  padding: 0px 10px;
  margin-bottom: 7px;
}
</style>
