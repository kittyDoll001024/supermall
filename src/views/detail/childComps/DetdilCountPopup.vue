<template>
  <div class="count-popup" v-for="(item, index) in countPopup" :key="index">
    <div class="left-popup">
      <img :src="countPopup.image" alt="">
      <p>{{ countPopup.title }}</p>
    </div>
    <div class="right-popup">
      <p class="desc">{{ countPopup.desc }}</p>
      <p class="price">{{ countPopup.lowNowPrice }}</p>
      <div class="btn-count">
        <button @click="increase()">+</button>
        <input type="text" v-model="count" @input="getValue($event)">
        <button :disabled="dis" @click="reduce">-</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetdilCountPopup",
    props: {
      countPopup: {
        type: Object,
        default: {
          return: {}
        }
      }
    },
    computed: {
      count() {
        // 把 vuex 中的 count 值 同步到 input 框内
          for (const item of this.$store.state.cartList) {
            return item.count
        }
      },
      dis() {
        // 减号按钮是否被禁用
        return this.$store.state.isTrue
      }
    },
    methods: {
      increase() {
        this.$store.commit("increaseBtn", {iid: this.countPopup.iid})
      },
      reduce() {
        this.$store.commit("reduceBtn", {iid: this.countPopup.iid})
      },
      getValue(e) {
        this.$emit("inpCount", e.currentTarget.value)
      }
    }
  }
</script>

<style scoped>
.count-popup {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  background: #fff;
  display: flex;
  width: 80%;
  margin: 0 auto;
  border-radius: 10px;
  z-index: 9;
}

.left-popup {
  width: 50%;
}

.left-popup img {
  width: 90%;
  margin: 5%;
  border-radius: 5px;
}

.left-popup p {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 5%;
  margin-bottom: 5%;
}

.right-popup {
  width: 50%;
  position: relative;
}

.btn-count {
  display: flex;
  justify-content: center;
  margin-top: 20%;
  box-sizing: border-box;
}

.btn-count input {
  background: #f6f6f6;
  color: #202124;
  font-size: 14px;
  width: 30px;
  height: 30px;
  text-align: center;
  border: 0;
  outline: none;
}

button {
  width: 40px;
  height: 30px;
}

.price {
  color: red;
  font-weight: bold;
  font-size: 26px;
  text-align: center;
  margin-top: 16px;
  margin-right: 5%;
}

.desc {
  margin-top: 5%;
  margin-right: 5%;
  font-size: 8px;
  position: relative;
  line-height: 1.4em;
  height: 12.6em;
  overflow: hidden;
}
</style>
