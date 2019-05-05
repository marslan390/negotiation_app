import Vue from 'vue'
import Vuex from 'vuex'
import negotiation from './modules/negotiation'

Vue.use(Vuex)
/**
* This is dummy store, which would use for the testing
* */
export default new Vuex.Store({
  modules: {
    negotiation
  }
})
