<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" Activecolor="red">
        <template v-slot:tabbar-icon>
          <img src="~assets/img/tabbar/home.svg" alt="">
        </template>
        <template v-slot:tabbar-icon-active>
          <img src="~assets/img/tabbar/home_active.svg" alt="">
        </template>
        <template v-slot:tabbar-text>
          <div>首页</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/category" Activecolor="red">
        <template v-slot:tabbar-icon>
          <img src="~assets/img/tabbar/category.svg" alt="">
        </template>
        <template v-slot:tabbar-icon-active>
          <img src="~assets/img/tabbar/category_active.svg" alt="">
        </template>
        <template v-slot:tabbar-text>
          <div>分类</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/cart" Activecolor="red">
        <template v-slot:tabbar-icon>
          <img src="~assets/img/tabbar/shopcart.svg" alt="">
        </template>
        <template v-slot:tabbar-icon-active>
          <img src="~assets/img/tabbar/shopcart_active.svg" alt="">
        </template>
        <template v-slot:tabbar-text>
          <div>购物车</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/profile" Activecolor="red"> 
        <template v-slot:tabbar-icon>
          <img src="~assets/img/tabbar/profile.svg" alt="">
        </template>
        <template v-slot:tabbar-icon-active>
          <img src="~assets/img/tabbar/profile_active.svg" alt="">
        </template>
        <template v-slot:tabbar-text>
          <div>我的</div>
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/Tabbar/Tabbar.vue"
import TabBarItem from "components/common/Tabbar/TabBarItem.vue"
export default {
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
