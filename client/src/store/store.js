import Vue from 'vue';
import Vuex from 'vuex';
import root from './root';
import user from './modules/user';
import cart from './modules/cart';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    root,
    user,
    cart,
  },
});

export default store;
