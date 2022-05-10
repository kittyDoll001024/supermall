<template>
  <div id="detail">
    <detail-nav-bar  class="detail-nav"
                     @title-click="titleClick"
                     ref="navbar"
                     @inpPush="inpPush"/>
    <bscroll class="content"
             ref="scroll"
             @scroll="contentScroll"
             :probe-type="3">
      <detail-swiper :topImgs="topImgs"
                     ref="homeSwiper"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad"/>
      <detail-params-info :params-info="paramsInfo"
                          ref="params"/>
      <detail-comment-info :commentInfo="commentInfo"
                           ref="comment"/>
      <goods-list :goodslist="recomment"
                  ref="recommend"/>
    </bscroll>
    <detail-bottom-bar @addTocart="addTocart"/>
    <back-top @click="backClick"
              v-show="isTrue"></back-top>
    <detdil-count-popup :countPopup="countPopup"
                        v-if="isFalse"
                        @inpCount="inpCount"/>
    <detail-back v-if="isFalse"
                 @click="btnBack" />
    <toast :show="isShow" message="添加购物车成功"/>
  </div>
</template>
<script>
// 导航条
import DetailNavBar from "./childComps/DetailNavBar"
// 轮播图
import DetailSwiper from "./childComps/DetailSwiper"
// 商品信息
import DetailBaseInfo from "./childComps/DetailBaseInfo"
// 商家信息
import DetailShopInfo from "./childComps/DetailShopInfo"
// 商品效果图
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
// 兼容滚动
import Bscroll from "components/common/bscroll/Bscroll"
// 商品参数
import DetailParamsInfo from "./childComps/DetailParamsInfo"
// 顾客评论
import DetailCommentInfo from "./childComps/DetailCommentInfo"
// 推荐商品
import GoodsList from 'components/content/goods/GoodsList'
// 加入购物车
import DetailBottomBar from "./childComps/DetdilBottomBar";
// 一键返回顶部
import BackTop from "components/content/backtop/BackTop"
// 购物车弹出框
import DetdilCountPopup from "./childComps/DetdilCountPopup";
// 黑色遮挡层
import DetailBack from "./childComps/DetailBack";
//
import Toast from "components/common/toast/Toast";
// 网络请求
import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail"
// 防抖函数
import { debounce } from "common/utils"
// 混入
import { itemListenerMixin, backTopMixin } from "common/mixin";


