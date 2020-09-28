
import axios from 'axios';
import { setDecryptCookie } from '@/helper/setCookie.js';

const state = {
  keranjang: [
    // { id: 13232, idProduct: 1, image: 'https://ecs7.tokopedia.net/img/cache/700/attachment/2020/2/9/158126126155786/158126126155786_056c0e0d-716d-4010-a23d-6a4804509199.png', name: 'Sosis', price: 18000, qty: 1, subtotal: 0 },
  ],
  uangPembeli: 0,
};

const getters = {
  keranjangBelanja: state => {
    state.keranjang.map((item) => item.subtotal = item.qty * item.price)
    return state.keranjang.filter((item) => item.qty !== 0)
  },
  totalCart: state => {
    let total = state.keranjang.reduce((val, elemet) => {
      return val + elemet.subtotal
    }, 0);
    return total;
  },
};

const actions = {
  addQty({ commit }, id) {
    commit('setAddQty', id);
  },
  minQty({ commit }, id) {
    commit('setMinQty', id);
  },
  addProduct({ commit }, data) {
    commit('addProduct', data);
  },
  async saveInvoiceProcess({ commit, dispatch }, data) {
    const { invoice, keranjangBelanja } = data;
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // eslint-disable-next-line no-undef
    const reqSaveInvoice = await axios.post(`${process.env.VUE_APP_BASE_API}/invoice/create`, invoice, headerConfig);
    const resSaveInvoice = await reqSaveInvoice.data;

    if (resSaveInvoice.code === 201) {
      commit('setSaveInvoice', resSaveInvoice.data);
      keranjangBelanja.map((item) => {
        const transactionData = {
          id_invoice: resSaveInvoice.data.id_invoice,
          id_product: item.id_product,
          qty: item.qty,
          subtotal: item.subtotal
        }
        dispatch('checkoutCashier', transactionData);
      })
    }
    return resSaveInvoice;
  },
  async checkoutCashier({ commit }, data) {
    let token = setDecryptCookie('TOKEN', null);
    let headerConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    // eslint-disable-next-line no-undef
    const reqSaveTransaction = await axios.post(`${process.env.VUE_APP_BASE_API}/transaction/create`, data, headerConfig);
    const resSaveTransaction = await reqSaveTransaction.data;
    if (resSaveTransaction.code === 201) {
      commit('setTransactionCreated', resSaveTransaction.data);
    }
    return resSaveTransaction;
  }
};

const mutations = {
  setAddQty(state, idCart) {
    state.keranjang.find((item) => {
      if (item.idCart === idCart) {
        return item.qty += 1;
      }
    });
  },
  setMinQty(state, idCart) {
    state.keranjang.find((item) => {
      if (item.idCart === idCart) {
        if (item.qty == 1) {
          return state.keranjang.splice(state.keranjang.findIndex(item => item.idCart == idCart), 1);
        }
        return item.qty -= 1;
      }
    });
  },
  addProduct(state, data) {
    let a = state.keranjang.filter((item) => item.id_product === data.id_product);
    if (a.length === 0) {
      return state.keranjang.push(data);
    } else {
      state.keranjang.find(item => item.id_product == a.id_product);
    }
  },
  setSaveInvoice(state, data) {
    console.log("============= 💖 =============");
    console.log(data)
    console.log("============= 💻 =============");
  },
  setTransactionCreated(state) {
    state.keranjang = [];
    state.uangPembeli = 0;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}