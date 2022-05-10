<template>
  <div class="tab-control">
    <div class="tab-control-item" 
         v-for="(item, index) in titles" 
         :key="index"
         :class="{active: currentIndex === index}"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    // 传进来的标题
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0  // 计数器
    }
  },
  methods: {
    // 点击切换
    itemClick(index) {
      this.currentIndex = index
      // 运用子传父值 
      this.$emit("tabClick", index) 
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  background: var(--color-background);
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;

}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
