import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    is_company: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_IS_COMPANY(state, is_company) {
      state.is_company = is_company
    }
  },
  actions: {
    updateUser({commit}, user) {
      if (user) {
        commit('SET_USER', user)
      } else {
        commit('SET_USER', null)
      }
    },
    updateIsCompany({commit}, is_company) {
      commit('SET_IS_COMPANY', is_company)
    } 
  },
  getters: {
    user(state){
      return state.user
    }
  },
});
