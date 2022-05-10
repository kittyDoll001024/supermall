import { debounce } from "common/utils";

// 混入
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // 防抖函数
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      if(this.$refs.scroll != null && this.$refs.scroll != undefined) {
        this.newRefresh()
      }
    }
    // 事件总线
    this.$mybus.on("itemImgLoad", this.itemImgListener)
  }
}

export  const backTopMixin = {
  data() {
    return {
      isTrue: false,
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
  }
}
