const state = {
  menu: [
    { link: 'kasir-app', icon: 'el-icon-shopping-cart-2' },
    { link: 'stok-barang', icon: 'el-icon-box' },
    { link: 'penjualan-kasir', icon: 'el-icon-document' },
  ],
};

const getters = {
  kasirMenu: state => state.menu,
};

const actions = {

};

const mutations = {

};

export default {
  state,
  getters,
  actions,
  mutations,
}