import Vue from 'vue';
import Vuex from 'vuex';

// Menu
import kasirMenu from './kasir/kasirMenuStore.js';
import adminGudangMenu from './admin-gudang/adminGudangMenuStore.js';
import adminMenu from './admin/adminMenuStore.js';

// Produk
import produk from './produk/produkStore.js';
import kategoriProoduk from './produk/kategoriProdukStore.js';

// Keranjang
import keranjang from './keranjang/keranjangStore.js';

// Accounts
import login from './accounts/loginStore.js';

// Income
import income from './income/incomeStore.js';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    modules: {
      kasirMenu,
      adminGudangMenu,
      adminMenu,
      kategoriProoduk,
      produk,
      keranjang,
      login,
      income,
    },
  });
};

export default createStore;
