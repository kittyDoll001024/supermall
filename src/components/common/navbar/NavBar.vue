<template>
  <div class="nav-tab">
    <!-- 左侧 -->
    <div class="left">
      <slot name="nav-left"></slot>
    </div>
    <!-- 中间 -->
    <div class="center">
      <slot name="nav-center"></slot>
    </div>
    <!-- 右侧 -->
    <div class="right">
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.nav-tab {
  display: flex;
  line-height: 48px;
  height: 48px;
  text-align: center;
  box-shadow: 0px 1px 1px rgba(100, 100, 100, .2);
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1;
}
</style>
