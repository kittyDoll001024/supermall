<template>
  <div id="app">
    <!-- 在 vue3 中 keep-alive 发生了改变 -->
    <router-view v-slot="{ Component }">
      <!-- exclude 把该组件排除在缓存外 -->
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar class="tab-bat"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/maintabbar/MainTabBar.vue"
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css"
</style>
