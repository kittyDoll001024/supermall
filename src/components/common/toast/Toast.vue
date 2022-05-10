<template>
  <div class="toast" v-show="show">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type: String,
        default: ""
      },
      show: {
        type: Boolean,
        default: false
      }
    },
   /* data() {
      return {
        message: "",
        isShow: false
      }
    },*/
   /* methods: {
      show(message, duration) {
        this.show = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ""
        }, duration)
      }
    }*/
  }
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  background: rgba(0, 0, 0, .5);
  color: #fff;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  z-index: 9999;
}
</style>
