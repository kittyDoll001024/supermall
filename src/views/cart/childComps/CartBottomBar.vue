<template>
  <div class="bottom-bar">
    <div class="check-content" @click="checkClick">
      <check-button :is-checked="isSelectAll" class="check-button" />
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calculClick">
      去计算：{{ chenckLength }}
    </div>
    <toast :show="isShow" :message="message"/>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  import { mapGetters } from "vuex"
  import Toast from "components/common/toast/Toast";
  export default {
    name: "CartBottomBar",
    data() {
      return {
        isTrue: false,
        isShow: false,
        message: ""
      }
    },
    computed: {
      ...mapGetters(["cartList"]),
      totalPrice() {
        return "￥" + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return item.lowNowPrice * item.count + preValue
        },0).toFixed(2)
      },
      chenckLength() {
        return this.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        if(this.cartList.length === 0) return false
        return !this.cartList.find(item => !item.checked)

        /*return !this.cartList.filter(item => {
          return !item.checked
        }).length*/
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
        // this.isSelectAll ? this.cartList.filter(item => item.checked = false) : this.cartList.filter(item => item.checked = true)
      },
      calculClick() {
        if(this.cartList.length === 0) {
          this.isShow = true
          setTimeout(()=> {
            this.isShow = false
          }, 1500)
          this.message = "您没有可结算的商品"
        }else if(this.cartList.length !== 0) {
          for (const item of this.cartList) {
            if(item.checked === false) {
              this.isShow = true
              setTimeout(()=> {
                this.isShow = false
              }, 1500)
              this.message = "您没有已勾选的商品"
            }else {
              this.isShow = true
              setTimeout(()=> {
                this.isShow = false
              }, 1500)
              this.message = "正在准备您的账单"
            }
          }
        }
      }
    },
    components: {
      CheckButton,
      Toast
    }
  }
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  background: #eee;
  line-height: 40px;
}

.check-content {
  display: flex;
  margin-left: 8px;
  width: 60px;
  align-items: center;

}

.check-button {
  width: 18px;
  height: 18px;
  line-height: 18px;
  margin-right: 10px;
}

.price {
  margin-left: 20px;
  font-size: 15px;
  flex: 1;
}

.calculate {
  background: var(--color-tint);
  width: 110px;
  text-align: center;
  color: #fff;
}
</style>
