export default {
  addCart(state, payload) {
    // 保存旧数组元素
    let oldProduct = null
    for (let item of state.cartList) {
      if(item.iid === payload.iid) {
        oldProduct = item
      }
    }
    // oldProduct 不为空就让 count + 1，如果为空就添加一条新的元素
    if(oldProduct !== null) {
      oldProduct.count = 1
    }else {
      payload.count = 1
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  increaseBtn(state, payload) {
    // count 数量加
    for (const item of state.cartList) {
      // 判断商品 id 是否一样
      if(item.iid === payload.iid) {
        // count 数量的上限
        if(item.count === 10000 || item.count >= 0) {
          item.count++
          // 激活减号按钮
          if(item.count !== 0) {
            state.isTrue = false
          }
        }else {
          confirm("该商品暂无法满足您所需的数量")
        }
      }
    }
  },
  reduceBtn(state, payload) {
    // count 数量减
    for (const item of state.cartList) {
      if(item.iid === payload.iid) {
        item.count === 0 ? 0 : item.count--
        // count 值等于 0 时减号按钮被禁用
        if(item.count === 0) {
          state.isTrue = true
        }
      }
    }
  },
  inpCount(state, payload) {
    // 可以使用 input 框去改变 count的数量
    state.cartList.forEach(element => {
      element.count = payload.Val
    })
  }
}
