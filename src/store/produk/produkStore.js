/* eslint-disable no-undef */
import axios from 'axios';
import { setDecryptCookie } from '@/helper/setCookie.js';

const state = {
  produk: [],
  // produkCart: [],
  produkTerfilter: [],
  totalProducts: 0,
};

const getters = {
  produkList: state => {
    return state.produk
  },
  produkKeranjang: state => {
    return ({ type, data }) => {
      if (type === null && data === null) {
        if (state.produkTerfilter.length !== 0) {
          return state.produkTerfilter;
        } else {
          return state.produk;
        }
      } else if (type === 'filter') {
        let dataProdukTerfilter = state.produk.filter((produkItem) => produkItem.category.id_product_category == data);
        if (dataProdukTerfilter.length === 0) {
          return state.produkTerfilter = [];
        } else {
          return state.produkTerfilter = dataProdukTerfilter;
        }
      } else if (type === 'search') {
        let searchResult = state.produk.filter((productItem) => {
          return data.toLowerCase().split(' ').every(key => productItem.name.toLowerCase().includes(key))
        });
        return state.produkTerfilter = searchResult;
      }
    }
  },
  totalProducts: state => {
    return state.totalProducts;
  },
  selectedProduct(state) {
    return (dataId) => {
      return state.produk.find((productItem) => productItem.id_product === dataId)
    }
  },
};

const actions = {
  async getTotalProducts({ commit }) {
    let token = setDecryptCookie('TOKEN', null);
    const reqTotalProducts = await axios.get(`${process.env.VUE_APP_BASE_API}/products/total-product`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resTotalProducts = await reqTotalProducts.data;
    commit('setTotalProducts', resTotalProducts.data);
    return resTotalProducts;
  },
  async getProducts({ commit, dispatch }) {
    let token = setDecryptCookie('TOKEN', null);
    const reqProducts = await axios.get(`${process.env.VUE_APP_BASE_API}/products`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resProducts = await reqProducts.data;
    commit('setProductLoaded', resProducts.data);
    dispatch('getTotalProducts');
    return resProducts;
  },
  async getProductStorageByStoreId({ commit }, id_store) {
    let token = setDecryptCookie('TOKEN', null);
    const reqProductsStorage = await axios.get(`${process.env.VUE_APP_BASE_API}/product-storage/${id_store}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resProductsStorage = await reqProductsStorage.data;
    commit('setProductStorageLoaded', resProductsStorage.data);
    return resProductsStorage;
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
    dispatch('getTotalProducts');
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
  async deleteProductProcess({ commit, dispatch }, id_product) {
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
    dispatch('getTotalProducts');
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
  // Warehouse only
  async saveIncomingGoodsProcess({ commit }, data) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // eslint-disable-next-line no-undef
    const reqSaveIncomingGoods = await axios.post(`${process.env.VUE_APP_BASE_API}/product-storage/incoming-goods`, data, headerConfig);
    const resSaveIncomingGoods = await reqSaveIncomingGoods.data;
    if (resSaveIncomingGoods.code === 201) {
      commit('setProductCreated', resSaveIncomingGoods.data.product);
    }
    return resSaveIncomingGoods;
  },
  async saveExitingItem({ commit }, data) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // eslint-disable-next-line no-undef
    const reqSaveExitingItem = await axios.post(`${process.env.VUE_APP_BASE_API}/product-storage/exit-item`, data, headerConfig);
    const resSaveExitingItem = await reqSaveExitingItem.data;
    if (resSaveExitingItem.code === 201) {
      commit('coba', resSaveExitingItem.data);
    }
    return resSaveExitingItem;
  }
};

const mutations = {
  coba(state, data) {
    let productId = state.produk.find((item) => {
      return item.id_product === data.dari.id_product
    })
    productId.stock = data.dari.stock;
  },
  setProductStorageLoaded(state, data) {
    let result = []
    data.filter((productItem) => {
      result.push(productItem.product)
    });
    let stock = [];
    data.map((data) => {
      let a = { stock: data.stock }
      stock.push(a)
    });

    stock.map((stockData, i) => {
      result[i].stock = stockData.stock
    })

    state.produk = result;
  },
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
    // state.totalProducts = state.produk.length;
  },
  setTotalProducts(state, data) {
    state.totalProducts = data;
  },
  setProductCreated(state, data) {
    state.produk.push(data)
    // state.totalProducts = state.produk.length;
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
    // state.totalProducts = state.produk.length;
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