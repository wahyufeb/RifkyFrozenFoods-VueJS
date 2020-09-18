/* eslint-disable no-undef */
import axios from 'axios';
import { setDecryptCookie } from '@/helper/setCookie.js';

const state = {
  kategori: [],
};

const getters = {
  kategoriProduk: state => {
    return state.kategori;
  },
};

const actions = {
  async productCategories({ commit }) {
    let token = setDecryptCookie('TOKEN', null);
    const reqCategories = await axios.get(`${process.env.VUE_APP_BASE_API}/product-category/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resCategories = await reqCategories.data;
    if (resCategories.code === 200) {
      commit('setCategory', resCategories.data);
    }
  }
};

const mutations = {
  setCategory(state, categories) {
    state.kategori = categories
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}