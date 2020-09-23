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
  },
  async saveCategoryProcess({ commit }, data) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const reqSaveCategory = await axios.post(`${process.env.VUE_APP_BASE_API}/product-category/create`, data, headerConfig);
    const resSaveCategory = await reqSaveCategory.data;
    commit('setCategoryCreated', resSaveCategory.data);
    return resSaveCategory
  },
  async deleteCategoryProcess({ commit }, id_product_category) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const reqDeleteProduct = await axios.delete(`${process.env.VUE_APP_BASE_API}/product-category/${id_product_category}/delete`, headerConfig);
    const resDeleteProduct = await reqDeleteProduct.data;
    commit('setCategoryDeleted', id_product_category);
    return resDeleteProduct;
  },
};

const mutations = {
  setCategory(state, categories) {
    state.kategori = categories
  },
  setCategoryCreated(state, data) {
    state.kategori.push(data);
  },
  setCategoryDeleted(state, id_product_category) {
    console.log(id_product_category)
    state.kategori = state.kategori.filter((categoryItem) => categoryItem.id_product_category !== id_product_category);
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}