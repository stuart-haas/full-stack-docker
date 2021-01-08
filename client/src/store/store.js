import Vue from 'vue';
import Vuex from 'vuex';
import root from './root';
import user from './modules/user';
import cart from './modules/cart';
import product from './modules/product';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    root,
    user,
    cart,
    product,
  },
});

export default store;
