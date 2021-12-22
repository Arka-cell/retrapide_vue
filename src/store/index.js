import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    updateUser({commit}, user) {
      if (user) {
        commit('SET_USER', user)
      } else {
        commit('SET_USER', null)
      }
    }
  },
  getters: {
    user(state){
      return state.user
    }
  },
});
