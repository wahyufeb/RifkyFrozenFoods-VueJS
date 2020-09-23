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
  selectedProduct(state) {
    return (dataId) => {
      return state.produk.find((productItem) => productItem.id_product === dataId)
    }
  },
};

const actions = {
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
  async saveProductProcess({ commit, dispatch }, data) {
    const { name, image, total_perunit, id_product_category } = data.dataProduct;

    let id = data.dataId;
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

    let type = ''
    id !== 0 ? type = `${id}/update` : type = 'create'
    const reqSaveProduct = await axios.post(`${process.env.VUE_APP_BASE_API}/products/${type}`, formProduct, headerConfig);
    const resSaveProduct = await reqSaveProduct.data;

    const { priceCategory } = data.dataPrice;

    priceCategory.map(priceItem => {
      let data = ''
      if (id !== 0) {
        data = {
          dataPrice: {
            id_product: id,
            name: priceItem.name,
            price: priceItem.price,
          },
          dataId: id
        }
      } else {
        data = {
          dataPrice: {
            id_product: resSaveProduct.data.id_product,
            name: priceItem.name,
            price: priceItem.price,
          },
          dataId: id
        }
      }
      dispatch('savePriceCategory', data);
    });
    if (id !== 0) {
      commit('setProductUpdated', resSaveProduct.data)
    } else {
      commit('setProductCreated', resSaveProduct.data)
    }
    return resSaveProduct;
  },
  async savePriceCategory({ commit }, data) {
    const { id_product, name, price } = data.dataPrice;
    let id = data.dataId
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    let type = ''
    id !== 0 ? type = `${id_product}/update` : type = 'create'
    const reqSavePriceCategory = await axios.post(`${process.env.VUE_APP_BASE_API}/price-category/${type}`, {
      id_product,
      name,
      price,
    }, headerConfig);
    const resSavePriceCategory = await reqSavePriceCategory.data;
    if (id !== 0) {
      commit('setPriceProductUpdated', resSavePriceCategory.data);
    } else {
      commit('setPriceProductCreated', resSavePriceCategory.data);
    }
  },
  async deleteProductProcess({ commit }, id_product) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const reqDeleteProduct = await axios.delete(`${process.env.VUE_APP_BASE_API}/products/${id_product}/delete`, headerConfig);
    const reqDeletePriceCategory = await axios.delete(`${process.env.VUE_APP_BASE_API}/price-category/${id_product}/delete`, headerConfig);
    const resDeleteProduct = await reqDeleteProduct.data;
    const resDeletePriceCategory = await reqDeletePriceCategory.data
    commit('setProductDeleted', id_product);
    return {
      deleteProduct: resDeleteProduct,
      deletePriceCategory: resDeletePriceCategory
    };
  },
  async getProductByCategory({ commit }, id_product_category) {
    let token = setDecryptCookie('TOKEN', null);
    const reqProductsByCategory = await axios.get(`${process.env.VUE_APP_BASE_API}/products/${id_product_category}/category`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resProductsByCategory = await reqProductsByCategory.data;
    commit('setProductLoaded', resProductsByCategory.data);
    return resProductsByCategory;
  },
  async searchProduct({ commit }, keyword) {
    let token = setDecryptCookie('TOKEN', null);
    const reqSearchProduct = await axios.get(`${process.env.VUE_APP_BASE_API}/products/search?q=${keyword}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resSearchProduct = await reqSearchProduct.data;
    commit('setProductLoaded', resSearchProduct.data);
    return resSearchProduct;

  },
};

const mutations = {
  setPriceProductCreated(state, data) {
    let getProductId = state.produk.find((item) => item.id_product === data.id_product);
    getProductId.price.push(data)
  },
  setPriceProductUpdated(state, data) {
    let resultProduc = state.produk.find(item => item.id_product === data.id_product)
    let resultPrice = resultProduc.price.find(item => item.name === data.name);
    resultPrice.name = data.name
    resultPrice.price = data.price
  },
  setProductLoaded(state, data) {
    state.produk = data;
  },
  setProductCreated(state, data) {
    state.produk.push(data)
  },
  setProductUpdated(state, data) {
    let getProdukId = state.produk.find((item) => item.id_product === data.id_product);
    getProdukId.name = data.name;
    getProdukId.image = data.image;
    getProdukId.total_perunit = data.total_perunit;
    getProdukId.price = data.price;
    getProdukId.category = {
      id_product_category: data.category.id_product_category,
      name: data.category.name
    };
  },
  setProductDeleted(state, id_product) {
    state.produk = state.produk.filter((item) => item.id_product !== id_product)
  },
  setCategory(state, category) {
    state.produk.filter((data) => data.category === category);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
}