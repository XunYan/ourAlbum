import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import * as getters from './getter'
import login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    login
  }
})
