import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  cartList: [],
  isTrue: false
}

export default createStore({
  state,
  mutations,
  actions,
  getters
})
