<template>
  <div class="goods-item" @click="itemClick" v-if="Object.keys(goodsItem).length !== 0">
    <img v-lazy="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: Object,
    default() {
      return {}
    }
  },
  computed: {
    showImage() {
      // 共用组件 判断有那条数据渲染那条数据
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    // 向外传递信息，监听内部图片加载完成
    imgLoad() {
      this.$mybus.emit("itemImgLoad")
    },
    // 路由跳转，并把该路由的 id 传过去
    itemClick() {
      this.$router.push({
        path: "/detail",
        query: {
          iid: this.goodsItem.iid
        }
      })
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 35px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg");
  background-position: 0 0;
  background-size: 14px 14px;
}
</style>