export default {
  name: "Detail",
  // 混入
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      // 保存 id
      iid: null,
      // 保存轮播图信息
      topImgs: [],
      // 商品信息
      goods: {},
      // 商家信息
      shop: {},
      // 穿着效果
      detailInfo: {},
      // 商品参数
      paramsInfo: {},
      // 顾客评论
      commentInfo: {},
      // 推荐商品
      recomment: [],
      // itemImgListener: null
      // 组件向上高度
      themeTopYs: [],
      getThemeTopY: null,
      // 计数器
      currentIndex: 0,
      // 一键返回顶部
      isTrue: false,
      // 加入购物车时的数据
      countPopup: {},
      // 关闭购物车弹出框
      isFalse: false,
      // 保存 input 框内的数值
      inp: {},
      //
      isShow: false
    }
  },
  created() {
    // 商品 id
    this.iid = this.$route.query.iid

    getDetail(this.iid)
    .then(res => {
      // 轮播图
      this.topImgs = res.result.itemInfo.topImages
      // 商品信息
      this.goods = new Goods(res.result.itemInfo, res.result.shopInfo.services, res.result.columns)
      // 商家信息
      this.shop = new Shop(res.result.shopInfo)
      // 商品穿着效果
      this.detailInfo = res.result.detailInfo
      // 商品参数
      this.paramsInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
      // 顾客评论
      // 判断评论中是否有图片
      if(res.result.rate.CRate !== 0) {
        this.commentInfo = res.result.rate.list[0]
      }
      // console.log(res);

      /*
      * 当我们的页面还没有加载完成时就点击加入购物车
      * 就会使我们的购物车弹出框没有数据传输过去
      * 这时就需要在我们的数据加载完成后立即的让我们的
      * 程序去帮我们点击一次购物车按钮
      */
      this.$nextTick(() => {
        if(this.isFalse == true) {
          this.addTocart()
        }
      })
    })
    getRecommend()
    .then(res => {
      // 推荐商品
      this.recomment = res.data.list
    })
  },
  mounted() {
    /* const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      refresh()
    }
    this.$mybus.on("itemImgLoad", this.itemImgListener) */
    // 保存 商品 参数 评论 推荐 的组件向上高度
    this.getThemeTopY = debounce(() => {
      if(this.$refs.navbar !== undefined && this.$refs.navbar !== null) {
        // 获取 navbar 的高度
        let navHeight = this.$refs.navbar.$el.offsetHeight
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - navHeight)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - navHeight)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - navHeight)
        // hake 做法时传入一个最大值
        this.themeTopYs.push(Number.MAX_VALUE)
      }
    })
  },
  unmounted() {
    // 移除 itemImgLoad 事件监听
    this.$mybus.off("itemImgLoad", this.itemImgListener)
  },
  methods: {
    imageLoad() {
      // this.$refs.scroll.refresh()
      // this.newRefresh()
      // 调用一下防抖函数
      this.getThemeTopY()
    },
    titleClick(index) {
      this.currentIndex = index
      // 点击相应的 index 滚动到所指定的组件
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
    },
    contentScroll(opsition) {
      // 滚动监听

      /* let opsitionY = -opsition.y
      for(let i = 0; i < this.themeTopYs.length-1; i++) {
        if(this.currentIndex !== i &&
          ((i < this.themeTopYs.length -1 && opsitionY >= this.themeTopYs[i] && opsitionY < this.themeTopYs[i+1])
          || (i === this.themeTopYs.length -1 && opsitionY >= this.themeTopYs[i]))) {
          this.currentIndex = i
          this.$refs.navbar.currentIndex = this.currentIndex
        }
      } */


      // hake 做法
      /* let opsitionY = -opsition.y
      for(let i = 0; i < this.themeTopYs.length-1; i++) {
        if((this.currentIndex !== i) &&
          parseInt(opsitionY) >= this.themeTopYs[i] && parseInt(opsitionY) < this.themeTopYs[i+1]) {
          this.currentIndex = i
          this.$refs.navbar.currentIndex = this.currentIndex
        }
      } */


      /*
      * 1. 先获取到整体的滚动高度
      * 2. 遍历我们获取好的四个组件的高度
      * 3. 判断第一个组件: 整体高度 大于等于 第一个组件的高度 且 小于 第二个组件的高度(二三组件类推)
      * 4. 判断第四个组件 当我们整体高度 大于等于 第四个组件的高度
      * 5. 把相应的下标传给 currentIndex 再把 currentIndex 传给 navbar 组件的下标
      * 6. 防止调用频繁当 currentIndex 不等于 i 时 则不在调用
      */
      let opsitionY = parseInt(-opsition.y)
      for(let i = 0; i < this.themeTopYs.length-1; i++) {
        if((this.currentIndex !== i) &&
          (opsitionY >= this.themeTopYs[i] && opsitionY < this.themeTopYs[i+1]) ||
          (i === this.themeTopYs.length-1 && opsitionY >= this.themeTopYs[i])) {
            this.currentIndex = i
            // 有时候 navbar 组件加载慢
            if(this.$refs.navbar !== undefined && this.$refs.navbar !== null) {
              this.$refs.navbar.currentIndex = this.currentIndex
            }
          }
      }
      // 判断一键返回顶部滚动多少在显示
      (-opsition.y) > 1570 ? this.isTrue = true : this.isTrue = false
    },
    /* backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },*/
    // 加入购物车
    addTocart() {
        // 把需要的数据添加到 product 对象中
        const product = {}
        product.image = this.topImgs[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.lowNowPrice = this.goods.lowNowPrice
        product.iid = this.iid
        // 加入到vuex中
        this.$store.commit('addCart', product)

        // 当点击购物车时 会弹出一个黑色的遮盖层，为避免内存的浪费使轮播图暂时滚动
        this.countPopup = product
        this.isFalse = true
        if(this.isFalse) {
          this.$refs.homeSwiper.$refs.detailSwiper.stopTimer()
        }
    },
    btnBack() {
      // 点击关闭购物车弹窗同时关闭黑色遮罩层同时启用轮播图
      this.isFalse = false
      if(this.isFalse === false) {
        this.$refs.homeSwiper.$refs.detailSwiper.startTimer()
      }
      this.isShow = true
        setTimeout(()=> {
          this.isShow = false
        }, 1500)
    },
    inpPush() {
      console.log(this.inp)
    },
    inpCount(val) {
      this.inp = {
        Val: parseInt(val),
        iid: this.iid
      }
      /*
      * 使用 input 去改变 count 值
      * 同时设置输入的上限 ，
      * 当关闭弹出框时还是会触发一次 input 但是最后一次为 undefined
      * 这时就把最后一次去掉
      * */
      this.$store.state.cartList.forEach(item => {
        if(item.iid === this.iid) {
          if(val !== undefined) {
            if(item.count <= 10000 && this.inp.Val <= 10000) {
              this.$store.commit('inpCount', this.inp)
            }else {
              confirm("该商品暂无法满足您所需的数量")
            }
          }
        }
      })
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    DetdilCountPopup,
    DetailBack,
    Bscroll,
    Goods,
    Shop,
    GoodsParam,
    GoodsList,
    debounce,
    BackTop,
    Toast
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 106px);
  overflow: hidden;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}
</style>
