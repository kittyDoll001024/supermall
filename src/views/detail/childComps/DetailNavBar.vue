<template>
  <div>
    <nav-bar>
      <template v-slot:nav-left>
        <div class="back" @click="backClick">
          <img src="../../../assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:nav-center>
        <div class="title">
          <div v-for="(item, index) in titles"
               :key="index"
               class="title-item"
               :class="{ active: currentIndex == index }"
               @click="titleClick(index)">{{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit("titleClick", index)
    },
    backClick() {
      // 返回上一层
      // this.$router.go(-1)
      this.$router.back()
      this.$emit("inpPush")
    },
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
  padding: 0 20px;

}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-tint);
}

.back img {
  margin-top: 15px;
}
</style>
