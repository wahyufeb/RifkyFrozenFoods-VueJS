const state = {
  menu: [
    { link: 'dashboard-admin', icon: 'el-icon-odometer', name: 'Dashboard' },
    { link: 'manajemen-produk', icon: 'el-icon-box', name: 'Manajemen Produk' },
    { link: 'manajemen-pengguna', icon: 'el-icon-user', name: 'Manajemen Pengguna' },
    { link: 'manajemen-laporan', icon: 'el-icon-document', name: 'Manajemen Laporan' },
  ],

};

const getters = {
  adminMenu: state => state.menu,
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