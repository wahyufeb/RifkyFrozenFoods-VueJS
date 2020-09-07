const state = {
  kategori: [
    { id: 1, name: 'Sosis' },
    { id: 2, name: 'Nugget' },
    { id: 3, name: 'Bakso' },
    { id: 4, name: 'Gorengan' },
    { id: 5, name: 'Isi Burger' },
    { id: 6, name: 'Roti Burger' },
    { id: 7, name: 'Kecap' },
    { id: 8, name: 'Saus' },
    { id: 9, name: 'Mayonaise' },
    { id: 10, name: 'Marimas' },
  ],
};

const getters = {
  kategoriProduk: state => state.kategori,
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