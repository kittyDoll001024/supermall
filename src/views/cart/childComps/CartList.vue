<template>
  <div class="cart-list">
    <bscroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList"
                      :key="index"
                      :item-info="item"/>
    </bscroll>
  </div>
</template>

<script>
  import Bscroll from "components/common/bscroll/Bscroll";
  import {mapGetters} from 'vuex'
  import CartListItem from "./CartListItem";
  export default {
    name: "cartList",
    computed: {
      ...mapGetters(["cartList"])
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    components: {
      CartListItem,
      Bscroll
    }
  }
</script>

<style scoped>
.cart-list {
  height: calc(100% - 93px - 40px);
}

  .content {
    height: 100%;

    overflow: hidden;
  }
</style>
