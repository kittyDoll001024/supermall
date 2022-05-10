<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:nav-center>
          <div>购物车（{{cartLength}}）</div>
      </template>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  computed: {
    ...mapGetters(["cartLength","cartList"])
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  }
}
</script>

<style scoped>
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
    font-weight: bold;
  }

  .cart {
    height: 100vh;
  }
</style>

