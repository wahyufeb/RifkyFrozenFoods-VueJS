const state = {
  menu: [
    { link: 'kasir-gudang', icon: 'el-icon-shopping-cart-2' },
    { link: 'stok-barang-gudang', icon: 'el-icon-box' },
    { link: 'daftar-kios', icon: 'el-icon-s-shop' },
    { link: 'penjualan-kasir-gudang', icon: 'el-icon-document' },
  ],
};

const getters = {
  adminGudangMenu: state => state.menu,
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