import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
  content: {}
}
const getters = {
  getContent(state) {
    return state.content
  }
}
const mutations = {
  changeContent(state, dt) {
    state.content = dt
  }
};
const actions = {
  changeContent(context, dt) {
    context.commit('changeContent', dt)
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
}) 
