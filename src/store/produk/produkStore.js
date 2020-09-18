/* eslint-disable no-undef */
import axios from 'axios';
import { setDecryptCookie } from '@/helper/setCookie.js';

const state = {
  produk: [],
  loadingProduk: false,
};

const getters = {
  produkList: state => {
    return state.produk
  },
  kodeProduk: state => {
    let filteredProduk = []
    state.produk.filter((data) => {
      filteredProduk.push({ idProduct: data.idProduct, value: data.name });
    });
    return filteredProduk;
  }
};

const actions = {
  findCategory({ commit }, category) {
    commit('setCategory', category)
  },
  findProduct({ commit }, keyword) {
    commit('setProduct', keyword);
  },
  activateLoading({ commit }) {
    commit('setActivateLoading');
  },
  async getProducts({ commit }) {
    let token = setDecryptCookie('TOKEN', null);
    const reqProducts = await axios.get(`${process.env.VUE_APP_BASE_API}/products`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resProducts = await reqProducts.data;
    if (resProducts.code === 200) {
      commit('setProductLoaded', resProducts.data);
    }
    return resProducts;
  },
  async createProductProcess({ commit, dispatch }, data) {
    const { name, image, total_perunit, id_product_category } = data.dataProduct;
    let formProduct = new FormData();

    formProduct.append('name', name);
    formProduct.append('image', image)
    formProduct.append('total_perunit', total_perunit)
    formProduct.append('id_product_category', id_product_category);

    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const reqCreateProduct = await axios.post(`${process.env.VUE_APP_BASE_API}/products/create`, formProduct, headerConfig);
    const resCreateProduct = await reqCreateProduct.data;

    const { priceCategory } = data.dataPrice;
    await priceCategory.map(priceItem => {
      const data = {
        id_product: resCreateProduct.data.id_product,
        name: priceItem.name,
        price: priceItem.price
      }
      dispatch('createPriceCategoryProcess', data);
    });
    commit('setProductCreated', resCreateProduct.data)
    return resCreateProduct;
  },
  async createPriceCategoryProcess({ commit }, data) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const reqCreateCategory = await axios.post(`${process.env.VUE_APP_BASE_API}/price-category/create`, {
      id_product: data.id_product,
      name: data.name,
      price: data.price
    }, headerConfig);
    const resCreateCategory = await reqCreateCategory.data;
    commit('coba', resCreateCategory);
  },
  async deleteProductProcess({ commit }, id_product) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const reqDeleteProduct = await axios.delete(`${process.env.VUE_APP_BASE_API}/products/${id_product}/delete`, headerConfig);
    const resDeleteProduct = await reqDeleteProduct.data;
    commit('setProductDeleted', id_product);
    return resDeleteProduct;
  }
};

const mutations = {
  coba(state, data) {
    console.log(data)
  },
  setProductLoaded(state, data) {
    state.produk = data;
  },
  setProductCreated(state, data) {
    state.produk.push(data)
  },
  setCategory(state, category) {
    state.produk.filter((data) => data.category === category);
  },
  setProductDeleted(state, id_product) {
    state.produk = state.produk.filter((item) => item.id_product !== id_product)
  },
  setProduct(getters, keyword) {
    // console.log(state)
    console.log(keyword)
    console.log(this.$store)

    // CALL API PENCARIAN

    // getters.produkList = state.produk.filter((data) => data.idProduct == keyword);
    // return state.loadingProduk = !state.loadingProduk;
    // state.produk = state.produk.find((data) => data.idProduct === keyword);
  },
  setActivateLoading(state) {
    return state.loadingProduk = !state.loadingProduk;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}