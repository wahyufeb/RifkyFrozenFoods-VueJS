import Vue from 'vue';
import Vuex from 'vuex';

import kasirMenu from './kasir/kasirMenu.js';
import adminGudangMenu from './admin-gudang/adminGudangMenu.js';
import kategoriProoduk from './produk/kategoriProduk.js';
import produk from './produk/produk.js';
import keranjang from './keranjang/keranjang.js';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    modules: {
      kasirMenu,
      adminGudangMenu,
      kategoriProoduk,
      produk,
      keranjang,
    },
  });
};

export default createStore;
