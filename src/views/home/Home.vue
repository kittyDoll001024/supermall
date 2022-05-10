<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-tar class="home-nav">
      <template v-slot:nav-center>购物街</template>
    </nav-tar>

    <tab-control ref="tabControl1"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   class="tab-control1"
                   v-show="isTabFixed"/>
    <!-- 兼容手机滚动效果 -->
    <bscroll class="content"
             ref="scroll"
             :probe-type="3"
             @scroll="contentScroll"
             :pullUpLoad="true"
             @pullingUp="loadMore">
      <home-swiper :banners="banners"
                    @swiperImgLoad="swiperImgLoad"
                    ref="homeSwiper" />
      <rescommend-view :recommend="recommend" @rescommendLoad="rescommendLoad"/>
      <feature-view />
      <tab-control ref="tabControl2"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"/>
      <goods-list :goodslist="showGoods"/>
    </bscroll>
    <!--  vue.cli 3.0 中 native(修饰符) 被废弃 在 vue.cli 2.0 中还是需要使用 native(修饰符)-->
    <back-top @click="backClick" v-show="isTrue"></back-top>
  </div>
</template>

<script>
// 轮播图
import HomeSwiper from "./homeswiper/HomeSwiper"
// 福利区
import RescommendView from './homeswiper/RescommendView'
// 本周流行
import FeatureView from './homeswiper/FeatureView'

    // 公共区
// 导航栏
import NavTar from "components/common/navbar/NavBar"
// 切换栏
import TabControl from "components/content/tabControl/TabControl"
// 商品区
import GoodsList from "components/content/goods/GoodsList"
// 兼容滚动
import Bscroll from "components/common/bscroll/Bscroll"
// 返回顶部
import BackTop from "components/content/backtop/BackTop"
// 混入
import { itemListenerMixin, backTopMixin } from "common/mixin";

// 网络请求请求
import { getHomeMultdata, getHomeGoods } from "@/network/home"
// 网页防抖动
// import { debounce } from '../../common/utils'

export default {
  name: "Home",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      // 接口数据
      banners: [],
      recommend: [],
      // 列表数据
      goods: {
        "pop": {page: 0, list: []},
        "new": {page: 0, list: []},
        "sell": {page: 0, list: []}
      },
      // 标签页的默认值为第一个标签
      currentType: "pop",
      // 一键置顶初始值
      isTrue: false,
      // 保存从轮播图到切换栏的高度
      tabOffsetTop: 0,
      // 切换栏是否显示
      isTabFixed: false,
      // 保留切换路由当时的位置
      saveY: 0,
      // 保存事件监听函数
      // itemImgListener: null
    }
  },
  // 挂载
  components: {
    HomeSwiper,
    RescommendView,
    FeatureView,
    NavTar,
    TabControl,
    GoodsList,
    Bscroll,
    BackTop
  },
  // 保存路由状态，切换路由时不被销毁
  activated() {
    // 重新加载轮播图
    this.$refs.homeSwiper.$refs.swiperInfo.startTimer()

    if(this.$refs.scroll != null && this.$refs.scroll != undefined) {
      // 在从新切换回路由时要先重新计算 better-scroll
      this.$refs.scroll.refresh()
      // 用保存下来的位置信息，快速的重新跳到这个位置
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    }
  },
  deactivated() {
    // 离开时关闭轮播图
    this.$refs.homeSwiper.$refs.swiperInfo.stopTimer()

    if(this.$refs.scroll != null && this.$refs.scroll != undefined) {
      // 获取到我们当前的一个滚动位置，在切换路由时把当前的位置保存下来
      this.saveY = this.$refs.scroll.getScrollY()
    }

    // 离开时移除 itemImgLoad 事件监听
    this.$mybus.off("itemImgLoad", this.itemImgListener)
  },
  // 网络请求
  created() {
    // 函数调用，如果不保存起来，函数执行完后会被内存回收掉
    this.getHomeMultdata()

    // 商品列表接口数据
    // = 传入第几个分区的数据
    // 流行数据
    this.getHomeGoods("pop")
    // 新款数据
    this.getHomeGoods("new")
    // 精选数据
    this.getHomeGoods("sell")


  },
  mounted() {
    // 监听 item 中图片加载完成
    // 解决无法监听到 then.$refs.scroll
    /*
    *  我们在执行 this.$refs.scroll.refresh() 会出现一个 bug
    *  问题出现是因为我们创建完 Home 组件时去调用 this.$refs.scroll.refresh()
    *  发现 scroll 组件还没创建，所以就访问不到
    */
    // const refresh = debounce(this.$refs.scroll.refresh, 50)
    // this.itemImgListener = () => {
    //   if(this.$refs.scroll != null && this.$refs.scroll != undefined) {
    //     // this.$refs.scroll.refresh()
    //     refresh()
    //   }
    // }
    // this.$mybus.on("itemImgLoad", this.itemImgListener)
  },
  computed: {
    showGoods() {
      // 当前页数的 默认值
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /* 事件监听 */
    // 标签页
    tabClick(index) {
      // index 是 从 TabControl(子组件) 传过来的
      // 根据下标来确定 当前是第几页
      switch (index) {
        case 0:
          this.currentType = "pop"
          break;
        case 1:
          this.currentType = "new"
          break;
        case 2:
          this.currentType = "sell"
      }
      // 为使两个切换栏点击后的 index 保持一致
      if(this.$refs.tabControl1 !== undefined && this.$refs.tabControl2 !== undefined) {
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      }
    },
    // 一键返回顶部
    /*backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },*/
    // 一键返回顶部按钮是否显示
    contentScroll(opsition) {
      // 当 y 轴的值大于 1570 的时候 按钮显示,小于则隐藏
      (-opsition.y) > 1570 ? this.isTrue = true : this.isTrue = false

      // 决定 tabcontrol 是否吸顶
      // 当滚动的高度大于从切换栏到轮播图的一个高度就把 this.isTabFixed 改变为 true
      this.isTabFixed = (-opsition.y) > this.tabOffsetTop
    },
    // 上拉加载更多
    loadMore() {
      // 调用 getHomeGoods 触发内部的代码，再把每次更改后的 this.currentType 传进去
      this.getHomeGoods(this.currentType)
    },
    // 切换栏吸顶
    swiperImgLoad() {
      // 监听等轮播图加载完成后，从切换栏到轮播图的一个高度
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    rescommendLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /*
    * 网络请求
    */
    getHomeMultdata() {
      getHomeMultdata()
      .then(res => {
        this.recommend = res.data.recommend.list
        this.banners = res.data.banner.list
      })
    },
    // 商品列表数据
    getHomeGoods(type) {
      // 设置当前页数默认值为 1
      const page = this.goods[type].page + 1
      getHomeGoods(type, page)
      .then(res => {
        // 使用扩展运算符把接口中的数据加入到 goods 中，如果直接加入会在多形成一个数组
        this.goods[type].list.push(...res.data.list)
        // console.log(this.goods[type].list);
        // 每次加载时页数加 1
        this.goods[type].page += 1
        // 当底部下拉距离超过阈值 就调用 scroll 中的 finishPullUp
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* 100vh 相当于把窗口平均分成了 100份 */
  height: 100vh;
  position: relative;
}

.home-nav {
  background: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999; */
}

.content {
  position: absolute;
  top: 48px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.tab-control1 {
  position: relative;
  z-index: 9;
}

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
