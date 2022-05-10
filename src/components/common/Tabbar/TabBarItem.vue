<template>
  <div class="tab-bar-item" @click="tabbarClick">
    <div v-if="!isActive"><slot name="tabbar-icon"></slot></div>
    <div v-else><slot name="tabbar-icon-active"></slot></div>
    <div :style="Activestyle"><slot name="tabbar-text"></slot></div>      
  </div>
</template>

<script>
export default {
  props: {
    // 传过来的路由地址
    path: String,
    // active 颜色
    Activecolor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  methods: {
    // 路由切换
    tabbarClick() {
      return this.$router.push(this.path)
    }
  },
  computed: {
    // 当前活跃路由颜色高亮
    isActive() {
      return this.$route.path == this.path ? true : false
    },
    Activestyle() {
      return this.isActive == true ? {color: this.Activecolor} : {}
    }
  }
}
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 12px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 3px;
  margin-bottom: 2px;
}
</style>
