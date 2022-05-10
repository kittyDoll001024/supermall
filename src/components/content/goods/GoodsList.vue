<template>
  <div class="goods-list">
    <goods-list-item v-for="(item, index) in goodslist" 
                     :key="index" 
                     :goodsItem="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue"
export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goodslist: Object,
    default() {
      return {}
    }
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
