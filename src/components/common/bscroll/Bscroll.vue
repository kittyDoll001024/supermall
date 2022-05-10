<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Bscroll",
  data() {
    return {
      // 保存 scroll 的实例
      scroll: null,
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 解决 better-scroll 无法拖动
      observeDOM: true,
      // 发生任何形式的拖动行为都可被监测到
      probeType: this.probeType,
      // 防止 Click 事件无法使用
      click: true,
      // 当底部下拉距离超过阈值,但只能调用一次
      pullUpLoad: this.pullUpLoad
    })
    // 一键返回顶部
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (opsition) => {
      this.$emit('scroll', opsition)
    })  
    }
    // 上拉加载更多
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    // 封装一键返回顶部
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    // 重新计算 better-scroll 
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    // 当底部下拉距离超过阈值, 可调用 finishPullUp 重复触发
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
    },
    // 记录切换路由后的一个位置
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
    /* 
    *  在 goodslistitem 中监听的图片加载的时候，从接口中调用的数据来的很快
    *  在调完数据后会立即展示，这时候我的在 home 中的监听，会调用 this.scroll.refresh(),
    *  而这时候的 this.scroll 可能还没初始化完成而导致我们在 home 中访问的 是一个 null
    *  所以我们需要判断一下在 this.scroll 加载后再去执行
    */
  }
}
</script>
